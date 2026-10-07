"""Normalize the ten generated front concepts into StudyMon-ready previews."""

from collections import Counter, deque
from pathlib import Path

from PIL import Image


HERE = Path(__file__).resolve().parent

CREATURES = (
    {"name": "budloth", "source": HERE / "budloth-source.png", "box": (46, 46)},
    {"name": "bromelaze", "source": HERE / "bromelaze-source.png", "box": (60, 68)},
    {"name": "canopodon", "source": HERE / "canopodon-source.png", "box": (88, 84)},
    {"name": "cryoad", "source": HERE / "cryoad-source.png", "box": (46, 42)},
    {"name": "rimecroak", "source": HERE / "rimecroak-source.png", "box": (84, 72)},
    {"name": "tallybara", "source": HERE / "tallybara-source.png", "box": (68, 50)},
    {"name": "kilnscarab", "source": HERE / "kilnscarab-source.png", "box": (68, 52)},
    {"name": "c-region-torchic", "source": HERE / "c-region-torchic-source.png", "box": (34, 50)},
    {"name": "c-region-combusken", "source": HERE / "c-region-combusken-source.png", "box": (48, 70)},
    {"name": "c-region-blaziken", "source": HERE / "c-region-blaziken-source.png", "box": (74, 88)},
)


def neighbors(x, y, width, height):
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if not dx and not dy:
                continue
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                yield nx, ny


def largest_component(mask):
    """Keep the principal connected silhouette and discard detached edge noise."""
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


def extracted(path):
    image = Image.open(path).convert("RGBA")
    mask = image.getchannel("A").point(lambda value: 255 if value >= 96 else 0)
    mask = largest_component(mask)
    bbox = mask.getbbox()
    if not bbox:
        raise RuntimeError(f"No subject found in {path}")
    return image.convert("RGB").crop(bbox), mask.crop(bbox)


def is_coral(pixel, *_):
    red, green, blue = pixel
    return red >= 170 and red >= green + 45 and green >= 45 and green <= 150 and blue <= 120


def is_teal(pixel, *_):
    red, green, blue = pixel
    return green >= 120 and blue >= 100 and green >= red + 30 and blue >= red + 15


def is_gold(pixel, *_):
    red, green, blue = pixel
    return red >= 180 and green >= 125 and blue <= 110 and red >= green


def is_yellow(pixel, *_):
    red, green, blue = pixel
    return red >= 180 and green >= 170 and blue <= 120


def is_cobalt(pixel, *_):
    red, green, blue = pixel
    return blue >= 145 and blue >= green + 25 and blue >= red + 55


def is_violet(pixel, *_):
    red, green, blue = pixel
    return blue >= 135 and red >= 75 and blue >= green + 35 and red >= green + 15


def is_tally_teal(pixel, x, y, width, height):
    return x >= width * 0.7 and y <= height * 0.44 and is_teal(pixel)


def is_tally_gold(pixel, x, y, width, height):
    return x >= width * 0.7 and y <= height * 0.44 and is_gold(pixel)


def is_tally_coral(pixel, x, y, width, height):
    return x >= width * 0.7 and y <= height * 0.44 and is_coral(pixel)


ACCENT_RULES = {
    "budloth": (((244, 103, 58), is_coral),),
    "bromelaze": (((244, 103, 58), is_coral),),
    "canopodon": (((244, 103, 58), is_coral),),
    "cryoad": (((232, 239, 49), is_yellow), ((139, 52, 218), is_violet)),
    "rimecroak": (((232, 239, 49), is_yellow), ((139, 52, 218), is_violet)),
    "tallybara": (
        ((43, 180, 184), is_tally_teal),
        ((246, 190, 47), is_tally_gold),
        ((241, 103, 92), is_tally_coral),
    ),
    "kilnscarab": (((246, 190, 47), is_gold),),
    "c-region-torchic": (((248, 235, 42), is_yellow), ((31, 83, 207), is_cobalt)),
    "c-region-combusken": (((248, 235, 42), is_yellow), ((31, 83, 207), is_cobalt)),
    "c-region-blaziken": (((248, 235, 42), is_yellow), ((31, 83, 207), is_cobalt)),
}


def quantized_rgba(rgb, mask, colors, accent_rules=()):
    opaque = [pixel for pixel, alpha in zip(rgb.getdata(), mask.getdata()) if alpha]
    fill = Counter(opaque).most_common(1)[0][0]
    quantize_base = Image.new("RGB", rgb.size, fill)
    quantize_base.paste(rgb, mask=mask)
    palette = quantize_base.quantize(
        colors=max(1, colors - len(accent_rules)),
        method=Image.Quantize.MEDIANCUT,
        dither=Image.Dither.NONE,
    )
    out = palette.convert("RGBA")
    out.putalpha(mask.point(lambda value: 255 if value else 0))
    source_pixels = rgb.load()
    out_pixels = out.load()
    mask_pixels = mask.load()
    for target, predicate in accent_rules:
        for y in range(rgb.height):
            for x in range(rgb.width):
                if mask_pixels[x, y] and predicate(
                    source_pixels[x, y], x, y, rgb.width, rgb.height
                ):
                    out_pixels[x, y] = (*target, 255)
    return out


def fit(source, box, colors, canvas_size, bottom=None, accent_rules=()):
    rgb, mask = extracted(source)
    scale = min(box[0] / rgb.width, box[1] / rgb.height)
    size = (max(1, round(rgb.width * scale)), max(1, round(rgb.height * scale)))
    rgb = rgb.resize(size, Image.Resampling.NEAREST)
    mask = largest_component(
        mask.resize(size, Image.Resampling.NEAREST).point(
            lambda value: 255 if value >= 128 else 0
        )
    )
    sprite = quantized_rgba(rgb, mask, colors=colors, accent_rules=accent_rules)
    canvas = Image.new("RGBA", canvas_size)
    left = (canvas_size[0] - sprite.width) // 2
    top = (canvas_size[1] - sprite.height) // 2 if bottom is None else bottom - sprite.height
    canvas.alpha_composite(sprite, (left, top))
    return canvas


def battle_sprite(source, box, accent_rules=()):
    return fit(
        source,
        box,
        colors=15,
        canvas_size=(96, 96),
        bottom=92,
        accent_rules=accent_rules,
    )


def artwork(source):
    return fit(source, (430, 430), colors=32, canvas_size=(475, 475))


def preview(paths, destination, columns=None):
    scale = 6
    columns = columns or len(paths)
    rows = (len(paths) + columns - 1) // columns
    images = [
        Image.open(path).convert("RGBA").resize((96 * scale, 96 * scale), Image.Resampling.NEAREST)
        for path in paths
    ]
    sheet = Image.new("RGBA", (96 * scale * columns, 96 * scale * rows))
    for index, image in enumerate(images):
        x = (index % columns) * 96 * scale
        y = (index // columns) * 96 * scale
        sheet.alpha_composite(image, (x, y))
    sheet.save(destination)


def main():
    front_paths = []
    by_name = {}
    for item in CREATURES:
        front_path = HERE / f"{item['name']}-front-96.png"
        art_path = HERE / f"{item['name']}-art-475.png"
        battle_sprite(
            item["source"],
            item["box"],
            accent_rules=ACCENT_RULES.get(item["name"], ()),
        ).save(front_path)
        artwork(item["source"]).save(art_path)
        front_paths.append(front_path)
        by_name[item["name"]] = front_path
        print(f"wrote {front_path.name} and {art_path.name}")

    preview(front_paths, HERE / "ten-front-preview-6x.png", columns=5)
    preview(
        [by_name[name] for name in ("budloth", "bromelaze", "canopodon")],
        HERE / "grass-starter-preview-6x.png",
    )
    preview(
        [by_name[name] for name in ("cryoad", "rimecroak", "tallybara", "kilnscarab")],
        HERE / "original-four-preview-6x.png",
    )
    preview(
        [by_name[name] for name in ("c-region-torchic", "c-region-combusken", "c-region-blaziken")],
        HERE / "c-region-torchic-preview-6x.png",
    )


if __name__ == "__main__":
    main()
