"""Pixel art for Pokemon Kingdom, drawn as text grids.

    python tools/build-kingdom-pixel-art.py

Writes two sprite sheets into assets/ui/:
  kingdom-fire.png   four 12x13 campfire flame frames, played at ~8 fps by
                     .prop-campfire .flame (css/kingdom.css)
  kingdom-icons.png  11x11 cells: row 0 emote icons for speech bubbles, row 1
                     the same icons with a dark outline for particles. The
                     column order is the --i index used in kingdom-life.js
                     (KINGDOM_EMOTE_ICONS, KINGDOM_FX_ICONS) and the CSS.
Each grid letter is a palette colour; '.' is transparent.
"""
import os
from PIL import Image

UI = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'ui')

FIRE_PAL = {
    'o': '#a52a17',  # deep red edge
    'r': '#e8501d',  # red-orange
    'a': '#ff9424',  # orange
    'y': '#ffd43c',  # yellow
    'w': '#fff6cc',  # white-hot core
}
FIRE_FRAMES = [
"""
......o.....
.....or.....
.....rr..o..
..o..rar.r..
..r.oraaorr.
..rrraaaarr.
.orraayaaaro
.raaayyyaarr
.raayywyyaar
.raayywwyaar
.orayywwyyar
..oraywwyao.
...oraaaro..
""",
"""
.....o......
.....ro.....
..o..rr.....
..r.rar..o..
..rrraar.rr.
.orraaaarrr.
.rraayaaaar.
.raayyyaaaro
oraayywyyaar
.raayywwyaar
.rraywwwyyar
..oraywwyao.
...oraaaro..
""",
"""
.......o....
......ro....
...o..rr....
...r.rar.o..
..orrraarr..
..rraaaaarro
.orraayyaar.
.raaayyyaarr
.raayywyyaar
oraayywwyaar
.raayywwyyar
..oraywwyao.
...oraaaro..
""",
"""
....o.......
....or......
....rr...o..
.o.rar...r..
.rrraar.orr.
.rraaaarrar.
orraayaaaarr
.raayyyaaaro
.raayywyyaar
.raayywwyaar
.orayywwyyar
..oraywwyao.
...oraaaro..
""",
]

ICON_PAL = {
    'r': (232, 69, 94), 'R': (255, 160, 172),          # heart red + shine
    'n': (61, 95, 196), 'N': (140, 170, 255),          # note blue
    'e': (226, 64, 42), 'E': (255, 140, 110),          # exclamation red
    'q': (61, 95, 196), 'Q': (140, 170, 255),          # question blue
    'd': (92, 70, 54),                                  # dots
    'b': (63, 164, 232), 'B': (196, 236, 255), 'k': (38, 110, 176),  # drop
    'y': (245, 184, 30), 'Y': (255, 243, 176),         # spark
    'o': (226, 108, 40),                               # happy
    'a': (224, 52, 52),                                # anger
    'z': (86, 120, 206), 'Z': (170, 196, 255),         # zee
    'p': (255, 168, 64), 'P': (255, 222, 120), 'v': (74, 44, 30),  # butterfly
    'w': (255, 250, 228),
    'g': (86, 168, 62), 'G': (150, 214, 96),          # leaf
    'u': (66, 104, 214), 'U': (150, 186, 255), 'x': (40, 60, 140),  # oran berry
    'f': (255, 156, 196), 'F': (255, 214, 232), 'c': (176, 112, 60), 'C': (212, 150, 90), 's': (226, 52, 72),  # cupcake
}
ICONS = [
    ('heart', """
.........
.rr...rr.
rRrr.rrrr
rRrrrrrrr
rrrrrrrrr
.rrrrrrr.
..rrrrr..
...rrr...
....r....
"""),
    ('note', """
....nnnn.
....nNNn.
....n..n.
....n..n.
....n..n.
.nnnn.nn.
nnNnnnnn.
nnnn.nn..
.nn......
"""),
    ('excl', """
...eee...
...eEe...
...eEe...
...eee...
...eee...
....e....
.........
...eee...
...eee...
"""),
    ('quest', """
..qqqqq..
.qqQ.qqq.
.qq...qq.
.....qqq.
....qqq..
....qq...
.........
....qq...
....qq...
"""),
    ('dots', """
.........
.........
.........
.........
.dd.dd.dd
.dd.dd.dd
.........
.........
.........
"""),
    ('drop', """
....k....
....k....
...kbk...
..kbbbk..
.kbBbbbk.
.kBbbbbk.
.kbbbbbk.
..kbbbk..
...kkk...
"""),
    ('spark', """
....y....
....y....
...yYy...
.yyyYyyy.
yYYYwYYYy
.yyyYyyy.
...yYy...
....y....
....y....
"""),
    ('happy', """
.........
.........
.oo...oo.
o..o.o..o
.........
.........
..o...o..
...ooo...
.........
"""),
    ('anger', """
..a...a..
.aa...aa.
aa.....aa
.........
.........
.........
aa.....aa
.aa...aa.
..a...a..
"""),
    ('zee', """
.zzzzzzz.
.zZZZZzz.
.....zz..
....zz...
...zz....
..zz.....
.zz......
.zzzzzzz.
.........
"""),
    ('fly1', """
.........
pp.....pp
pPp...pPp
pPPpvpPPp
.pPpvpPp.
..ppvpp..
.pPpvpPp.
.pp.v.pp.
.........
"""),
    ('fly2', """
.........
.........
...pvp...
..pPvPp..
..pPvPp..
...pvp...
..pPvPp..
...p.p...
.........
"""),
    ('berry', """
....gG...
...gg....
..uuuuu..
.uUUuuux.
.uUuuuux.
.uuuuuux.
.uuuuuxx.
..xxxxx..
.........
"""),
    ('cake', """
....s....
..fffff..
.fFFffff.
fFfffffff
.ccCcCcc.
.cCcCcCc.
..cCcCc..
..ccccc..
.........
"""),
    ('twinkle', """
.........
.........
....y....
....Y....
..yYwYy..
....Y....
....y....
.........
.........
"""),
]
OUTLINE = (46, 31, 20, 230)


def grid(art, w, h):
    rows = art.strip('\n').split('\n')
    assert len(rows) == h and all(len(r) == w for r in rows), [len(r) for r in rows]
    return rows


def hexrgb(c):
    c = c.lstrip('#')
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def build_fire():
    sheet = Image.new('RGBA', (12 * len(FIRE_FRAMES), 13), (0, 0, 0, 0))
    for f, art in enumerate(FIRE_FRAMES):
        for y, row in enumerate(grid(art, 12, 13)):
            for x, ch in enumerate(row):
                if ch != '.':
                    sheet.putpixel((f * 12 + x, y), hexrgb(FIRE_PAL[ch]) + (255,))
    sheet.save(os.path.join(UI, 'kingdom-fire.png'), optimize=True)


def build_icons():
    cell = 11
    sheet = Image.new('RGBA', (cell * len(ICONS), cell * 2), (0, 0, 0, 0))
    for i, (name, art) in enumerate(ICONS):
        filled = set()
        for y, row in enumerate(grid(art, 9, 9)):
            for x, ch in enumerate(row):
                if ch != '.':
                    for r in (0, 1):
                        sheet.putpixel((i * cell + 1 + x, r * cell + 1 + y), ICON_PAL[ch] + (255,))
                    filled.add((x, y))
        for (x, y) in filled:
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                if (x + dx, y + dy) not in filled:
                    sheet.putpixel((i * cell + 1 + x + dx, cell + 1 + y + dy), OUTLINE)
    sheet.save(os.path.join(UI, 'kingdom-icons.png'), optimize=True)
    return {name: i for i, (name, _) in enumerate(ICONS)}


if __name__ == '__main__':
    build_fire()
    print('icon order:', build_icons())
