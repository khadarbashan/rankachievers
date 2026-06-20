#!/usr/bin/env python3
"""
Replace ALL remaining 🐍 emoji with the real Python logo SVG.

The nav badge was already done in an earlier patch. This finishes the job
across the other 5 spots: the Admin tab list, both Settings-tab labels,
the Python Activity admin heading, and the "Classes Starting Soon" badge
on the course home page.

Adds one shared <PyLogoIcon/> component so the SVG markup isn't repeated
5 times — every spot just renders <PyLogoIcon size={N}/> inline.

Run from: ~/Downloads/rankachievers/
    python3 replace_all_snake_emoji.py

Safe to re-run: checks if already applied before patching.
"""

import sys

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# STEP 0 — Add the shared PyLogoIcon component
# ══════════════════════════════════════════════════════════════════════════
OLD_ANCHOR = "function PyPredictOutput({ pq, pqIndex, runPython, pyStatus, ensureLoaded }) {"

NEW_WITH_ICON = '''// ─── REUSABLE PYTHON LOGO ICON (inline SVG, replaces 🐍 emoji everywhere) ──────
function PyLogoIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "-2px", flexShrink: 0 }}>
      <path fill="#FFE873" d="M12.05 1.5c-1.05 0-2.05.09-2.9.25-2.6.45-3.07 1.41-3.07 3.16v2.31h6.13v.78H3.94c-1.77 0-3.32 1.06-3.8 3.08-.56 2.32-.59 3.77 0 6.19.43 1.8 1.46 3.08 3.23 3.08h2.09v-2.78c0-2.01 1.74-3.78 3.8-3.78h6.13c1.69 0 3.04-1.39 3.04-3.08V4.91c0-1.64-1.39-2.87-3.04-3.16a18.6 18.6 0 0 0-3.34-.25zM8.7 3.2c.62 0 1.13.51 1.13 1.14 0 .63-.51 1.13-1.13 1.13-.63 0-1.13-.5-1.13-1.13 0-.63.5-1.14 1.13-1.14z"/>
      <path fill="#4B8BBE" d="M11.95 22.5c1.05 0 2.05-.09 2.9-.25 2.6-.45 3.07-1.41 3.07-3.16v-2.31h-6.13v-.78h8.27c1.77 0 3.32-1.06 3.8-3.08.56-2.32.59-3.77 0-6.19-.43-1.8-1.46-3.08-3.23-3.08h-2.09v2.78c0 2.01-1.74 3.78-3.8 3.78H8.61c-1.69 0-3.04 1.39-3.04 3.08v5.21c0 1.64 1.39 2.87 3.04 3.16 1.13.2 2.27.27 3.34.25zm3.35-1.7c-.62 0-1.13-.51-1.13-1.14 0-.63.51-1.13 1.13-1.13.63 0 1.13.5 1.13 1.13 0 .63-.5 1.14-1.13 1.14z"/>
    </svg>
  );
}

function PyPredictOutput({ pq, pqIndex, runPython, pyStatus, ensureLoaded }) {'''

if "function PyLogoIcon" in content:
    steps_skipped.append("0. PyLogoIcon component already present")
elif OLD_ANCHOR in content:
    content = content.replace(OLD_ANCHOR, NEW_WITH_ICON, 1)
    steps_applied.append("0. Added shared PyLogoIcon component")
else:
    print("❌ STEP 0 FAILED: could not find the PyPredictOutput anchor.")
    print("   This patch expects add_logo_and_placement_questions.py to have run already.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — Admin TABS array + render: Python Activity tab
# ══════════════════════════════════════════════════════════════════════════
OLD_TABS = '''  const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"notes",l:"📖 Notes"},{id:"pyactivity",l:"🐍 Python Activity"},{id:"settings",l:"⚙️ Settings"}];'''

NEW_TABS = '''  const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"notes",l:"📖 Notes"},{id:"pyactivity",l:"Python Activity",pyIcon:true},{id:"settings",l:"⚙️ Settings"}];'''

OLD_TABS_RENDER = '''          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:9,border:"2px solid",borderColor:tab===t.id?"#FF6A00":"rgba(255,255,255,0.1)",background:tab===t.id?"#FF6A00":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.l}</button>)}'''

NEW_TABS_RENDER = '''          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:9,border:"2px solid",borderColor:tab===t.id?"#FF6A00":"rgba(255,255,255,0.1)",background:tab===t.id?"#FF6A00":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>{t.pyIcon && <PyLogoIcon size={13}/>}{t.l}</button>)}'''

if 'pyIcon:true' in content:
    steps_skipped.append("1. Admin tab list already uses the real logo icon")
elif OLD_TABS in content and OLD_TABS_RENDER in content:
    content = content.replace(OLD_TABS, NEW_TABS, 1)
    content = content.replace(OLD_TABS_RENDER, NEW_TABS_RENDER, 1)
    steps_applied.append("1. Admin tab list (Python Activity) now uses the real logo icon")
else:
    print("❌ STEP 1 FAILED: could not find the exact TABS array/render. Aborting.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — Settings tab: heading + toggle label
# ══════════════════════════════════════════════════════════════════════════
OLD_SETTINGS = '''          <h3 style={{fontWeight:900,marginBottom:6}}>🐍 Python Course Mode</h3>
          <p style={{color:"#888",fontSize:13,marginBottom:18}}>Firebase-backed — changes apply instantly for all visitors, no redeploy needed.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",background:settings.pythonCourseMode?"#fff5ee":"#f0fdf4",borderRadius:14,border:"2px solid",borderColor:settings.pythonCourseMode?"#FF6A00":"#86efac"}}>
            <div>
              <div style={{fontWeight:900,fontSize:17,color:settings.pythonCourseMode?"#FF6A00":"#16a34a"}}>{settings.pythonCourseMode?"🐍 Python Course — Showing to everyone":"🏠 Previous Site — Showing to everyone"}</div>'''

NEW_SETTINGS = '''          <h3 style={{fontWeight:900,marginBottom:6,display:"flex",alignItems:"center",gap:8}}><PyLogoIcon size={18}/> Python Course Mode</h3>
          <p style={{color:"#888",fontSize:13,marginBottom:18}}>Firebase-backed — changes apply instantly for all visitors, no redeploy needed.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",background:settings.pythonCourseMode?"#fff5ee":"#f0fdf4",borderRadius:14,border:"2px solid",borderColor:settings.pythonCourseMode?"#FF6A00":"#86efac"}}>
            <div>
              <div style={{fontWeight:900,fontSize:17,color:settings.pythonCourseMode?"#FF6A00":"#16a34a",display:"flex",alignItems:"center",gap:8}}>{settings.pythonCourseMode?(<><PyLogoIcon size={17}/> Python Course — Showing to everyone</>):"🏠 Previous Site — Showing to everyone"}</div>'''

if "Python Course Mode</h3>" in content and "PyLogoIcon size={18}" in content:
    steps_skipped.append("2. Settings tab labels already use the real logo icon")
elif OLD_SETTINGS in content:
    content = content.replace(OLD_SETTINGS, NEW_SETTINGS, 1)
    steps_applied.append("2. Settings tab heading + toggle label now use the real logo icon")
else:
    print("❌ STEP 2 FAILED: could not find the exact Settings tab block. Aborting.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — Python Activity admin tab heading
# ══════════════════════════════════════════════════════════════════════════
OLD_ACTIVITY_HEADING = '''          <h3 style={{ fontWeight: 900, marginBottom: 4 }}>🐍 Python Activity</h3>'''
NEW_ACTIVITY_HEADING = '''          <h3 style={{ fontWeight: 900, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><PyLogoIcon size={17}/> Python Activity</h3>'''

if 'PyLogoIcon size={17}/> Python Activity' in content:
    steps_skipped.append("3. Python Activity admin heading already uses the real logo icon")
elif OLD_ACTIVITY_HEADING in content:
    content = content.replace(OLD_ACTIVITY_HEADING, NEW_ACTIVITY_HEADING, 1)
    steps_applied.append("3. Python Activity admin heading now uses the real logo icon")
else:
    print("❌ STEP 3 FAILED: could not find the exact Python Activity heading. Aborting.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 4 — Course home page "Classes Starting Soon" badge
# ══════════════════════════════════════════════════════════════════════════
OLD_BADGE_TEXT = '''            🐍 PYTHON CLASSES STARTING SOON'''
NEW_BADGE_TEXT = '''            <PyLogoIcon size={14}/> PYTHON CLASSES STARTING SOON'''

if 'PyLogoIcon size={14}/> PYTHON CLASSES' in content:
    steps_skipped.append("4. Starting-soon badge already uses the real logo icon")
elif OLD_BADGE_TEXT in content:
    content = content.replace(OLD_BADGE_TEXT, NEW_BADGE_TEXT, 1)
    steps_applied.append("4. Starting-soon badge now uses the real logo icon")
else:
    print("❌ STEP 4 FAILED: could not find the exact starting-soon badge text. Aborting.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# Write back
# ══════════════════════════════════════════════════════════════════════════
with open(FILE, "w") as f:
    f.write(content)

remaining = content.count("🐍")
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

print(f"\nRemaining 🐍 characters in file: {remaining} (1 is expected — it's just a code comment, not visible UI)")
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Replace all remaining snake emoji with real Python logo' && git push")
print("  3. Check: Admin tab list, Settings tab (both labels), Python Activity heading,")
print("     and the course home page badge — all should show the blue/yellow Python logo now")
