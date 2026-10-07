"""Synthesize original cries for the fifteen Converging Isles species.

Every family shares one motif that grows lower, longer and heavier with each
evolution, the same rule the Abyssqueak family follows. Nothing is sampled
from an existing creature cry. Writes <name>-cry-master.wav here and the game
copy to assets/cries/<id>.ogg (needs ffmpeg on PATH).
"""

from pathlib import Path
import shutil
import subprocess
import wave

import numpy as np


HERE = Path(__file__).resolve().parent
CRIES = HERE.parents[2] / "cries"
SR = 44100
RNG = np.random.default_rng(0x15AE5)


def track(seconds):
    return np.zeros(round(seconds * SR))


def env(n, attack=0.01, release=0.08):
    e = np.ones(n)
    a = min(n, max(1, round(attack * SR)))
    r = min(n, max(1, round(release * SR)))
    e[:a] = np.linspace(0, 1, a, endpoint=False)
    e[-r:] *= np.linspace(1, 0, r)
    return e


def tone(dur, f0, f1, amp=1.0, attack=0.008, release=0.07, harmonics=(),
         vibrato=(0.0, 0.0), tremolo=(0.0, 0.0), curve=1.0):
    """A pitch glide. vibrato=(hz, depth as a fraction of pitch), tremolo=(hz, depth)."""
    n = max(1, round(dur * SR))
    t = np.arange(n) / SR
    glide = np.linspace(0, 1, n) ** curve
    freq = f0 + (f1 - f0) * glide
    if vibrato[0]:
        freq = freq * (1 + vibrato[1] * np.sin(2 * np.pi * vibrato[0] * t))
    phase = 2 * np.pi * np.cumsum(freq) / SR
    sig = np.sin(phase)
    for mult, level in harmonics:
        sig += level * np.sin(phase * mult + 0.3 * mult)
    if tremolo[0]:
        sig *= 1 - tremolo[1] + tremolo[1] * (0.5 + 0.5 * np.sin(2 * np.pi * tremolo[0] * t))
    return amp * sig * env(n, attack, release)


def noise(dur, smooth, amp=1.0, attack=0.005, release=0.05):
    """Low-passed noise; a larger `smooth` is darker."""
    n = max(1, round(dur * SR))
    k = np.ones(max(1, smooth)) / max(1, smooth)
    return amp * np.convolve(RNG.standard_normal(n), k, mode="same") * env(n, attack, release)


def bright_noise(dur, amp=1.0, attack=0.002, release=0.03):
    n = max(1, round(dur * SR))
    raw = RNG.standard_normal(n)
    return amp * np.diff(raw, prepend=0.0) * 0.5 * env(n, attack, release)


def bell(dur, f, amp=1.0, partials=((1, 1.0), (2.76, 0.45), (5.4, 0.25), (8.9, 0.12)), decay=6.0):
    """Inharmonic struck partials: ice, quartz, keys."""
    n = max(1, round(dur * SR))
    t = np.arange(n) / SR
    sig = sum(level * np.sin(2 * np.pi * f * mult * t) * np.exp(-decay * mult ** 0.5 * t)
              for mult, level in partials)
    return amp * sig * env(n, 0.001, 0.02)


def click(f, amp=0.5):
    return bell(0.05, f, amp, partials=((1, 1.0), (1.9, 0.5)), decay=60.0)


def zap(dur, amp=0.4, rate=38.0):
    """Electric crackle: bright noise gated in irregular bursts."""
    n = max(1, round(dur * SR))
    gate = (RNG.random(n // 300 + 1) < 0.45).repeat(300)[:n].astype(float)
    buzz = np.sign(np.sin(2 * np.pi * rate * 3 * np.arange(n) / SR)) * 0.25
    return amp * (bright_noise(dur, 1.0, 0.001, 0.02) + buzz) * gate * env(n, 0.002, 0.03)


def add(out, sig, at):
    s = round(at * SR)
    e = min(len(out), s + len(sig))
    if s < len(out) and e > s:
        out[s:e] += sig[: e - s]


def echo(sig, taps):
    out = sig.copy()
    for delay, level in taps:
        d = round(delay * SR)
        if d < len(sig):
            out[d:] += sig[:-d] * level
    return out


def finish(sig, drive=1.2):
    sig = np.tanh(sig * drive) * env(len(sig), 0.004, 0.05)
    peak = float(np.max(np.abs(sig))) or 1.0
    return sig * (0.88 / peak)


# ---- Budloth line: a sleepy, rising yawn; the bud opens into a leafy rustle ----

def budloth():
    out = track(0.62)
    add(out, tone(0.42, 330, 520, 0.6, 0.03, 0.18, ((2, 0.25), (3, 0.08)), vibrato=(5.5, 0.02), curve=0.6), 0.02)
    add(out, tone(0.16, 560, 470, 0.35, 0.01, 0.1, ((2, 0.2),)), 0.42)
    add(out, noise(0.25, 12, 0.05, 0.05, 0.12), 0.3)
    return finish(out, 1.1)


def bromelaze():
    out = track(0.85)
    add(out, tone(0.5, 210, 360, 0.55, 0.02, 0.2, ((2, 0.35), (3, 0.15)), vibrato=(6, 0.025), curve=0.7), 0.03)
    add(out, tone(0.24, 380, 250, 0.45, 0.01, 0.12, ((2, 0.3),), tremolo=(24, 0.3)), 0.5)
    add(out, noise(0.4, 9, 0.11, 0.08, 0.2), 0.28)   # rosette rustle
    return finish(echo(out, ((0.05, 0.12),)), 1.3)


def canopodon():
    out = track(1.3)
    add(out, tone(0.8, 120, 190, 0.6, 0.06, 0.3, ((2, 0.4), (3, 0.2), (4, 0.08)), vibrato=(4, 0.03), curve=0.6), 0.03)
    add(out, tone(0.45, 200, 110, 0.55, 0.02, 0.25, ((2, 0.35), (3, 0.12)), tremolo=(18, 0.35)), 0.72)
    add(out, noise(0.9, 7, 0.17, 0.15, 0.4), 0.2)    # a canopy in the wind
    add(out, noise(0.2, 60, 0.35, 0.002, 0.15), 0.72)  # a heavy footfall
    return finish(echo(out, ((0.07, 0.18), (0.15, 0.08))), 1.5)


# ---- Cryoad line: a pulsed croak with a glassy ice ping ----

def cryoad():
    out = track(0.6)
    add(out, tone(0.2, 260, 210, 0.6, 0.004, 0.06, ((2, 0.5), (3, 0.3)), tremolo=(46, 0.8)), 0.02)
    add(out, tone(0.18, 300, 240, 0.55, 0.004, 0.06, ((2, 0.5), (3, 0.3)), tremolo=(52, 0.8)), 0.25)
    add(out, bell(0.35, 2350, 0.22), 0.2)
    add(out, bell(0.3, 3100, 0.12), 0.43)
    return finish(out, 1.2)


def rimecroak():
    out = track(1.05)
    add(out, tone(0.3, 150, 118, 0.62, 0.004, 0.09, ((2, 0.55), (3, 0.35), (4, 0.15)), tremolo=(34, 0.85)), 0.02)
    add(out, tone(0.42, 170, 105, 0.62, 0.004, 0.15, ((2, 0.55), (3, 0.35), (4, 0.15)), tremolo=(30, 0.85)), 0.34)
    add(out, noise(0.3, 30, 0.12, 0.02, 0.2), 0.35)   # toxic throat rasp
    for i, f in enumerate((1650, 2200, 2750)):
        add(out, bell(0.5, f, 0.16), 0.3 + i * 0.09)   # three spine plates
    return finish(echo(out, ((0.06, 0.2), (0.13, 0.1))), 1.4)


# ---- Tallybara: a calm low purr and three bead clicks ----

def tallybara():
    out = track(0.9)
    add(out, tone(0.55, 190, 170, 0.5, 0.05, 0.2, ((2, 0.3), (3, 0.15)), tremolo=(28, 0.45)), 0.02)
    add(out, tone(0.22, 520, 640, 0.3, 0.02, 0.1, ((2, 0.15),), curve=0.5), 0.5)   # soft "wheek"
    for i, f in enumerate((1400, 1750, 2100)):
        add(out, click(f, 0.45), 0.62 + i * 0.075)   # teal, gold, coral
    return finish(out, 1.15)


# ---- Kilnscarab: a heavy wing drone with ember crackle ----

def kilnscarab():
    out = track(1.0)
    add(out, tone(0.75, 96, 88, 0.5, 0.05, 0.25, ((2, 0.6), (3, 0.45), (4, 0.3), (5, 0.2)), tremolo=(34, 0.5)), 0.03)
    add(out, tone(0.25, 240, 160, 0.4, 0.01, 0.12, ((2, 0.4), (3, 0.2))), 0.02)
    for at in RNG.uniform(0.1, 0.85, 14):
        add(out, bright_noise(0.012, RNG.uniform(0.2, 0.45)), at)   # kiln crackle
    add(out, noise(0.25, 80, 0.3, 0.002, 0.2), 0.02)   # shell thump
    return finish(out, 1.5)


# ---- Drenchic line: a chick's cheep that picks up static, then a storm ----

def drenchic():
    out = track(0.58)
    add(out, tone(0.1, 1900, 2500, 0.55, 0.004, 0.04, ((2, 0.15),)), 0.02)
    add(out, tone(0.12, 2000, 2700, 0.55, 0.004, 0.05, ((2, 0.15),)), 0.16)
    add(out, tone(0.18, 2300, 1600, 0.45, 0.004, 0.08, ((2, 0.15),), vibrato=(18, 0.03)), 0.31)
    add(out, zap(0.12, 0.18), 0.33)
    add(out, noise(0.15, 5, 0.06), 0.02)   # a shake of damp down
    return finish(out, 1.1)


def condusken():
    out = track(0.82)
    add(out, tone(0.16, 1100, 1500, 0.5, 0.004, 0.05, ((2, 0.3), (3, 0.1))), 0.02)
    add(out, tone(0.3, 1400, 780, 0.55, 0.004, 0.12, ((2, 0.3), (3, 0.12)), vibrato=(22, 0.035)), 0.2)
    add(out, zap(0.3, 0.26, 44), 0.24)
    add(out, noise(0.3, 18, 0.12, 0.05, 0.2), 0.45)   # surf
    return finish(echo(out, ((0.045, 0.14),)), 1.3)


def blitziken():
    out = track(1.35)
    add(out, tone(0.22, 820, 1180, 0.5, 0.006, 0.06, ((2, 0.4), (3, 0.2))), 0.03)
    add(out, tone(0.55, 1150, 420, 0.6, 0.006, 0.25, ((2, 0.45), (3, 0.25), (4, 0.1)), vibrato=(26, 0.04)), 0.25)
    add(out, zap(0.45, 0.32, 50), 0.28)
    add(out, bright_noise(0.06, 0.9, 0.001, 0.04), 0.27)    # the strike
    add(out, noise(0.7, 90, 0.9, 0.01, 0.5), 0.3)             # rolling thunder
    add(out, noise(0.5, 14, 0.14, 0.1, 0.3), 0.75)            # squall spray
    return finish(echo(out, ((0.08, 0.2), (0.17, 0.1))), 1.6)


# ---- Fernip line: a tiny trill that unfurls into wingbeats ----

def fernip():
    out = track(0.5)
    for i in range(5):
        add(out, tone(0.055, 2800 + i * 90, 3300 + i * 90, 0.4, 0.003, 0.02, ((2, 0.1),)), 0.02 + i * 0.065)
    add(out, tone(0.14, 3100, 2500, 0.35, 0.004, 0.08), 0.35)
    return finish(out, 1.05)


def brackenwing():
    out = track(1.0)
    flutter = noise(0.8, 10, 0.35, 0.08, 0.3)
    t = np.arange(len(flutter)) / SR
    add(out, flutter * (0.5 + 0.5 * np.sin(2 * np.pi * 16 * t)) ** 2, 0.05)   # four wings
    add(out, tone(0.5, 1600, 2300, 0.4, 0.05, 0.2, ((2, 0.1),), vibrato=(7, 0.02), curve=0.6), 0.1)
    add(out, tone(0.3, 2200, 1400, 0.35, 0.02, 0.15), 0.58)
    return finish(echo(out, ((0.06, 0.15),)), 1.2)


# ---- Cairnkid line: a goat's bleat and a struck-quartz ring ----

def cairnkid():
    out = track(0.7)
    add(out, tone(0.4, 520, 470, 0.55, 0.02, 0.12, ((2, 0.5), (3, 0.35), (4, 0.15)), vibrato=(9, 0.05), tremolo=(9, 0.5)), 0.02)
    add(out, click(900, 0.35), 0.46)    # pebble tap
    add(out, bell(0.3, 1900, 0.13), 0.5)
    return finish(out, 1.25)


def cragibex():
    out = track(1.2)
    add(out, tone(0.62, 300, 250, 0.6, 0.02, 0.2, ((2, 0.55), (3, 0.4), (4, 0.2)), vibrato=(7, 0.05), tremolo=(7, 0.55)), 0.02)
    add(out, noise(0.2, 70, 0.4, 0.002, 0.15), 0.62)   # hooves on slate
    add(out, bell(0.6, 740, 0.35, decay=3.0), 0.66)   # the horns ring
    add(out, bell(0.5, 1110, 0.2, decay=3.5), 0.7)
    return finish(echo(out, ((0.07, 0.18), (0.15, 0.08))), 1.35)


# ---- Tumblerook: magpie chatter and a jingle of keys ----

def tumblerook():
    out = track(0.9)
    for i, at in enumerate((0.02, 0.12, 0.22)):
        chak = tone(0.07, 1500 - i * 80, 1150 - i * 80, 0.45, 0.002, 0.03, ((2, 0.5), (3, 0.4)))
        add(out, chak + bright_noise(0.07, 0.35), at)
    add(out, tone(0.22, 1300, 1700, 0.4, 0.005, 0.1, ((2, 0.35),)), 0.36)
    for i, f in enumerate((3200, 4100, 3650, 4600)):
        add(out, bell(0.25, f, 0.1, decay=14.0), 0.52 + i * 0.05)   # two antique keys
    return finish(out, 1.3)


FAMILY = (
    (1032, "budloth", budloth), (1033, "bromelaze", bromelaze), (1034, "canopodon", canopodon),
    (1035, "cryoad", cryoad), (1036, "rimecroak", rimecroak),
    (1037, "tallybara", tallybara), (1038, "kilnscarab", kilnscarab),
    (1039, "drenchic", drenchic), (1040, "condusken", condusken), (1041, "blitziken", blitziken),
    (1042, "fernip", fernip), (1043, "brackenwing", brackenwing),
    (1044, "cairnkid", cairnkid), (1045, "cragibex", cragibex),
    (1046, "tumblerook", tumblerook),
)


def write(name, sig):
    path = HERE / f"{name}-cry-master.wav"
    pcm = np.round(np.clip(sig, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    return path


def main():
    ffmpeg = shutil.which("ffmpeg")
    for sid, name, make in FAMILY:
        sig = make()
        wav = write(name, sig)
        ogg = CRIES / f"{sid}.ogg"
        if ffmpeg:
            subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", str(wav),
                            "-c:a", "libvorbis", "-q:a", "4", str(ogg)], check=True)
        rms = float(np.sqrt(np.mean(sig ** 2)))
        print(f"{sid} {name:12s} {len(sig) / SR:.2f}s rms={rms:.3f}" + ("" if ffmpeg else "  (no ffmpeg: ogg skipped)"))


if __name__ == "__main__":
    main()
