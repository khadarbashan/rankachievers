#!/usr/bin/env python3
"""
Use the FULL original photo (uncropped — whole desk/office scene) as the
hero background, with a warm spotlight on the face and the rest of the
room faded into darkness around it.

Run from: ~/Downloads/rankachievers/
    python3 fix_hero_full_photo_lighting.py

Requires (same folder): khadar-basha.jpg — this is a NEW, different file
from the one used in earlier patches (that one was cropped to a portrait;
this one is the full original landscape photo). This script overwrites
public/images/khadar-basha.jpg with it.

Safe to re-run: checks if already applied before patching.
"""

import shutil
import sys
from pathlib import Path

FILE = "src/App.jsx"
IMAGE_SRC = "khadar-basha.jpg"
IMAGE_DEST_DIR = Path("public/images")
IMAGE_DEST = IMAGE_DEST_DIR / "khadar-basha.jpg"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# STEP 0 — Replace the photo with the full uncropped version
# ══════════════════════════════════════════════════════════════════════════
import filecmp

if Path(IMAGE_SRC).exists():
    IMAGE_DEST_DIR.mkdir(parents=True, exist_ok=True)
    if IMAGE_DEST.exists() and filecmp.cmp(IMAGE_SRC, IMAGE_DEST, shallow=False):
        steps_skipped.append(f"0. {IMAGE_DEST} already matches the full uncropped photo")
    else:
        shutil.copy(IMAGE_SRC, IMAGE_DEST)
        steps_applied.append(f"0. Replaced {IMAGE_DEST} with the full uncropped photo")
else:
    print(f"⚠️  WARNING: could not find {IMAGE_SRC} next to this script.")
    print(f"   The code changes will still apply, but {IMAGE_DEST} won't be updated —")
    print("   you'll need to manually copy the new photo there.")


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — Replace hero lighting CSS with face-spotlight version, repositioned
# for the full (uncropped) image's actual face coordinates
# ══════════════════════════════════════════════════════════════════════════
OLD_HERO_BG = '''      {/* ── Hero — photo as full-bleed background, text overlaid ── */}
      <div style={{
        position: "relative", width: "100%", minHeight: isMobile ? 560 : 620,
        backgroundImage: "url(/images/khadar-basha.jpg)",
        backgroundSize: "cover", backgroundPosition: "center 18%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        marginBottom: 40, overflow: "hidden",
      }}>
        {/* Spotlight glow centered on the face, warm orange light */}
        <div style={{
          position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "55%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,154,0,0.35) 0%, rgba(255,106,0,0.12) 45%, transparent 75%)",
          pointerEvents: "none",
        }} />
        {/* Dark vignette from the edges so the photo doesn't fight the header */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center 20%, transparent 30%, rgba(6,6,8,0.55) 75%, rgba(6,6,8,0.85) 100%)",
          pointerEvents: "none",
        }} />
        {/* Strong gradient at the bottom so overlaid text stays legible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(6,6,8,0.55) 0%, rgba(6,6,8,0.15) 30%, rgba(6,6,8,0.4) 65%, rgba(6,6,8,0.96) 100%)",
          pointerEvents: "none",
        }} />

        {/* Institute header — sits over the top of the photo */}
        <div style={{ position: "relative", textAlign: "center", padding: "32px 20px 0" }}>
          <h1 style={{'''

NEW_HERO_BG = '''      {/* ── Hero — full original photo as background, face lit, rest darkened ── */}
      <div style={{
        position: "relative", width: "100%", minHeight: isMobile ? 480 : 560,
        backgroundImage: "url(/images/khadar-basha.jpg)",
        backgroundSize: "cover", backgroundPosition: "27% 26%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        marginBottom: 40, overflow: "hidden",
      }}>
        {/* Spotlight glow positioned directly over the face — warm, bright, the focal point */}
        <div style={{
          position: "absolute", top: "-18%", left: "27%", transform: "translateX(-50%)",
          width: "50%", height: "85%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,200,120,0.22) 0%, rgba(255,170,80,0.1) 45%, transparent 75%)",
          pointerEvents: "none", mixBlendMode: "screen",
        }} />
        {/* Vignette — keeps the face area bright, fades the rest of the room down (not to black) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 85% at 27% 26%, transparent 35%, rgba(6,6,8,0.45) 70%, rgba(6,6,8,0.72) 100%)",
          pointerEvents: "none",
        }} />
        {/* Smooth bottom gradient for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(6,6,8,0) 0%, rgba(6,6,8,0.15) 55%, rgba(6,6,8,0.95) 100%)",
          pointerEvents: "none",
        }} />

        {/* Institute header — sits over the top of the photo */}
        <div style={{ position: "relative", textAlign: "center", padding: "32px 20px 0" }}>
          <h1 style={{'''

if 'mixBlendMode: "screen"' in content:
    steps_skipped.append("1. Full-photo spotlight lighting already present")
elif OLD_HERO_BG in content:
    content = content.replace(OLD_HERO_BG, NEW_HERO_BG, 1)
    steps_applied.append("1. Replaced hero background with full-photo + face-spotlight lighting")
else:
    print("❌ STEP 1 FAILED: could not find the exact hero section to replace.")
    print("   This usually means a previous patch in this chain hasn't been run yet.")
    print("   Make sure add_faculty_home.py and fix_activity_status_and_hero_photo.py")
    print("   have both been run before this one. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# Write back
# ══════════════════════════════════════════════════════════════════════════
with open(FILE, "w") as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
if steps_applied:
    print("\n✅ APPLIED:")
    for s in steps_applied:
        print(f"   {s}")
if steps_skipped:
    print("\n⏭️  SKIPPED (already applied):")
    for s in steps_skipped:
        print(f"   {s}")

print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Use full photo with face spotlight on course home' && git push")
print("  3. Check the Python course home page — you should see the FULL office photo")
print("     (desk, window, chair, papers) as the background, with your face/upper body")
print("     clearly lit and the rest of the room fading into darkness")
