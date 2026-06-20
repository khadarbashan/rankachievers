#!/usr/bin/env python3
"""
Add the faculty-branded Python course home page:
  - Bold ALITS institutional header at the top
  - Dr. N. Khadar Basha's photo (prominent, not a tiny avatar)
  - "Classes starting soon" announcement
  - "Login to Join the Class" button -> routes to the real Google/email sign-in page

Run from: ~/Downloads/rankachievers/
    python3 add_faculty_home.py

Requires (same folder):
  - khadar-basha.jpg copied into public/images/ (this script does that for you,
    if the image is sitting alongside this script)

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
# STEP 0 — Copy the photo into public/images/ so Vite serves it at /images/...
# ══════════════════════════════════════════════════════════════════════════
if Path(IMAGE_SRC).exists():
    IMAGE_DEST_DIR.mkdir(parents=True, exist_ok=True)
    if IMAGE_DEST.exists():
        steps_skipped.append(f"0. {IMAGE_DEST} already exists")
    else:
        shutil.copy(IMAGE_SRC, IMAGE_DEST)
        steps_applied.append(f"0. Copied {IMAGE_SRC} → {IMAGE_DEST}")
elif IMAGE_DEST.exists():
    steps_skipped.append(f"0. {IMAGE_DEST} already exists (source file not found alongside script, but that's fine)")
else:
    print(f"⚠️  WARNING: could not find {IMAGE_SRC} next to this script, and {IMAGE_DEST} doesn't exist yet.")
    print(f"   The page will still work, but the photo will be broken until you manually place a file at {IMAGE_DEST}")
    print("   Continuing with the code patch anyway.")


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — Pass onJoinClass through the Python Course gate → PythonCourseShell
# ══════════════════════════════════════════════════════════════════════════
old_gate_return = '    return <PythonCourseShell isAdmin={fbUser?.role==="admin"} onExitToAdmin={()=>setPage("admin")} user={fbUser}/>;'
new_gate_return = '    if(page==="auth" && !fbUser){\n      return (\n        <div style={{fontFamily:"\'Segoe UI\',system-ui,sans-serif",minHeight:"100vh",background:"#060608"}}>\n          <AuthPage onLogin={handleLogin}/>\n        </div>\n      );\n    }\n    return <PythonCourseShell isAdmin={fbUser?.role==="admin"} onExitToAdmin={()=>setPage("admin")} user={fbUser} onJoinClass={()=>setPage("auth")}/>;'

if "onJoinClass={()=>setPage(\"auth\")}" in content:
    steps_skipped.append("1. Login-to-join routing already wired into the Python Course gate")
elif old_gate_return in content:
    content = content.replace(old_gate_return, new_gate_return, 1)
    steps_applied.append("1. Added auth-page routing + onJoinClass to the Python Course gate")
else:
    print("❌ STEP 1 FAILED: could not find the Python Course gate return statement. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — PythonCourseShell: accept and forward onJoinClass to PythonCourseHome
# ══════════════════════════════════════════════════════════════════════════
old_shell_sig = "function PythonCourseShell({ onExitToAdmin, isAdmin, user }) {"
new_shell_sig = "function PythonCourseShell({ onExitToAdmin, isAdmin, user, onJoinClass }) {"

if "function PythonCourseShell({ onExitToAdmin, isAdmin, user, onJoinClass })" in content:
    steps_skipped.append("2a. PythonCourseShell already accepts onJoinClass")
elif old_shell_sig in content:
    content = content.replace(old_shell_sig, new_shell_sig, 1)
    steps_applied.append("2a. PythonCourseShell now accepts onJoinClass")
else:
    print("❌ STEP 2a FAILED: could not find PythonCourseShell's function signature. Aborting — no changes written.")
    sys.exit(1)

old_home_call = '          <PythonCourseHome onStart={() => goTopic(allTopics[0].id)} />'
new_home_call = '          <PythonCourseHome onStart={() => goTopic(allTopics[0].id)} onJoinClass={onJoinClass} user={user} />'

if "onJoinClass={onJoinClass} user={user}" in content:
    steps_skipped.append("2b. PythonCourseHome call already forwards onJoinClass + user")
elif old_home_call in content:
    content = content.replace(old_home_call, new_home_call, 1)
    steps_applied.append("2b. PythonCourseShell now forwards onJoinClass + user into PythonCourseHome")
else:
    print("❌ STEP 2b FAILED: could not find the PythonCourseHome call site. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — Replace the generic PythonCourseHome with the faculty-branded version
# ══════════════════════════════════════════════════════════════════════════
OLD_HOME_FN = '''function PythonCourseHome({ onStart }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 20px 60px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,106,0,0.12)", border: "1px solid rgba(255,106,0,0.3)", fontSize: 12, fontWeight: 700, color: "#FF6A00", marginBottom: 20 }}>
        🐍 NEW · FREE FOR ALL STUDENTS
      </div>
      <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: "#fff" }}>
        Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
      </h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
        Complete first-year syllabus — from variables to OOP and file handling — with worked examples and {PY_TOTAL_TESTS}+ runnable practice problems. Code executes right on your phone, no installation needed.
      </p>
      <button onClick={onStart} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
        Start Learning →
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginTop: 40 }}>
        {[["📚", PY_CURRICULUM.length, "Units"], ["📖", PY_TOTAL_TOPICS, "Topics"], ["💻", PY_TOTAL_TESTS + "+", "Practice Problems"], ["📱", "Mobile", "Runs Offline"]].map(([icon, num, label]) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{num}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 44, marginBottom: 16, letterSpacing: ".04em" }}>Course Units</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        {PY_CURRICULUM.map((unit, i) => (
          <div key={unit.id} onClick={onStart} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, cursor: "pointer", transition: "border-color .2s" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{unit.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{i + 1}. {unit.title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{unit.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}'''

NEW_HOME_FN = '''function PythonCourseHome({ onStart, user, onJoinClass }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 0 60px" }}>
      {/* Institute header — bold, capital, as required */}
      <div style={{ textAlign: "center", padding: "36px 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 40 }}>
        <h1 style={{ fontSize: "clamp(18px,3.2vw,26px)", fontWeight: 900, letterSpacing: "0.02em", textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1.4 }}>
          ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY AND SCIENCES, ANANTAPUR
        </h1>
        <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: "#FF6A00", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Department of Electronics &amp; Communication Engineering
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,106,0,0.12)", border: "1px solid rgba(255,106,0,0.3)", fontSize: 12, fontWeight: 700, color: "#FF6A00", marginBottom: 24 }}>
          🐍 PYTHON CLASSES STARTING SOON
        </div>

        {/* Faculty card — photo is the signature element, kept prominent */}
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
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>
          Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
          Complete first-year syllabus — from variables to OOP and file handling — with worked examples and {PY_TOTAL_TESTS}+ runnable practice problems. Code executes right on your phone, no installation needed.
        </p>

        {/* Join / login CTA */}
        {user ? (
          <button onClick={onStart} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
            Start Learning →
          </button>
        ) : (
          <div>
            <button onClick={onJoinClass} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
              🔐 Login to Join the Class
            </button>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 10 }}>
              Sign in with Google to access lessons and track your progress.
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginTop: 40 }}>
          {[["📚", PY_CURRICULUM.length, "Units"], ["📖", PY_TOTAL_TOPICS, "Topics"], ["💻", PY_TOTAL_TESTS + "+", "Practice Problems"], ["📱", "Mobile", "Runs Offline"]].map(([icon, num, label]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{num}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{label}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 44, marginBottom: 16, letterSpacing: ".04em" }}>Course Units</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
          {PY_CURRICULUM.map((unit, i) => (
            <div key={unit.id} onClick={user ? onStart : onJoinClass} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, cursor: "pointer", transition: "border-color .2s" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{unit.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{i + 1}. {unit.title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{unit.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}'''

if "ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY AND SCIENCES, ANANTAPUR" in content:
    steps_skipped.append("3. Faculty-branded home page already present")
elif OLD_HOME_FN in content:
    content = content.replace(OLD_HOME_FN, NEW_HOME_FN, 1)
    steps_applied.append("3. Replaced generic course home page with faculty-branded version (photo, ALITS header, join-class CTA)")
else:
    print("❌ STEP 3 FAILED: could not find the exact existing PythonCourseHome function to replace.")
    print("   This usually means the file was hand-edited since the last patch. Aborting — no changes written.")
    print("   If you want, paste me the current PythonCourseHome function and I'll build a targeted fix.")
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
print("  2. If clean: git add -A && git commit -m 'Add faculty-branded Python course home page' && git push")
print("  3. With pythonCourseMode ON, visit the site logged out — you should see:")
print("     - Bold ALITS header at the top")
print("     - Your photo in a card with name/title")
print("     - 'Login to Join the Class' button")
print("  4. Click that button — it should take you to the same Google/email sign-in screen as the rest of the site")
print("  5. After logging in, you should land back on this page, now showing 'Start Learning' instead")
