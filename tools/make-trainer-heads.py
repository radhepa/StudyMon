"""Cut head-and-shoulders portraits from the full-body trainer art.

Run tools/make-trainer-art.py first: this works from the transparent *-full.png
files, so the portraits inherit the clean cut-out instead of a white JPEG box.

The crop is found from the artwork rather than guessed. Row widths are measured
down the figure; the head is the narrow blob at the top, the neck is the pinch
below it, and the shoulders are where the silhouette suddenly widens. The frame
is taken from just above the hair to a little below the shoulder line, and is
centred on the FACE, so the portrait needs no correction in CSS afterwards.

Writes assets/trainers/<name>-head.png.
"""
import colorsys
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'trainers')
NAMES = ['rowan', 'mira', 'theo', 'june', 'ellis']
A = 30            # alpha above this counts as artwork
ASPECT = 0.86     # width / height of the finished portrait
OUT_H = 460       # exported height in pixels


def row_extent(a, w, y):
    """Longest unbroken run of artwork on this row.

    Not the min/max extent: Ellis has paint spatter floating beside her head and
    a raised brush, and a bare extent would treat those flecks as part of the
    figure. The longest run is the body itself."""
    best = None
    run = None
    for x in range(w):
        if a[x, y] > A:
            if run is None:
                run = x
        elif run is not None:
            if best is None or x - run > best[1] - best[0]:
                best = (run, x - 1)
            run = None
    if run is not None and (best is None or w - run > best[1] - best[0]):
        best = (run, w - 1)
    return best


def make(name):
    im = Image.open(os.path.join(SRC, name + '-full.png')).convert('RGBA')
    w, h = im.size
    a = im.getchannel('A').load()

    rows = {}
    for y in range(h):
        e = row_extent(a, w, y)
        if e:
            rows[y] = e
    ys = sorted(rows)
    # Ignore rows that are only spatter or the tip of a held object: the figure
    # proper is much wider than those.
    span = max(rows[y][1] - rows[y][0] for y in ys)
    ys = [y for y in ys if rows[y][1] - rows[y][0] >= span * 0.22]
    top = ys[0]
    fig = ys[-1] - top

    # Width thresholds fail on these designs: a ponytail or a wide fringe makes
    # the head read as broad as a pair of shoulders. The neck is the reliable
    # landmark instead, being the narrowest point between the hair and the
    # shoulders, and it sits directly under the face, so it also gives a face
    # centre that hair cannot skew.
    def width(y):
        x0, x1 = rows[y]
        return x1 - x0

    lo = top + int(fig * 0.07)
    hi = top + int(fig * 0.32)
    band = [y for y in ys if lo <= y <= hi]
    # smooth a little so a single ragged row does not win
    def smooth(y):
        near = [width(k) for k in range(y - 2, y + 3) if k in rows]
        return sum(near) / len(near)
    neck = min(band, key=smooth)
    neck_x0, neck_x1 = rows[neck]
    face_cx = (neck_x0 + neck_x1) / 2
    head_h = neck - top                      # hair line to neck

    # Frame: a little air above the hair, down to just past the shoulders.
    y0 = max(0, top - int(head_h * 0.12))
    y1 = min(h, neck + int(head_h * 0.95))   # head plus shoulders and a little chest
    crop_h = y1 - y0
    crop_w = int(round(crop_h * ASPECT))

    # Centre the frame on the face, then keep it inside the image.
    x0 = int(round(face_cx - crop_w / 2))
    x0 = max(0, min(x0, w - crop_w)) if crop_w <= w else 0

    if crop_w > w:                     # narrow source: pad rather than crop tight
        canvas = Image.new('RGBA', (crop_w, crop_h), (0, 0, 0, 0))
        canvas.paste(im.crop((0, y0, w, y1)), (int((crop_w - w) / 2), 0))
        out = canvas
    else:
        out = im.crop((x0, y0, x0 + crop_w, y1))

    out = out.resize((int(round(OUT_H * ASPECT)), OUT_H), Image.LANCZOS)
    dest = os.path.join(SRC, name + '-head.png')
    out.save(dest, optimize=True)

    # Residual offset of the FACE from the centre of the finished portrait.
    # Silhouette measures get dragged sideways by a ponytail, so find the face
    # by its skin tone instead and take the centroid of those pixels.
    shift = face_offset(out)
    print('%-6s %3dx%-3d  neck at %.0f%% of figure  head_h %3d  face offset %+5.2f%%  %4.0f KB'
          % (name, ow, oh, (neck - top) / fig * 100, head_h, shift,
             os.path.getsize(dest) / 1024))
    return shift


def face_offset(im):
    w, h = im.size
    px = im.load()
    xs = []
    for y in range(int(h * 0.05), int(h * 0.62)):
        for x in range(w):
            r, g, b, al = px[x, y]
            if al < 200:
                continue
            if max(r, g, b) < 110 or min(r, g, b) > 245:
                continue
            hue, sat, val = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if 5 <= hue * 360 <= 45 and 0.12 <= sat <= 0.62 and val >= 0.55:
                xs.append(x)
    if not xs:
        return 0.0
    return round((sum(xs) / len(xs) - w / 2) / w * 100, 2)


shifts = {n: make(n) for n in NAMES}
print('\nwindow.TRAINER_HEAD_SHIFT = ' +
      json.dumps(shifts, separators=(',', ':')).replace('"', '') + ';')
