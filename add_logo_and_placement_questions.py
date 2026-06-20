#!/usr/bin/env python3
"""
Two additions to the Python course:

  1. Real Python logo — replaces the 🐍 emoji in the top nav badge (only that
     one spot, as scoped) with an actual SVG recreation of the official
     two-snake Python logo (blue/yellow), crisp at any size.

  2. Placement Prep questions (TCS/Infosys style) — 45 NEW "predict the
     output" questions added across all 21 existing topics, alongside the
     current write-your-own-code problems. These are genuinely different in
     style: short code snippets the student reads and predicts the output
     of (mirroring real coding-round MCQs), covering classic gotchas like
     operator precedence, mutable default arguments, late-binding closures,
     shallow vs deep copy, name mangling, and finally/return ordering.
     Every single one has been executed against real Python and verified
     correct before being included here.

Run from: ~/Downloads/rankachievers/
    python3 add_logo_and_placement_questions.py

Safe to re-run: checks if already applied before patching.
"""

import sys

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# STEP 1 — Swap the nav badge emoji for the real Python logo SVG
# ══════════════════════════════════════════════════════════════════════════
OLD_BADGE = '''        <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>🐍</div>
          <span style={{ fontWeight: 800, fontSize: 14.5 }}>Python for B.Tech</span>
        </div>'''

NEW_BADGE = '''        <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFE873" d="M12.05 1.5c-1.05 0-2.05.09-2.9.25-2.6.45-3.07 1.41-3.07 3.16v2.31h6.13v.78H3.94c-1.77 0-3.32 1.06-3.8 3.08-.56 2.32-.59 3.77 0 6.19.43 1.8 1.46 3.08 3.23 3.08h2.09v-2.78c0-2.01 1.74-3.78 3.8-3.78h6.13c1.69 0 3.04-1.39 3.04-3.08V4.91c0-1.64-1.39-2.87-3.04-3.16a18.6 18.6 0 0 0-3.34-.25zM8.7 3.2c.62 0 1.13.51 1.13 1.14 0 .63-.51 1.13-1.13 1.13-.63 0-1.13-.5-1.13-1.13 0-.63.5-1.14 1.13-1.14z"/>
              <path fill="#4B8BBE" d="M11.95 22.5c1.05 0 2.05-.09 2.9-.25 2.6-.45 3.07-1.41 3.07-3.16v-2.31h-6.13v-.78h8.27c1.77 0 3.32-1.06 3.8-3.08.56-2.32.59-3.77 0-6.19-.43-1.8-1.46-3.08-3.23-3.08h-2.09v2.78c0 2.01-1.74 3.78-3.8 3.78H8.61c-1.69 0-3.04 1.39-3.04 3.08v5.21c0 1.64 1.39 2.87 3.04 3.16 1.13.2 2.27.27 3.34.25zm3.35-1.7c-.62 0-1.13-.51-1.13-1.14 0-.63.51-1.13 1.13-1.13.63 0 1.13.5 1.13 1.13 0 .63-.5 1.14-1.13 1.14z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 14.5 }}>Python for B.Tech</span>
        </div>'''

if 'fill="#FFE873"' in content:
    steps_skipped.append("1. Python logo SVG already present in nav badge")
elif OLD_BADGE in content:
    content = content.replace(OLD_BADGE, NEW_BADGE, 1)
    steps_applied.append("1. Replaced nav badge emoji with real Python logo SVG")
else:
    print("❌ STEP 1 FAILED: could not find the exact nav badge block. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# STEP 2 — Insert placement question data + PyPredictOutput component
# ══════════════════════════════════════════════════════════════════════════
PLACEMENT_DATA_AND_COMPONENT = r'''// ─── PLACEMENT-PREP QUESTION DATA (TCS / Infosys style output-prediction) ──────
const PY_PLACEMENT_QUESTIONS = {
  u1t1: [
    {
      level: "basic",
      code: "print(\"Hello\", \"World\")\nprint(\"Hello\" + \"World\")",
      explanation: "print() with commas auto-inserts a space between arguments. The + operator concatenates strings directly with no extra space — two genuinely different ways to join text."
    }
  ],
  u1t2: [
    {
      level: "basic",
      code: "x = 7\nprint(type(x))\ny = 7.0\nprint(type(y))",
      explanation: "7 (no decimal point) is an int. 7.0 (with a decimal point) is a float — Python distinguishes them by the literal's syntax, not the numeric value."
    },
    {
      level: "intermediate",
      code: "a = \"3\"\nb = \"4\"\nprint(a + b)",
      explanation: "Since a and b are strings, + means concatenation, not addition — \"3\"+\"4\" gives \"34\", not 7. A common trap when forgetting to int() user input."
    }
  ],
  u1t3: [
    {
      level: "intermediate",
      code: "name = \"World\"\nage = 25\nprint(f\"{name} is {age} years old\")\nprint(\"%s is %d years old\" % (name, age))",
      explanation: "Both lines produce identical output — f-strings and %-formatting are two different syntaxes for the same result. f-strings are the modern, preferred style."
    }
  ],
  u1t4: [
    {
      level: "basic",
      code: "x = 5\ny = \"5\"\nprint(x == y)",
      explanation: "Python never considers an int equal to a string, even if they 'look' the same. 5 == \"5\" is always False — no implicit type conversion happens in comparisons."
    },
    {
      level: "basic",
      code: "a = 10\nb = 3\nprint(a / b)\nprint(a // b)\nprint(a % b)",
      explanation: "/ always returns a float (3.333...), // does floor (integer) division (3), and % gives the remainder (1)."
    },
    {
      level: "intermediate",
      code: "x = 2\ny = 3\nz = x ** y ** 2\nprint(z)",
      explanation: "** is right-associative, so this evaluates as x ** (y ** 2) = 2 ** 9 = 512, not (x**y)**2 = 64."
    },
    {
      level: "intermediate",
      code: "print(round(2.5))\nprint(round(3.5))\nprint(round(-2.5))",
      explanation: "Python uses 'banker's rounding' (round half to even) for .5 cases: 2.5→2, 3.5→4, -2.5→-2. This trips up people expecting standard rounding."
    },
    {
      level: "advanced",
      code: "a = 0.1 + 0.2\nprint(a == 0.3)",
      explanation: "Floating-point numbers can't represent 0.1 and 0.2 exactly in binary, so 0.1+0.2 is actually 0.30000000000000004 — not exactly equal to 0.3."
    }
  ],
  u2t1: [
    {
      level: "basic",
      code: "x = 0\nif x:\n    print(\"True\")\nelse:\n    print(\"False\")",
      explanation: "In a boolean context, 0 is treated as Falsy (along with empty strings, empty lists, and None). Any nonzero number would be Truthy."
    },
    {
      level: "intermediate",
      code: "age = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(status)",
      explanation: "This is Python's ternary expression: value_if_true if condition else value_if_false, evaluated as a single line instead of a full if/else block."
    }
  ],
  u2t2: [
    {
      level: "basic",
      code: "i = 5\nwhile i > 0:\n    print(i, end=\" \")\n    i -= 1",
      explanation: "The loop counts down from 5 to 1, printing each on the same line (end=\" \" replaces the default newline with a space). It stops once i reaches 0."
    },
    {
      level: "advanced",
      code: "i = 0\nwhile True:\n    i += 1\n    if i > 3:\n        break\nprint(i)",
      explanation: "while True creates an infinite loop, relying entirely on break to exit. i increments to 4 before the break condition (i>3) triggers, so the final value is 4, not 3."
    }
  ],
  u2t3: [
    {
      level: "basic",
      code: "for i in range(5, 1, -1):\n    print(i, end=\" \")",
      explanation: "range(5, 1, -1) counts DOWN from 5, stopping BEFORE 1 (exclusive), with a step of -1: gives 5, 4, 3, 2 — not down to 1."
    },
    {
      level: "intermediate",
      code: "total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)",
      explanation: "range(1, 5) gives 1, 2, 3, 4 (5 is excluded since range's stop is exclusive). Sum = 1+2+3+4 = 10."
    }
  ],
  u2t4: [
    {
      level: "basic",
      code: "for i in range(3):\n    if i == 1:\n        continue\n    print(i)",
      explanation: "continue skips the rest of THIS iteration only — it doesn't stop the loop. i=1 is skipped, but i=0 and i=2 still print."
    },
    {
      level: "basic",
      code: "i = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        break\nprint(i)",
      explanation: "i increments to 3, then break exits the loop immediately — so the final printed value of i is 3, not 5."
    },
    {
      level: "intermediate",
      code: "for i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n        print(i, j)",
      explanation: "break only exits the INNER loop, not both loops. So for each value of i, only j=0 prints before breaking out of the inner loop."
    },
    {
      level: "advanced",
      code: "count = 0\nfor i in range(1, 10):\n    if i % 2 == 0:\n        continue\n    count += 1\nelse:\n    print(count)",
      explanation: "A for-else's else block runs when the loop completes WITHOUT hitting break. Here there's no break, so it always runs, counting the 5 odd numbers (1,3,5,7,9)."
    }
  ],
  u3t1: [
    {
      level: "basic",
      code: "s = \"Python\"\nprint(s * 2)",
      explanation: "Multiplying a string by an integer repeats it that many times — \"Python\" * 2 gives \"PythonPython\", with no separator added."
    },
    {
      level: "intermediate",
      code: "s = \"  Hello World  \"\nprint(s.strip().lower())",
      explanation: ".strip() removes leading/trailing whitespace first, then .lower() converts to lowercase. Method chaining applies left to right."
    },
    {
      level: "advanced",
      code: "s = \"Python\"\nprint(s[10] if len(s) > 10 else \"Too short\")",
      explanation: "len(\"Python\") is 6, which is not > 10, so the else branch runs. This avoids an IndexError that s[10] would otherwise raise on a 6-character string."
    }
  ],
  u3t2: [
    {
      level: "basic",
      code: "lst = [1, 2, 3]\nlst2 = lst\nlst2.append(4)\nprint(lst)",
      explanation: "lst2 = lst does NOT copy the list — both names point to the same list object in memory. Modifying lst2 also changes lst."
    },
    {
      level: "intermediate",
      code: "lst = [1, 2, 3]\nlst2 = lst.copy()\nlst2.append(4)\nprint(lst)\nprint(lst2)",
      explanation: ".copy() creates a genuinely separate list, so changes to lst2 no longer affect lst. This is the fix for the previous gotcha."
    },
    {
      level: "advanced",
      code: "def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))",
      explanation: "Classic Python trap: a mutable default argument (lst=[]) is created ONCE when the function is defined, not on every call. Both calls share and accumulate into the same list, giving [1] then [1, 2] instead of [1] then [2]."
    },
    {
      level: "advanced",
      code: "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)",
      explanation: "== checks if values are equal (True, since contents match). is checks if they're the SAME object in memory (False, since a and b are two separate list objects)."
    }
  ],
  u3t3: [
    {
      level: "basic",
      code: "t = (1, 2, 3)\nprint(t[0] + t[-1])",
      explanation: "Tuples support indexing just like lists. t[0] is 1 (first element), t[-1] is 3 (last element), so the sum is 4."
    },
    {
      level: "intermediate",
      code: "s1 = {1, 2, 3}\ns2 = {2, 3, 4}\nprint(s1 & s2)\nprint(s1 | s2)",
      explanation: "& gives the intersection (elements in both sets: 2, 3). | gives the union (all elements from both, duplicates removed: 1, 2, 3, 4)."
    }
  ],
  u3t4: [
    {
      level: "basic",
      code: "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 0))",
      explanation: "dict.get(key, default) safely returns the default value (0) when the key doesn't exist, instead of raising a KeyError like d[\"c\"] would."
    },
    {
      level: "intermediate",
      code: "d = {\"x\": 1, \"y\": 2}\nd2 = d\nd2[\"z\"] = 3\nprint(d)",
      explanation: "Just like lists, d2 = d does not copy the dictionary — both names reference the same dict object, so modifying d2 also changes d."
    }
  ],
  u4t1: [
    {
      level: "intermediate",
      code: "x = 10\ndef modify():\n    x = 20\n    return x\n\nprint(modify())\nprint(x)",
      explanation: "Assigning to x inside modify() creates a new LOCAL variable x, separate from the global x. The global x is never touched, so it still prints 10."
    },
    {
      level: "advanced",
      code: "def make_multiplier(n):\n    return lambda x: x * n\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5), triple(5))",
      explanation: "Each call to make_multiplier(n) creates a new closure that remembers its own n. double remembers n=2, triple remembers n=3 — they don't interfere with each other."
    },
    {
      level: "advanced",
      code: "funcs = []\nfor i in range(3):\n    funcs.append(lambda: i)\n\nprint([f() for f in funcs])",
      explanation: "Famous closure gotcha: lambdas capture the VARIABLE i, not its value at creation time. By the time the lambdas run, the loop has finished and i=2 for all of them — so every lambda returns 2, not [0,1,2]."
    }
  ],
  u4t2: [
    {
      level: "basic",
      code: "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
      explanation: "5! = 5×4×3×2×1×1 (the base case returns 1 for factorial(0)) = 120."
    }
  ],
  u4t3: [
    {
      level: "intermediate",
      code: "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(6))",
      explanation: "Fibonacci sequence (0-indexed): 0,1,1,2,3,5,8. fib(6) is the 7th term, which is 8."
    }
  ],
  u4t4: [
    {
      level: "basic",
      code: "add = lambda a, b: a + b\nprint(add(3, 4))",
      explanation: "A lambda is a compact, unnamed function. lambda a, b: a + b is equivalent to def add(a, b): return a + b — both give 7."
    },
    {
      level: "intermediate",
      code: "nums = [1, 2, 3, 4, 5]\nprint(list(filter(lambda x: x % 2 == 0, nums)))",
      explanation: "filter() keeps only elements where the lambda returns True. x % 2 == 0 is True for even numbers, so only 2 and 4 survive."
    }
  ],
  u5t1: [
    {
      level: "basic",
      code: "class Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\n\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count)",
      explanation: "count is a CLASS attribute, shared by all instances. Each __init__ call increments the same shared counter via Counter.count, so after 3 objects it's 3."
    }
  ],
  u5t2: [
    {
      level: "intermediate",
      code: "class Animal:\n    def speak(self):\n        return \"...\"\n\nclass Cat(Animal):\n    def speak(self):\n        return \"Meow\"\n\nanimals = [Animal(), Cat()]\nprint([a.speak() for a in animals])",
      explanation: "This is polymorphism: each object calls ITS OWN speak() method. Animal() uses the base version, Cat() uses its overridden version, even though both are accessed through the same animals list."
    },
    {
      level: "advanced",
      code: "class A:\n    def show(self):\n        print(\"A\")\n\nclass B(A):\n    def show(self):\n        print(\"B\")\n        super().show()\n\nB().show()",
      explanation: "B's show() prints \"B\" first, then explicitly calls super().show() which runs A's version, printing \"A\" too. Output has two lines: B then A."
    }
  ],
  u5t3: [
    {
      level: "advanced",
      code: "class Box:\n    def __init__(self, val):\n        self.__val = val\n    def get(self):\n        return self.__val\n\nb = Box(10)\nprint(b.get())\ntry:\n    print(b.__val)\nexcept AttributeError as e:\n    print(\"Error\")",
      explanation: "Double-underscore attributes (__val) get 'name-mangled' by Python to _Box__val, so direct access via b.__val from outside the class fails with AttributeError — that's what makes it 'private' by convention."
    }
  ],
  u6t1: [
    {
      level: "basic",
      code: "try:\n    print(int(\"abc\"))\nexcept ValueError:\n    print(\"Invalid\")\nexcept Exception:\n    print(\"Other\")",
      explanation: "int(\"abc\") raises ValueError specifically (not a generic Exception), so the first matching except block catches it. Python checks except blocks top-to-bottom and uses the first match."
    },
    {
      level: "intermediate",
      code: "def risky():\n    try:\n        return 1\n    finally:\n        print(\"Cleanup\")\n\nprint(risky())",
      explanation: "finally ALWAYS runs, even when there's a return inside try — and it runs BEFORE the function actually returns. So \"Cleanup\" prints first, then the returned value 1 prints."
    },
    {
      level: "advanced",
      code: "try:\n    try:\n        raise ValueError(\"inner\")\n    except TypeError:\n        print(\"Type\")\nexcept ValueError:\n    print(\"Value\")",
      explanation: "The inner except only catches TypeError, so it doesn't match the raised ValueError. The exception propagates up to the OUTER try/except, which does catch ValueError."
    }
  ],
  u6t2: [
    {
      level: "basic",
      code: "with open(\"test.txt\", \"w\") as f:\n    f.write(\"Hello\")\nwith open(\"test.txt\", \"r\") as f:\n    content = f.read()\nprint(content)",
      explanation: "The first 'with' block writes \"Hello\" and auto-closes the file. The second opens it fresh in read mode and reads back exactly what was written."
    }
  ]
};

// ─── PLACEMENT-PREP: PREDICT-THE-OUTPUT QUESTION (TCS/Infosys style) ──────────
// Different UX from PyCodeEditor on purpose: the code is fixed/read-only (the
// student traces through it mentally, like in an actual coding-round MCQ),
// they type their predicted output, then reveal + verify by actually running it.
function PyPredictOutput({ pq, pqIndex, runPython, pyStatus, ensureLoaded }) {
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [actualOutput, setActualOutput] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => { setGuess(""); setChecked(false); setVerdict(null); setActualOutput(null); }, [pq]);

  const handleCheck = async () => {
    setRunning(true);
    try {
      if (pyStatus !== "ready") await ensureLoaded();
      const result = await runPython(pq.code, pq.inputs || []);
      const actual = (result.ok ? result.stdout : `Error: ${result.error}`).replace(/\n+$/, "");
      setActualOutput(actual);
      const normalizedGuess = guess.trim().replace(/\s+/g, " ");
      const normalizedActual = actual.trim().replace(/\s+/g, " ");
      setVerdict(normalizedGuess === normalizedActual ? "pass" : "fail");
      setChecked(true);
    } catch (e) {
      setActualOutput(`Error: ${e?.message || "Failed to run"}`);
      setVerdict("fail");
      setChecked(true);
    } finally {
      setRunning(false);
    }
  };

  const levelColor = { basic: "#22c55e", intermediate: "#f59e0b", advanced: "#ef4444" }[pq.level] || "#22c55e";

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.03)", marginBottom: 16 }}>
      <div style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ display: "inline-block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 9px", borderRadius: 100, background: levelColor + "22", color: levelColor, border: `1px solid ${levelColor}44` }}>{pq.level}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(124,196,255,0.9)", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", padding: "3px 9px", borderRadius: 100 }}>📋 Placement Prep</span>
        </div>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>What will this code print?</p>
      </div>

      <pre style={{ background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13.5, padding: 16, margin: 0, overflowX: "auto", lineHeight: 1.7, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{pq.code}</pre>

      <div style={{ padding: 14 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: ".04em", display: "block", marginBottom: 6 }}>
          Your predicted output
        </label>
        <textarea
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={checked}
          spellCheck={false}
          placeholder="Type what you think this code will print..."
          style={{ width: "100%", minHeight: 60, background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13, padding: 12, borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", outline: "none", resize: "vertical", boxSizing: "border-box", opacity: checked ? 0.6 : 1 }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
          {!checked ? (
            <button onClick={handleCheck} disabled={running || !guess.trim()} style={{ padding: "8px 16px", borderRadius: 9, border: "none", background: running || !guess.trim() ? "rgba(59,130,246,0.4)" : "linear-gradient(90deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 800, fontSize: 12.5, cursor: running || !guess.trim() ? "default" : "pointer" }}>
              {running ? "Checking…" : "Check My Answer"}
            </button>
          ) : (
            <button onClick={() => { setChecked(false); setGuess(""); setVerdict(null); setActualOutput(null); }} style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              ↺ Try Again
            </button>
          )}
        </div>

        {checked && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {verdict === "pass" ? (
                <span style={{ fontSize: 12, fontWeight: 800, color: "#22c55e" }}>✓ Correct! You traced it right.</span>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 800, color: "#ef4444" }}>✕ Not quite — here's the actual output:</span>
              )}
            </div>
            <pre style={{ fontFamily: "Menlo,Consolas,monospace", fontSize: 13, whiteSpace: "pre-wrap", color: "#e5e5e5", background: "#08080a", borderRadius: 9, padding: 12, border: "1px solid rgba(255,255,255,0.06)", margin: 0 }}>
              {actualOutput}
            </pre>
            {pq.explanation && (
              <div style={{ marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 9, padding: 12 }}>
                <strong style={{ color: "#7cc4ff" }}>Why: </strong>{pq.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'''

if "const PY_PLACEMENT_QUESTIONS" in content:
    steps_skipped.append("2. Placement question data + PyPredictOutput component already present")
else:
    marker = "// ─── PYTHON COURSE — TOPIC VIEW (uses markdown renderer for full notes) ────────"
    if marker not in content:
        print("❌ STEP 2 FAILED: could not find the PythonTopicView marker to insert before. Aborting.")
        sys.exit(1)
    idx = content.index(marker)
    content = content[:idx] + PLACEMENT_DATA_AND_COMPONENT + "\n" + content[idx:]
    steps_applied.append("2. Inserted 45 placement-prep questions (across all 21 topics) + PyPredictOutput component")


# ══════════════════════════════════════════════════════════════════════════
# STEP 3 — Render the Placement Prep section inside PythonTopicView
# ══════════════════════════════════════════════════════════════════════════
OLD_TESTCASES_BLOCK = '''      {topic.testCases && topic.testCases.length > 0 && (
        <div>
          <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: ".04em" }}>Practice — Run It Yourself</h3>
          {topic.testCases.map((tc, i) => (
            <PyCodeEditor key={i} tc={tc} tcIndex={i} runPython={runner.runPython} pyStatus={runner.pyStatus} ensureLoaded={runner.ensureLoaded} user={user} unitTitle={unitTitle} topicTitle={topic.title} />
          ))}
        </div>
      )}'''

NEW_TESTCASES_BLOCK = '''      {topic.testCases && topic.testCases.length > 0 && (
        <div>
          <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: ".04em" }}>Practice — Run It Yourself</h3>
          {topic.testCases.map((tc, i) => (
            <PyCodeEditor key={i} tc={tc} tcIndex={i} runPython={runner.runPython} pyStatus={runner.pyStatus} ensureLoaded={runner.ensureLoaded} user={user} unitTitle={unitTitle} topicTitle={topic.title} />
          ))}
        </div>
      )}
      {PY_PLACEMENT_QUESTIONS[topic.id] && PY_PLACEMENT_QUESTIONS[topic.id].length > 0 && (
        <div style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "rgba(124,196,255,0.7)", marginBottom: 4, letterSpacing: ".04em" }}>📋 Placement Prep — TCS / Infosys Style</h3>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Predict the output before running — this is exactly how coding-round questions are asked.</p>
          {PY_PLACEMENT_QUESTIONS[topic.id].map((pq, i) => (
            <PyPredictOutput key={i} pq={pq} pqIndex={i} runPython={runner.runPython} pyStatus={runner.pyStatus} ensureLoaded={runner.ensureLoaded} />
          ))}
        </div>
      )}'''

if "Placement Prep — TCS / Infosys Style" in content:
    steps_skipped.append("3. Placement Prep section already wired into PythonTopicView")
elif OLD_TESTCASES_BLOCK in content:
    content = content.replace(OLD_TESTCASES_BLOCK, NEW_TESTCASES_BLOCK, 1)
    steps_applied.append("3. Wired Placement Prep section into PythonTopicView (renders after the regular practice problems)")
else:
    print("❌ STEP 3 FAILED: could not find the exact testCases render block in PythonTopicView. Aborting.")
    sys.exit(1)


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
print("  2. If clean: git add -A && git commit -m 'Add Python logo + 45 TCS/Infosys placement-prep questions' && git push")
print("  3. Open any topic in the Python course — below the regular practice problems,")
print("     you should see a new '📋 Placement Prep — TCS / Infosys Style' section")
print("     with predict-the-output questions")
print("  4. Check the course nav bar — the snake emoji badge should now be the real Python logo")
