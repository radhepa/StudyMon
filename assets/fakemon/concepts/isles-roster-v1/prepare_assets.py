"""Cut the fifteen Converging Isles originals into StudyMon battle assets.

The concept fronts in five-new-lines-v1 and ten-new-roster-v1 were fitted to
boxes 20-40% larger than the official sprites they stand beside, so in battle
and in the Kingdom they read as oversized. Each species here is re-cut from
its full-resolution source to the occupied footprint of a stage-matched
official sprite (listed per species), so it sits at the same scale as the
rest of the roster.

Downsampling takes the dominant palette colour of each source block rather
than a single nearest sample, which keeps large clean clusters; eye and
accent colours are weighted up so faces survive the reduction.

Rear sprites are mirrored fronts until drawn rears exist. Save a generated
rear as <name>-back-source.png beside this script (prompts in PROMPTS.md)
and re-run; it is cut to the same footprint as the front.
"""

from collections import Counter, deque
import importlib.util
from pathlib import Path

from PIL import Image


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
CONCEPTS = HERE.parent
TEN = CONCEPTS / "ten-new-roster-v1"
FIVE = CONCEPTS / "five-new-lines-v1"
SPRITES = ROOT / "assets" / "sprites"

# id, game name, source concept name, folder, stage, (max w, max h), official size reference
CREATURES = (
    (1032, "budloth", "budloth", TEN, 1, (40, 40), "Turtwig 31x42 / Chimchar"),
    (1033, "bromelaze", "bromelaze", TEN, 2, (54, 60), "Grotle 56x58 / Monferno 60x52"),
    (1034, "canopodon", "canopodon", TEN, 3, (74, 72), "Torterra 72x77"),
    (1035, "cryoad", "cryoad", TEN, 1, (40, 36), "Croagunk 38x42"),
    (1036, "rimecroak", "rimecroak", TEN, 3, (66, 58), "Toxicroak 56x58"),
    (1037, "tallybara", "tallybara", TEN, 1, (52, 38), "Bidoof 42x39 / Shinx 47x36"),
    (1038, "kilnscarab", "kilnscarab", TEN, 2, (58, 44), "Heracross 58x63"),
    (1039, "drenchic", "c-region-torchic", TEN, 1, (27, 48), "Torchic 25x43"),
    (1040, "condusken", "c-region-combusken", TEN, 2, (48, 64), "Combusken 50x63"),
    (1041, "blitziken", "c-region-blaziken", TEN, 3, (64, 76), "Blaziken 59x75"),
    (1042, "fernip", "fernip", FIVE, 1, (38, 35), "Sewaddle 30x35"),
    (1043, "brackenwing", "brackenwing", FIVE, 3, (74, 56), "Volcarona 76x66"),
    (1044, "cairnkid", "cairnkid", FIVE, 1, (36, 44), "Skiddo 42x50"),
    (1045, "cragibex", "cragibex", FIVE, 3, (60, 70), "Gogoat 53x64"),
    (1046, "tumblerook", "tumblerook", FIVE, 2, (60, 64), "Skarmory 66x68"),
)


# The accent predicates written for the concept pass (flower centres, eyes,
# bolts, abacus beads) are reused so both cuts agree on what an accent is.
_spec = importlib.util.spec_from_file_location("ten_fronts", TEN / "prepare_fronts.py")
_ten = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ten)
ACCENT_RULES = _ten.ACCENT_RULES


def neighbors(x, y, width, height):
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if dx or dy:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    yield nx, ny


def largest_component(mask):
    width, height = mask.size
    pixels = mask.load()
    unseen = {(x, y) for y in range(height) for x in range(width) if pixels[x, y]}
    largest = set()
    while unseen:
        start = unseen.pop()
        component = {start}
        queue = deque([start])
        while queue:
            x, y = queue.popleft()
            for point in neighbors(x, y, width, height):
                if point in unseen:
                    unseen.remove(point)
                    component.add(point)
                    queue.append(point)
        if len(component) > len(largest):
            largest = component
    out = Image.new("L", mask.size)
    out_pixels = out.load()
    for x, y in largest:
        out_pixels[x, y] = 255
    return out


def load_source(path):
    image = Image.open(path).convert("RGBA")
    # Work at half resolution: the sources are ~13px per drawn pixel, so this
    # loses nothing and keeps the flood fill quick.
    image = image.resize((image.width // 2, image.height // 2), Image.Resampling.NEAREST)
    mask = image.getchannel("A").point(lambda v: 255 if v >= 96 else 0)
    mask = largest_component(mask)
    bbox = mask.getbbox()
    return image.convert("RGB").crop(bbox), mask.crop(bbox)


def luminance(rgb):
    r, g, b = rgb
    return 0.299 * r + 0.587 * g + 0.114 * b


def saturation(rgb):
    return max(rgb) - min(rgb)


def reduce(rgb, mask, target, accent_rules=(), colors=15):
    """Palette-quantize at source size, then take each block's dominant colour.

    Accent colours (flower centres, eyes, beads, bolts) are too small to win a
    median cut, so each gets a reserved palette slot filled by its predicate."""
    opaque = [p for p, a in zip(rgb.getdata(), mask.getdata()) if a]
    fill = Counter(opaque).most_common(1)[0][0]
    base = Image.new("RGB", rgb.size, fill)
    base.paste(rgb, mask=mask)
    n_base = colors - len(accent_rules)
    quant = base.quantize(colors=n_base, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    palette = quant.getpalette()[: n_base * 3]
    pal = [tuple(palette[i * 3:i * 3 + 3]) for i in range(n_base)]
    if accent_rules:
        src = rgb.load()
        m = mask.load()
        qp = quant.load()
        for k, (target_rgb, predicate) in enumerate(accent_rules):
            pal.append(target_rgb)
            index = n_base + k
            for y in range(rgb.height):
                for x in range(rgb.width):
                    if m[x, y] and predicate(src[x, y], x, y, rgb.width, rgb.height):
                        qp[x, y] = index

    # Small, vivid or very dark colours (eyes, accents, outline) lose every
    # block vote to the body colour unless they are weighted up.
    counts = Counter(i for i, a in zip(quant.getdata(), mask.getdata()) if a)
    total = sum(counts.values())
    darkest = min(counts, key=lambda i: luminance(pal[i]))
    weight = {}
    for i in counts:
        share = counts[i] / total
        w = 1.0
        if share < 0.04 and saturation(pal[i]) > 90:
            w = 2.6          # eye / accent
        elif share < 0.04:
            w = 1.6
        if i >= n_base:
            w = 2.6          # reserved accent
        if i == darkest:
            w = max(w, 1.5)  # the outline
        weight[i] = w

    tw, th = target
    sw, sh = rgb.size
    q = quant.load()
    m = mask.load()
    out = Image.new("RGBA", (tw, th))
    o = out.load()
    for ty in range(th):
        y0, y1 = ty * sh // th, max(ty * sh // th + 1, (ty + 1) * sh // th)
        for tx in range(tw):
            x0, x1 = tx * sw // tw, max(tx * sw // tw + 1, (tx + 1) * sw // tw)
            votes = Counter()
            filled = 0
            area = 0
            for y in range(y0, y1):
                for x in range(x0, x1):
                    area += 1
                    if m[x, y]:
                        filled += 1
                        votes[q[x, y]] += 1
            if filled * 2 < area:
                continue
            best = max(votes, key=lambda i: votes[i] * weight.get(i, 1.0))
            o[tx, ty] = (*pal[best], 255)
    return out


def tidy(sprite, keep=()):
    """Keep one connected body and drop lone pixels that read as noise.
    Colours in `keep` (the accents) are never smoothed away."""
    keep = {tuple(c) for c in keep}
    alpha = largest_component(sprite.getchannel("A").point(lambda v: 255 if v else 0))
    px = sprite.load()
    a = alpha.load()
    w, h = sprite.size
    for y in range(h):
        for x in range(w):
            if not a[x, y]:
                px[x, y] = (0, 0, 0, 0)
    # A pixel whose colour matches none of its 4-neighbours becomes the
    # colour most of its neighbours share (eyes are 2px+ so they survive).
    src = sprite.copy()
    s = src.load()
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            c = s[x, y]
            if not c[3]:
                continue
            ring = [s[x + dx, y + dy] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))]
            if c[:3] in keep or any(r[3] == 0 for r in ring) or c in ring:
                continue
            common, n = Counter(ring).most_common(1)[0]
            if n >= 3:
                px[x, y] = common
    return sprite


def fit_box(size, box):
    scale = min(box[0] / size[0], box[1] / size[1])
    return max(1, round(size[0] * scale)), max(1, round(size[1] * scale))


def battle_sprite(rgb, mask, box, accent_rules=()):
    sprite = reduce(rgb, mask, fit_box(rgb.size, box), accent_rules)
    sprite = tidy(sprite, keep=[target for target, _ in accent_rules])
    canvas = Image.new("RGBA", (96, 96))
    canvas.alpha_composite(sprite, ((96 - sprite.width) // 2, 92 - sprite.height))
    return canvas


def preview(images, destination, columns):
    scale = 6
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new("RGBA", (96 * scale * columns, 96 * scale * rows), (255, 255, 255, 255))
    for index, image in enumerate(images):
        big = image.resize((96 * scale, 96 * scale), Image.Resampling.NEAREST)
        sheet.alpha_composite(big, ((index % columns) * 96 * scale, (index // columns) * 96 * scale))
    sheet.save(destination)


def main():
    fronts, backs = [], []
    for sid, name, concept, folder, stage, box, ref in CREATURES:
        rgb, mask = load_source(folder / f"{concept}-source.png")
        front = battle_sprite(rgb, mask, box, ACCENT_RULES.get(concept, ()))
        back_source = HERE / f"{name}-back-source.png"
        if back_source.exists():
            back_rgb, back_mask = load_source(back_source)
            back = battle_sprite(back_rgb, back_mask, box, ACCENT_RULES.get(concept, ()))
        else:
            back = front.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        front.save(SPRITES / "front" / f"{sid}.png")
        front.save(SPRITES / "shiny" / f"{sid}.png")
        back.save(SPRITES / "back" / f"{sid}.png")
        art = Image.open(folder / f"{concept}-art-475.png").convert("RGBA")
        art.save(SPRITES / "art" / f"{sid}.png")
        front.save(HERE / f"{name}-front-96.png")
        fronts.append(front)
        backs.append(back)
        bbox = front.getchannel("A").getbbox()
        print(f"{sid} {name:12s} {bbox[2] - bbox[0]}x{bbox[3] - bbox[1]}  (ref {ref})")
    preview(fronts, HERE / "isles-fronts-preview-6x.png", columns=5)


if __name__ == "__main__":
    main()
