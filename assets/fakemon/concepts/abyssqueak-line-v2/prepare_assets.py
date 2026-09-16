"""Normalize the approved Abyssqueak line art into StudyMon assets."""

from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
FRONT_DIR = ROOT / "assets" / "sprites" / "front"
BACK_DIR = ROOT / "assets" / "sprites" / "back"
SHINY_DIR = ROOT / "assets" / "sprites" / "shiny"
ART_DIR = ROOT / "assets" / "sprites" / "art"

LINE = (
    {
        "id": 1029,
        "name": "abyssqueak",
        "stage": 1,
        "front": HERE / "abyssqueak-source.jfif",
        "back": HERE / "abyssqueak-back-concept.png",
        "box": (48, 46),
    },
    {
        "id": 1030,
        "name": "trenchmaw",
        "stage": 2,
        "front": HERE / "trenchmaw-source.jfif",
        "back": HERE / "trenchmaw-back-concept.png",
        "box": (68, 66),
    },
    {
        "id": 1031,
        "name": "leviathorn",
        "stage": 3,
        "front": HERE / "leviathorn-source.jfif",
        "back": HERE / "leviathorn-back-concept.png",
        "box": (90, 82),
    },
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
    """Keep the principal connected silhouette and reject detached glow noise."""
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


def fill_enclosed_holes(mask):
    """Restore dark eyes/markings while keeping open silhouette gaps clear."""
    width, height = mask.size
    pixels = mask.load()
    outside = set()
    queue = deque()
    for x in range(width):
        for y in (0, height - 1):
            if not pixels[x, y] and (x, y) not in outside:
                outside.add((x, y))
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if not pixels[x, y] and (x, y) not in outside:
                outside.add((x, y))
                queue.append((x, y))
    while queue:
        x, y = queue.popleft()
        for point in neighbors(x, y, width, height):
            px, py = point
            if not pixels[px, py] and point not in outside:
                outside.add(point)
                queue.append(point)
    out = mask.copy()
    out_pixels = out.load()
    for y in range(height):
        for x in range(width):
            if not pixels[x, y] and (x, y) not in outside:
                out_pixels[x, y] = 255
    return out


def source_mask(image):
    """Extract either black-backed supplied art or generated checker-backed art."""
    rgb = image.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()
    mask = Image.new("L", rgb.size)
    out = mask.load()
    corner_values = [pixels[0, 0], pixels[width - 1, 0], pixels[0, height - 1], pixels[width - 1, height - 1]]
    black_backed = max(max(pixel) for pixel in corner_values) < 80
    for y in range(height):
        for x in range(width):
            red, green, blue = pixels[x, y]
            bright = max(red, green, blue)
            dark = min(red, green, blue)
            saturation = bright - dark
            if black_backed:
                foreground = bright >= 22
            else:
                # Generated rear concepts use neutral gray/white checker squares.
                foreground = saturation >= 16 or bright < 165
            out[x, y] = 255 if foreground else 0
    return fill_enclosed_holes(largest_component(mask))


def extracted(path):
    image = Image.open(path).convert("RGB")
    mask = source_mask(image)
    bbox = mask.getbbox()
    if not bbox:
        raise RuntimeError(f"No subject found in {path}")
    return image.crop(bbox), mask.crop(bbox)


def quantized_rgba(rgb, mask, colors=15):
    palette = rgb.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    out = palette.convert("RGBA")
    out.putalpha(mask.point(lambda value: 255 if value >= 128 else 0))
    return out


def battle_sprite(source, box):
    rgb, mask = extracted(source)
    scale = min(box[0] / rgb.width, box[1] / rgb.height)
    size = (max(1, round(rgb.width * scale)), max(1, round(rgb.height * scale)))
    rgb = rgb.resize(size, Image.Resampling.NEAREST)
    mask = mask.resize(size, Image.Resampling.NEAREST)
    mask = largest_component(mask.point(lambda value: 255 if value >= 128 else 0))
    sprite = quantized_rgba(rgb, mask, colors=15)
    canvas = Image.new("RGBA", (96, 96))
    left = (96 - sprite.width) // 2
    top = 92 - sprite.height
    canvas.alpha_composite(sprite, (left, top))
    return canvas


def artwork(source):
    rgb, mask = extracted(source)
    scale = min(430 / rgb.width, 430 / rgb.height)
    size = (max(1, round(rgb.width * scale)), max(1, round(rgb.height * scale)))
    rgb = rgb.resize(size, Image.Resampling.NEAREST)
    mask = mask.resize(size, Image.Resampling.NEAREST)
    art = quantized_rgba(rgb, mask, colors=32)
    canvas = Image.new("RGBA", (475, 475))
    canvas.alpha_composite(art, ((475 - art.width) // 2, (475 - art.height) // 2))
    return canvas


def preview(paths, destination):
    images = [Image.open(path).convert("RGBA").resize((576, 576), Image.Resampling.NEAREST) for path in paths]
    sheet = Image.new("RGBA", (576 * len(images), 576))
    for index, image in enumerate(images):
        sheet.alpha_composite(image, (576 * index, 0))
    sheet.save(destination)


def main():
    for directory in (FRONT_DIR, BACK_DIR, SHINY_DIR, ART_DIR):
        directory.mkdir(parents=True, exist_ok=True)
    front_paths = []
    back_paths = []
    for item in LINE:
        front_path = FRONT_DIR / f"{item['id']}.png"
        back_path = BACK_DIR / f"{item['id']}.png"
        shiny_path = SHINY_DIR / f"{item['id']}.png"
        art_path = ART_DIR / f"{item['id']}.png"
        front = battle_sprite(item["front"], item["box"])
        back = battle_sprite(item["back"], item["box"])
        front.save(front_path)
        back.save(back_path)
        front.save(shiny_path)
        artwork(item["front"]).save(art_path)
        (HERE / f"{item['name']}-front-96.png").write_bytes(front_path.read_bytes())
        (HERE / f"{item['name']}-back-96.png").write_bytes(back_path.read_bytes())
        front_paths.append(front_path)
        back_paths.append(back_path)
        print(f"wrote {item['name']} assets as {item['id']}")
    preview(front_paths, HERE / "abyssqueak-line-front-preview-6x.png")
    preview(back_paths, HERE / "abyssqueak-line-back-preview-6x.png")


if __name__ == "__main__":
    main()
