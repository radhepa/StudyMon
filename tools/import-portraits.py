"""Import full-body character art and cut it to the game's portrait framing.

The existing portraits were built from hand-measured landmarks (face centre,
eye line, chin) in normalize-portraits.py. Measuring 50-odd new characters by
hand is not practical, so this finds the same three landmarks automatically:
the figure is isolated from its white background, the head is the narrow region
above the shoulder line, and the chin is where the silhouette suddenly widens.

Output matches normalize-portraits.py exactly: a 460px square with the head top
at y=35, the chin at y=285 and the face centred at x=230, so imported portraits
sit beside the hand-measured ones without looking out of place.
"""
import json, sys, unicodedata
from pathlib import Path
from PIL import Image
from collections import deque

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'trainers'
# Written by tools/portrait-studio.html: click points marking background to
# clear that a flood from the border cannot reach. Delete this and the studio
# to remove the feature; ENCLOSED below keeps working on its own.
EDITS = ROOT / 'tools' / 'portrait-edits.json'
CANVAS, HEAD_TOP, CHIN_Y, FACE_X = 460, 35, 285, 230


# The download spells two characters differently from the game. Asset names
# follow the game so nobody has to remember the variant.
ALIASES = {
    # the download spells these two differently from the game
    'nula-terminal': 'nula-terminel',
    'nurse-halycon': 'nurse-halcyon',
    # the first seventeen characters were named before the rest of the cast
    # existed; FOLK_PORTRAITS and TRAINER_PORTRAITS point at these filenames
    'nurse-ada': 'ada', 'nurse-beni': 'beni', 'nurse-poppy': 'poppy',
    'youngster-ren': 'ren',
}

def slug(name):
    s = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()
    return ''.join(c if c.isalnum() else '-' for c in s.lower()).strip('-').replace('--', '-')


# Characters who enclose some of the background: the inside of a hair loop, the
# gap between an arm and the body. Value is the smallest region to clear, in
# source pixels, which keeps small highlights on the character itself.
#
# This is deliberately opt in. Enclosed background and white CLOTHING are both
# pure 255,255,255 here, and clothing is often the larger of the two: Brine's
# shirt stripes run to 9148 pixels while Poppy's hair loops are 3352. Neither
# colour nor area separates them, so guessing costs you the character's white
# stripes, eye glints and blush highlights. Add a name only after looking at
# the portrait on a contrasting background.
ENCLOSED = {
    'poppy': 2000,
}


def cut_background(im, enclosed_min=None):
    """Clear the white background.

    Flooding inwards from the border handles the space around the figure. That
    cannot reach white the character encloses, so a character listed in
    ENCLOSED gets a second pass, seeded only from pure white and grown only
    through pure white, over regions at least enclosed_min pixels in area.
    """
    im = im.convert('RGBA')
    w, h = im.size
    px = im.load()
    LOOSE, PURE, TINT = 236, 248, 4

    def region(sx, sy, floor, paint):
        """Collect one connected run at or above `floor`; paint it if asked."""
        out = []
        q = deque([(sx, sy)])
        local = set()
        while q:
            x, y = q.popleft()
            if (x, y) in local:
                continue
            r, g, b, a = px[x, y]
            if a == 0 or r < floor or g < floor or b < floor:
                continue
            if floor == PURE and max(r, g, b) - min(r, g, b) > TINT:
                continue
            local.add((x, y))
            out.append((x, y))
            if x > 0: q.append((x - 1, y))
            if x < w - 1: q.append((x + 1, y))
            if y > 0: q.append((x, y - 1))
            if y < h - 1: q.append((x, y + 1))
        if paint:
            for (x, y) in out:
                px[x, y] = (255, 255, 255, 0)
        return out

    # the background around the figure
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    done = set()
    while q:
        x, y = q.popleft()
        if (x, y) in done:
            continue
        r, g, b, a = px[x, y]
        if a == 0 or r < LOOSE or g < LOOSE or b < LOOSE:
            continue
        for pt in region(x, y, LOOSE, True):
            done.add(pt)

    if not enclosed_min:
        return im

    # whatever pure white is left is enclosed by the figure
    seen = set()
    for y in range(h):
        for x in range(w):
            if (x, y) in seen:
                continue
            r, g, b, a = px[x, y]
            if a == 0 or r < PURE or g < PURE or b < PURE or max(r, g, b) - min(r, g, b) > TINT:
                continue
            pts = region(x, y, PURE, False)
            seen.update(pts)
            if len(pts) >= enclosed_min:
                for (px_, py_) in pts:
                    px[px_, py_] = (255, 255, 255, 0)
    return im


def landmarks(im):
    """Return (face_centre_x, head_top_y, chin_y) in pixels."""
    w, h = im.size
    alpha = im.split()[3].load()
    rows = []
    for y in range(h):
        xs = [x for x in range(w) if alpha[x, y] > 40]
        rows.append((xs[0], xs[-1]) if xs else None)
    filled = [y for y, r in enumerate(rows) if r]
    if not filled:
        raise ValueError('no figure found')
    top = filled[0]
    body_h = filled[-1] - top
    # Head width settles within the first tenth of the body; the shoulders then
    # widen the silhouette sharply. Take the widening as the chin line.
    probe = [y for y in range(top, min(top + int(body_h * 0.34), h)) if rows[y]]
    head_w = max(1, max(rows[y][1] - rows[y][0] for y in probe[:max(1, len(probe) // 3)]))
    chin = None
    for y in probe:
        if rows[y][1] - rows[y][0] > head_w * 1.6:
            chin = y
            break
    if chin is None:                       # no clear shoulder, fall back to proportion
        chin = top + int(body_h * 0.155)
    # A long coat or a wide apron widens the silhouette before the shoulders do,
    # which put the chin far too low and zoomed the crop out to the waist. Clamp
    # to the range a head actually occupies in this art style.
    chin = max(top + int(body_h * 0.105), min(chin, top + int(body_h * 0.165)))
    head_rows = [y for y in range(top, chin) if rows[y]]
    mid = head_rows[len(head_rows) // 2]
    cx = (rows[mid][0] + rows[mid][1]) / 2
    return cx, top, chin


def studio_erase(name):
    """Click points the artist marked in the studio, in source pixels."""
    if not EDITS.exists():
        return []
    try:
        return (json.loads(EDITS.read_text()).get(name) or {}).get('erase', [])
    except Exception:
        return []


def erase_at(im, points):
    """Clear the light region under each point, stopping at the ink outline."""
    px = im.load()
    w, h = im.size
    for sx, sy in points:
        sx, sy = int(sx), int(sy)
        if not (0 <= sx < w and 0 <= sy < h):
            continue
        r, g, b, a = px[sx, sy]
        if a == 0:
            continue
        light = (r + g + b) / 3
        if light < 150:                      # never erase dark areas
            continue
        seen = set()
        stack = [(sx, sy)]
        while stack:
            x, y = stack.pop()
            if (x, y) in seen or not (0 <= x < w and 0 <= y < h):
                continue
            r, g, b, a = px[x, y]
            if a == 0:
                seen.add((x, y))
                continue
            if abs((r + g + b) / 3 - light) > 26:
                continue
            seen.add((x, y))
            px[x, y] = (255, 255, 255, 0)
            stack += [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)]
    return im


def build(src, name):
    im = cut_background(Image.open(src), ENCLOSED.get(name))
    im = erase_at(im, studio_erase(name))
    cx, top, chin = landmarks(im)
    scale = (chin - top) / (CHIN_Y - HEAD_TOP)          # source px per canvas px
    left = cx - FACE_X * scale
    up = top - HEAD_TOP * scale
    out = im.transform((CANVAS, CANVAS), Image.Transform.AFFINE,
                       (scale, 0, left, 0, scale, up),
                       Image.Resampling.BICUBIC, fillcolor=(0, 0, 0, 0))
    im.save(OUT / (name + '-full.png'), optimize=True)
    out.save(OUT / (name + '-portrait.png'), optimize=True)
    return cx, top, chin


if __name__ == '__main__':
    src_dir = Path(sys.argv[1])
    only = set(sys.argv[2:]) or None
    for f in sorted(src_dir.iterdir()):
        if f.suffix.lower() not in ('.jfif', '.jpg', '.jpeg', '.png', '.webp'):
            continue
        name = slug(f.stem)
        name = ALIASES.get(name, name)
        if only and name not in only:
            continue
        try:
            cx, top, chin = build(f, name)
            print('%-24s cx=%4d top=%4d chin=%4d' % (name, cx, top, chin))
        except Exception as e:
            print('%-24s FAILED %s' % (name, e))
