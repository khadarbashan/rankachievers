#!/usr/bin/env python3
"""
Live Code Share System:
  - Admin clicks "Share Screen" on any student in Python Activity tab
  - That student's code broadcasts live (read-only) to all other users
  - Floating overlay appears on every student's screen showing the code
  - Updates every ~4 seconds as the student types
  - Admin clicks "Stop Sharing" to end

Run from: ~/Downloads/rankachievers/
    python3 add_codeshare.py

Requires: codeshare_block.jsx in the same folder.
"""

import sys, os

FILE = "src/App.jsx"
BLOCK_FILE = "codeshare_block.jsx"

if not os.path.exists(BLOCK_FILE):
    print(f"ERROR: {BLOCK_FILE} not found alongside this script.")
    sys.exit(1)

with open(FILE) as f:
    content = f.read()
with open(BLOCK_FILE) as f:
    BLOCK = f.read()

original_length = len(content)
steps = []

if "LiveCodeOverlay" in content:
    print("Already applied.")
    sys.exit(0)

# ── STEP 1: Insert components before PythonCourseShell ────────────────────
marker = "function PythonCourseShell("
if marker not in content:
    print("ERROR: Cannot find PythonCourseShell"); sys.exit(1)
idx = content.index(marker)
content = content[:idx] + "\n" + BLOCK + "\n" + content[idx:]
steps.append("1. Inserted ShareCodeButton, LiveCodeOverlay, useCodeShareSync components")

# ── STEP 2: Add code share state + sync hook to PyActivityAdminTab ────────
# Find PyActivityAdminTab and add shared state tracking
OLD_ACTIVITY_FN = "function PyActivityAdminTab() {"
NEW_ACTIVITY_FN = """function PyActivityAdminTab() {
  const [codeShareData, setCodeShareData] = useState(null);

  // Watch who is currently being shared
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'code_share', 'live'), snap => {
      if (snap.exists() && snap.data().isSharing) setCodeShareData(snap.data());
      else setCodeShareData(null);
    });
    return unsub;
  }, []);

  // Sync the shared student's latest code to code_share/live
  useCodeShareSync(codeShareData?.uid, codeShareData?.isSharing);"""

if OLD_ACTIVITY_FN in content:
    content = content.replace(OLD_ACTIVITY_FN, NEW_ACTIVITY_FN, 1)
    steps.append("2. Added code share state + sync hook to PyActivityAdminTab")
else:
    print("WARNING: Could not find PyActivityAdminTab function")

# ── STEP 3: Add Share button to each student card in admin activity tab ────
# Find where the student card action buttons are rendered
# Look for the expandedUid === a.uid pattern to find the card and add button
OLD_CARD_CLOSE = """            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
                  UID: {a.uid}
                </div>"""

NEW_CARD_CLOSE = """            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
                  UID: {a.uid}
                </div>
                <div style={{ marginTop: 10 }}>
                  <ShareCodeButton
                    student={a}
                    isCurrentlyShared={codeShareData?.uid === a.uid && codeShareData?.isSharing}
                    fbUser={fbUser}
                  />
                </div>"""

if OLD_CARD_CLOSE in content:
    content = content.replace(OLD_CARD_CLOSE, NEW_CARD_CLOSE, 1)
    steps.append("3. Added Share Screen button to each student card in Activity tab")
else:
    # Try alternate anchor — the UID line might look different
    OLD_CARD_CLOSE2 = 'UID: {a.uid}'
    if OLD_CARD_CLOSE2 in content:
        idx2 = content.index(OLD_CARD_CLOSE2)
        # Find the closing </div> after this
        closing_idx = content.find('</div>', idx2)
        if closing_idx > 0:
            insert_after = closing_idx + 6
            SHARE_BTN = """\n                <div style={{ marginTop: 10 }}>
                  <ShareCodeButton
                    student={a}
                    isCurrentlyShared={codeShareData?.uid === a.uid && codeShareData?.isSharing}
                    fbUser={fbUser}
                  />
                </div>"""
            content = content[:insert_after] + SHARE_BTN + content[insert_after:]
            steps.append("3. Added Share Screen button to student cards (alternate anchor)")
        else:
            print("WARNING: Could not add Share button to student cards")
    else:
        print("WARNING: Could not find student card UID line")

# ── STEP 4: Add fbUser prop to PyActivityAdminTab call site ───────────────
OLD_ACTIVITY_CALL = "<PyActivityAdminTab />"
NEW_ACTIVITY_CALL = "<PyActivityAdminTab fbUser={fbUser} />"

if OLD_ACTIVITY_CALL in content:
    content = content.replace(OLD_ACTIVITY_CALL, NEW_ACTIVITY_CALL, 1)
    steps.append("4. Passed fbUser to PyActivityAdminTab")
else:
    # Already has props or different format
    steps.append("4. PyActivityAdminTab call — fbUser may already be passed")

# ── STEP 5: Update PyActivityAdminTab signature to accept fbUser ──────────
OLD_ACTIVITY_SIG = "function PyActivityAdminTab() {"
if OLD_ACTIVITY_SIG in content:
    content = content.replace(OLD_ACTIVITY_SIG,
        "function PyActivityAdminTab({ fbUser }) {", 1)
    steps.append("5. Updated PyActivityAdminTab to accept fbUser prop")

# ── STEP 6: Add LiveCodeOverlay to PythonCourseShell ─────────────────────
# PythonCourseShell wraps the entire Python course UI — add overlay here
OLD_SHELL_RETURN = "return (\n    <div style={{ display: \"flex\", height: \"100vh\""
NEW_SHELL_RETURN = """return (
    <div style={{ display: "flex", height: "100vh\""""

# Find the PythonCourseShell return statement more carefully
import re
shell_match = re.search(r'(function PythonCourseShell[^{]*\{[^}]*return\s*\()', content)
if shell_match:
    # Find the return ( inside PythonCourseShell
    shell_start = content.find("function PythonCourseShell(")
    # Find the main wrapper div after return
    search_from = shell_start
    return_idx = content.find("return (", search_from)
    if return_idx > 0 and return_idx < shell_start + 5000:
        # Find the opening <div after return (
        div_idx = content.find("<div", return_idx)
        if div_idx > 0:
            # Find the closing > of this outer div opening tag
            tag_end = content.find(">", div_idx)
            if tag_end > 0:
                OVERLAY_INSERT = "\n      <LiveCodeOverlay currentUser={user} />"
                content = content[:tag_end+1] + OVERLAY_INSERT + content[tag_end+1:]
                steps.append("6. Added LiveCodeOverlay to PythonCourseShell (shows for all students)")
            else:
                print("WARNING: Could not find outer div tag end in PythonCourseShell")
        else:
            print("WARNING: Could not find div in PythonCourseShell return")
    else:
        print("WARNING: Could not find return in PythonCourseShell")
else:
    print("WARNING: Could not find PythonCourseShell return pattern")

# ── Write back ─────────────────────────────────────────────────────────────
with open(FILE, 'w') as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\n✅ APPLIED:")
for s in steps: print(f"   {s}")

print("""
Add these Firestore rules (Firebase Console → Firestore → Rules):

  match /code_share/{docId} {
    allow read: if request.auth != null;
    allow write: if request.auth.token.email == "nkhadar@gmail.com";
  }

Next steps:
  1. npm run build
  2. If clean: git add -A && git commit -m 'Add live code share for classroom' && git push

How to use:
  1. Admin → Python Activity tab
  2. Click on any active student card to expand it
  3. Click "📡 Share Screen" button
  4. All other students see a floating overlay with that student's code
  5. Code updates live as the student types
  6. Click "Stop Sharing" to end the broadcast
""")
