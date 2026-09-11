"""Turn the full-body trainer artwork into transparent, trimmed PNGs.

The source files are JPEGs on a white background. Dropping every white pixel
would also punch holes in the artwork (eye whites, the highlights on Ellis's
palette, Theo's shirt), so the background is found by flooding inward from the
edges instead: only white that is CONNECTED to the border is removed.

The result is trimmed to the figure and given a soft edge, then the head
position is measured so the card can centre on the face rather than on the
bounding box.

Writes assets/trainers/<name>-full.png and prints the head offsets.
"""
import json
import os
from collections import deque

from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'trainers')
NAMES = ['rowan', 'mira', 'theo', 'june', 'ellis']
TOL = 34          # how far from pure white still counts as background
PAD = 6           # transparent margin kept around the trimmed figure


def is_bg(px, x, y):
    r, g, b = px[x, y][:3]
    return r > 255 - TOL and g > 255 - TOL and b > 255 - TOL


def cut_out(im):
    """Flood from the border; anything reached is background."""
    w, h = im.size
    px = im.load()
    bg = bytearray(w * h)
    q = deque()

    def push(x, y):
        i = y * w + x
        if not bg[i] and is_bg(px, x, y):
            bg[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0); push(x, h - 1)
    for y in range(h):
        push(0, y); push(w - 1, y)

    while q:
        x, y = q.popleft()
        if x > 0: push(x - 1, y)
        if x < w - 1: push(x + 1, y)
        if y > 0: push(x, y - 1)
        if y < h - 1: push(x, y + 1)

    alpha = Image.frombytes('L', (w, h), bytes(255 if not v else 0 for v in bg))
    # nibble one pixel inward so the white JPEG halo goes with the background,
    # then soften what is left so the edge is not stair-stepped
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert('RGBA')
    out.putalpha(alpha)
    return out


def head_shift(im):
    """Percent of width the head centre sits right(+) / left(-) of centre."""
    w, h = im.size
    a = im.getchannel('A').load()
    rows = [y for y in range(h) if any(a[x, y] > 25 for x in range(0, w, 2))]
    y0, y1 = rows[0], rows[-1]
    fig = y1 - y0
    # the face band: below the top of the hair, above the shoulders
    b0, b1 = y0 + int(fig * 0.05), y0 + int(fig * 0.14)
    mids = []
    for y in range(b0, b1):
        xs = [x for x in range(w) if a[x, y] > 25]
        if xs:
            mids.append((min(xs) + max(xs)) / 2)
    if not mids:
        return 0.0
    return round((sum(mids) / len(mids) - w / 2) / w * 100, 2)


shifts = {}
for name in NAMES:
    src = os.path.join(SRC, name + '.jpg')
    im = Image.open(src).convert('RGB')
    cut = cut_out(im)
    box = cut.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    x0, y0, x1, y1 = box
    x0 = max(0, x0 - PAD); y0 = max(0, y0 - PAD)
    x1 = min(cut.width, x1 + PAD); y1 = min(cut.height, y1 + PAD)
    cut = cut.crop((x0, y0, x1, y1))
    # displayed around 300px tall, so 640 is plenty even on a high-DPI screen
    if cut.height > 640:
        cut = cut.resize((round(cut.width * 640 / cut.height), 640), Image.LANCZOS)
    dest = os.path.join(SRC, name + '-full.png')
    cut.save(dest, optimize=True)
    s = head_shift(cut)
    shifts[name] = s
    kb = os.path.getsize(dest) / 1024
    print('%-6s %4dx%-4d  aspect %.3f  head %+6.2f%%  %5.0f KB'
          % (name, cut.width, cut.height, cut.width / cut.height, s, kb))

print('\nwindow.TRAINER_HEAD_SHIFT = ' +
      json.dumps(shifts, separators=(',', ':')).replace('"', '') + ';')
