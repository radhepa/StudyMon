"""Synthesize the Abyssqueak family's original cry masters.

The three cries share a descending three-tone lure motif, shifted lower and
made more pressure-heavy at each evolution. No existing creature cry is sampled.
"""

from pathlib import Path
import wave

import numpy as np


HERE = Path(__file__).resolve().parent
SAMPLE_RATE = 44100
RNG = np.random.default_rng(0xAB155)


def track(duration):
    return np.zeros(round(duration * SAMPLE_RATE), dtype=np.float64)


def envelope(length, attack=0.01, release=0.08):
    env = np.ones(length, dtype=np.float64)
    attack_n = min(length, max(1, round(attack * SAMPLE_RATE)))
    release_n = min(length, max(1, round(release * SAMPLE_RATE)))
    env[:attack_n] = np.linspace(0.0, 1.0, attack_n, endpoint=False)
    env[-release_n:] *= np.linspace(1.0, 0.0, release_n)
    return env


def chirp(duration, start_hz, end_hz, amplitude=1.0, attack=0.008, release=0.07,
          tremolo_hz=0.0, tremolo_depth=0.0, harmonics=()):
    length = max(1, round(duration * SAMPLE_RATE))
    time = np.arange(length) / SAMPLE_RATE
    frequency = np.linspace(start_hz, end_hz, length)
    phase = 2.0 * np.pi * np.cumsum(frequency) / SAMPLE_RATE
    signal = np.sin(phase)
    for multiple, level in harmonics:
        signal += level * np.sin(phase * multiple + multiple * 0.17)
    if tremolo_hz:
        signal *= 1.0 - tremolo_depth + tremolo_depth * (0.5 + 0.5 * np.sin(2.0 * np.pi * tremolo_hz * time))
    return amplitude * signal * envelope(length, attack, release)


def filtered_noise(duration, smooth_samples, amplitude=1.0):
    length = max(1, round(duration * SAMPLE_RATE))
    noise = RNG.standard_normal(length)
    kernel = np.ones(max(1, smooth_samples), dtype=np.float64)
    kernel /= kernel.sum()
    return amplitude * np.convolve(noise, kernel, mode="same") * envelope(length, 0.01, 0.09)


def add(destination, source, start_seconds):
    start = round(start_seconds * SAMPLE_RATE)
    end = min(len(destination), start + len(source))
    if start < len(destination) and end > start:
        destination[start:end] += source[:end - start]


def echo(signal, delays_and_levels):
    out = signal.copy()
    for delay, level in delays_and_levels:
        shift = round(delay * SAMPLE_RATE)
        if shift < len(signal):
            out[shift:] += signal[:-shift] * level
    return out


def finish(signal, drive=1.25):
    signal = np.tanh(signal * drive)
    signal *= envelope(len(signal), 0.006, 0.055)
    peak = float(np.max(np.abs(signal))) or 1.0
    return signal * (0.88 / peak)


def abyssqueak():
    out = track(0.64)
    # Tiny lure motif: bright, restrained, and watery rather than chirpy-cute.
    add(out, chirp(0.18, 980, 700, 0.62, tremolo_hz=19, tremolo_depth=0.22,
                   harmonics=((2, 0.18),)), 0.025)
    add(out, chirp(0.19, 720, 500, 0.50, tremolo_hz=16, tremolo_depth=0.20,
                   harmonics=((2, 0.14),)), 0.17)
    add(out, chirp(0.22, 520, 360, 0.38, tremolo_hz=13, tremolo_depth=0.18), 0.325)
    add(out, chirp(0.46, 170, 92, 0.22, attack=0.025, release=0.13,
                   tremolo_hz=8, tremolo_depth=0.28), 0.04)
    add(out, filtered_noise(0.10, 7, 0.065), 0.05)
    return finish(echo(out, ((0.042, 0.18), (0.083, 0.09))), 1.15)


def trenchmaw():
    out = track(0.92)
    # The same motif is lower and clipped by a compact pressure-wave impact.
    add(out, chirp(0.25, 560, 340, 0.55, tremolo_hz=15, tremolo_depth=0.25,
                   harmonics=((2, 0.24), (3, 0.08))), 0.035)
    add(out, chirp(0.27, 430, 255, 0.54, tremolo_hz=12, tremolo_depth=0.23,
                   harmonics=((2, 0.20),)), 0.245)
    add(out, chirp(0.32, 330, 178, 0.48, tremolo_hz=10, tremolo_depth=0.22,
                   harmonics=((2, 0.17),)), 0.47)
    add(out, chirp(0.70, 152, 72, 0.43, attack=0.018, release=0.17,
                   tremolo_hz=7, tremolo_depth=0.32, harmonics=((2, 0.19),)), 0.055)
    impact = filtered_noise(0.075, 3, 0.25) * np.linspace(1.0, 0.0, round(0.075 * SAMPLE_RATE))
    add(out, impact, 0.19)
    return finish(echo(out, ((0.055, 0.20), (0.112, 0.11))), 1.4)


def leviathorn():
    out = track(1.42)
    # Ancient pressure roar: slow subharmonics carry the family lure cadence.
    add(out, chirp(0.55, 255, 150, 0.46, attack=0.025, release=0.18,
                   tremolo_hz=7.5, tremolo_depth=0.30,
                   harmonics=((2, 0.28), (3, 0.13))), 0.055)
    add(out, chirp(0.58, 192, 108, 0.50, attack=0.025, release=0.20,
                   tremolo_hz=6.2, tremolo_depth=0.32,
                   harmonics=((2, 0.31), (3, 0.12))), 0.38)
    add(out, chirp(0.60, 146, 70, 0.54, attack=0.02, release=0.24,
                   tremolo_hz=5.1, tremolo_depth=0.35,
                   harmonics=((2, 0.34), (3, 0.14), (4, 0.07))), 0.72)
    add(out, chirp(1.23, 82, 39, 0.64, attack=0.07, release=0.28,
                   tremolo_hz=4.3, tremolo_depth=0.38,
                   harmonics=((2, 0.25), (3, 0.10))), 0.035)
    growl = filtered_noise(1.0, 45, 0.62)
    growl *= 0.58 + 0.42 * np.sin(2.0 * np.pi * 22 * np.arange(len(growl)) / SAMPLE_RATE)
    add(out, growl, 0.15)
    add(out, chirp(0.30, 1050, 610, 0.12, tremolo_hz=18, tremolo_depth=0.25), 0.92)
    return finish(echo(out, ((0.072, 0.22), (0.151, 0.13), (0.236, 0.07))), 1.65)


def write_wav(name, signal):
    destination = HERE / f"{name}-cry-master.wav"
    pcm = np.round(np.clip(signal, -1.0, 1.0) * 32767).astype("<i2")
    with wave.open(str(destination), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        wav.writeframes(pcm.tobytes())
    rms = float(np.sqrt(np.mean(signal ** 2)))
    print(f"{destination.name}: {len(signal) / SAMPLE_RATE:.3f}s peak={np.max(np.abs(signal)):.3f} rms={rms:.3f}")


def main():
    write_wav("abyssqueak", abyssqueak())
    write_wav("trenchmaw", trenchmaw())
    write_wav("leviathorn", leviathorn())


if __name__ == "__main__":
    main()
