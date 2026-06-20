#!/usr/bin/env python3
"""
Fix: faculty photo sizing on the Python course home page — smaller and
properly proportioned on mobile, keeps the face centered regardless of crop.

Run from: ~/Downloads/rankachievers/
    python3 fix_faculty_photo_size.py

Safe to re-run: checks if already applied before patching.
Requires: add_faculty_home.py must have already been run once.
"""

import sys

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)

OLD_BLOCK = '''        {/* Faculty card — photo is the signature element, kept prominent */}
        <div style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 26, marginBottom: 32 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: -6, borderRadius: 22, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", opacity: 0.45, filter: "blur(16px)" }} />
            <img
              src="/images/khadar-basha.jpg"
              alt="Dr. N. Khadar Basha, Professor, Department of ECE"
              style={{ position: "relative", width: 168, height: 190, borderRadius: 18, objectFit: "cover", border: "2px solid rgba(255,106,0,0.45)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Dr. N. Khadar Basha</div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>Professor, Department of ECE</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.6, maxWidth: 360 }}>
              Anantha Lakshmi Institute of Technology and Sciences, Anantapur
            </div>
          </div>'''

NEW_BLOCK = '''        {/* Faculty card — photo is the signature element, kept prominent */}
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: window.innerWidth <= 480 ? 18 : 26, marginBottom: 32 }}>
          <div style={{ position: "relative", flexShrink: 0, margin: "0 auto" }}>
            <div style={{ position: "absolute", inset: -5, borderRadius: 18, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", opacity: 0.4, filter: "blur(14px)" }} />
            <img
              src="/images/khadar-basha.jpg"
              alt="Dr. N. Khadar Basha, Professor, Department of ECE"
              style={{ position: "relative", width: window.innerWidth <= 480 ? 130 : 150, height: window.innerWidth <= 480 ? 147 : 170, borderRadius: 14, objectFit: "cover", objectPosition: "center 20%", border: "2px solid rgba(255,106,0,0.45)", boxShadow: "0 12px 32px rgba(0,0,0,0.5)", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div style={{ textAlign: window.innerWidth <= 480 ? "center" : "left", width: window.innerWidth <= 480 ? "100%" : "auto" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Dr. N. Khadar Basha</div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>Professor, Department of ECE</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.6, maxWidth: 360 }}>
              Anantha Lakshmi Institute of Technology and Sciences, Anantapur
            </div>
          </div>'''

if "objectPosition: \"center 20%\"" in content:
    print("⏭️  Already applied — photo sizing fix is already present. No changes made.")
    sys.exit(0)

if OLD_BLOCK not in content:
    print("❌ Could not find the exact faculty card block to patch.")
    print("   This usually means add_faculty_home.py hasn't been run yet, or the file was hand-edited.")
    print("   Run add_faculty_home.py first if you haven't, or paste me the current faculty card block.")
    sys.exit(1)

content = content.replace(OLD_BLOCK, NEW_BLOCK, 1)

with open(FILE, "w") as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\n✅ APPLIED: Resized faculty photo — smaller on mobile, centered, keeps face in frame")
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Fix faculty photo sizing on Python course home' && git push")
