#!/usr/bin/env python3
"""Fix the JSX syntax error — wrap the presentation tab in {..} and place correctly."""
import sys

FILE = "src/App.jsx"
with open(FILE) as f:
    content = f.read()

original_length = len(content)

# The bad insertion looks like:
#            </div>
#          )
#              {tab==="presentation" && (
#                <PresentationAdminPanel fbUser={fbUser} />
#              )}
#
# Fix: remove the bad insertion, then find the correct place

BAD = """\n            {tab===\"presentation\" && (\n              <PresentationAdminPanel fbUser={fbUser} />\n            )}"""

if BAD not in content:
    print("Bad block not found — checking alternate whitespace...")
    # Try finding it another way
    idx = content.find('tab==="presentation"')
    if idx == -1:
        print("ERROR: Cannot find presentation tab block at all")
        sys.exit(1)
    # Show context
    print("Found at index", idx)
    print("Context:", repr(content[idx-50:idx+150]))
    sys.exit(1)

# Remove the bad insertion first
content = content.replace(BAD, "", 1)
print("Step 1: Removed bad insertion")

# Now find the correct place — inside the admin tab content area
# Look for the pyactivity tab render: it's inside a {tab==="pyactivity" && (...)}
# We need to insert AFTER this whole block but INSIDE the parent JSX container

# Find the pyactivity block
pyact_idx = content.find('tab==="pyactivity"')
if pyact_idx == -1:
    print("ERROR: Cannot find pyactivity tab block")
    sys.exit(1)

# Find the && ( after it
amp_idx = content.find('&& (', pyact_idx)
# Count parens to find the matching close
depth = 0
i = content.index('(', amp_idx)
while i < len(content):
    if content[i] == '(': depth += 1
    elif content[i] == ')':
        depth -= 1
        if depth == 0:
            end_paren = i
            break
    i += 1

# The block ends at end_paren + 1
# We need to insert AFTER the closing } of the surrounding {tab==="pyactivity" && (...)}
# Find the } that closes the outer {} wrapper
close_brace = content.find('}', end_paren + 1)

# Insert right after the closing }
PRESENTATION_RENDER = """\n            {tab===\"presentation\" && (\n              <PresentationAdminPanel fbUser={fbUser} />\n            )}"""

content = content[:close_brace + 1] + PRESENTATION_RENDER + content[close_brace + 1:]
print("Step 2: Inserted presentation tab block in correct position")

# Verify the syntax context
insert_pos = content.find('tab==="presentation"')
context = content[insert_pos - 100:insert_pos + 150]
print("\nContext around insertion:")
print(context)

with open(FILE, 'w') as f:
    f.write(content)

print("\n" + "=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\nRun: npm run build")
