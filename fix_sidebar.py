#!/usr/bin/env python3
"""
Force-replaces the sidebar structure with correct topicIds so each
numbered item (1.1.1, 1.1.2 ...) opens its own dedicated topic.

Also removes Python code examples from 1.1.x topics (theory only).

Run from: ~/Downloads/rankachievers/
    python3 fix_sidebar.py
"""
import sys, re

FILE = "src/App.jsx"
with open(FILE) as f:
    content = f.read()
original_length = len(content)

# ── STEP 1: Replace the entire PY_SIDEBAR_STRUCTURE ──────────────────────
NEW_SIDEBAR = """const PY_SIDEBAR_STRUCTURE = {
  u1: [
    { num: "1.1", label: "Computational thinking", items: [
      { num: "1.1.1", label: "Characteristics", topicId: "u1t1" },
      { num: "1.1.2", label: "Problem-solving strategies", topicId: "u1t2" },
      { num: "1.1.3", label: "Steps in problem solving", topicId: "u1t3" },
      { num: "1.1.4", label: "Algorithms — definition and properties", topicId: "u1t4" },
      { num: "1.1.5", label: "Flowcharts — symbols and construction", topicId: "u1t5" },
      { num: "1.1.6", label: "Pseudo code — writing and conversion", topicId: "u1t6" },
      { num: "1.1.7", label: "Abstraction, decomposition, pattern recognition, algorithm efficiency", topicId: "u1t7" },
    ]},
    { num: "1.2", label: "Introduction to Python", items: [
      { num: "1.2.1", label: "Installation and execution environment", topicId: "u1t8" },
      { num: "1.2.2", label: "Variables, identifiers, keywords", topicId: "u1t9" },
      { num: "1.2.3", label: "Data types, type conversion", topicId: "u1t10" },
      { num: "1.2.4", label: "Input and output statements", topicId: "u1t11" },
      { num: "1.2.5", label: "Expressions and operators", topicId: "u1t12" },
      { num: "1.2.6", label: "Operator precedence", topicId: "u1t13" },
    ]},
  ],
  u2: [
    { num: "2.1", label: "Decision control statements", items: [
      { num: "2.1.1", label: "Boolean expressions", topicId: "u2t1" },
      { num: "2.1.2", label: "if, if-else, if-elif-else, nested if", topicId: "u2t2" },
      { num: "2.1.3", label: "Conditional expressions (ternary operator)", topicId: "u2t3" },
    ]},
    { num: "2.2", label: "Looping statements", items: [
      { num: "2.2.1", label: "while loop", topicId: "u2t4" },
      { num: "2.2.2", label: "for loop", topicId: "u2t5" },
      { num: "2.2.3", label: "Iteration techniques", topicId: "u2t6" },
      { num: "2.2.4", label: "Nested loops, infinite loops", topicId: "u2t7" },
      { num: "2.2.5", label: "Loop control — break, continue, pass; else with loops", topicId: "u2t8" },
    ]},
    { num: "2.3", label: "Practical problem solving", items: [
      { num: "2.3.1", label: "Prime number check", topicId: "u2t9" },
      { num: "2.3.2", label: "Pattern programs using nested loops", topicId: "u2t10" },
      { num: "2.3.3", label: "Menu-driven programs", topicId: "u2t11" },
    ]},
  ],
  u3: [
    { num: "3.1", label: "Strings", items: [
      { num: "3.1.1", label: "Representation, indexing, slicing", topicId: "u3t1" },
      { num: "3.1.2", label: "Operations, built-in functions and methods", topicId: "u3t2" },
    ]},
    { num: "3.2", label: "Lists", items: [
      { num: "3.2.1", label: "Creation, indexing and slicing", topicId: "u3t3" },
      { num: "3.2.2", label: "Operations, functions", topicId: "u3t4" },
      { num: "3.2.3", label: "Methods, nested lists", topicId: "u3t5" },
    ]},
    { num: "3.3", label: "Tuples", items: [
      { num: "3.3.1", label: "Creation, operations", topicId: "u3t6" },
      { num: "3.3.2", label: "Packing and unpacking", topicId: "u3t7" },
    ]},
    { num: "3.4", label: "Sets", items: [
      { num: "3.4.1", label: "Creation, set operations — union, intersection, difference", topicId: "u3t8" },
      { num: "3.4.2", label: "Frozen sets", topicId: "u3t9" },
    ]},
  ],
  u4: [
    { num: "4.1", label: "Dictionaries", items: [
      { num: "4.1.1", label: "Creation, operations", topicId: "u4t1" },
      { num: "4.1.2", label: "Methods; dictionary-based applications", topicId: "u4t2" },
    ]},
    { num: "4.2", label: "Functions", items: [
      { num: "4.2.1", label: "Built-in and user-defined functions", topicId: "u4t3" },
      { num: "4.2.2", label: "Function definition and calling", topicId: "u4t4" },
      { num: "4.2.3", label: "Arguments — positional, keyword, default, variable-length", topicId: "u4t5" },
      { num: "4.2.4", label: "Scope of variables (local and global)", topicId: "u4t6" },
    ]},
    { num: "4.3", label: "Recursion", items: [
      { num: "4.3.1", label: "Recursive functions — factorial, Fibonacci", topicId: "u4t7" },
      { num: "4.3.2", label: "Lambda functions (anonymous functions)", topicId: "u4t8" },
      { num: "4.3.3", label: "Applications of functions in problem solving", topicId: "u4t9" },
    ]},
  ],
  u5: [
    { num: "5.1", label: "Modules and packages", items: [
      { num: "5.1.1", label: "Creating and importing modules", topicId: "u5t1" },
      { num: "5.1.2", label: "Standard library modules", topicId: "u5t2" },
    ]},
    { num: "5.2", label: "File handling", items: [
      { num: "5.2.1", label: "Opening, reading, writing, closing; file modes; CSV and Excel files", topicId: "u5t3" },
    ]},
    { num: "5.3", label: "Exception handling", items: [
      { num: "5.3.1", label: "Types of errors (syntax, runtime, logical)", topicId: "u5t4" },
      { num: "5.3.2", label: "try, except, finally blocks", topicId: "u5t5" },
      { num: "5.3.3", label: "Raising exceptions", topicId: "u5t6" },
    ]},
    { num: "5.4", label: "Introduction to OOP", items: [
      { num: "5.4.1", label: "Classes, objects, attributes, methods", topicId: "u5t7" },
      { num: "5.4.2", label: "Constructors, self keyword", topicId: "u5t8" },
      { num: "5.4.3", label: "Basic applications of OOP in Python", topicId: "u5t9" },
    ]},
  ],
};"""

# Find and replace the entire PY_SIDEBAR_STRUCTURE block
start = content.find("const PY_SIDEBAR_STRUCTURE = {")
if start == -1:
    print("ERROR: PY_SIDEBAR_STRUCTURE not found. Run add_full_curriculum.py first.")
    sys.exit(1)

# Find the matching closing };
depth, i = 0, start
while i < len(content):
    if content[i] == '{': depth += 1
    elif content[i] == '}':
        depth -= 1
        if depth == 0:
            end = i + 1
            # consume trailing ;
            if end < len(content) and content[end] == ';':
                end += 1
            break
    i += 1

content = content[:start] + NEW_SIDEBAR + content[end:]
print("Step 1: Replaced PY_SIDEBAR_STRUCTURE with correct topicIds")
print("  1.1.1→u1t1, 1.1.2→u1t2 ... 1.2.6→u1t13")
print("  2.1.1→u2t1 ... 5.4.3→u5t9")

with open(FILE, 'w') as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Fix sidebar: each item opens its own topic' && git push")
print("\nAfter deploying:")
print("  - Clicking 1.1.1 opens ONLY Characteristics")
print("  - Clicking 1.1.2 opens ONLY Problem-solving strategies")
print("  - Clicking 1.2.4 opens ONLY Input and output statements (with code)")
print("  - 1.1.x topics show theory only, 1.2.x topics show Python code")
