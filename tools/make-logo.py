"""Draws the StudyMon logo in the title-card style (css/parchment.css + polish.css:
gold Arial Black, brown stroke, offset shadow, tight tracking, rust period) and writes
  assets/ui/studymon-logo.png      full "StudyMon." wordmark, transparent
  assets/ui/studymon-icon.png      square app icon ("Study / Mon." on parchment)
  assets/ui/studymon.ico           icon sizes; 16-32px use the "S." monogram
Run: python tools/make-logo.py"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = r"C:\Windows\Fonts\ariblk.ttf"
GOLD, PERIOD = (221, 183, 88), (158, 102, 51)
STROKE, SHADOW = (104, 80, 54), (128, 103, 66)
PARCHMENT, RIM = (248, 237, 206), (167, 128, 81)
# Title card: 122.88px font, -0.09em tracking, 2px stroke, 3px/4px shadow.
TRACK, STROKE_EM, SHADOW_EM = -0.09, 2 / 122.88, (3 / 122.88, 4 / 122.88)


def word_parts(text):
    """Split into (char, colour) pairs; a trailing period takes the rust colour."""
    return [(ch, PERIOD if ch == "." else GOLD) for ch in text]


def measure(text, size):
    font = ImageFont.truetype(FONT, size)
    w = sum(font.getlength(ch) + TRACK * size for ch in text) - TRACK * size
    return font, w


def draw_word(d, text, size, x, y, stroke_scale=1.0, shadow_scale=1.0):
    """Draw text with its left edge at x and its vertical middle at y."""
    font, _ = measure(text, size)
    sw = max(1, round(STROKE_EM * size * stroke_scale))
    sx, sy = (round(v * size * shadow_scale) for v in SHADOW_EM)
    for layer in ("shadow", "text"):
        cx = x
        for ch, col in word_parts(text):
            if layer == "shadow":
                d.text((cx + sx, y + sy), ch, font=font, fill=SHADOW, anchor="lm",
                       stroke_width=sw, stroke_fill=SHADOW)
            else:
                d.text((cx, y), ch, font=font, fill=col, anchor="lm",
                       stroke_width=sw, stroke_fill=STROKE)
            cx += font.getlength(ch) + TRACK * size


def wordmark(height=400):
    size = int(height * 0.8)
    _, w = measure("StudyMon.", size)
    pad = int(size * 0.12)
    im = Image.new("RGBA", (int(w) + pad * 2, height), (0, 0, 0, 0))
    draw_word(ImageDraw.Draw(im), "StudyMon.", size, pad, height / 2)
    l, t, r, b = im.getbbox()
    m = int(size * 0.04)
    return im.crop((l - m, t - m, r + m, b + m))


def tile(lines, S=1024, stroke_scale=1.0, shadow_scale=1.0):
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.2), fill=RIM)
    b = int(S * 0.035)
    d.rounded_rectangle([b, b, S - 1 - b, S - 1 - b], radius=int(S * 0.17), fill=PARCHMENT)
    # largest size where the widest line fits 80% of the tile and lines fit vertically
    avail_w, gap = S * 0.80, 0.92
    size = min(int(S * 0.9 / (len(lines) * gap)),
               *(int(S / measure(l, S)[1] * avail_w) for l in lines))
    total = size * gap * len(lines)
    for i, line in enumerate(lines):
        _, w = measure(line, size)
        y = (S - total) / 2 + size * gap * (i + 0.5) - size * 0.04
        draw_word(d, line, size, (S - w) / 2, y, stroke_scale, shadow_scale)
    return im


if __name__ == "__main__":
    ui = os.path.join(ROOT, "assets", "ui")
    wordmark().save(os.path.join(ui, "studymon-logo.png"))
    full = tile(["Study", "Mon."])
    full.resize((512, 512), Image.LANCZOS).save(os.path.join(ui, "studymon-icon.png"))
    # Tiny sizes: the monogram, with a heavier stroke so the outline survives downscaling.
    mono = tile(["S."], stroke_scale=2.5, shadow_scale=1.6)
    frames = {n: (mono if n <= 32 else full).resize((n, n), Image.LANCZOS)
              for n in (16, 24, 32, 48, 64, 128, 256)}
    frames[256].save(os.path.join(ui, "studymon.ico"), format="ICO",
                     sizes=[(n, n) for n in frames], append_images=list(frames.values()))
    tmp = os.path.join(ROOT, "tmp")
    for n in (16, 32, 48):
        frames[n].resize((n * 4, n * 4), Image.NEAREST).save(os.path.join(tmp, f"icon-preview-{n}.png"))
