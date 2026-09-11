"""Cut a head-and-shoulders portrait from one piece of full-body character art.

Same two stages as the companion pipeline (make-trainer-art.py then
make-trainer-heads.py), but driven from the command line so a townsperson can be
added without editing a NAMES list:

    python tools/make-folk-heads.py poppy path/to/art.jfif

Stage 1 floods white inward from the border, so only background that is
CONNECTED to the edge is dropped and interior whites (an apron, a nurse's cap,
eye whites) survive. Stage 2 finds the neck — the narrowest point between hair
and shoulders — and frames on the face, which hair cannot skew.

Writes assets/trainers/<name>-full.png and <name>-head.png and prints the
residual face offset for --head-shift.
"""
import colorsys
import os
import sys
from collections import deque

from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'trainers')
TOL = 34          # how far from pure white still counts as background
PAD = 6           # transparent margin kept around the trimmed figure
A = 30            # alpha above this counts as artwork
ASPECT = 0.86     # width / height of the finished portrait
OUT_H = 460


def cut_out(im):
    w, h = im.size
    px = im.load()
    bg = bytearray(w * h)
    q = deque()

    def is_bg(x, y):
        r, g, b = px[x, y][:3]
        return r > 255 - TOL and g > 255 - TOL and b > 255 - TOL

    def push(x, y):
        i = y * w + x
        if not bg[i] and is_bg(x, y):
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

    out = im.convert('RGBA')
    alpha = Image.frombytes('L', (w, h), bytes(0 if b else 255 for b in bg))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))
    out.putalpha(alpha)
    box = out.getbbox()
    out = out.crop(box)
    pad = Image.new('RGBA', (out.width + PAD * 2, out.height + PAD * 2), (0, 0, 0, 0))
    pad.paste(out, (PAD, PAD))
    return pad


def row_extent(a, w, y):
    """Longest unbroken run of artwork on this row, not the bare min/max: a held
    object or a stray fleck beside the head would widen a bare extent."""
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


def face_offset(im):
    """Where the face actually sits, by skin-tone centroid."""
    w, h = im.size
    px = im.load()
    xs = []
    for y in range(int(h * 0.05), int(h * 0.62)):
        for x in range(w):
            r, g, b, al = px[x, y]
            if al < 200 or max(r, g, b) < 110 or min(r, g, b) > 245:
                continue
            hue, sat, val = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if 5 <= hue * 360 <= 45 and 0.12 <= sat <= 0.62 and val >= 0.55:
                xs.append(x)
    if not xs:
        return 0.0
    return round((sum(xs) / len(xs) - w / 2) / w * 100, 2)


def make(name, src):
    full = cut_out(Image.open(src).convert('RGB'))
    full.save(os.path.join(OUT, name + '-full.png'), optimize=True)

    w, h = full.size
    a = full.getchannel('A').load()
    rows = {}
    for y in range(h):
        e = row_extent(a, w, y)
        if e:
            rows[y] = e
    ys = sorted(rows)
    span = max(rows[y][1] - rows[y][0] for y in ys)
    ys = [y for y in ys if rows[y][1] - rows[y][0] >= span * 0.22]
    top = ys[0]
    fig = ys[-1] - top

    def width(y):
        x0, x1 = rows[y]
        return x1 - x0

    def smooth(y):
        near = [width(k) for k in range(y - 2, y + 3) if k in rows]
        return sum(near) / len(near)

    band = [y for y in ys if top + int(fig * 0.07) <= y <= top + int(fig * 0.32)]
    neck = min(band, key=smooth)
    nx0, nx1 = rows[neck]
    face_cx = (nx0 + nx1) / 2
    head_h = neck - top

    y0 = max(0, top - int(head_h * 0.12))
    y1 = min(h, neck + int(head_h * 0.95))
    crop_h = y1 - y0
    crop_w = int(round(crop_h * ASPECT))
    x0 = max(0, min(int(round(face_cx - crop_w / 2)), w - crop_w)) if crop_w <= w else 0

    if crop_w > w:
        canvas = Image.new('RGBA', (crop_w, crop_h), (0, 0, 0, 0))
        canvas.paste(full.crop((0, y0, w, y1)), (int((crop_w - w) / 2), 0))
        head = canvas
    else:
        head = full.crop((x0, y0, x0 + crop_w, y1))

    head = head.resize((int(round(OUT_H * ASPECT)), OUT_H), Image.LANCZOS)
    dest = os.path.join(OUT, name + '-head.png')
    head.save(dest, optimize=True)
    shift = face_offset(head)
    print('%-8s full %dx%d  neck at %.0f%% of figure  head_h %d  face offset %+.2f%%  %.0f KB'
          % (name, w, h, (neck - top) / fig * 100, head_h, shift,
             os.path.getsize(dest) / 1024))
    return shift


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit('usage: make-folk-heads.py <name> <source image>')
    make(sys.argv[1], sys.argv[2])
