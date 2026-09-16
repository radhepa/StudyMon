"""Build safely padded Bootstrap Town walk cycles with locked vertical poses.

Image generation supplies the twelve illustrated poses. This production pass
then does two deterministic jobs that image models are bad at guaranteeing:

1. It finds the actual three columns/four rows and repacks them with a true
   twelve-percent transparent gutter, so no hat, hair, hand, or shoe is cut.
2. For down/up walking, it copies the neutral frame's upper body byte-for-byte
   into both step frames. Only the lower body can move, so vertical walking can
   never produce whole-character sway or bobbing.

Run: python tools/build-overworld-sprites-v4.py
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "humans" / "overworld"
FRAME_SIZE = (140, 120)
BASELINE = 115
SOURCE_CELL_SIZE = (400, 420)
SAFE_CONTENT_FRACTION = 0.76
ALPHA_THRESHOLD = 48
DIRECTIONS = ("down", "up", "left", "right")
VERTICAL_DIRECTIONS = {"down", "up"}

# Pixel heights inside the shared frame. Adult = 100 is the reference unit.
FIGURE_HEIGHTS = {
    "ren": 78,
    "opal": 80,
    "player": 90,
    "rowan": 90,
    "bell": 96,
    "wren": 100,
    "ada": 100,
    "kern": 100,
    "tam": 100,
    "gus": 102,
}


def hard_alpha(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    rgba.putalpha(rgba.getchannel("A").point(lambda value: 255 if value >= ALPHA_THRESHOLD else 0))
    return rgba


def trim(image: Image.Image) -> Image.Image:
    rgba = hard_alpha(image)
    bbox = rgba.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("Sprite region has no visible pixels")
    return rgba.crop(bbox)


def occupied_bands(alpha: Image.Image, axis: str) -> list[tuple[int, int]]:
    length = alpha.width if axis == "x" else alpha.height
    occupied = []
    for index in range(length):
        strip = alpha.crop((index, 0, index + 1, alpha.height)) if axis == "x" else alpha.crop((0, index, alpha.width, index + 1))
        occupied.append(strip.getbbox() is not None)

    bands = []
    start = None
    for index, value in enumerate(occupied + [False]):
        if value and start is None:
            start = index
        elif not value and start is not None:
            if index - start >= 16:  # ignore isolated generation specks
                bands.append((start, index))
            start = None
    return bands


def extract_generated_cells(name: str) -> list[list[Image.Image]]:
    path = SOURCE_DIR / f"{name}-walk-sheet-v4-generated.png"
    generated = hard_alpha(Image.open(path))
    alpha = generated.getchannel("A")
    x_bands = occupied_bands(alpha, "x")
    y_bands = occupied_bands(alpha, "y")
    if len(x_bands) != 3 or len(y_bands) != 4:
        raise ValueError(f"{path.name}: expected 3 figure columns and 4 rows, got {x_bands=} {y_bands=}")

    cells = []
    for top, bottom in y_bands:
        row = []
        for left, right in x_bands:
            row.append(trim(generated.crop((left, top, right, bottom))))
        cells.append(row)
    return cells


def fit_inside(image: Image.Image, maximum: tuple[int, int]) -> Image.Image:
    scale = min(maximum[0] / image.width, maximum[1] / image.height, 1)
    size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
    return trim(image.resize(size, Image.Resampling.LANCZOS))


def write_safe_source(name: str, cells: list[list[Image.Image]]) -> Path:
    cell_width, cell_height = SOURCE_CELL_SIZE
    maximum = (round(cell_width * SAFE_CONTENT_FRACTION), round(cell_height * SAFE_CONTENT_FRACTION))
    sheet = Image.new("RGBA", (cell_width * 3, cell_height * 4), (0, 0, 0, 0))
    for row in range(4):
        for column in range(3):
            figure = fit_inside(cells[row][column], maximum)
            x = column * cell_width + (cell_width - figure.width) // 2
            y = row * cell_height + (cell_height - figure.height) // 2
            sheet.alpha_composite(figure, (x, y))
    path = SOURCE_DIR / f"{name}-walk-sheet-v4.png"
    sheet.save(path, optimize=True)
    return path


def place_on_frame(figure: Image.Image, target_height: int) -> Image.Image:
    scale = target_height / figure.height
    target_width = max(1, round(figure.width * scale))
    if target_width > FRAME_SIZE[0] - 12:
        raise ValueError(f"Sprite would be {target_width}px wide; safe frame allows {FRAME_SIZE[0] - 12}px")
    resized = trim(figure.resize((target_width, target_height), Image.Resampling.LANCZOS))
    if resized.height != target_height:
        corrected_width = max(1, round(resized.width * target_height / resized.height))
        resized = trim(resized.resize((corrected_width, target_height), Image.Resampling.NEAREST))

    frame = Image.new("RGBA", FRAME_SIZE, (0, 0, 0, 0))
    x = (FRAME_SIZE[0] - resized.width) // 2
    y = BASELINE - resized.height
    frame.alpha_composite(resized, (x, y))
    return frame


def lock_vertical_upper_body(frames: list[Image.Image], target_height: int) -> list[Image.Image]:
    neutral = frames[1]
    figure_top = BASELINE - target_height
    # The lower 30% contains the legs and feet. Everything above it is copied
    # exactly from idle, including transparent pixels, preventing any sway.
    cut_y = figure_top + round(target_height * 0.70)
    locked = []
    for index, frame in enumerate(frames):
        if index == 1:
            locked.append(frame)
            continue
        result = frame.copy()
        result.paste(neutral.crop((0, 0, FRAME_SIZE[0], cut_y)), (0, 0))
        locked.append(result)
    return locked


def build_character(name: str, target_height: int) -> list[str]:
    cells = extract_generated_cells(name)
    write_safe_source(name, cells)
    written = []
    for row, direction in enumerate(DIRECTIONS):
        frames = [place_on_frame(cells[row][index], target_height) for index in range(3)]
        if direction in VERTICAL_DIRECTIONS:
            frames = lock_vertical_upper_body(frames, target_height)
        for frame_index, frame in enumerate(frames):
            output = SOURCE_DIR / f"{name}-{direction}-{frame_index}-v4.png"
            frame.save(output, optimize=True)
            written.append(output.name)
    return written


def main() -> None:
    outputs = []
    for character, height in FIGURE_HEIGHTS.items():
        outputs.extend(build_character(character, height))
        print(f"{character:7s} {height:3d}px figure height -> safe source + 12 frames")
    print(f"Wrote {len(outputs)} frames at {FRAME_SIZE[0]}x{FRAME_SIZE[1]} on baseline {BASELINE}.")


if __name__ == "__main__":
    main()
