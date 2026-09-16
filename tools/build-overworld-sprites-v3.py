"""Build age-proportional, three-frame Bootstrap Town walk cycles.

The generated source sheets are strict 3-column x 4-row atlases:
  columns: left-foot step, idle, right-foot step
  rows:    down, up, left, right

Every exported frame shares a 120x112 canvas and a common foot baseline, but the
figure inside it keeps an intentional age/role height. This prevents both the
old same-height-for-everyone problem and frame-to-frame animation jitter.

Run: python tools/build-overworld-sprites-v3.py
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "humans" / "overworld"
FRAME_SIZE = (120, 112)
BASELINE = 108
DIRECTIONS = ("down", "up", "left", "right")

# Pixel heights inside the shared frame. Adult = 100 is the reference unit.
# These are intentionally visible differences, not CSS guesses.
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


def trim_cell(cell: Image.Image) -> Image.Image:
    rgba = cell.convert("RGBA")
    alpha = rgba.getchannel("A")
    bbox = alpha.point(lambda value: 255 if value >= 48 else 0).getbbox()
    if not bbox:
        raise ValueError("Sprite-sheet cell has no visible pixels")
    return rgba.crop(bbox)


def place_on_frame(figure: Image.Image, target_height: int) -> Image.Image:
    intended_height = target_height
    width, height = figure.size
    scale = target_height / height
    target_width = max(1, round(width * scale))
    if target_width > FRAME_SIZE[0] - 4:
        scale = (FRAME_SIZE[0] - 4) / width
        target_width = FRAME_SIZE[0] - 4
        target_height = max(1, round(height * scale))

    resized = figure.resize((target_width, target_height), Image.Resampling.LANCZOS)
    # Keep the silhouettes crisp after downsampling without throwing away
    # semitransparent edge colour used by the generated pixel art.
    alpha = resized.getchannel("A").point(lambda value: 0 if value < 48 else 255)
    resized.putalpha(alpha)
    visible = resized.getchannel("A").getbbox()
    if not visible:
        raise ValueError("Resized sprite has no visible pixels")
    resized = resized.crop(visible)

    # Generated cells occasionally include several rows of very faint alpha.
    # Re-trim after the high-quality downsample, then lock the silhouette to the
    # exact intended height with nearest-neighbour pixels so no pose can pulse.
    if resized.height != intended_height:
        corrected_width = max(1, round(resized.width * intended_height / resized.height))
        resized = resized.resize((corrected_width, intended_height), Image.Resampling.NEAREST)
    target_width, target_height = resized.size
    if target_width > FRAME_SIZE[0] - 4:
        raise ValueError(f"Corrected sprite is {target_width}px wide; frame allows {FRAME_SIZE[0] - 4}px")

    frame = Image.new("RGBA", FRAME_SIZE, (0, 0, 0, 0))
    x = (FRAME_SIZE[0] - target_width) // 2
    y = BASELINE - target_height
    frame.alpha_composite(resized, (x, y))
    return frame


def build_character(name: str, target_height: int) -> list[str]:
    source_path = SOURCE_DIR / f"{name}-walk-sheet-v3.png"
    sheet = Image.open(source_path).convert("RGBA")
    cell_width = sheet.width // 3
    cell_height = sheet.height // 4
    if sheet.width % 3 or sheet.height % 4:
        raise ValueError(f"{source_path.name} is not an exact 3x4 grid: {sheet.size}")

    written = []
    for row, direction in enumerate(DIRECTIONS):
        for frame_index in range(3):
            bounds = (
                frame_index * cell_width,
                row * cell_height,
                (frame_index + 1) * cell_width,
                (row + 1) * cell_height,
            )
            figure = trim_cell(sheet.crop(bounds))
            frame = place_on_frame(figure, target_height)
            visible = frame.getchannel("A").getbbox()
            if not visible or visible[3] != BASELINE or visible[3] - visible[1] != target_height:
                raise ValueError(
                    f"{name} {direction} frame {frame_index} broke the "
                    f"{target_height}px height / {BASELINE}px baseline contract: {visible}"
                )
            output = SOURCE_DIR / f"{name}-{direction}-{frame_index}-v3.png"
            frame.save(output, optimize=True)
            written.append(output.name)
    return written


def main() -> None:
    outputs = []
    for character, height in FIGURE_HEIGHTS.items():
        outputs.extend(build_character(character, height))
        print(f"{character:7s} {height:3d}px figure height -> 12 frames")
    print(f"Wrote {len(outputs)} frames at {FRAME_SIZE[0]}x{FRAME_SIZE[1]} on baseline {BASELINE}.")


if __name__ == "__main__":
    main()
