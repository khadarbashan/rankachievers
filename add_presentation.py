#!/usr/bin/env python3
"""
Adds a live presentation system to the Python course:

  Admin (Admin → Presentation tab):
    - Paste Google Slides URL → starts live session
    - Controls: prev/next/jump to slide
    - Sees real-time alerts when students exit fullscreen
    - End presentation button

  Students (Python course home page):
    - Live banner appears when admin starts a presentation
    - "Join Live" button → full-screen viewer
    - Slide updates in real-time (Firestore-driven)
    - Cannot control slides (overlay blocks iframe clicks)
    - Exiting fullscreen reports to admin with name + email + slide number

Run from: ~/Downloads/rankachievers/
    python3 add_presentation.py
"""

import sys

FILE = "src/App.jsx"
with open(FILE) as f:
    content = f.read()

original_length = len(content)
steps = []

if "PresentationAdminPanel" in content:
    print("Already applied.")
    sys.exit(0)

# ── Read component block ───────────────────────────────────────────────────
with open("presentation_block.jsx") as f:
    COMPONENT_BLOCK = f.read()

# ── STEP 1: Insert components before PythonCourseShell ────────────────────
marker = "function PythonCourseShell("
if marker not in content:
    print("ERROR: Cannot find PythonCourseShell"); sys.exit(1)
idx = content.index(marker)
content = content[:idx] + "\n" + COMPONENT_BLOCK + "\n" + content[idx:]
steps.append("1. Inserted PresentationAdminPanel, PresentationViewer, PresentationBanner components")

# ── STEP 2: Add Presentation tab to Admin TABS array ──────────────────────
OLD_TABS = '{id:"settings",l:"\u2699\uFE0F Settings"}'
NEW_TABS = '{id:"settings",l:"\u2699\uFE0F Settings"},{id:"presentation",l:"Presentation",pyIcon:false,presIcon:true}'

if OLD_TABS in content:
    content = content.replace(OLD_TABS, NEW_TABS, 1)
    steps.append("2. Added Presentation tab to Admin panel")
else:
    print("WARNING: Could not add Presentation tab — TABS array format may have changed")

# ── STEP 3: Update the TABS render to handle presIcon ─────────────────────
OLD_ICON_RENDER = '{t.pyIcon && <PyLogoIcon size={13}/>}{t.l}'
NEW_ICON_RENDER = '{t.pyIcon && <PyLogoIcon size={13}/>}{t.presIcon && <span style={{marginRight:2}}>📽️</span>}{t.l}'

if OLD_ICON_RENDER in content:
    content = content.replace(OLD_ICON_RENDER, NEW_ICON_RENDER, 1)
    steps.append("3. Updated tab render to show presentation icon")

# ── STEP 4: Add Presentation tab content in Admin body ────────────────────
OLD_SETTINGS_TAB = "tab===\"settings\" &&"
# Find the settings tab rendering block and add presentation tab before it
# Look for the pattern where settings tab is rendered
settings_render = 'tab==="settings" &&'
if settings_render in content:
    idx2 = content.index(settings_render)
    # Insert presentation tab content just before settings
    PRESENTATION_TAB_CONTENT = """tab==="presentation" && (
              <PresentationAdminPanel fbUser={fbUser} />
            )}
            {"""
    content = content[:idx2] + PRESENTATION_TAB_CONTENT + content[idx2:]
    steps.append("4. Added Presentation tab content in Admin body")
else:
    print("WARNING: Could not add presentation tab content")

# ── STEP 5: Add PresentationBanner to PythonCourseHome ───────────────────
# Insert banner after the hero section, before SyllabusAccordion
OLD_ACCORDION = "<SyllabusAccordion onNavigate="
if OLD_ACCORDION in content:
    idx3 = content.index(OLD_ACCORDION)
    BANNER_INSERT = """<PresentationBanner user={user} onJoin={() => setShowPresentation(true)} />

      """
    content = content[:idx3] + BANNER_INSERT + content[idx3:]
    steps.append("5. Added PresentationBanner to course home page")
else:
    print("WARNING: Could not find SyllabusAccordion insertion point")

# ── STEP 6: Add showPresentation state and viewer to PythonCourseHome ─────
OLD_HOME_SIG = "function PythonCourseHome({ onStart, user, onJoinClass }) {"
NEW_HOME_SIG = """function PythonCourseHome({ onStart, user, onJoinClass }) {
  const [showPresentation, setShowPresentation] = useState(false);"""

if OLD_HOME_SIG in content:
    content = content.replace(OLD_HOME_SIG, NEW_HOME_SIG, 1)

    # Add the viewer render at the top of PythonCourseHome return
    OLD_HOME_RETURN = "const isMobile = window.innerWidth <= 480;\n  return ("
    NEW_HOME_RETURN = """const isMobile = window.innerWidth <= 480;
  if (showPresentation) {
    return <PresentationViewer user={user} onClose={() => setShowPresentation(false)} />;
  }
  return ("""
    if OLD_HOME_RETURN in content:
        content = content.replace(OLD_HOME_RETURN, NEW_HOME_RETURN, 1)
        steps.append("6. Wired PresentationViewer into PythonCourseHome")
else:
    print("WARNING: Could not update PythonCourseHome")

# ── STEP 7: Add deleteDoc import if missing ────────────────────────────────
if "deleteDoc" not in content:
    content = content.replace(
        "import { setDoc, doc,",
        "import { setDoc, doc, deleteDoc,",
        1
    )
    steps.append("7. Added deleteDoc import")
else:
    steps.append("7. deleteDoc already imported")

# ── Write back ─────────────────────────────────────────────────────────────
with open(FILE, 'w') as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\n✅ APPLIED:")
for s in steps: print(f"   {s}")
print("""
Also add these Firestore rules in Firebase Console:

  match /presentation/{docId} {
    allow read: if request.auth != null;
    allow write: if request.auth.token.email == "nkhadar@gmail.com";
  }
  match /presentation_exits/{uid} {
    allow read, delete: if request.auth.token.email == "nkhadar@gmail.com";
    allow write: if request.auth != null && request.auth.uid == uid;
  }

Next steps:
  1. npm run build
  2. If clean: git add -A && git commit -m 'Add live presentation system' && git push
  3. In Firebase Console → Firestore → Rules → add the rules above
  4. Share a Google Slides with "Anyone with link can view"
  5. Admin: go to Admin → Presentation tab, paste URL, click Start
  6. Students: see the orange Live banner on the Python course home page
""")
