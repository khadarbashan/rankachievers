#!/usr/bin/env python3
"""
Replaces PY_CURRICULUM with 51 individual sub-sub-topics (one per
numbered item from the syllabus document), each with dedicated notes,
code examples, and test cases. Also updates the sidebar structure to
show the exact numbered hierarchy (1.1.1, 1.1.2 ... 5.4.3).

Run from: ~/Downloads/rankachievers/
    python3 add_full_curriculum.py

Requires: PY_CURRICULUM_FULL.js in the same folder.
"""

import sys, os

FILE = "src/App.jsx"
CURRICULUM_FILE = "PY_CURRICULUM_FULL.js"

if not os.path.exists(CURRICULUM_FILE):
    print(f"ERROR: {CURRICULUM_FILE} not found. Download it alongside this script.")
    sys.exit(1)

with open(FILE) as f:
    content = f.read()

with open(CURRICULUM_FILE) as f:
    new_curriculum_js = f.read().rstrip('\n')

original_length = len(content)
steps_applied = []
steps_skipped = []

# ── Check if already applied ──────────────────────────────────────────────
already_done = "1.1.1 — Characteristics" in content

# ── STEP 1: Replace PY_CURRICULUM block ───────────────────────────────────
if already_done:
    steps_skipped.append("1. Full curriculum already applied")
else:
    start = content.find("const PY_CURRICULUM = [")
    if start == -1:
        print("ERROR: Cannot find PY_CURRICULUM"); sys.exit(1)

    depth, i = 0, start
    while i < len(content):
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                while end < len(content) and content[end] in ';\n': end += 1
                break
        i += 1

    # Remove immediately-following PY_TOTAL_ declarations (will be re-added)
    after = content[end:]
    for cn in ["const PY_TOTAL_TOPICS", "const PY_TOTAL_TESTS"]:
        idx = after.find(cn)
        if 0 <= idx < 300:
            le = after.find('\n', idx)
            after = after[:idx] + after[le+1:]

    content = content[:start] + new_curriculum_js + "\n\n" + after
    steps_applied.append(f"1. Replaced PY_CURRICULUM with {51} sub-sub-topics (116 test cases)")

# ── STEP 2: Insert updated sidebar structure ──────────────────────────────
SIDEBAR_JS = """
// ─── EXACT NUMBERED SIDEBAR STRUCTURE (matches syllabus document) ────────────
const PY_SIDEBAR_STRUCTURE = {
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
};

"""

SIDEBAR_RENDER = """              {open && (
                <div style={{ paddingBottom: 6 }}>
                  {(PY_SIDEBAR_STRUCTURE[unit.id] || []).map((section, si) => (
                    <div key={si}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 10px 4px", marginTop: si>0 ? 4 : 0 }}>
                        <span style={{ fontSize:9.5, fontWeight:800, color:"rgba(255,154,0,0.8)", minWidth:24 }}>{section.num}</span>
                        <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:".03em" }}>{section.label}</span>
                      </div>
                      {section.items.map((item, ii) => {
                        const isActive = activeTopicId === item.topicId;
                        return (
                          <button key={ii} onClick={() => goTopic(item.topicId)} style={{
                            display:"flex", alignItems:"flex-start", gap:6, width:"100%",
                            textAlign:"left", padding:"5px 10px 5px 10px", marginBottom:1,
                            borderRadius:7, border:"none", cursor:"pointer",
                            background: isActive ? "rgba(255,106,0,0.13)" : "transparent",
                            borderLeft: isActive ? "2px solid #FF6A00" : "2px solid transparent",
                          }}>
                            <span style={{ fontSize:9, fontWeight:700, color: isActive?"#FF6A00":"rgba(255,154,0,0.5)", minWidth:30, paddingTop:1, flexShrink:0 }}>{item.num}</span>
                            <span style={{ fontSize:11.5, color: isActive?"#FF6A00":"rgba(255,255,255,0.6)", fontWeight: isActive?700:400, lineHeight:1.4 }}>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}"""

OLD_SIDEBAR = """              {open && (
                <div style={{ paddingLeft: 8, marginBottom: 8 }}>
                  {unit.topics.map(topic => (
                    <button key={topic.id} onClick={() => goTopic(topic.id)} style={{
                      display: \"block\", width: \"100%\", textAlign: \"left\", padding: \"8px 12px\", marginBottom: 2, borderRadius: 8, border: \"none\", cursor: \"pointer\",
                      background: activeTopicId === topic.id ? \"rgba(255,106,0,0.15)\" : \"transparent\",
                      color: activeTopicId === topic.id ? \"#FF6A00\" : \"rgba(255,255,255,0.65)\",
                      fontWeight: activeTopicId === topic.id ? 700 : 500, fontSize: 12.5,
                    }}>{topic.title}</button>
                  ))}
                </div>
              )}"""

if "PY_SIDEBAR_STRUCTURE" in content:
    steps_skipped.append("2. Sidebar structure already present")
else:
    # Insert sidebar data before PythonCourseShell
    marker = "function PythonCourseShell("
    if marker not in content:
        print("ERROR: Cannot find PythonCourseShell"); sys.exit(1)
    idx = content.index(marker)
    content = content[:idx] + SIDEBAR_JS + content[idx:]

    # Replace sidebar rendering
    if OLD_SIDEBAR in content:
        content = content.replace(OLD_SIDEBAR, SIDEBAR_RENDER, 1)
        steps_applied.append("2. Updated sidebar with numbered hierarchy (1.1.1 through 5.4.3)")
    else:
        steps_applied.append("2. Inserted PY_SIDEBAR_STRUCTURE (sidebar render already updated)")

# ── Write back ────────────────────────────────────────────────────────────
with open(FILE, 'w') as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
if steps_applied:
    print("\n✅ APPLIED:")
    for s in steps_applied: print(f"   {s}")
if steps_skipped:
    print("\n⏭️  SKIPPED:")
    for s in steps_skipped: print(f"   {s}")

print("""
Sidebar now shows the exact numbered structure from the document:
  1.1  Computational thinking
       1.1.1  Characteristics
       1.1.2  Problem-solving strategies
       ...
       1.1.7  Abstraction, decomposition, pattern recognition...
  1.2  Introduction to Python
       1.2.1  Installation and execution environment
       ...
       1.2.6  Operator precedence
  2.1  Decision control statements  ...  5.4.3  OOP Applications

Each numbered item has its own dedicated notes and code examples.

Next steps:
  1. npm run build
  2. If clean: git add -A && git commit -m 'Full syllabus: 51 topics, 116 tests, numbered sidebar' && git push
""")
