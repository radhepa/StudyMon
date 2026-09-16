"""Strict crop, scale, and vertical-animation audit for Bootstrap Town v4."""

from pathlib import Path

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
SPRITES = ROOT / "assets" / "humans" / "overworld"
FRAME_SIZE = (140, 120)
BASELINE = 115
SOURCE_CELL_SIZE = (400, 420)
HEIGHTS = {"ren": 78, "opal": 80, "player": 90, "rowan": 90, "bell": 96,
           "wren": 100, "ada": 100, "kern": 100, "tam": 100, "gus": 102}


def visible_bbox(image: Image.Image):
    return image.convert("RGBA").getchannel("A").getbbox()


for name, height in HEIGHTS.items():
    source = Image.open(SPRITES / f"{name}-walk-sheet-v4.png").convert("RGBA")
    assert source.size == (1200, 1680), f"{name}: unsafe source-sheet size {source.size}"
    for row in range(4):
        for column in range(3):
            cell = source.crop((column * 400, row * 420, (column + 1) * 400, (row + 1) * 420))
            bbox = visible_bbox(cell)
            assert bbox, f"{name}: empty source cell {row},{column}"
            margins = (bbox[0], bbox[1], 400 - bbox[2], 420 - bbox[3])
            assert min(margins) >= 48, f"{name}: source cell {row},{column} crop margin {margins}"

    for direction in ("down", "up", "left", "right"):
        frames = [Image.open(SPRITES / f"{name}-{direction}-{index}-v4.png").convert("RGBA") for index in range(3)]
        for index, frame in enumerate(frames):
            assert frame.size == FRAME_SIZE, f"{name} {direction} {index}: frame is {frame.size}"
            bbox = visible_bbox(frame)
            assert bbox, f"{name} {direction} {index}: empty frame"
            margins = (bbox[0], bbox[1], FRAME_SIZE[0] - bbox[2], FRAME_SIZE[1] - bbox[3])
            assert min(margins) >= 5, f"{name} {direction} {index}: runtime crop margin {margins}"
            assert bbox[3] == BASELINE, f"{name} {direction} {index}: baseline {bbox[3]}"
            assert bbox[3] - bbox[1] == height, f"{name} {direction} {index}: height {bbox[3] - bbox[1]}"

        if direction in ("down", "up"):
            cut_y = BASELINE - height + round(height * 0.70)
            neutral_upper = frames[1].crop((0, 0, FRAME_SIZE[0], cut_y))
            for index in (0, 2):
                step_upper = frames[index].crop((0, 0, FRAME_SIZE[0], cut_y))
                assert ImageChops.difference(neutral_upper, step_upper).getbbox() is None, (
                    f"{name} {direction} {index}: upper body is not pixel-locked"
                )
                neutral_lower = frames[1].crop((0, cut_y, FRAME_SIZE[0], FRAME_SIZE[1]))
                step_lower = frames[index].crop((0, cut_y, FRAME_SIZE[0], FRAME_SIZE[1]))
                assert ImageChops.difference(neutral_lower, step_lower).getbbox() is not None, (
                    f"{name} {direction} {index}: legs do not animate"
                )

print("PASS: 10 safely padded sheets, 120 uncropped frames, proportional baselines, and pixel-locked vertical upper bodies")
