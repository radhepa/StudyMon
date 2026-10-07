"""Normalize the five generated front concepts into StudyMon-ready previews."""

from collections import Counter, deque
from pathlib import Path

from PIL import Image


HERE = Path(__file__).resolve().parent

CREATURES = (
    {"name": "fernip", "source": HERE / "fernip-source.png", "box": (44, 48)},
    {"name": "brackenwing", "source": HERE / "brackenwing-source.png", "box": (86, 82)},
    {"name": "cairnkid", "source": HERE / "cairnkid-source.png", "box": (46, 46)},
    {"name": "cragibex", "source": HERE / "cragibex-source.png", "box": (80, 84)},
    {"name": "tumblerook", "source": HERE / "tumblerook-source.png", "box": (70, 68)},
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


def quantized_rgba(rgb, mask, colors):
    opaque = [pixel for pixel, alpha in zip(rgb.getdata(), mask.getdata()) if alpha]
    fill = Counter(opaque).most_common(1)[0][0]
    quantize_base = Image.new("RGB", rgb.size, fill)
    quantize_base.paste(rgb, mask=mask)
    palette = quantize_base.quantize(
        colors=colors,
        method=Image.Quantize.MEDIANCUT,
        dither=Image.Dither.NONE,
    )
    out = palette.convert("RGBA")
    out.putalpha(mask.point(lambda value: 255 if value else 0))
    return out


def fit(source, box, colors, canvas_size, bottom=None):
    rgb, mask = extracted(source)
    scale = min(box[0] / rgb.width, box[1] / rgb.height)
    size = (max(1, round(rgb.width * scale)), max(1, round(rgb.height * scale)))
    rgb = rgb.resize(size, Image.Resampling.NEAREST)
    mask = largest_component(
        mask.resize(size, Image.Resampling.NEAREST).point(
            lambda value: 255 if value >= 128 else 0
        )
    )
    sprite = quantized_rgba(rgb, mask, colors=colors)
    canvas = Image.new("RGBA", canvas_size)
    left = (canvas_size[0] - sprite.width) // 2
    top = (canvas_size[1] - sprite.height) // 2 if bottom is None else bottom - sprite.height
    canvas.alpha_composite(sprite, (left, top))
    return canvas


def battle_sprite(source, box):
    return fit(source, box, colors=15, canvas_size=(96, 96), bottom=92)


def artwork(source):
    return fit(source, (430, 430), colors=32, canvas_size=(475, 475))


def preview(paths, destination):
    scale = 6
    images = [
        Image.open(path).convert("RGBA").resize((96 * scale, 96 * scale), Image.Resampling.NEAREST)
        for path in paths
    ]
    sheet = Image.new("RGBA", (96 * scale * len(images), 96 * scale))
    for index, image in enumerate(images):
        sheet.alpha_composite(image, (96 * scale * index, 0))
    sheet.save(destination)


def main():
    front_paths = []
    for item in CREATURES:
        front_path = HERE / f"{item['name']}-front-96.png"
        art_path = HERE / f"{item['name']}-art-475.png"
        battle_sprite(item["source"], item["box"]).save(front_path)
        artwork(item["source"]).save(art_path)
        front_paths.append(front_path)
        print(f"wrote {front_path.name} and {art_path.name}")
    preview(front_paths, HERE / "five-front-preview-6x.png")


if __name__ == "__main__":
    main()
