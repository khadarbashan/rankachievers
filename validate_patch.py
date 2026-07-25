"""
Validates that all 5 patch anchors exist in the real App.jsx on disk.
Run from ~/Downloads/rankachievers/:
    python3 validate_patch.py
"""
import sys
FILE = "src/App.jsx"
try:
    with open(FILE) as f:
        content = f.read()
except FileNotFoundError:
    print("❌ src/App.jsx not found — run from ~/Downloads/rankachievers/")
    sys.exit(1)

checks = [
    ("PY_CURRICULUM exists", "const PY_CURRICULUM = ["),
    ("PY_PLACEMENT_QUESTIONS exists", "const PY_PLACEMENT_QUESTIONS = {"),
    ("Old topic IDs still present (u6t1/u6t2)", '"u6t1":' in content or '"u6t2":' in content),
    ("JNTUA curriculum NOT yet applied", "Computational Thinking & Programming Basics" not in content),
    ("PythonCourseHome exists", "function PythonCourseHome("),
    ("PythonCourseShell PythonCourseHome call", "<PythonCourseHome onStart"),
    ("Hero section present", 'backgroundImage: "url(/images/khadar-basha.jpg)"'),
    ("onJoinClass prop present", "onJoinClass={onJoinClass}"),
    ("SyllabusAccordion NOT yet added", "SyllabusAccordion" not in content),
    ("PyPredictOutput component present", "function PyPredictOutput"),
]

all_ok = True
for label, check in checks:
    if isinstance(check, bool):
        ok = check
    else:
        ok = check in content
    status = "✅" if ok else "❌"
    print(f"{status} {label}")
    if not ok:
        all_ok = False

print()
if all_ok:
    print("✅ All checks passed — safe to run add_jntua_syllabus.py")
else:
    print("❌ Some checks failed — patch may not apply cleanly")
