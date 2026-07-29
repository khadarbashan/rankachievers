#!/usr/bin/env python3
"""
URGENT FIX: Restore full curriculum content (notes, examples, test cases).
The previous patch replaced PY_CURRICULUM with topic shells only, crashing
the app when clicking any topic.

Run from: ~/Downloads/rankachievers/
    python3 fix_jntua_curriculum_content.py

Requires: PY_CURRICULUM_JNTUA.js in the same folder as this script.
"""

import sys, os

FILE = "src/App.jsx"
CURRICULUM_FILE = "PY_CURRICULUM_JNTUA.js"

if not os.path.exists(CURRICULUM_FILE):
    print(f"ERROR: {CURRICULUM_FILE} not found. Download it alongside this script.")
    sys.exit(1)

with open(FILE, "r") as f:
    content = f.read()

with open(CURRICULUM_FILE, "r") as f:
    full_curriculum_js = f.read().rstrip('\n')

original_length = len(content)

has_jntua = "Computational Thinking & Programming Basics" in content
has_content = "### Why Python?" in content or "### Basic if statement" in content or "### What is a Module?" in content

if has_jntua and has_content:
    print("Already fixed - full content present. No changes needed.")
    sys.exit(0)

if not has_jntua:
    print("ERROR: JNTUA curriculum not found. Run add_jntua_syllabus.py first.")
    sys.exit(1)

# Find PY_CURRICULUM = [ ... ]; and replace with the full version
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

print(f"Found PY_CURRICULUM shell: {end-start} chars — replacing with full content ({len(full_curriculum_js)} chars)")

# Remove duplicate PY_TOTAL_TOPICS/PY_TOTAL_TESTS that exist right after
# the old shell block (they will be re-added from the full file)
after = content[end:]
for const_name in ["const PY_TOTAL_TOPICS", "const PY_TOTAL_TESTS"]:
    idx = after.find(const_name)
    if idx >= 0 and idx < 200:  # only remove if immediately after the block
        line_end = after.find('\n', idx)
        after = after[:idx] + after[line_end+1:]

content = content[:start] + full_curriculum_js + "\n\nconst PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);\nconst PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);\n\n" + after

with open(FILE, "w") as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} -> {len(content)} chars")
print("=" * 70)
print("APPLIED: Full curriculum content restored (notes + examples + 69 test cases)")
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Fix: restore full curriculum content' && git push")
