#!/usr/bin/env python3
"""
Add Python Course toggle to Rank Achievers Admin Panel.

Run from: ~/Downloads/rankachievers/
    python3 add_python_course.py

What this does:
  1. Adds `pythonCourseMode` to the global settings doc (same doc as your
     existing Free/Paid contentMode toggle — no new Firestore collection,
     no new Firestore rule needed).
  2. Adds a toggle switch to the AdminPage Settings tab, styled to match
     your existing Free/Paid Mode switch.
  3. Adds a top-level gate in App() — when pythonCourseMode is ON, the
     entire site (Home/Tests/Notes/Dashboard) is replaced by the new
     Python course UI (with its own home page). Admin stays reachable.
     When OFF, your site renders exactly as it does today.
  4. Appends the full Python course component tree (curriculum data,
     Pyodide-powered code runner, course home page, topic viewer) at the
     end of App.jsx.

Safe to re-run: every step checks if it's already applied before patching.
"""

import re
import sys

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — AdminPage: add pythonCourseMode toggle next to contentMode
# ══════════════════════════════════════════════════════════════════════════
old_toggle_mode = '''  const toggleMode=async()=>{
    const nm={...settings,contentMode:settings.contentMode==="free"?"paid":"free"};
    setSettingsState(nm);await setSettings(nm);
  };'''

new_toggle_mode = '''  const toggleMode=async()=>{
    const nm={...settings,contentMode:settings.contentMode==="free"?"paid":"free"};
    setSettingsState(nm);await setSettings(nm);
  };

  const togglePythonCourse=async()=>{
    const nm={...settings,pythonCourseMode:!settings.pythonCourseMode};
    setSettingsState(nm);await setSettings(nm);
  };'''

if "togglePythonCourse" not in content:
    if old_toggle_mode not in content:
        print("❌ STEP 1 FAILED: could not find toggleMode function in AdminPage. Aborting — no changes written.")
        sys.exit(1)
    content = content.replace(old_toggle_mode, new_toggle_mode, 1)
    steps_applied.append("1. Added togglePythonCourse() to AdminPage")
else:
    steps_skipped.append("1. togglePythonCourse() already present")


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — AdminPage Settings tab: add the toggle switch UI
#   Inserted right above the existing Content Access Settings card.
# ══════════════════════════════════════════════════════════════════════════
settings_tab_anchor = '''      {tab==="settings"&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>Content Access Settings</h3>'''

python_toggle_ui = '''      {tab==="settings"&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:28,border:"2px solid #f0f0f0",marginBottom:20}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>🐍 Python Course Mode</h3>
          <p style={{color:"#888",fontSize:13,marginBottom:18}}>Firebase-backed — changes apply instantly for all visitors, no redeploy needed.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",background:settings.pythonCourseMode?"#fff5ee":"#f0fdf4",borderRadius:14,border:"2px solid",borderColor:settings.pythonCourseMode?"#FF6A00":"#86efac"}}>
            <div>
              <div style={{fontWeight:900,fontSize:17,color:settings.pythonCourseMode?"#FF6A00":"#16a34a"}}>{settings.pythonCourseMode?"🐍 Python Course — Showing to everyone":"🏠 Previous Site — Showing to everyone"}</div>
              <div style={{color:"#888",fontSize:13,marginTop:3}}>{settings.pythonCourseMode?"All visitors see the Python course home page and lessons instead of the exam platform.":"Your exam platform (Home, Tests, Notes, Dashboard) is showing exactly as before."}</div>
            </div>
            <div onClick={togglePythonCourse} style={{width:60,height:32,borderRadius:16,background:settings.pythonCourseMode?"#FF6A00":"#ccc",position:"relative",cursor:"pointer",transition:"background .3s",flexShrink:0,marginLeft:20}}>
              <div style={{position:"absolute",top:3,left:settings.pythonCourseMode?31:3,width:26,height:26,borderRadius:"50%",background:"#fff",transition:"left .3s",boxShadow:"0 2px 6px #00000030"}}/>
            </div>
          </div>
        </div>
      )}

      {tab==="settings"&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>Content Access Settings</h3>'''

if "Python Course Mode" not in content:
    if settings_tab_anchor not in content:
        print("❌ STEP 2 FAILED: could not find Settings tab anchor. Aborting — no changes written.")
        sys.exit(1)
    content = content.replace(settings_tab_anchor, python_toggle_ui, 1)
    steps_applied.append("2. Added Python Course toggle switch to Admin Settings tab")
else:
    steps_skipped.append("2. Python Course toggle UI already present in Settings tab")


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — AdminPage: default settings useState should include pythonCourseMode:false
# ══════════════════════════════════════════════════════════════════════════
old_admin_settings_state = '  const [settings,setSettingsState]=useState({contentMode:"free"});'
new_admin_settings_state = '  const [settings,setSettingsState]=useState({contentMode:"free",pythonCourseMode:false});'

count_state_decls = content.count(old_admin_settings_state)
if count_state_decls > 0:
    content = content.replace(old_admin_settings_state, new_admin_settings_state)
    steps_applied.append(f"3. Updated {count_state_decls} settings useState default(s) to include pythonCourseMode:false")
else:
    steps_skipped.append("3. settings useState default already updated (or pattern not found — check manually)")


# ══════════════════════════════════════════════════════════════════════════
# STEP 4 — getSettings() global helper: default should include pythonCourseMode:false
# ══════════════════════════════════════════════════════════════════════════
old_get_settings = '''async function getSettings(){
  const snap=await getDoc(doc(db,"settings","global"));
  return snap.exists()?snap.data():{contentMode:"free"};
}'''
new_get_settings = '''async function getSettings(){
  const snap=await getDoc(doc(db,"settings","global"));
  return snap.exists()?snap.data():{contentMode:"free",pythonCourseMode:false};
}'''

if old_get_settings in content:
    content = content.replace(old_get_settings, new_get_settings, 1)
    steps_applied.append("4. Updated getSettings() fallback default to include pythonCourseMode:false")
elif "pythonCourseMode:false" in content and 'getDoc(doc(db,"settings","global"))' in content:
    steps_skipped.append("4. getSettings() already updated")
else:
    print("⚠️  STEP 4 WARNING: could not find getSettings() function exactly as expected.")
    print("   This is non-critical (Firestore docs missing the field will just read pythonCourseMode as undefined,")
    print("   which is falsy and behaves the same as false). Continuing.")


# ══════════════════════════════════════════════════════════════════════════
# STEP 5 — App(): load global settings + gate the entire render tree
# ══════════════════════════════════════════════════════════════════════════
old_app_state_block = '''  const {user:fbUser, setUser:setFbUser, justLoggedIn, clearJustLoggedIn} = useAuth();
  const examTypes = useExamTypes(); // live from Firestore
  const [page,setPage]   = useState("home");'''

new_app_state_block = '''  const {user:fbUser, setUser:setFbUser, justLoggedIn, clearJustLoggedIn} = useAuth();
  const examTypes = useExamTypes(); // live from Firestore
  const [page,setPage]   = useState("home");
  const [siteSettings,setSiteSettings] = useState(null); // null = still loading
  useEffect(()=>{
    const unsub=onSnapshot(doc(db,"settings","global"),d=>{
      setSiteSettings(d.exists()?d.data():{contentMode:"free",pythonCourseMode:false});
    });
    return unsub;
  },[]);'''

if "siteSettings" not in content:
    if old_app_state_block not in content:
        print("❌ STEP 5a FAILED: could not find App() state block anchor. Aborting — no changes written.")
        sys.exit(1)
    content = content.replace(old_app_state_block, new_app_state_block, 1)
    steps_applied.append("5a. Added live siteSettings listener to App()")
else:
    steps_skipped.append("5a. siteSettings listener already present in App()")

# Insert the gate right after the "test" full-screen early-return, before the main return.
old_test_gate = '''  // ── Full-screen test (no navbar) ──
  if(page==="test" && activeTest){
    return(
      <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        <TestPage test={activeTest} user={fbUser} onFinish={handleFinish}/>
      </div>
    );
  }

  return('''

new_test_gate = '''  // ── Full-screen test (no navbar) ──
  if(page==="test" && activeTest){
    return(
      <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        <TestPage test={activeTest} user={fbUser} onFinish={handleFinish}/>
      </div>
    );
  }

  // ── PYTHON COURSE MODE GATE ──
  // When enabled in Admin → Settings, the entire site is replaced by the
  // Python course UI for all visitors. Admin stays reachable so it can
  // always be switched back off. Controlled live via Firestore — no redeploy.
  if(siteSettings?.pythonCourseMode && page!=="admin"){
    return <PythonCourseShell isAdmin={fbUser?.role==="admin"} onExitToAdmin={()=>setPage("admin")}/>;
  }

  return('''

if "PYTHON COURSE MODE GATE" not in content:
    if old_test_gate not in content:
        print("❌ STEP 5b FAILED: could not find the test-page early-return anchor. Aborting — no changes written.")
        sys.exit(1)
    content = content.replace(old_test_gate, new_test_gate, 1)
    steps_applied.append("5b. Added Python Course gate before App()'s main return")
else:
    steps_skipped.append("5b. Python Course gate already present")

# Also let admin always reach AdminPage regardless of mode (it already does via
# page==="admin" in the normal render tree below — the gate above already
# special-cases page!=="admin", so when an admin clicks the in-course "⚙️ Admin"
# button (setPage("admin")), the gate is skipped and the normal render path
# below shows AdminPage as usual). No further change needed here.


# ══════════════════════════════════════════════════════════════════════════
# STEP 6 — Append the Python course component tree at the end of the file
# ══════════════════════════════════════════════════════════════════════════
with open("python_course_block.jsx", "r") as f:
    PYTHON_BLOCK = f.read()

if "function PythonCourseShell" not in content:
    content = content.rstrip("\n") + "\n" + PYTHON_BLOCK + "\n"
    steps_applied.append("6. Appended Python course component tree (curriculum, runner, UI) to end of file")
else:
    steps_skipped.append("6. Python course component tree already present")


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
print("  2. If it builds clean: git add -A && git commit -m 'Add Python course toggle to Admin' && git push")
print("  3. Open your site → Login as admin → Admin → Settings tab → flip '🐍 Python Course Mode' ON")
print("  4. Open the site in an incognito window to confirm visitors see the Python course")
print("  5. Flip it back OFF to confirm your original site returns exactly as before")
