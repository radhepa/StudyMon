"""Re-cut every portrait to one framing, with per-character corrections.

Framing is the same contract normalize-portraits.py established: a 460px square
with the head top at y=35, the chin at y=285 and the face centred at x=230.

The automatic landmarks get most characters right, but they anchor on the top of
the hair, and a bucket hat, a nurse's cap or tall hair pushes the face down and
shrinks it. Rather than guess, those characters carry an explicit correction
here, the same way the original hand-measured landmarks did.

TUNE[name] = (dx, dy, zoom)
  dx, dy  shift the face on the canvas, in canvas pixels, + is right and down
  zoom    scales the face; >1 fills more of the frame, <1 pulls back
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets' / 'trainers'
CACHE = ROOT / 'tools' / 'portrait-landmarks.json'
# Written by tools/portrait-studio.html. Delete this line, EDITS below and the
# studio itself to remove the feature; TUNE keeps working on its own.
EDITS = ROOT / 'tools' / 'portrait-edits.json'
CANVAS, HEAD_TOP, CHIN_Y, FACE_X = 460, 35, 285, 230

TUNE = {
    # Set by looking at the rendered portraits on a contrasting background, not
    # by reading the code. The automatic landmarks anchor on the top of the
    # hair, so a hat, tall hair or a genuinely larger head makes the measured
    # head shorter than the real one and the crop closes in on the face.
    'ada':          (0,  0, 0.76),
    'ari':          (0,  0, 0.72),
    'bell':         (0,  0, 0.86),
    'beni':         (0,  0, 0.76),
    'ellis':        (0,  0, 0.90),
    'flo':          (0,  0, 0.78),
    'linka-head':   (0,  0, 0.88),
    'opal':         (0,  0, 0.86),
    'pim':          (0,  0, 0.72),
}



def runs(alpha, w, y):
    """Longest continuous run of figure pixels on this row.

    A fishing rod, a raised hand or a held book touches the row far from the
    body and dragged the centre and the width off. The longest run is the torso
    or the head itself, so props stop counting. Returns (x0, x1, width).
    """
    best = (0, 0, 0)
    run_start, prev = None, None
    for x in range(w):
        on = alpha[x, y] > 40
        if on and run_start is None:
            run_start = x
        if (not on or x == w - 1) and run_start is not None:
            end = x if (on and x == w - 1) else x - 1
            width = end - run_start + 1
            if width > best[2]:
                best = (run_start, end, width)
            run_start = None
        prev = on
    return best if best[2] else None


def landmarks(im):
    w, h = im.size
    a = im.split()[3].load()
    rows = [runs(a, w, y) for y in range(h)]
    filled = [y for y, r in enumerate(rows) if r]
    top, bot = filled[0], filled[-1]
    body = bot - top
    probe = [y for y in range(top, min(top + int(body * 0.34), h)) if rows[y]]
    head_w = max(1, max(rows[y][2] for y in probe[:max(1, len(probe) // 3)]))
    chin = None
    for y in probe:
        if rows[y][2] > head_w * 1.6:
            chin = y
            break
    if chin is None:
        chin = top + int(body * 0.155)
    chin = max(top + int(body * 0.105), min(chin, top + int(body * 0.165)))
    head_rows = [y for y in range(top, chin) if rows[y]]
    mid = head_rows[len(head_rows) // 2]
    cx = (rows[mid][0] + rows[mid][1]) / 2
    return dict(cx=cx, top=top, chin=chin, body=body)


def measure_all(force=(), only=None):
    """Measure any character the cache does not know yet.

    force is the list of names to re-measure even if cached. It is deliberately
    a list and not a flag: erasing background changes a figure's silhouette, so
    re-measuring everyone quietly moves framing the artist already approved in
    the studio. Re-measure the character you actually changed.
    """
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    for name in force:
        cache.pop(name, None)
    for f in sorted(ART.glob('*-full.png')):
        name = f.stem[:-5]
        if name in cache:
            continue
        cache[name] = landmarks(Image.open(f).convert('RGBA'))
        print('measured', name)
    CACHE.write_text(json.dumps(cache, indent=1, sort_keys=True))
    return cache


def studio_edits():
    if not EDITS.exists():
        return {}
    try:
        return json.loads(EDITS.read_text())
    except Exception:
        return {}


def render(name, m, studio=None):
    dx, dy, zoom = TUNE.get(name, (0, 0, 1.0))
    # An edit made in the studio is the artist's own decision, so it wins.
    e = (studio or {}).get(name)
    if e:
        dx, dy, zoom = e.get('dx', 0), e.get('dy', 0), e.get('zoom', 1.0)
    im = Image.open(ART / (name + '-full.png')).convert('RGBA')
    scale = (m['chin'] - m['top']) / (CHIN_Y - HEAD_TOP) / zoom
    left = m['cx'] - (FACE_X + dx) * scale
    up = m['top'] - (HEAD_TOP + dy) * scale
    out = im.transform((CANVAS, CANVAS), Image.Transform.AFFINE,
                       (scale, 0, left, 0, scale, up),
                       Image.Resampling.BICUBIC, fillcolor=(0, 0, 0, 0))
    out.save(ART / (name + '-portrait.png'), optimize=True)


if __name__ == '__main__':
    import sys
    only = [a for a in sys.argv[1:] if not a.startswith('--')]
    if '--remeasure' in sys.argv and not only:
        sys.exit('--remeasure needs the names to re-measure, e.g.\n'
                 '  python tools/reframe-portraits.py --remeasure holt\n'
                 'Re-measuring every character would move framing set in the studio.')
    cache = measure_all(only if '--remeasure' in sys.argv else ())
    studio = studio_edits()
    done = 0
    for name, m in sorted(cache.items()):
        if only and name not in only:
            continue
        render(name, m, studio)
        done += 1
    print('rendered', done, ('(' + str(len(studio)) + ' from the studio)') if studio else '')
