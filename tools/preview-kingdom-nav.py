"""Paints each Kingdom district's walkable ground (green) and blocked ground (red)
over its artwork, with the gate paths and routes, into the given folder.
Usage: python tools/preview-kingdom-nav.py OUT_DIR [district-id ...]"""
import json, subprocess, sys
from PIL import Image, ImageDraw

out = sys.argv[1]
only = set(sys.argv[2:])
data = json.loads(subprocess.check_output(['node', 'tools/preview-kingdom-nav.cjs']))
for loc in data:
    if only and loc['id'] not in only:
        continue
    im = Image.open(loc['image']).convert('RGBA')
    W, H = im.size
    tint = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(tint)
    cw, ch = W / 200, H / 200
    for y, row in enumerate(loc['rows']):
        for x, c in enumerate(row):
            if c == '1':
                d.rectangle([x * cw, y * ch, (x + 1) * cw, (y + 1) * ch], fill=(40, 255, 90, 70))
            else:
                d.rectangle([x * cw, y * ch, (x + 1) * cw, (y + 1) * ch], fill=(255, 0, 40, 80))
    im = Image.alpha_composite(im, tint)
    d = ImageDraw.Draw(im)
    for p in range(10, 100, 10):
        d.line([(W * p / 100, 0), (W * p / 100, H)], fill=(255, 255, 255, 90))
        d.line([(0, H * p / 100), (W, H * p / 100)], fill=(255, 255, 255, 90))
        d.text((W * p / 100 + 2, 2), str(p), fill='white')
        d.text((2, H * p / 100 + 2), str(p), fill='white')
    colors = {'gate': (255, 230, 0), 'from': (0, 200, 255), 'home': (255, 120, 255)}
    for r in loc['routes']:
        kind = 'gate' if 'gate' in r else 'from' if 'from' in r else 'home'
        pts = [(x * W / 100, y * H / 100) for x, y in r['points']]
        d.line(pts, fill=colors[kind], width=4 if kind == 'gate' else 2)
    hx, hy = loc['home']
    d.ellipse([hx * W / 100 - 8, hy * H / 100 - 8, hx * W / 100 + 8, hy * H / 100 + 8], fill='white')
    im.convert('RGB').save(f"{out}/nav-{loc['id']}.png")
    print('wrote', loc['id'])
