#!/usr/bin/env python3
"""
Updates PY_CURRICULUM with notes content matching the uploaded syllabus document.
All 22 topics, 69 test cases — same topic IDs and sequence, updated notes.

Run from: ~/Downloads/rankachievers/
    python3 fix_jntua_curriculum_content.py

Requires: PY_CURRICULUM_JNTUA.js in the same folder.
"""
import sys, os

FILE = "src/App.jsx"
CURRICULUM_FILE = "PY_CURRICULUM_JNTUA.js"

if not os.path.exists(CURRICULUM_FILE):
    print(f"ERROR: {CURRICULUM_FILE} not found in current folder.")
    sys.exit(1)

with open(FILE, "r") as f:
    content = f.read()

with open(CURRICULUM_FILE, "r") as f:
    full_curriculum_js = f.read().rstrip('\n')

original_length = len(content)

# Check if content is already updated (look for syllabus-specific content)
if "Decomposition" in content and "Pattern Recognition" in content and "Abstraction" in content:
    print("Already updated — syllabus content already present. No changes needed.")
    sys.exit(0)

if "Computational Thinking & Programming Basics" not in content:
    print("ERROR: JNTUA curriculum structure not found. Run add_jntua_syllabus.py first.")
    sys.exit(1)

# Find and replace PY_CURRICULUM block
start = content.find("const PY_CURRICULUM = [")
if start == -1:
    print("ERROR: Cannot find PY_CURRICULUM. Aborting.")
    sys.exit(1)

depth = 0
i = start
while i < len(content):
    if content[i] == '[': depth += 1
    elif content[i] == ']':
        depth -= 1
        if depth == 0:
            end = i + 1
            while end < len(content) and content[end] in ';\n':
                end += 1
            break
    i += 1

print(f"Found PY_CURRICULUM: {end-start} chars — replacing with syllabus content ({len(full_curriculum_js)} chars)")

# Remove any PY_TOTAL_TOPICS/PY_TOTAL_TESTS immediately after the old block
after = content[end:]
for const_name in ["const PY_TOTAL_TOPICS", "const PY_TOTAL_TESTS"]:
    idx = after.find(const_name)
    if 0 <= idx < 300:
        line_end = after.find('\n', idx)
        after = after[:idx] + after[line_end+1:]

NEW_CONST = "\n\nconst PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);\nconst PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);\n\n"
content = content[:start] + full_curriculum_js + NEW_CONST + after

with open(FILE, "w") as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} -> {len(content)} chars")
print("=" * 70)
print("APPLIED: Syllabus-aligned content updated (22 topics, 69 test cases)")
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Update curriculum content to match JNTUA syllabus document' && git push")
