"""Find each character's face and report the landmarks used for framing.

Silhouette width was the wrong signal: a bucket hat, a coat collar, a fishing
rod or a raised hand all widen or narrow the outline and moved the crop. Skin
tone does none of those things, so the face is located directly. Within the
skin region the face is widest at the cheeks and the neck is far narrower,
which gives a reliable jaw line.
"""
from PIL import Image


def skin(px, x, y):
    r, g, b, a = px[x, y]
    if a < 40:
        return False
    if not (r > g > b):
        return False
    if r - b < 18 or r < 70:
        return False
    mx, mn = max(r, g, b), min(r, g, b)
    if mx - mn > 130:            # strong colour, not flesh
        return False
    return (r - g) < 90


def face_box(path, scale=3):
    im = Image.open(path).convert('RGBA')
    im = im.resize((im.width // scale, im.height // scale), Image.Resampling.BILINEAR)
    w, h = im.size
    px = im.load()
    alpha = im.split()[3].load()

    rows = []
    for y in range(h):
        xs = [x for x in range(w) if alpha[x, y] > 40]
        rows.append((xs[0], xs[-1]) if xs else None)
    filled = [y for y, r in enumerate(rows) if r]
    top, bot = filled[0], filled[-1]
    body = bot - top

    # skin runs per row, limited to the head end of the figure
    limit = min(h, top + int(body * 0.45))
    widest_w, widest_y, skin_rows = 0, None, {}
    for y in range(top, limit):
        xs = [x for x in range(w) if skin(px, x, y)]
        if not xs:
            continue
        # longest continuous run, so an arm at the edge cannot win
        best, run, start, bstart = 0, 0, None, None
        prev = None
        for x in xs:
            if prev is not None and x == prev + 1:
                run += 1
            else:
                run, start = 1, x
            if run > best:
                best, bstart = run, start
            prev = x
        skin_rows[y] = (bstart, bstart + best - 1, best)
        if best > widest_w:
            widest_w, widest_y = best, y
    if widest_y is None:
        raise ValueError('no face found')

    # jaw: scan down from the cheeks until the skin narrows to a neck
    chin = None
    for y in range(widest_y, limit):
        r = skin_rows.get(y)
        if r is None or r[2] < widest_w * 0.55:
            chin = y
            break
    if chin is None:
        chin = widest_y + int(widest_w * 0.75)
    cx = (skin_rows[widest_y][0] + skin_rows[widest_y][1]) / 2
    brow = min(y for y in skin_rows if y <= widest_y and skin_rows[y][2] > widest_w * 0.5)
    return {k: v * scale for k, v in
            dict(cx=cx, top=top, brow=brow, cheek=widest_y, chin=chin,
                 face_w=widest_w, body=body).items()}


if __name__ == '__main__':
    import sys
    for name in sys.argv[1:]:
        try:
            m = face_box('assets/trainers/%s-full.png' % name)
            print('%-16s cx=%4d hairtop=%4d brow=%4d chin=%4d faceW=%3d faceH=%3d body=%4d  face/body=%.3f'
                  % (name, m['cx'], m['top'], m['brow'], m['chin'], m['face_w'],
                     m['chin'] - m['brow'], m['body'], (m['chin'] - m['brow']) / m['body']))
        except Exception as e:
            print('%-16s FAILED %s' % (name, e))
