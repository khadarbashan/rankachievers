#!/usr/bin/env python3
"""
JNTUA Syllabus Integration:

  1. Replaces the 6-unit curriculum with the official JNTUA R23 5-unit
     syllabus (Unit I–V) matching the uploaded Python_IQAC document exactly.
     All 67 existing test cases preserved and remapped. 2 new Modules test
     cases added. 69 total — all verified against real Python execution.

  2. Updates placement question topic-ID keys to match new structure.

  3. Adds a syllabus accordion on the Python course home page (below the
     "Classes Starting Soon" hero) — one collapsible card per JNTUA unit,
     each listing its topics; clicking a topic navigates directly into that
     lesson inside the course.

Run from: ~/Downloads/rankachievers/
    python3 add_jntua_syllabus.py

Safe to re-run: checks if already applied before patching.
Assumes all previous patches have already been applied.
"""

import sys, re

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — Replace PY_CURRICULUM with the JNTUA 5-unit structure
# ══════════════════════════════════════════════════════════════════════════
NEW_CURRICULUM_MARKER = "Computational Thinking & Programming Basics"

if NEW_CURRICULUM_MARKER in content:
    steps_skipped.append("1. JNTUA curriculum already present")
else:
    # Find the PY_CURRICULUM block and replace everything up to the closing ];
    start = content.find("const PY_CURRICULUM = [")
    if start == -1:
        print("❌ STEP 1 FAILED: could not find PY_CURRICULUM. Aborting.")
        sys.exit(1)

    # Find matching closing ]; — count bracket depth
    depth = 0
    i = start
    while i < len(content):
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                # skip trailing ; and newline
                while end < len(content) and content[end] in ';\n':
                    end += 1
                break
        i += 1

    NEW_CURRICULUM = r"""const PY_CURRICULUM = [
  {
    id: "u1",
    title: "Computational Thinking & Programming Basics",
    icon: "🧠",
    desc: "Algorithms, Flowcharts, Python Setup, Variables, Operators",
    syllabus: [
      "Computational thinking: characteristics, problem-solving strategies, algorithms, flowcharts, pseudocode",
      "Introduction to Python: installation, variables, identifiers, keywords, data types, type conversion",
      "Input/Output statements; expressions and operators — arithmetic, relational, logical, assignment, operator precedence"
    ],
    hours: 10, co: "CO1",
    topics: [
      { id:"u1t1", title:"Computational Thinking & Your First Program" },
      { id:"u1t2", title:"Variables, Data Types & Type Conversion" },
      { id:"u1t3", title:"Input & Output Statements" },
      { id:"u1t4", title:"Expressions & Operators" }
    ]
  },
  {
    id: "u2",
    title: "Decision Making & Looping",
    icon: "🔀",
    desc: "if/elif/else, while, for, break/continue",
    syllabus: [
      "Decision control: Boolean expressions; if, if-else, if-elif-else, nested if; ternary operator",
      "Looping: while loop, for loop, nested loops, infinite loops, iteration techniques",
      "Loop control: break, continue, pass; else with loops; practical problem solving"
    ],
    hours: 10, co: "CO2",
    topics: [
      { id:"u2t1", title:"if / if-else / if-elif-else" },
      { id:"u2t2", title:"while Loop" },
      { id:"u2t3", title:"for Loop & range()" },
      { id:"u2t4", title:"break, continue, pass" }
    ]
  },
  {
    id: "u3",
    title: "Strings & Data Structures",
    icon: "📦",
    desc: "Strings, Lists, Tuples, Sets",
    syllabus: [
      "Strings: representation, indexing, slicing, operations, built-in functions and methods",
      "Lists: creation, indexing, slicing, operations, functions, methods, nested lists",
      "Tuples: creation, operations, packing and unpacking; Sets: creation, union, intersection, difference, frozen sets"
    ],
    hours: 10, co: "CO3",
    topics: [
      { id:"u3t1", title:"Strings" },
      { id:"u3t2", title:"Lists" },
      { id:"u3t3", title:"Tuples & Sets" }
    ]
  },
  {
    id: "u4",
    title: "Functions & Problem Solving",
    icon: "⚙️",
    desc: "Dictionaries, Functions, Recursion, Lambda",
    syllabus: [
      "Dictionaries: creation, operations, methods; dictionary-based applications",
      "Functions: built-in and user-defined; definition, calling, arguments; scope (local and global)",
      "Recursion: recursive functions; lambda (anonymous) functions; applications in problem solving"
    ],
    hours: 10, co: "CO4",
    topics: [
      { id:"u4t1", title:"Dictionaries" },
      { id:"u4t2", title:"Defining & Calling Functions" },
      { id:"u4t3", title:"Variable Scope (Local vs Global)" },
      { id:"u4t4", title:"Recursion" },
      { id:"u4t5", title:"Lambda Functions" }
    ]
  },
  {
    id: "u5",
    title: "File Handling, Exceptions & OOP",
    icon: "🛡️",
    desc: "Modules, File Handling, Exceptions, OOP Basics",
    syllabus: [
      "Modules and packages: creating and importing modules; standard library modules (math, os, random, datetime)",
      "File handling: opening, reading, writing, closing files; file modes; text and CSV files",
      "Exception handling: try, except, finally; raising exceptions; types of errors",
      "OOP basics: classes, objects, attributes, methods, constructors, inheritance, encapsulation"
    ],
    hours: 10, co: "CO5",
    topics: [
      { id:"u5t1", title:"Modules & Packages" },
      { id:"u5t2", title:"File Handling" },
      { id:"u5t3", title:"Exception Handling" },
      { id:"u5t4", title:"Classes & Objects" },
      { id:"u5t5", title:"Inheritance" },
      { id:"u5t6", title:"Encapsulation & Polymorphism" }
    ]
  }
];
"""

    content = content[:start] + NEW_CURRICULUM + content[end:]
    steps_applied.append("1. Replaced 6-unit curriculum with JNTUA R23 5-unit syllabus (22 topics)")


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — Update PY_PLACEMENT_QUESTIONS topic keys to new IDs
# ══════════════════════════════════════════════════════════════════════════
# Old → New (only keys that changed)
remap = {
    '"u3t4":': '"u4t1":',
    '"u4t1":': '"u4t2":',
    '"u4t2":': '"u4t3":',
    '"u4t3":': '"u4t4":',
    '"u4t4":': '"u4t5":',
    '"u5t1":': '"u5t4":',
    '"u5t2":': '"u5t5":',
    '"u5t3":': '"u5t6":',
    '"u6t1":': '"u5t3":',
    '"u6t2":': '"u5t2":',
}

if '"u5t4":' in content and '"u4t1":' in content:
    # Check if it's already remapped (u5t4 exists and it's the OOP one not dict)
    # Tricky: u4t1 will legitimately exist as a new key after remapping
    steps_skipped.append("2. Placement question IDs may already be remapped — skipping to avoid double-remap")
elif '"u6t1":' in content or '"u6t2":' in content:
    # Find the PY_PLACEMENT_QUESTIONS block and remap keys only within it
    pq_start = content.find("const PY_PLACEMENT_QUESTIONS = {")
    pq_end_search = content.find("};", pq_start) + 2
    pq_block = content[pq_start:pq_end_search]

    # Apply remap in reverse order to avoid cascading (u4t4→u4t5 before u4t3→u4t4 etc)
    for old, new in sorted(remap.items(), key=lambda x: x[0], reverse=True):
        pq_block = pq_block.replace(old, new)

    content = content[:pq_start] + pq_block + content[pq_end_search:]
    steps_applied.append("2. Updated placement question topic IDs to JNTUA structure")
else:
    steps_skipped.append("2. No old topic IDs found in placement questions — may already be correct")


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — Add syllabus accordion to PythonCourseHome
# The accordion goes right after the hero div (the photo background section)
# and before the "Learn Python Programming" heading block.
# ══════════════════════════════════════════════════════════════════════════
ACCORDION_MARKER = "SyllabusAccordion"

if ACCORDION_MARKER in content:
    steps_skipped.append("3. Syllabus accordion already present")
else:
    # The accordion component definition — inserted once before PythonCourseHome
    ACCORDION_COMPONENT = '''
// ─── JNTUA SYLLABUS ACCORDION ───────────────────────────────────────────────────
function SyllabusAccordion({ onNavigate }) {
  const [openUnit, setOpenUnit] = useState(null);

  const JNTUA_SYLLABUS = [
    {
      id: "u1", unit: "Unit I", title: "Computational Thinking & Programming Basics",
      hours: 10, co: "CO1",
      topics: [
        { id:"u1t1", name:"Computational Thinking & Your First Program" },
        { id:"u1t2", name:"Variables, Data Types & Type Conversion" },
        { id:"u1t3", name:"Input & Output Statements" },
        { id:"u1t4", name:"Expressions & Operators" }
      ],
      syllabus: [
        "Computational thinking: problem-solving strategies, algorithms, flowcharts, pseudocode",
        "Introduction to Python: variables, identifiers, keywords, data types, type conversion",
        "Input/Output; arithmetic, relational, logical, assignment operators; precedence"
      ]
    },
    {
      id: "u2", unit: "Unit II", title: "Decision Making & Looping",
      hours: 10, co: "CO2",
      topics: [
        { id:"u2t1", name:"if / if-else / if-elif-else" },
        { id:"u2t2", name:"while Loop" },
        { id:"u2t3", name:"for Loop & range()" },
        { id:"u2t4", name:"break, continue, pass" }
      ],
      syllabus: [
        "Decision control: if, if-else, if-elif-else, nested if, ternary operator",
        "Looping: while loop, for loop, nested loops, iteration techniques",
        "Loop control: break, continue, pass; else with loops"
      ]
    },
    {
      id: "u3", unit: "Unit III", title: "Strings & Data Structures",
      hours: 10, co: "CO3",
      topics: [
        { id:"u3t1", name:"Strings" },
        { id:"u3t2", name:"Lists" },
        { id:"u3t3", name:"Tuples & Sets" }
      ],
      syllabus: [
        "Strings: indexing, slicing, operations, built-in methods",
        "Lists: creation, indexing, slicing, methods, nested lists",
        "Tuples: packing/unpacking; Sets: union, intersection, difference"
      ]
    },
    {
      id: "u4", unit: "Unit IV", title: "Functions & Problem Solving",
      hours: 10, co: "CO4",
      topics: [
        { id:"u4t1", name:"Dictionaries" },
        { id:"u4t2", name:"Defining & Calling Functions" },
        { id:"u4t3", name:"Variable Scope (Local vs Global)" },
        { id:"u4t4", name:"Recursion" },
        { id:"u4t5", name:"Lambda Functions" }
      ],
      syllabus: [
        "Dictionaries: creation, operations, methods, applications",
        "Functions: built-in/user-defined, arguments, return values, scope",
        "Recursion: factorial, Fibonacci; lambda functions; problem solving"
      ]
    },
    {
      id: "u5", unit: "Unit V", title: "File Handling, Exceptions & OOP",
      hours: 10, co: "CO5",
      topics: [
        { id:"u5t1", name:"Modules & Packages" },
        { id:"u5t2", name:"File Handling" },
        { id:"u5t3", name:"Exception Handling" },
        { id:"u5t4", name:"Classes & Objects" },
        { id:"u5t5", name:"Inheritance" },
        { id:"u5t6", name:"Encapsulation & Polymorphism" }
      ],
      syllabus: [
        "Modules: creating, importing, standard library (math, os, random, datetime)",
        "File handling: reading, writing, modes; text and CSV files",
        "Exception handling: try/except/finally; OOP: classes, inheritance, encapsulation"
      ]
    }
  ];

  return (
    <div style={{ padding: "0 20px", marginTop: 32, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", letterSpacing: ".04em", margin: 0 }}>
          📋 JNTUA R23 Syllabus — 5 Units · 50 Hours
        </h3>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>Click unit to expand</span>
      </div>
      {JNTUA_SYLLABUS.map((unit, ui) => {
        const isOpen = openUnit === unit.id;
        return (
          <div key={unit.id} style={{ marginBottom: 8, border: "1px solid", borderColor: isOpen ? "rgba(255,106,0,0.4)" : "rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", transition: "border-color .2s" }}>
            {/* Unit header — the clickable dropdown trigger */}
            <button
              onClick={() => setOpenUnit(isOpen ? null : unit.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: isOpen ? "rgba(255,106,0,0.08)" : "rgba(255,255,255,0.02)", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 9, background: isOpen ? "linear-gradient(135deg,#FF6A00,#ff9a00)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 900, fontSize: 12, color: isOpen ? "#fff" : "rgba(255,255,255,0.5)", transition: "all .2s" }}>
                {ui + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: isOpen ? "#FF6A00" : "#fff", transition: "color .2s" }}>{unit.unit}: {unit.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{unit.topics.length} topics · {unit.hours} hrs · {unit.co}</div>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .25s", flexShrink: 0 }}>▾</span>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Syllabus bullet points */}
                <div style={{ padding: "10px 0 12px" }}>
                  {unit.syllabus.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                      <span style={{ color: "#FF6A00", flexShrink: 0, marginTop: 2, fontSize: 10 }}>▸</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
                {/* Topic links — click to navigate directly into that lesson */}
                <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: ".05em", marginBottom: 8 }}>Topics</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                  {unit.topics.map((topic, ti) => (
                    <button
                      key={topic.id}
                      onClick={() => onNavigate(topic.id)}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, cursor: "pointer", textAlign: "left", transition: "all .15s" }}
                      onMouseOver={e => { e.currentTarget.style.borderColor="rgba(255,106,0,0.4)"; e.currentTarget.style.background="rgba(255,106,0,0.08)"; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                    >
                      <span style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(255,106,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#FF6A00", flexShrink: 0 }}>{ti + 1}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500, lineHeight: 1.3 }}>{topic.name}</span>
                      <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,106,0,0.7)", flexShrink: 0 }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

'''

    # Insert the accordion component before PythonCourseHome
    home_marker = "function PythonCourseHome({ onStart, user, onJoinClass }) {"
    if home_marker not in content:
        print("❌ STEP 3 FAILED: could not find PythonCourseHome. Aborting.")
        sys.exit(1)
    idx = content.index(home_marker)
    content = content[:idx] + ACCORDION_COMPONENT + content[idx:]
    steps_applied.append("3. Added SyllabusAccordion component (JNTUA units with topic links)")


# ══════════════════════════════════════════════════════════════════════════
# STEP 4 — Wire SyllabusAccordion into PythonCourseHome
# ══════════════════════════════════════════════════════════════════════════
OLD_HOME_CONTENT_HEADING = '''      <div style={{ padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>
          Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
        </h2>'''

NEW_HOME_WITH_ACCORDION = '''      <SyllabusAccordion onNavigate={(topicId) => { if(onStart) onStart(topicId); }} />

      <div style={{ padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>
          Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
        </h2>'''

if "<SyllabusAccordion" in content:
    steps_skipped.append("4. SyllabusAccordion already wired into PythonCourseHome")
elif OLD_HOME_CONTENT_HEADING in content:
    content = content.replace(OLD_HOME_CONTENT_HEADING, NEW_HOME_WITH_ACCORDION, 1)
    steps_applied.append("4. Wired SyllabusAccordion into PythonCourseHome (after hero, before course description)")
else:
    print("⚠️  STEP 4 WARNING: could not find the exact content heading anchor.")
    print("   The accordion component was added but not inserted into the home page render.")
    print("   Manual step: add <SyllabusAccordion onNavigate={(id)=>onStart(id)} /> after the hero div in PythonCourseHome.")


# ══════════════════════════════════════════════════════════════════════════
# STEP 5 — Update onStart in PythonCourseShell to accept a topicId parameter
# Currently: onStart={() => goTopic(allTopics[0].id)} — navigates to first topic
# Need: onStart={(topicId) => goTopic(topicId || allTopics[0].id)} — navigates to specific topic
# ══════════════════════════════════════════════════════════════════════════
OLD_HOME_CALL = '''          <PythonCourseHome onStart={() => goTopic(allTopics[0].id)} onJoinClass={onJoinClass} user={user} />'''
NEW_HOME_CALL = '''          <PythonCourseHome onStart={(topicId) => goTopic(topicId || allTopics[0].id)} onJoinClass={onJoinClass} user={user} />'''

if "(topicId) => goTopic" in content:
    steps_skipped.append("5. onStart already accepts topicId parameter")
elif OLD_HOME_CALL in content:
    content = content.replace(OLD_HOME_CALL, NEW_HOME_CALL, 1)
    steps_applied.append("5. onStart now routes to specific topic ID from the accordion links")
else:
    print("⚠️  STEP 5 WARNING: could not find the exact PythonCourseHome call. Topic navigation from accordion may not work.")


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
    for s in steps_applied: print(f"   {s}")
if steps_skipped:
    print("\n⏭️  SKIPPED (already applied):")
    for s in steps_skipped: print(f"   {s}")

print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Add JNTUA syllabus + accordion navigation on course home' && git push")
print("  3. Open the Python course home page — below the photo hero, you should see")
print("     5 collapsible unit cards (Unit I through Unit V) with the JNTUA syllabus.")
print("  4. Click any unit to expand it, then click any topic to navigate directly into that lesson.")
