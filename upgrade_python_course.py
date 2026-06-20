#!/usr/bin/env python3
"""
Upgrade the Python Course module:
  1. Full 67-problem curriculum (was a trimmed 35-problem version)
  2. Throttled live activity sync — student code syncs to Firestore every
     ~4 seconds while typing (not per-keystroke, to keep costs/privacy sane)
  3. New Admin tab "🐍 Python Activity" showing near-live student activity:
     who's working on what, their current code, pass/fail status

Run from: ~/Downloads/rankachievers/
    python3 upgrade_python_course.py

Requires: python_course_block_v2.jsx in the same folder (the new component tree).
Safe to re-run: checks if already applied before patching.

This assumes add_python_course.py was already run once (the base toggle).
If you haven't run that yet, run it first.
"""

import sys

FILE = "src/App.jsx"
NEW_BLOCK_FILE = "python_course_block_v2.jsx"

with open(FILE, "r") as f:
    content = f.read()

with open(NEW_BLOCK_FILE, "r") as f:
    NEW_BLOCK = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []

OLD_MARKER = "// ════════════════════════════════════════════════════════════════════════════\n// PYTHON COURSE MODULE — toggled on/off from Admin → Settings"

if OLD_MARKER not in content:
    print("❌ Could not find the existing Python Course module marker.")
    print("   This script expects add_python_course.py to have already been run once.")
    print("   If you haven't run that yet, run it first — see earlier setup instructions.")
    sys.exit(1)

marker_start = content.index(OLD_MARKER)
is_v2_already = "throttled live activity sync for Admin monitoring" in content[marker_start:marker_start + 600]

if is_v2_already:
    steps_skipped.append("1. Curriculum/activity module already upgraded to v2")
else:
    content = content[:marker_start] + NEW_BLOCK.lstrip("\n") + "\n"
    steps_applied.append("1. Replaced Python course module with full 67-problem curriculum + live activity sync")


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — Pass fbUser into PythonCourseShell so activity sync knows who's typing
# ══════════════════════════════════════════════════════════════════════════
old_call = 'return <PythonCourseShell isAdmin={fbUser?.role==="admin"} onExitToAdmin={()=>setPage("admin")}/>;'
new_call = 'return <PythonCourseShell isAdmin={fbUser?.role==="admin"} onExitToAdmin={()=>setPage("admin")} user={fbUser}/>;'

if new_call in content:
    steps_skipped.append("2. PythonCourseShell already receives user prop")
elif old_call in content:
    content = content.replace(old_call, new_call, 1)
    steps_applied.append("2. Passed logged-in user into PythonCourseShell (needed for activity tracking)")
else:
    print("⚠️  STEP 2 WARNING: could not find the PythonCourseShell call site to update.")
    print("   Activity sync will not know which student is typing until this is fixed manually.")


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — Add "Python Activity" to the admin TABS array
# ══════════════════════════════════════════════════════════════════════════
old_tabs = '''const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"notes",l:"📖 Notes"},{id:"settings",l:"⚙️ Settings"}];'''

new_tabs = '''const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"notes",l:"📖 Notes"},{id:"pyactivity",l:"🐍 Python Activity"},{id:"settings",l:"⚙️ Settings"}];'''

if old_tabs in content:
    content = content.replace(old_tabs, new_tabs, 1)
    steps_applied.append('3. Added "🐍 Python Activity" tab to Admin TABS array')
elif '"pyactivity"' in content:
    steps_skipped.append("3. Python Activity tab already present in TABS array")
else:
    print("❌ STEP 3 FAILED: could not find the admin TABS array. Aborting before writing partial changes.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 4 — Render the PyActivityAdminTab component when tab==="pyactivity"
#   Inserted right before the Settings tab block for a predictable location.
# ══════════════════════════════════════════════════════════════════════════
settings_tab_anchor = '''      {tab==="settings"&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:28,border:"2px solid #f0f0f0",marginBottom:20}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>🐍 Python Course Mode</h3>'''

pyactivity_tab_render = '''      {tab==="pyactivity"&&<PyActivityAdminTab/>}

      {tab==="settings"&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:28,border:"2px solid #f0f0f0",marginBottom:20}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>🐍 Python Course Mode</h3>'''

if 'tab==="pyactivity"&&<PyActivityAdminTab' in content:
    steps_skipped.append("4. PyActivityAdminTab render already wired into Admin")
elif settings_tab_anchor in content:
    content = content.replace(settings_tab_anchor, pyactivity_tab_render, 1)
    steps_applied.append("4. Wired PyActivityAdminTab to render when Admin clicks the Python Activity tab")
else:
    print("❌ STEP 4 FAILED: could not find Settings tab anchor in AdminPage. Aborting before writing partial changes.")
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
print("  2. If clean: git add -A && git commit -m 'Upgrade Python course: full curriculum + live activity tracking' && git push")
print("  3. In Admin, you'll now see a new '🐍 Python Activity' tab showing students' live progress")
print("  4. Have a student (or test account) open the Python course and start a problem —")
print("     within ~4 seconds their card should appear in the Python Activity tab")

print("\n⚠️  IMPORTANT — Firestore rules:")
print('  This feature writes to a new "python_activity" collection. Your current Firestore')
print('  rules (from FIREBASE_SETUP.md) only define rules for users/questions/attempts/settings.')
print('  Add this to your Firestore Rules (console.firebase.google.com → Firestore → Rules):')
print('''
    match /python_activity/{uid} {
      allow read: if request.auth.token.email == "nkhadar@gmail.com";
      allow write: if request.auth != null && request.auth.uid == uid;
    }
''')
print("  Without this rule, student writes (and your admin reads) will be silently rejected.")
