
// ════════════════════════════════════════════════════════════════════════════
// PYTHON COURSE MODULE — toggled on/off from Admin → Settings
// Self-contained: own home page + curriculum + in-browser Python runner (Pyodide)
// Loaded ONLY when settings.pythonCourseMode === true
// ════════════════════════════════════════════════════════════════════════════

// ─── PYTHON CURRICULUM DATA ────────────────────────────────────────────────────
const PY_CURRICULUM = [
  {
    id: "u1", title: "Python Fundamentals", icon: "🔤",
    desc: "Variables, Data Types, Input/Output, Operators",
    topics: [
      {
        id: "u1t1", title: "Your First Program",
        notes: `Python is the most beginner-friendly language used in industry — it reads almost like English.

print("Hello, World!") displays output on screen. Text in quotes is a string. Python does NOT use semicolons, and indentation (spaces at the start of a line) is part of the syntax — not just style.

# This is a comment — Python ignores it
print("This runs")  # comment after code also works`,
        examples: [
          { title: "Hello World", code: `print("Hello, World!")\nprint("Welcome to B.Tech Python")` },
          { title: "Multiple prints", code: `print("Sum of 5 and 3 is:", 5 + 3)\nprint("A", "B", "C", sep=" - ")` },
        ],
        testCases: [
          { level: "basic", question: "Print 'ALITS' then 'Anantapur' on separate lines.", starterCode: ``, solution: `print("ALITS")\nprint("Anantapur")`, expectedOutput: "ALITS\nAnantapur" },
          { level: "intermediate", question: "Print 'Total Marks: 95' and 'Percentage: 95.0%' separated by ' | ' using one print().", starterCode: ``, solution: `print("Total Marks: 95", "Percentage: 95.0%", sep=" | ")`, expectedOutput: "Total Marks: 95 | Percentage: 95.0%" },
        ],
      },
      {
        id: "u1t2", title: "Variables & Data Types",
        notes: `A variable is a labeled box that stores a value. Python figures out the type automatically.

name = "Khadar"   # string
age = 21           # integer
cgpa = 8.75          # float
is_passed = True       # boolean

Use type() to check a variable's type, and int()/float()/str() to convert between types.

⚠️ int("12.5") will crash — convert via int(float("12.5")) instead.`,
        examples: [
          { title: "Variables & types", code: `name = "Lakshmi"\nage = 20\nprint(name, age)\nprint(type(name), type(age))` },
        ],
        testCases: [
          { level: "basic", question: "Create name='Ravi', age=19, cgpa=8.2. Print all three space-separated.", starterCode: ``, solution: `name = "Ravi"\nage = 19\ncgpa = 8.2\nprint(name, age, cgpa)`, expectedOutput: "Ravi 19 8.2" },
          { level: "advanced", question: "Swap a=5,b=10 WITHOUT a third variable, print both.", starterCode: `a = 5\nb = 10\n`, solution: `a = 5\nb = 10\na, b = b, a\nprint(a, b)`, expectedOutput: "10 5", hints: ["Python allows: a, b = b, a"] },
        ],
      },
      {
        id: "u1t3", title: "Input & Output",
        notes: `name = input("Enter your name: ")  — input() ALWAYS returns a string, even for numbers.

age = int(input("Enter age: "))  — convert manually when you need a number.

f-strings are the modern, preferred way to format output:
print(f"{name} scored {marks} marks")
print(f"CGPA: {8.6789:.2f}")   # 2 decimal places -> 8.68`,
        examples: [
          { title: "Input + f-string", code: `a = int(input("First: "))\nb = int(input("Second: "))\nprint(f"Sum = {a+b}")` },
        ],
        testCases: [
          { level: "basic", question: "Read a name, print 'Hello <name>, welcome to ALITS!'", starterCode: `name = input()\n`, solution: `name = input()\nprint(f"Hello {name}, welcome to ALITS!")`, expectedOutput: "Hello Khadar, welcome to ALITS!", inputs: ["Khadar"] },
          { level: "intermediate", question: "Read two integers, print 'Sum = 15'.", starterCode: `a = int(input())\nb = int(input())\n`, solution: `a = int(input())\nb = int(input())\nprint(f"Sum = {a+b}")`, expectedOutput: "Sum = 15", inputs: ["10", "5"] },
        ],
      },
      {
        id: "u1t4", title: "Operators",
        notes: `+ - * /  are standard. // is floor division (integer result). % is remainder. ** is power.

⚠️ 5 / 2 gives 2.5 in Python (not 2 like C). Use // for integer division.

Logical operators are spelled out: and, or, not (no && || like C/Java).`,
        examples: [
          { title: "Arithmetic", code: `a, b = 17, 5\nprint(a+b, a-b, a*b, a/b, a//b, a%b, a**2)` },
        ],
        testCases: [
          { level: "basic", question: "Read a, b. Print a // b and a % b on separate lines.", starterCode: `a = int(input())\nb = int(input())\n`, solution: `a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)`, expectedOutput: "3\n1", inputs: ["10", "3"] },
          { level: "advanced", question: "Calculate Simple Interest SI=(P*R*T)/100 from float inputs P,R,T. Print rounded to 2 decimals.", starterCode: `P = float(input())\nR = float(input())\nT = float(input())\n`, solution: `P = float(input())\nR = float(input())\nT = float(input())\nSI = (P*R*T)/100\nprint(f"{SI:.2f}")`, expectedOutput: "750.00", inputs: ["5000", "5", "3"] },
        ],
      },
    ],
  },
  {
    id: "u2", title: "Control Flow", icon: "🔀",
    desc: "Conditionals & Loops",
    topics: [
      {
        id: "u2t1", title: "if / elif / else",
        notes: `Python uses indentation (4 spaces) instead of {} to mark a block.

marks = 75
if marks >= 90: grade = "A"
elif marks >= 75: grade = "B"
else: grade = "F"

Python has no switch statement — if/elif/else chains do that job.`,
        examples: [{ title: "Grade calculator", code: `marks = 82\nif marks >= 90: grade="A"\nelif marks >= 75: grade="B"\nelse: grade="F"\nprint(grade)` }],
        testCases: [
          { level: "basic", question: "Read an int. Print 'Positive', 'Negative', or 'Zero'.", starterCode: `n = int(input())\n`, solution: `n = int(input())\nif n > 0: print("Positive")\nelif n < 0: print("Negative")\nelse: print("Zero")`, expectedOutput: "Positive", inputs: ["7"] },
          { level: "advanced", question: "Read 3 triangle sides. Print 'Equilateral'/'Isosceles'/'Scalene', or 'Invalid triangle'.", starterCode: `a=int(input());b=int(input());c=int(input())\n`, solution: `a=int(input());b=int(input());c=int(input())\nif a+b<=c or b+c<=a or a+c<=b:\n    print("Invalid triangle")\nelif a==b==c:\n    print("Equilateral")\nelif a==b or b==c or a==c:\n    print("Isosceles")\nelse:\n    print("Scalene")`, expectedOutput: "Isosceles", inputs: ["5", "5", "8"] },
        ],
      },
      {
        id: "u2t2", title: "while Loop",
        notes: `Repeats while a condition is True. You must update the condition variable or you get an infinite loop.

i = 1
while i <= 5:
    print(i)
    i += 1   # critical — forgetting this = infinite loop`,
        examples: [{ title: "Sum 1 to N", code: `n=5;i=1;total=0\nwhile i<=n:\n    total+=i\n    i+=1\nprint(total)` }],
        testCases: [
          { level: "intermediate", question: "Read n, find sum of its digits using a while loop.", starterCode: `n = int(input())\n`, solution: `n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)`, expectedOutput: "6", inputs: ["123"] },
          { level: "advanced", question: "Find GCD of two numbers using Euclidean algorithm (while loop).", starterCode: `a=int(input());b=int(input())\n`, solution: `a=int(input());b=int(input())\nwhile b!=0:\n    a,b=b,a%b\nprint(a)`, expectedOutput: "6", inputs: ["48", "18"] },
        ],
      },
      {
        id: "u2t3", title: "for Loop & range()",
        notes: `for i in range(5):     # 0,1,2,3,4 — stops BEFORE 5
for i in range(1,6):    # 1,2,3,4,5
for i in range(0,10,2):  # 0,2,4,6,8 (step)

⚠️ range(n) stops BEFORE n — most common beginner bug.`,
        examples: [{ title: "Multiplication table", code: `n=5\nfor i in range(1,11):\n    print(f"{n} x {i} = {n*i}")` }],
        testCases: [
          { level: "basic", question: "Read n, print factorial of n using a for loop.", starterCode: `n = int(input())\n`, solution: `n = int(input())\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint(fact)`, expectedOutput: "120", inputs: ["5"] },
          { level: "intermediate", question: "Read n, print all primes from 2 to n inclusive.", starterCode: `n = int(input())\n`, solution: `n = int(input())\nfor num in range(2, n+1):\n    is_prime = True\n    for i in range(2, int(num**0.5)+1):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num)`, expectedOutput: "2\n3\n5\n7", inputs: ["10"] },
        ],
      },
    ],
  },
  {
    id: "u3", title: "Data Structures", icon: "📦",
    desc: "Strings, Lists, Tuples, Dictionaries, Sets",
    topics: [
      {
        id: "u3t1", title: "Strings",
        notes: `s = "Python"
s[0]      # 'P'
s[-1]       # 'n' (negative index from end)
s[0:3]        # 'Pyt' (slicing, stop NOT included)
s[::-1]         # reverses the string

Strings are immutable — s[0]='X' errors. Use s.strip(), s.lower(), s.split(), len(s).`,
        examples: [{ title: "Slicing", code: `s = "ALITS Anantapur"\nprint(s[:5])\nprint(s[::-1])` }],
        testCases: [
          { level: "basic", question: "Read a string, print it reversed using slicing.", starterCode: `s = input()\n`, solution: `s = input()\nprint(s[::-1])`, expectedOutput: "nohtyP", inputs: ["Python"] },
          { level: "intermediate", question: "Check if a string is a palindrome (ignore case). Print True/False.", starterCode: `s = input()\n`, solution: `s = input().lower()\nprint(s == s[::-1])`, expectedOutput: "True", inputs: ["Madam"] },
        ],
      },
      {
        id: "u3t2", title: "Lists",
        notes: `fruits = ["apple","banana","mango"]
fruits.append("grape")
fruits.sort()
print(sum(nums), max(nums), min(nums))

List comprehension: squares = [x**2 for x in range(1,6)]`,
        examples: [{ title: "List ops", code: `marks=[78,65,90]\nmarks.append(72)\nprint(sum(marks)/len(marks))` }],
        testCases: [
          { level: "basic", question: "Given nums=[12,45,7,89,23], print max and min.", starterCode: `nums=[12,45,7,89,23]\n`, solution: `nums=[12,45,7,89,23]\nprint(max(nums))\nprint(min(nums))`, expectedOutput: "89\n7" },
          { level: "intermediate", question: "Use list comprehension on [1..10] to print only even numbers.", starterCode: `nums=list(range(1,11))\n`, solution: `nums=list(range(1,11))\nprint([x for x in nums if x%2==0])`, expectedOutput: "[2, 4, 6, 8, 10]" },
        ],
      },
      {
        id: "u3t3", title: "Dictionaries",
        notes: `student = {"name":"Ravi","age":21}
student["cgpa"] = 8.5
for key, value in student.items():
    print(key, value)

dict.get(key, default) is a safe way to read without crashing on a missing key.`,
        examples: [{ title: "Word frequency", code: `text = "the fox the dog the fox"\nfreq = {}\nfor w in text.split():\n    freq[w] = freq.get(w,0)+1\nprint(freq)` }],
        testCases: [
          { level: "intermediate", question: "Given marks={'Ravi':78,'Priya':92,'Suresh':65}, print the name with highest marks.", starterCode: `marks={"Ravi":78,"Priya":92,"Suresh":65}\n`, solution: `marks={"Ravi":78,"Priya":92,"Suresh":65}\nprint(max(marks, key=marks.get))`, expectedOutput: "Priya" },
        ],
      },
    ],
  },
  {
    id: "u4", title: "Functions", icon: "⚙️",
    desc: "Defining Functions, Scope, Recursion, Lambda",
    topics: [
      {
        id: "u4t1", title: "Defining Functions",
        notes: `def add(a, b):
    return a + b

print() only displays — return sends a value back so you can use it further.
Default params: def greet(name, greeting="Hello"):`,
        examples: [{ title: "Function basics", code: `def area(l,w):\n    return l*w\nprint(area(5,3))` }],
        testCases: [
          { level: "basic", question: "Define square(n) returning n*n. Read n, print square(n).", starterCode: `def square(n):\n    pass\nnum=int(input())\n`, solution: `def square(n):\n    return n*n\nnum=int(input())\nprint(square(num))`, expectedOutput: "49", inputs: ["7"] },
          { level: "intermediate", question: "Define calculate_grade(marks): A>=90,B>=75,C>=60,else F. Read marks, print grade.", starterCode: `def calculate_grade(marks):\n    pass\nmarks=int(input())\n`, solution: `def calculate_grade(marks):\n    if marks>=90: return "A"\n    elif marks>=75: return "B"\n    elif marks>=60: return "C"\n    else: return "F"\nmarks=int(input())\nprint(calculate_grade(marks))`, expectedOutput: "B", inputs: ["80"] },
        ],
      },
      {
        id: "u4t2", title: "Recursion",
        notes: `A function that calls itself. Needs a BASE CASE (stop condition) and a RECURSIVE CASE.

def factorial(n):
    if n <= 1: return 1
    return n * factorial(n-1)

⚠️ Forgetting the base case = infinite recursion error.`,
        examples: [{ title: "Recursive factorial", code: `def factorial(n):\n    if n<=1: return 1\n    return n*factorial(n-1)\nprint(factorial(6))` }],
        testCases: [
          { level: "intermediate", question: "Define recursive fibonacci(n) (0-indexed). Read n, print fibonacci(n).", starterCode: `def fibonacci(n):\n    pass\nn=int(input())\n`, solution: `def fibonacci(n):\n    if n<=1: return n\n    return fibonacci(n-1)+fibonacci(n-2)\nn=int(input())\nprint(fibonacci(n))`, expectedOutput: "21", inputs: ["8"] },
        ],
      },
    ],
  },
  {
    id: "u5", title: "OOP", icon: "🧩",
    desc: "Classes, Objects, Inheritance",
    topics: [
      {
        id: "u5t1", title: "Classes & Objects",
        notes: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def display(self):
        print(f"{self.name}, {self.age}")

s1 = Student("Ravi", 20)
s1.display()

self refers to the specific object the method is called on.`,
        examples: [{ title: "Rectangle class", code: `class Rectangle:\n    def __init__(self,l,w):\n        self.l=l; self.w=w\n    def area(self):\n        return self.l*self.w\nr=Rectangle(5,3)\nprint(r.area())` }],
        testCases: [
          { level: "intermediate", question: "Define class Circle(radius) with method area() returning 3.14*r*r. Create Circle(5), print area().", starterCode: `class Circle:\n    def __init__(self, radius):\n        pass\n    def area(self):\n        pass\nc=Circle(5)\n`, solution: `class Circle:\n    def __init__(self, radius):\n        self.radius=radius\n    def area(self):\n        return 3.14*self.radius*self.radius\nc=Circle(5)\nprint(c.area())`, expectedOutput: "78.5" },
        ],
      },
      {
        id: "u5t2", title: "Inheritance",
        notes: `class Animal:
    def speak(self): print("Some sound")

class Dog(Animal):
    def speak(self): print("Bark")   # overrides parent

Use super().__init__(...) to call the parent's constructor from a child class.`,
        examples: [{ title: "Shape inheritance", code: `class Shape:\n    def area(self): return 0\nclass Square(Shape):\n    def __init__(self,s): self.s=s\n    def area(self): return self.s*self.s\nprint(Square(4).area())` }],
        testCases: [],
      },
    ],
  },
  {
    id: "u6", title: "Exceptions & Files", icon: "🛡️",
    desc: "try/except, File Handling",
    topics: [
      {
        id: "u6t1", title: "Exception Handling",
        notes: `try:
    result = 10 / int(input())
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Invalid number!")

Without handling, a runtime error crashes the whole program.`,
        examples: [{ title: "Safe divide", code: `def safe_div(a,b):\n    try:\n        return a/b\n    except ZeroDivisionError:\n        return "Error"\nprint(safe_div(10,0))` }],
        testCases: [
          { level: "basic", question: "Read a, b. Divide a/b; catch ZeroDivisionError and print 'Cannot divide by zero'.", starterCode: `a=int(input());b=int(input())\n`, solution: `a=int(input());b=int(input())\ntry:\n    print(a/b)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`, expectedOutput: "Cannot divide by zero", inputs: ["10", "0"] },
        ],
      },
      {
        id: "u6t2", title: "File Handling",
        notes: `with open("data.txt", "w") as f:
    f.write("Hello\\n")

with open("data.txt", "r") as f:
    print(f.read())

"with" auto-closes the file, even on error. Modes: "r" read, "w" write, "a" append.`,
        examples: [{ title: "Write & read", code: `with open("n.txt","w") as f:\n    f.write("Hello ALITS")\nwith open("n.txt","r") as f:\n    print(f.read())` }],
        testCases: [
          { level: "basic", question: "Write 'Hello ALITS Students' to greeting.txt, read it back, print it.", starterCode: ``, solution: `with open("greeting.txt","w") as f:\n    f.write("Hello ALITS Students")\nwith open("greeting.txt","r") as f:\n    print(f.read())`, expectedOutput: "Hello ALITS Students" },
        ],
      },
    ],
  },
];

const PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);
const PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);

// ─── PYODIDE LOADER HOOK ────────────────────────────────────────────────────────
const PY_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

function usePyodideRunner() {
  const [pyStatus, setPyStatus] = useState("idle"); // idle | loading | ready | error
  const pyRef = useRef(null);

  const ensureLoaded = useCallback(async () => {
    if (pyRef.current) return pyRef.current;
    if (window.__pyodideInstance) { pyRef.current = window.__pyodideInstance; setPyStatus("ready"); return pyRef.current; }
    setPyStatus("loading");
    try {
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector('script[data-pyodide-loader]');
          if (existing) { existing.addEventListener("load", resolve); existing.addEventListener("error", reject); return; }
          const s = document.createElement("script");
          s.src = PY_CDN + "pyodide.js";
          s.setAttribute("data-pyodide-loader", "true");
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const pyodide = await window.loadPyodide({ indexURL: PY_CDN });
      window.__pyodideInstance = pyodide;
      pyRef.current = pyodide;
      setPyStatus("ready");
      return pyodide;
    } catch (err) {
      setPyStatus("error");
      throw err;
    }
  }, []);

  const runPython = useCallback(async (code, stdinLines = []) => {
    const pyodide = await ensureLoaded();
    pyodide.globals.set("__stdin_queue", stdinLines);
    const setup = `
import sys, io, builtins
__stdin_iter = iter(__stdin_queue.to_py() if hasattr(__stdin_queue, "to_py") else __stdin_queue)
def __fake_input(prompt=""):
    try: return next(__stdin_iter)
    except StopIteration: raise EOFError("Program asked for more input() than provided.")
builtins.input = __fake_input
__stdout_buf = io.StringIO(); __stderr_buf = io.StringIO()
sys.stdout = __stdout_buf; sys.stderr = __stderr_buf
`;
    const teardown = `
sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__
__result_stdout = __stdout_buf.getvalue()
__result_stderr = __stderr_buf.getvalue()
`;
    try {
      await pyodide.runPythonAsync(setup);
      let runtimeError = null;
      try { await pyodide.runPythonAsync(code); } catch (err) { runtimeError = err; }
      await pyodide.runPythonAsync(teardown);
      const stdout = pyodide.globals.get("__result_stdout");
      const stderr = pyodide.globals.get("__result_stderr");
      if (runtimeError) {
        const msg = String(runtimeError.message || runtimeError);
        const lastLine = msg.split("\n").filter(Boolean).pop() || msg;
        return { ok: false, stdout, stderr, error: lastLine };
      }
      return { ok: true, stdout, stderr, error: null };
    } catch (err) {
      return { ok: false, stdout: "", stderr: "", error: err?.message || String(err) };
    }
  }, [ensureLoaded]);

  return { pyStatus, ensureLoaded, runPython };
}

// ─── PYTHON CODE EDITOR (one practice problem) ─────────────────────────────────
function PyCodeEditor({ tc, runPython, pyStatus, ensureLoaded }) {
  const [code, setCode] = useState(tc.starterCode || "");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const taRef = useRef(null);

  useEffect(() => { setCode(tc.starterCode || ""); setOutput(null); setVerdict(null); setShowSolution(false); }, [tc]);

  const handleRun = async () => {
    setRunning(true); setOutput(null); setVerdict(null);
    try {
      if (pyStatus !== "ready") await ensureLoaded();
      const result = await runPython(code, tc.inputs || []);
      setOutput(result);
      if (result.ok && tc.expectedOutput !== undefined) {
        const actual = result.stdout.replace(/\n+$/, "");
        const expected = tc.expectedOutput.replace(/\n+$/, "");
        setVerdict(actual === expected ? "pass" : "fail");
      }
    } catch (e) {
      setOutput({ ok: false, error: e?.message || "Failed to run" });
    } finally { setRunning(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = taRef.current;
      const start = el.selectionStart, end = el.selectionEnd;
      const next = code.slice(0, start) + "    " + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 4; });
    }
  };

  const levelColor = { basic: "#22c55e", intermediate: "#f59e0b", advanced: "#ef4444" }[tc.level] || "#22c55e";

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.03)", marginBottom: 16 }}>
      <div style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ display: "inline-block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 9px", borderRadius: 100, background: levelColor + "22", color: levelColor, border: `1px solid ${levelColor}44`, marginBottom: 8 }}>{tc.level}</span>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{tc.question}</p>
        {tc.inputs && tc.inputs.length > 0 && <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>Sample input: {tc.inputs.join(", ")}</div>}
      </div>
      <textarea
        ref={taRef} value={code} onChange={e => setCode(e.target.value)} onKeyDown={handleKeyDown}
        spellCheck={false} autoCapitalize="off" autoCorrect="off"
        style={{ width: "100%", minHeight: 110, background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13.5, padding: 16, border: "none", outline: "none", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
        placeholder="# Write your Python code here"
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", flexWrap: "wrap" }}>
        <button onClick={handleRun} disabled={running} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: "none", background: running ? "#15803d" : "linear-gradient(90deg,#22c55e,#16a34a)", color: "#fff", fontWeight: 800, fontSize: 12.5, cursor: running ? "default" : "pointer" }}>
          {running ? (pyStatus !== "ready" ? "Loading Python…" : "Running…") : "▶ Run Code"}
        </button>
        <button onClick={() => { setCode(tc.starterCode || ""); setOutput(null); setVerdict(null); }} style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>↺ Reset</button>
        <button onClick={() => setShowSolution(s => !s)} style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.35)", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>{showSolution ? "Hide solution" : "Show solution"}</button>
      </div>
      {output && (
        <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Output</span>
            {verdict === "pass" && <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>✓ Correct!</span>}
            {verdict === "fail" && <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>✕ Not quite</span>}
          </div>
          <pre style={{ fontFamily: "Menlo,Consolas,monospace", fontSize: 13, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#e5e5e5", background: "#08080a", borderRadius: 9, padding: 12, border: "1px solid rgba(255,255,255,0.06)", margin: 0, minHeight: 20 }}>
            {output.ok ? (output.stdout || "(no output)") : `Error: ${output.error}`}
          </pre>
          {output.ok && verdict === "fail" && tc.expectedOutput !== undefined && (
            <pre style={{ fontFamily: "Menlo,Consolas,monospace", fontSize: 13, whiteSpace: "pre-wrap", color: "rgba(255,255,255,0.5)", background: "#08080a", borderRadius: 9, padding: 12, border: "1px dashed rgba(255,255,255,0.15)", marginTop: 8 }}>
              Expected: {tc.expectedOutput}
            </pre>
          )}
        </div>
      )}
      {showSolution && (
        <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,106,0,0.04)" }}>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#FF6A00" }}>Solution</span>
          <pre style={{ fontFamily: "Menlo,Consolas,monospace", fontSize: 13, whiteSpace: "pre-wrap", color: "#ffd9b3", background: "#08080a", borderRadius: 9, padding: 12, border: "1px solid rgba(255,106,0,0.2)", marginTop: 6 }}>{tc.solution}</pre>
        </div>
      )}
    </div>
  );
}

// ─── PYTHON COURSE — TOPIC VIEW ─────────────────────────────────────────────────
function PythonTopicView({ topic, unitTitle, runner }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 60px" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{unitTitle}</div>
      <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, color: "#fff" }}>{topic.title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", whiteSpace: "pre-line", marginBottom: 28, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
        {topic.notes}
      </div>
      {topic.examples && topic.examples.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: ".04em" }}>Worked Examples</h3>
          {topic.examples.map((ex, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 10 }}>
              <div style={{ padding: "8px 14px", background: "rgba(255,255,255,0.04)", fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{ex.title}</div>
              <pre style={{ background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13, padding: 14, margin: 0, overflowX: "auto", lineHeight: 1.6 }}>{ex.code}</pre>
            </div>
          ))}
        </div>
      )}
      {topic.testCases && topic.testCases.length > 0 && (
        <div>
          <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: ".04em" }}>Practice — Run It Yourself</h3>
          {topic.testCases.map((tc, i) => (
            <PyCodeEditor key={i} tc={tc} runPython={runner.runPython} pyStatus={runner.pyStatus} ensureLoaded={runner.ensureLoaded} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PYTHON COURSE — SIDEBAR + SHELL ────────────────────────────────────────────
function PythonCourseShell({ onExitToAdmin, isAdmin }) {
  const allTopics = PY_CURRICULUM.flatMap(u => u.topics.map(t => ({ ...t, unitId: u.id, unitTitle: u.title })));
  const [activeTopicId, setActiveTopicId] = useState(null); // null = course home page
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState(() => new Set([PY_CURRICULUM[0].id]));
  const runner = usePyodideRunner();
  const isMobile = useMobile();

  const activeTopic = allTopics.find(t => t.id === activeTopicId);

  const toggleUnit = (id) => setExpandedUnits(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const goTopic = (id) => { setActiveTopicId(id); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goHome = () => { setActiveTopicId(null); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#fff", display: "flex" }}>
      {/* Top bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 58, zIndex: 50, background: "rgba(6,6,8,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 16px", gap: 12 }}>
        <button onClick={() => setSidebarOpen(s => !s)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", padding: 4 }}>☰</button>
        <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>🐍</div>
          <span style={{ fontWeight: 800, fontSize: 14.5 }}>Python for B.Tech</span>
        </div>
        {isAdmin && (
          <button onClick={onExitToAdmin} style={{ marginLeft: "auto", padding: "7px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>⚙️ Admin</button>
        )}
      </div>

      {/* Sidebar */}
      <aside style={{
        position: "fixed", top: 58, left: 0, bottom: 0, width: 290, background: "#0a0a0d", borderRight: "1px solid rgba(255,255,255,0.08)",
        overflowY: "auto", zIndex: 40, transition: "transform .2s",
        transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
      }}>
        <div style={{ padding: "16px 14px 8px", fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>
          {PY_CURRICULUM.length} units · {PY_TOTAL_TOPICS} topics · {PY_TOTAL_TESTS} problems
        </div>
        {PY_CURRICULUM.map(unit => {
          const open = expandedUnits.has(unit.id);
          return (
            <div key={unit.id} style={{ padding: "0 8px" }}>
              <button onClick={() => toggleUnit(unit.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 10px", background: "none", border: "none", color: "#fff", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{unit.icon} {unit.title}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{open ? "▾" : "▸"}</span>
              </button>
              {open && (
                <div style={{ paddingLeft: 8, marginBottom: 8 }}>
                  {unit.topics.map(topic => (
                    <button key={topic.id} onClick={() => goTopic(topic.id)} style={{
                      display: "block", width: "100%", textAlign: "left", padding: "8px 12px", marginBottom: 2, borderRadius: 8, border: "none", cursor: "pointer",
                      background: activeTopicId === topic.id ? "rgba(255,106,0,0.15)" : "transparent",
                      color: activeTopicId === topic.id ? "#FF6A00" : "rgba(255,255,255,0.65)",
                      fontWeight: activeTopicId === topic.id ? 700 : 500, fontSize: 12.5,
                    }}>{topic.title}</button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>
      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 35 }} />}

      {/* Main content */}
      <main style={{ marginLeft: isMobile ? 0 : 290, marginTop: 58, flex: 1, minWidth: 0 }}>
        {activeTopic ? (
          <PythonTopicView topic={activeTopic} unitTitle={activeTopic.unitTitle} runner={runner} />
        ) : (
          <PythonCourseHome onStart={() => goTopic(allTopics[0].id)} />
        )}
      </main>
    </div>
  );
}

// ─── PYTHON COURSE — NEW HOME PAGE ──────────────────────────────────────────────
function PythonCourseHome({ onStart }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 20px 60px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,106,0,0.12)", border: "1px solid rgba(255,106,0,0.3)", fontSize: 12, fontWeight: 700, color: "#FF6A00", marginBottom: 20 }}>
        🐍 NEW · FREE FOR ALL STUDENTS
      </div>
      <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: "#fff" }}>
        Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
      </h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
        Complete first-year syllabus — from variables to OOP and file handling — with worked examples and {PY_TOTAL_TESTS}+ runnable practice problems. Code executes right on your phone, no installation needed.
      </p>
      <button onClick={onStart} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
        Start Learning →
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginTop: 40 }}>
        {[["📚", PY_CURRICULUM.length, "Units"], ["📖", PY_TOTAL_TOPICS, "Topics"], ["💻", PY_TOTAL_TESTS + "+", "Practice Problems"], ["📱", "Mobile", "Runs Offline"]].map(([icon, num, label]) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{num}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 44, marginBottom: 16, letterSpacing: ".04em" }}>Course Units</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        {PY_CURRICULUM.map((unit, i) => (
          <div key={unit.id} onClick={onStart} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, cursor: "pointer", transition: "border-color .2s" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{unit.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{i + 1}. {unit.title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{unit.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
