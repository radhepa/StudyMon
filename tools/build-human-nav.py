"""Build the Bootstrap Town walk grids from the scene art.

Each scene gets a 160 x 90 grid (one cell is ~10 source pixels square on the
16:9 stage). A cell is '1' when a person's FEET may stand there.

Every scene is described the same way, measured off the painting in stage
percentages:

  ground  where feet belong at all: the painted dirt, cobbles, steps and bridge
          outdoors (dirt is read straight out of the art), the floorboards and
          tiles indoors. Grass, flower beds and water are never ground.
  solids  the visible outline of every physical thing: buildings, walls, wall
          posts, furniture, planters, barrels, fences, lamp posts, rails.

A cell is walkable when its centre is on ground AND a body standing there does
not touch a solid: half a body width either side (BODY_HALF_W) and a sliver of
shoe/shadow above and below (FOOT_DEPTH). The scene art has no foreground layer,
so a person is always drawn over the background; keeping the whole body clear
of furniture is what stops anyone looking as if they walk through a chair.

Tall props whose upper half hangs over walkable ground (the two lamp posts
beside the Mart) are also listed as foreground cut-outs in js/data/human-world.js;
the engine draws them over anyone standing behind their base.

Writes js/data/human-world-nav.js.
Run:  python tools/build-human-nav.py [--preview DIR]
"""
import json
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GW, GH = 160, 90
SS = 4                  # solids are rasterised at 4x the grid for a precise body test
BODY_HALF_W = 1.2       # stage-width %: a figure is ~3% wide on the stage
RAIL_HALF_W = 0.6       # knee-high rails: legs must clear them, arms may pass over
FOOT_DEPTH = 0.2        # stage-height %: the soles themselves, above and below the foot line

CELL_X = (np.arange(GW) + .5) * 100 / GW
CELL_Y = (np.arange(GH) + .5) * 100 / GH


# ---------------------------------------------------------------- rasterising

def rect(x1, y1, x2, y2):
    return [(x1, y1), (x2, y1), (x2, y2), (x1, y2)]


def inside(poly, xs, ys):
    """Even-odd point-in-polygon for every (x, y) pair of the two coordinate grids."""
    X, Y = np.meshgrid(xs, ys)
    hit = np.zeros(X.shape, bool)
    pts = list(poly)
    for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
        if y1 == y2: continue
        crosses = (Y >= min(y1, y2)) & (Y < max(y1, y2))
        at_x = x1 + (Y - y1) * (x2 - x1) / (y2 - y1)
        hit ^= crosses & (X < at_x)
    return hit


def cells_in_poly(grid, poly, value):
    """Cells whose centre lies inside the polygon (stage percentages)."""
    grid[inside(poly, CELL_X, CELL_Y)] = value


FINE_X = (np.arange(GW * SS) + .5) * 100 / (GW * SS)
FINE_Y = (np.arange(GH * SS) + .5) * 100 / (GH * SS)


def fine_mask(polys):
    mask = np.zeros((GH * SS, GW * SS), bool)
    for poly in polys:
        mask |= inside(poly, FINE_X, FINE_Y)
    return mask


def body_blocked(solid, half_w=BODY_HALF_W):
    """True for each cell where a body centred on it would overlap a solid pixel."""
    fh, fw = solid.shape
    integral = np.zeros((fh + 1, fw + 1), np.int32)
    integral[1:, 1:] = solid.astype(np.int32).cumsum(0).cumsum(1)
    x0 = np.clip(np.floor((CELL_X - half_w) * fw / 100).astype(int), 0, fw)
    x1 = np.clip(np.ceil((CELL_X + half_w) * fw / 100).astype(int), 0, fw)
    y0 = np.clip(np.floor((CELL_Y - FOOT_DEPTH) * fh / 100).astype(int), 0, fh)
    y1 = np.clip(np.ceil((CELL_Y + FOOT_DEPTH) * fh / 100).astype(int), 0, fh)
    Y0, X0 = np.meshgrid(y0, x0, indexing='ij')
    Y1, X1 = np.meshgrid(y1, x1, indexing='ij')
    return (integral[Y1, X1] - integral[Y0, X1] - integral[Y1, X0] + integral[Y0, X0]) > 0


def neighbours(grid):
    pad = np.pad(grid, 1).astype(int)
    return [np.roll(np.roll(pad, dy, 0), dx, 1)[1:-1, 1:-1] for dy in (-1, 0, 1) for dx in (-1, 0, 1)]


def dilate(grid):
    return np.logical_or.reduce(neighbours(grid)).astype(bool)


def erode(grid):
    return np.logical_and.reduce(neighbours(grid)).astype(bool)


def drop_specks(grid, min_cells=12):
    seen = np.zeros_like(grid)
    for sy, sx in zip(*np.nonzero(grid)):
        if seen[sy, sx]: continue
        stack, part = [(sy, sx)], []
        seen[sy, sx] = True
        while stack:
            y, x = stack.pop(); part.append((y, x))
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < GH and 0 <= nx < GW and grid[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; stack.append((ny, nx))
        if len(part) < min_cells:
            for y, x in part: grid[y, x] = False
    return grid


def walk_grid(ground, solids, rails=()):
    blocked = body_blocked(fine_mask(solids))
    if rails: blocked |= body_blocked(fine_mask(rails), RAIL_HALF_W)
    return drop_specks(ground & ~blocked)


# ---------------------------------------------------------------- the square

def painted_dirt():
    im = np.asarray(Image.open(os.path.join(ROOT, 'assets/ui/bootstrap-town-exterior-v1.png')).convert('RGB')).astype(int)
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    sand = (r > 185) & (g > 140) & (r > g) & (r - b > 55) & (g - b > 25)
    h, w = sand.shape
    grid = np.zeros((GH, GW), bool)
    for j in range(GH):
        for i in range(GW):
            grid[j, i] = sand[j * h // GH:(j + 1) * h // GH, i * w // GW:(i + 1) * w // GW].mean() > .3
    # The dirt is dithered with pebbles and grass tufts; close the speckle into solid path.
    grid = erode(dilate(grid))
    pad = np.pad(grid, 1).astype(int)
    around = sum(np.roll(np.roll(pad, dy, 0), dx, 1) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if dy or dx)[1:-1, 1:-1]
    return grid | (around >= 6)


SQUARE_GROUND = [
    # Paved and stepped ground the dirt detector cannot see.
    [(49, 22), (56, 22), (57.5, 26.5), (60.5, 29), (61.5, 33), (61, 36), (43, 36), (42.5, 32), (45, 28.5), (48.5, 26.5)],  # Mart steps and cobbled apron
    [(43, 34), (61, 34), (61.5, 45), (65.5, 46.5), (66.5, 51), (65, 55.5), (61, 60), (55, 64), (50, 64.5),
     (45.5, 63.5), (40.5, 60), (38.3, 56), (37.5, 50), (38.5, 46), (43.5, 45)],                                            # cobbles round the noticeboard
    [(18.5, 24.5), (25, 24.5), (25.8, 28), (25, 35), (19.5, 35), (17.8, 28)],                                              # Centre steps and stepping stones
    [(72, 24.5), (81, 24.5), (80, 29), (75, 32), (71.5, 30)],                                                              # lab's stone floor
    [(5.8, 41), (8.9, 41), (10, 44.3), (10, 48.2), (6.2, 48.2), (5.8, 44.5)],                                              # your front steps and stones
    [(84.6, 44.2), (88.5, 44.2), (88.5, 50.5), (84.6, 50.5)],                                                              # Cottage Row steps
    [(80.5, 67.2), (86.5, 67.2), (86.5, 70.5), (81, 71)],                                                                  # stones at the head of the bridge
    [(82.3, 70), (87, 68.3), (90.5, 71.5), (91.5, 76), (92.5, 80), (93, 84.5), (88, 85), (85.8, 80), (83.8, 76), (82.4, 72.5)],  # bridge deck
    [(87.5, 83), (93.5, 83), (93.5, 87), (88, 87.5)],                                                                      # stones at the foot of the bridge
    [(19.8, 47.6), (27, 58.6), (8.8, 66.4), (3.9, 56)],                                                                    # the practice-field court
    # Worn grass that is the only way to a door. Nothing else on grass is ground.
    # The Mart's cobbles meet the rest of town only here: the Centre and lab dirt paths run up to
    # the two lamp posts and the art leaves a short worn gap (the cobbles beside the noticeboard
    # are pinched shut by the benches and planters).
    [(33, 26.5), (38.5, 26.5), (40, 29.3), (44.5, 29.3), (44.5, 33), (39.5, 33), (38, 30), (33, 30)],                      # Centre path past the west lamp
    [(59.5, 29), (66, 28.5), (66, 32.3), (59.5, 32.5)],                                                                    # lab path past the east lamp
    [(9.5, 44.6), (12.5, 43.5), (14, 42.2), (16.8, 41), (18, 39.3), (22.5, 38.2), (22.5, 41.2), (18.8, 41.2),
     (16.8, 42.4), (13.5, 44.2), (10.5, 46), (9.5, 46)],                                                                  # your doorstep, along the fence to the Centre path and the stile
    [(76, 45.5), (79.5, 46.3), (81, 48.6), (85, 48.6), (85, 51), (80.5, 51), (78.5, 49), (76, 48.5)],                      # lab path round the flower box to Cottage Row
]

# Painted dirt that is not a path: the whole fenced field (its court is re-added above).
SQUARE_NOT_GROUND = [
    [(0, 51.5), (18.5, 42.3), (21, 42.3), (32, 57.5), (31.5, 60), (8, 73), (0, 73)],
]

SQUARE_SOLIDS = [
    # Poké Centre
    rect(13.5, 0, 30.2, 24.8), rect(15.2, 21, 18.4, 28.3), rect(25.1, 21, 28.2, 28.3), rect(28.3, 21.5, 30.7, 28),
    # Poké Mart, its planters, chalkboard and the post beside it
    rect(43, 0, 61.5, 23), rect(43, 18.5, 48.8, 26.6), rect(56, 19.3, 59.4, 26.6), rect(59.3, 19, 62.8, 29), rect(62.7, 22, 63.8, 26.8),
    # lamp-post feet (the posts themselves are foreground cut-outs)
    rect(38.2, 38, 39.8, 43), rect(64.1, 38, 65.6, 43),
    # Professor's lab stall, telescope and side fence
    rect(68, 0, 80.8, 25.2), rect(73, 18, 76.8, 26.6),
    [(80.5, 18), (84.2, 18), (84.2, 30), (79.2, 36.5), (77.8, 36.5), (77.8, 31)],
    # bench gardens either side of the square, the benches and the noticeboard
    [(29.5, 39.4), (40.5, 39.4), (40.5, 44.7), (38.7, 45.7), (35.7, 47.6), (33.3, 46.4), (31.8, 45), (30.7, 43.7), (29.5, 43.7)],
    rect(26.3, 35.5, 29.9, 41.2), rect(38.8, 35.5, 44.7, 44.6), rect(34, 28, 38.6, 36),
    rect(64.5, 33, 69, 47.3), rect(66.3, 34.8, 70.2, 40.5), rect(59.1, 35.8, 64.7, 44.6),
    rect(46.8, 36.2, 57.5, 49), rect(43.8, 42.8, 48.8, 54), rect(55.3, 42.8, 60, 54),
    # south gate lamp posts and planters
    rect(43.8, 67.5, 47.3, 80.3), rect(52.7, 67.5, 55.9, 80.3), rect(41.7, 79.8, 46.8, 87.6), rect(52.9, 79.8, 58.1, 87.6),
    # your home, mailbox, planter, water barrel and fences
    [(0, 18), (16, 18), (16, 33), (13.3, 36.5), (7.9, 37), (7.9, 41), (5.8, 41), (5.8, 40.3), (0, 40.3)],
    rect(0, 40, 3.2, 49), rect(3.9, 40.3, 6, 45.6),
    [(7.9, 37), (13.3, 36.5), (13.3, 41.9), (8.4, 44), (7.9, 44)],
    rect(13.1, 35.3, 15.7, 41.3), rect(14.4, 33, 17.9, 39), rect(13, 29, 17.5, 34),
    # the stile rock
    rect(18.8, 41.8, 20.5, 45.8),
    # Cottage Row: the house, its planters and fences, the flower box and the long flower-bed fence
    [(84, 20), (100, 20), (100, 47), (91, 47), (88.4, 44.2), (84, 44.2)],
    rect(88.2, 45, 93.2, 52), rect(81.2, 42, 85, 48.4), rect(79.1, 41.5, 80.4, 46.6), rect(79, 39, 84.2, 43.5),
    [(74.5, 49.2), (82, 50.5), (82, 56), (74.5, 56)],
]

SQUARE_RAILS = [
    # practice-field fence: north-west posts and rails, then the east and south sides
    rect(0.7, 51, 1.7, 55.6), rect(2.7, 49.8, 3.7, 54.8), rect(6, 48, 6.9, 52.8), rect(9.2, 46.2, 10.1, 51),
    rect(12.3, 44.6, 13.2, 49.2), rect(15.5, 43, 16.4, 47.6), rect(17.8, 41.6, 18.7, 46.4), rect(20.7, 42, 21.6, 46.8),
    [(0, 51.8), (2.7, 50.6), (6, 48.8), (9.2, 47), (12.3, 45.4), (15.5, 43.8), (17.8, 42.4), (21.6, 42.8),
     (21.6, 46.8), (18.7, 46.4), (16.4, 47.6), (13.2, 49.2), (10.1, 51), (6.9, 52.8), (3.7, 54.8), (0, 56)],
    [(20.6, 42.1), (21.7, 42.1), (21.7, 43.8), (23.3, 45.2), (23.3, 44.8), (24.3, 44.8), (24.3, 45.8), (26.3, 48.9),
     (26.3, 48.3), (27.4, 48.3), (27.4, 50), (29.3, 53.4), (29.3, 53.2), (30.4, 53.2), (31.6, 55.6), (31.6, 60),
     (29.3, 58.6), (27.4, 54), (24.3, 50), (21.7, 47.4), (20.6, 47)],
    [(32, 55.2), (28, 57.9), (24.4, 59.9), (20.7, 61.9), (16.7, 63.9), (12.5, 65.9), (8.6, 67.8), (5, 69.5),
     (5, 74), (8.6, 73), (12.5, 71.8), (16.7, 69.8), (20.7, 67.8), (24.4, 65.8), (28, 63.8), (32, 60.5)],
    # the long flower-bed fence from Cottage Row down to the bridge
    [(74.5, 49.4), (78, 51.8), (81, 54.8), (85, 59), (90.6, 63.3), (90.6, 68.6), (89.5, 68.2), (85.5, 64.2), (82.2, 59.6), (79.2, 56.6), (76, 55.4), (74.5, 55.5)],
    # the bridge's two handrails, post by post
    [(81, 69.8), (82.3, 69.8), (83.3, 72.6), (84.6, 72.6), (85.2, 77.4), (86.5, 77.4), (86.1, 80), (87.4, 80), (87, 83), (88.2, 83), (88.3, 86), (86.8, 86), (81, 76.5)],
    [(85.8, 65.5), (87.3, 65.5), (91, 70), (92.3, 76), (94.3, 79.5), (96.8, 81), (96.8, 87.5), (95, 87.5), (92.6, 83.5), (90.3, 78), (89.2, 72.5), (85.8, 70.5)],
]

# The painted bridge bends southeast. Its visible deck is wide enough for a
# character, but railing anti-aliasing used to pinch the rasterised route into
# an NPC-only island. This centre corridor stays entirely on the timber deck.
SQUARE_BRIDGE_DECK = [
    [(82.2, 68.5), (86.2, 68.5), (87.8, 73), (89.2, 78.8),
     (93.3, 82.8), (93.3, 87), (89.2, 87), (86.8, 81),
     (85.4, 75.2), (82.2, 71.8)]
]

# Worn diagonal path from the western home to the Centre apron. Like the bridge,
# it is visibly broad enough in the painting but became a one-cell diagonal after
# colour sampling. Keep a body-width centre strip so villagers can use the door.
SQUARE_HOME_PATH = [
    [(6.8, 43.5), (9.5, 43.5), (13.5, 41.5), (18, 38.6), (22.8, 37.5),
     (23.2, 41.4), (19.2, 42.2), (15, 44.6), (10.8, 47.5), (6.8, 48)]
]


def square():
    ground = painted_dirt()
    for poly in SQUARE_NOT_GROUND: cells_in_poly(ground, poly, False)
    for poly in SQUARE_GROUND: cells_in_poly(ground, poly, True)
    walk = walk_grid(ground, SQUARE_SOLIDS, SQUARE_RAILS)
    for poly in SQUARE_BRIDGE_DECK: cells_in_poly(walk, poly, True)
    for poly in SQUARE_HOME_PATH: cells_in_poly(walk, poly, True)
    return walk, SQUARE_SOLIDS + SQUARE_RAILS


# ---------------------------------------------------------------- interiors

def room(floor, doorway, furniture):
    """Floor and doorway are rects; everything that is not floor is wall."""
    ground = np.zeros((GH, GW), bool)
    for r in [floor, doorway]: cells_in_poly(ground, rect(*r), True)
    walls = ~fine_mask([rect(*floor), rect(*doorway)])
    solid = walls | fine_mask(furniture)
    walk = drop_specks(ground & ~body_blocked(solid))
    return walk, furniture


def authored_scene(scene):
    """Rasterise the broad walk polygons used by new community locations.

    These scenes intentionally begin with simple lanes. Their art and world
    connections can settle before furniture-by-furniture collision is traced.
    """
    ground = np.zeros((GH, GW), bool)
    nav = scene.get('nav', {})
    for poly in nav.get('areas', []): cells_in_poly(ground, poly, True)
    solids = nav.get('blocks', [])
    return walk_grid(ground, solids), solids


def south_wall(posts, plants, door_posts):
    return [rect(*r) for r in posts + plants + door_posts]


def bedroom():
    return room(
        floor=(6.5, 29.5, 92.3, 79.5),
        doorway=(42.2, 79.5, 55.3, 92),
        furniture=[
            rect(7, 16, 13.5, 32),        # potted plant by the bed
            rect(13.3, 17, 24.5, 51),     # bed (the rug beside it is floor)
            rect(25.4, 19, 30.6, 32),     # bedside table and flowers
            rect(37, 17, 58.4, 34),       # study desk
            rect(42.8, 24, 48.2, 38.3),   # desk chair (and room to pull it out)
            rect(61, 14, 71.6, 34),       # bookcase
            rect(73, 20, 81.4, 35.5),     # chest
            rect(84, 20, 92.5, 44.5),     # wardrobe
            rect(7, 55, 15, 75.5),        # nightstand and plant
            rect(16, 68, 21.8, 76.5),     # floor cushion on the round rug
            rect(86, 59.5, 93, 77),       # flower pot
        ] + south_wall(posts=[(16.8, 77.5, 19.8, 92), (78.9, 78, 81.9, 92)],
                       plants=[(31.3, 77.5, 39, 92), (59.8, 77.5, 67.4, 92)],
                       door_posts=[(38.7, 74.5, 42.4, 92), (55.1, 74.5, 59.4, 92)]))


SCENES = {
    'square': square,
    'mart': lambda: room(
        floor=(8.2, 32.8, 92.6, 83.3),
        doorway=(43.4, 83.3, 56.6, 92),
        furniture=[
            [(8, 17), (20.5, 17), (20.5, 41.5), (11.2, 48), (8, 48)],                                  # left shelving
            [(7.8, 47.5), (14.3, 47.5), (14.3, 57.5), (17.3, 57.5), (17.3, 70.5), (7.8, 70.5)],        # stacked crates
            rect(6.8, 66.5, 13.7, 84),                                                                 # plant barrel
            rect(28.8, 10, 36, 33.5), rect(65, 10, 73.3, 33.5),                                        # back-wall shelf bays
            rect(35.7, 8, 65.1, 42.3),                                                                 # counter
            [(80.2, 17), (92.5, 17), (92.5, 49), (89.3, 49), (80.2, 41.8)],                            # right shelving
            rect(30.9, 47, 39.9, 65.3),                                                                # potion display
            rect(60.8, 47, 69.9, 65.3),                                                                # supply display
            rect(86.1, 66, 93.8, 84),                                                                  # plant barrel
        ] + south_wall(posts=[(17.3, 82.5, 20.5, 92), (80.5, 82, 83.7, 92)],
                       plants=[(32.2, 81, 39.9, 92), (61.1, 81, 68.5, 92)],
                       door_posts=[(39.8, 78, 43.6, 92), (56.3, 78, 61.5, 92)])),
    'center': lambda: room(
        floor=(7.5, 33.5, 92.2, 83),
        doorway=(43.1, 83, 55.3, 92),
        furniture=[
            rect(6.6, 25, 13.2, 40.3),    # small potted plant
            rect(12.8, 18, 21, 35.3),     # big plant barrel
            rect(23.7, 17.5, 29.5, 37.8), # PC terminal
            rect(33.3, 8, 64.6, 43.3),    # nurse counter and its stone step
            rect(67.8, 12, 76.1, 40.3),   # healing machine
            rect(78, 19, 86, 39.3),       # bookshelf
            rect(86.4, 23, 92.4, 40.3),   # potted plant
            rect(7.4, 45, 14, 69.3),      # west bench
            rect(6, 64.5, 13.2, 80.5),    # west planter
            rect(84.7, 45, 91.6, 69.3),   # east bench
            rect(85.8, 64.5, 93.3, 80.5), # east planter
        ] + south_wall(posts=[(16.7, 82, 19.9, 92), (78.8, 82, 82.3, 92)],
                       plants=[(31.3, 81, 39.1, 92), (59.9, 81, 67.4, 92)],
                       door_posts=[(38.4, 78, 43.3, 92), (55.1, 78, 60.3, 92)])),
    'lab': lambda: room(
        floor=(8.2, 32, 92.8, 79.5),
        doorway=(43.4, 79.5, 56.5, 92),
        furniture=[
            rect(9.4, 7, 21.9, 38.3),     # bookshelf
            rect(8.5, 31.5, 14.6, 45.3),  # plant under the lamp
            rect(24, 20, 30.6, 38.8),     # terrarium table
            rect(33.6, 17, 66, 35.8),     # research desk
            rect(47.4, 27, 53, 39.3),     # desk chair
            rect(35, 44.5, 65.4, 62.3),   # starter table
            rect(7.7, 50.5, 13.7, 65.3),  # plants along the west wall
            rect(7.7, 65.5, 13.7, 79.5),
            rect(74.8, 17, 81.4, 35.8),   # plant barrel
            rect(81, 12, 89.9, 39.8),     # terrarium shelf
            rect(86.4, 56, 93.8, 74.3),   # potted plant
        ] + south_wall(posts=[(17.3, 78, 20.5, 92), (80.2, 78, 83.7, 92)],
                       plants=[(32.2, 77.5, 39.6, 92), (60.8, 77.5, 68.8, 92)],
                       door_posts=[(39.2, 74.5, 43.6, 92), (56.3, 74.5, 61.2, 92)])),
    'home': bedroom,
}


def encode(grid):
    return [''.join('1' if v else '0' for v in row) for row in grid]


def preview(scene, grid, solids, out_path):
    """Scene art with blocked cells tinted red, solids outlined and foreground cut-outs in cyan."""
    im = Image.open(os.path.join(ROOT, scene['image'])).convert('RGBA')
    if scene.get('imageSize') == '200% 200%':
        w, h = im.size
        px = 0 if scene['imagePosition'].startswith('0%') else 1
        py = 0 if scene['imagePosition'].endswith(' 0%') else 1
        im = im.crop((px * w // 2, py * h // 2, (px + 1) * w // 2, (py + 1) * h // 2))
    im = im.resize((1600, 900))
    ov = Image.new('RGBA', im.size)
    g = ImageDraw.Draw(ov)
    for j in range(GH):
        for i in range(GW):
            if not grid[j, i]:
                g.rectangle([i * 10, j * 10, i * 10 + 9, j * 10 + 9], fill=(150, 0, 40, 90))
    for poly in solids:
        g.polygon([(x * 16, y * 9) for x, y in poly], outline=(255, 60, 60, 255))
    for fg in scene.get('foreground', []):
        g.polygon([(x * 16, y * 9) for x, y in fg['shape']], outline=(0, 255, 255, 255))
    for v in range(0, 101, 5):
        g.text((v * 16 + 2, 2), str(v), fill=(255, 255, 0, 255))
        g.text((2, v * 9 + 2), str(v), fill=(255, 255, 0, 255))
    for p in scene.get('portals', []):
        g.rectangle([p['x'] * 16 - 7, p['y'] * 9 - 7, p['x'] * 16 + 7, p['y'] * 9 + 7], outline=(255, 0, 255, 255), width=3)
    for name, (x, y) in scene.get('spawns', {}).items():
        g.ellipse([x * 16 - 6, y * 9 - 6, x * 16 + 6, y * 9 + 6], outline=(255, 255, 255, 255), width=3)
    Image.alpha_composite(im, ov).convert('RGB').save(out_path)


def reachable_only(grid, scene):
    """Keep only ground connected to a spawn point, so no one is ever placed on an island."""
    keep = np.zeros_like(grid)
    stack = []
    for x, y in scene.get('spawns', {}).values():
        i, j = min(GW - 1, int(x / 100 * GW)), min(GH - 1, int(y / 100 * GH))
        if not grid[j, i]:
            open_cells = np.argwhere(grid)
            if not len(open_cells): continue
            j, i = open_cells[np.argmin((open_cells[:, 0] - j) ** 2 * 3 + (open_cells[:, 1] - i) ** 2)]
        stack.append((j, i))
    while stack:
        j, i = stack.pop()
        if keep[j, i] or not grid[j, i]: continue
        keep[j, i] = True
        stack += [(n, m) for n, m in ((j + 1, i), (j - 1, i), (j, i + 1), (j, i - 1)) if 0 <= n < GH and 0 <= m < GW]
    return keep


def main():
    out_dir = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None
    script = "global.window=global;require('./js/data/human-world.js');console.log(JSON.stringify(HUMAN_WORLD_SCENES))"
    scenes = json.loads(subprocess.check_output(['node', '-e', script], cwd=ROOT))
    built = {}
    for sid, build in SCENES.items():
        grid, solids = build()
        built[sid] = (reachable_only(grid, scenes[sid]), solids)
    for sid, scene in scenes.items():
        if sid in built: continue
        grid, solids = authored_scene(scene)
        built[sid] = (reachable_only(grid, scene), solids)
    lines = ['/* Generated by tools/build-human-nav.py. Do not edit by hand.',
             '   160 x 90 walk grids, one string per row; "1" means feet may stand there. */',
             'window.HUMAN_WORLD_NAV = {']
    for sid, (grid, _) in built.items():
        lines.append(f'  {sid}: [')
        lines += [f"    '{row}'," for row in encode(grid)]
        lines.append('  ],')
    lines.append('};')
    with open(os.path.join(ROOT, 'js', 'data', 'human-world-nav.js'), 'w', newline='\n') as f:
        f.write('\n'.join(lines) + '\n')
    if out_dir:
        for sid, (grid, solids) in built.items():
            preview(scenes[sid], grid, solids, os.path.join(out_dir, f'nav-{sid}.png'))
    print('Wrote js/data/human-world-nav.js: ' + ', '.join(f'{k} {int(v[0].sum())} cells' for k, v in built.items()))


if __name__ == '__main__':
    main()
