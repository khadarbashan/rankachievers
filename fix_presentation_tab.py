#!/usr/bin/env python3
"""
Fix: Presentation tab content not rendering in Admin panel.
The previous patch couldn't find the settings tab anchor to insert before.
This patch finds the correct anchor and inserts the PresentationAdminPanel render.

Run from: ~/Downloads/rankachievers/
    python3 fix_presentation_tab.py
"""
import sys, re

FILE = "src/App.jsx"
with open(FILE) as f:
    content = f.read()

original_length = len(content)

# Already fixed?
if 'tab==="presentation"' in content and 'PresentationAdminPanel' in content:
    # Check if both exist — if so, verify the render is wired
    if 'tab==="presentation" && (\n              <PresentationAdminPanel' in content:
        print("Already fixed — Presentation tab content is already wired.")
        sys.exit(0)

# ── Find where pyactivity tab content is rendered ─────────────────────────
# Pattern: tab==="pyactivity" && ( ... )
# We'll insert our tab render right after it

# Find the pyactivity tab render block
pyact_pattern = 'tab==="pyactivity"'
if pyact_pattern not in content:
    print("ERROR: Cannot find pyactivity tab render. Aborting.")
    sys.exit(1)

pyact_idx = content.index(pyact_pattern)

# Find the closing of this tab block — look for the next top-level "})" or "&&" at same indent
# Simpler: find where this entire conditional block ends by bracket matching
# The block is: tab==="pyactivity" && ( <PyActivityAdminTab ... /> )
# Find the matching ) after &&
amp_idx = content.find('&& (', pyact_idx)
if amp_idx == -1:
    amp_idx = content.find('&&(', pyact_idx)

# Find matching closing paren
depth = 0
i = content.index('(', amp_idx)
start_paren = i
while i < len(content):
    if content[i] == '(': depth += 1
    elif content[i] == ')':
        depth -= 1
        if depth == 0:
            end_paren = i
            break
    i += 1

block_end = end_paren + 1
# Skip optional }
while block_end < len(content) and content[block_end] in ' \n': 
    block_end += 1

# Insert presentation tab render right after the pyactivity block
PRESENTATION_RENDER = """
            {tab==="presentation" && (
              <PresentationAdminPanel fbUser={fbUser} />
            )}"""

# Check if already inserted
if 'tab==="presentation"' in content:
    print("Presentation tab conditional already exists — checking if PresentationAdminPanel is wired...")
    if 'PresentationAdminPanel fbUser={fbUser}' in content:
        print("Already fully wired. No changes needed.")
        sys.exit(0)
    # Replace the existing empty presentation tab block
    content = re.sub(
        r'tab==="presentation"\s*&&\s*\([^)]*\)',
        'tab==="presentation" && (\n              <PresentationAdminPanel fbUser={fbUser} />\n            )',
        content, count=1
    )
    print("Fixed: replaced empty presentation tab block with PresentationAdminPanel")
else:
    content = content[:block_end] + PRESENTATION_RENDER + content[block_end:]
    print("Fixed: inserted PresentationAdminPanel render after pyactivity tab block")

# ── Also ensure fbUser is available in the Admin component scope ──────────
# The admin panel uses fbUser — check it's in scope where we inserted
# (it should be since PyActivityAdminTab and Settings both use it)

with open(FILE, 'w') as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Fix: Presentation tab content rendering' && git push")
print("  3. Click Admin → Presentation tab — should now show the URL input and controls")
