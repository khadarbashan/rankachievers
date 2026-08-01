const PY_CURRICULUM = [
  {
    id: "u1",
    title: "Computational Thinking & Programming Basics",
    icon: "🧠",
    desc: "Algorithms, Flowcharts, Python Setup, Variables, Operators",
    syllabus: [
      "Computational thinking: characteristics, problem-solving strategies, algorithms, flowcharts, pseudocode",
      "Introduction to Python: variables, identifiers, keywords, data types, type conversion, I/O",
      "Expressions and operators: arithmetic, relational, logical, assignment, operator precedence"
    ],
    hours: 10, co: "CO1",
    topics: [
      {
        id: "u1t1",
        title: "Computational Thinking & Your First Program",
        notes: `### Computational Thinking
Computational thinking is a structured **problem-solving strategies** — a structured approach that uses four key pillars:

- **Decomposition** — breaking a complex problem into smaller sub-problems
- **Pattern Recognition** — identifying similarities across problems
- **Abstraction** — focusing on essential information, ignoring irrelevant details
- **Algorithm Design** — creating a step-by-step solution

### Characteristics
- Logical and structured approach to problem solving
- Applicable to real-world problems beyond computing
- Encourages thinking like a computer scientist

### Steps in Problem Solving
1. Understand the problem
2. Plan the solution (algorithm / flowchart)
3. Write the code
4. Test and debug
5. Optimise

### Algorithms — Definition and Properties
An **algorithm** is a finite, ordered set of well-defined instructions to solve a problem.

**Properties of a good algorithm:**
- **Finiteness** — must terminate after a finite number of steps
- **Definiteness** — each step must be clearly defined
- **Input** — zero or more inputs
- **Output** — one or more outputs
- **Effectiveness** — each step must be feasible

### Flowcharts — Symbols and Construction

| Symbol | Shape | Meaning |
|--------|-------|---------|
| Start/Stop | Oval | Begin or end |
| Process | Rectangle | Computation/assignment |
| Decision | Diamond | if/else branch |
| Input/Output | Parallelogram | Read or print |
| Arrow | Line | Flow direction |

### Pseudo Code — Writing and Conversion
Pseudocode is an informal, English-like description of an algorithm.

Example pseudocode for finding largest of two numbers:
BEGIN
  READ A, B
  IF A > B THEN
    PRINT A as largest
  ELSE
    PRINT B as largest
  END IF
END

### Abstraction, Decomposition, Pattern Recognition
- **Abstraction**: Represent a problem at a high level without unnecessary details
- **Decomposition**: Split "Calculate student result" into → read marks, calculate average, assign grade, print result
- **Pattern Recognition**: Notice that all grade calculations follow the same if-elif-else pattern
- **Algorithm Efficiency**: Prefer algorithms that solve problems with fewer steps (e.g. binary search over linear search)

### Writing Your First Python Program
\`\`\`python
print("Hello, World!")
print("Welcome to B.Tech Python Programming")
\`\`\`

**Key points:**
- \`print()\` displays output on the screen
- Text in quotes is a **string**
- Python does NOT use semicolons to end lines (unlike C/Java)
- Indentation is part of the syntax — wrong indentation = crash

### Comments
\`\`\`python
# This is a single-line comment
print("This runs")  # comment after code also works
\`\`\`

> 💡 **Tools:** Use Flowgorithm to design and simulate algorithms; Lucidchart for flowcharts; Algorithm Visualizer to trace execution.`,
        examples: [
          { title: "Hello World", code: `print("Hello, World!")\nprint("My name is Python")` },
          { title: "Printing multiple values", code: `print("Sum of 5 and 3 is:", 5 + 3)\nprint("A", "B", "C", sep=" - ")\nprint("Same line", end=" >> ")\nprint("continued here")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Write a program to print 'ALITS' on one line and 'Anantapur' on the next line.",
            starterCode: "# Write your code below\n",
            solution: `print("ALITS")\nprint("Anantapur")`,
            expectedOutput: "ALITS\nAnantapur"
          },
          {
            level: "basic",
            question: "Print 'I am learning Python' using ONE print() with comma-separated words.",
            starterCode: "# Use one print() with commas\n",
            solution: `print("I", "am", "learning", "Python")`,
            expectedOutput: "I am learning Python"
          },
          {
            level: "intermediate",
            question: "Print 'Total Marks: 95' and 'Percentage: 95.0%' using a single print() separated by ' | '.",
            starterCode: "",
            solution: `print("Total Marks: 95", "Percentage: 95.0%", sep=" | ")`,
            expectedOutput: "Total Marks: 95 | Percentage: 95.0%"
          }
        ]
      },
      {
        id: "u1t2",
        title: "Variables, Data Types & Type Conversion",
        notes: `### Installation and Execution Environment
- Download Python from python.org
- Run in: IDLE, VS Code, PyCharm, Thonny, or online at replit.com
- Run a script: \`python3 filename.py\`
- Interactive mode: type \`python3\` in terminal

### Variables and Identifiers
A **variable** is a named location in memory that stores a value.

\`\`\`python
name = "Khadar"   # string
age = 21           # integer
cgpa = 8.75        # float
is_passed = True   # boolean
\`\`\`

**Identifier rules:**
- Must start with letter or underscore, not a digit
- Can contain letters, digits, underscores — no spaces
- Case-sensitive: \`marks\` and \`Marks\` are different
- Cannot use Python keywords

### Keywords
Reserved words: \`if\`, \`else\`, \`elif\`, \`while\`, \`for\`, \`def\`, \`class\`, \`return\`, \`import\`, \`True\`, \`False\`, \`None\`, \`and\`, \`or\`, \`not\`, \`in\`, \`is\`, \`break\`, \`continue\`, \`pass\`, \`try\`, \`except\`, \`finally\`, \`lambda\`, \`global\`, \`nonlocal\`

### Data Types

| Type | Example | Description |
|------|---------|-------------|
| \`int\` | \`10\`, \`-5\` | Whole numbers |
| \`float\` | \`3.14\` | Decimal numbers |
| \`str\` | \`"hello"\` | Text |
| \`bool\` | \`True\`, \`False\` | Logical value |
| \`list\` | \`[1,2,3]\` | Ordered mutable collection |
| \`tuple\` | \`(1,2,3)\` | Ordered immutable collection |
| \`dict\` | \`{"a":1}\` | Key-value pairs |
| \`set\` | \`{1,2,3}\` | Unordered unique elements |

### Type Conversion
\`\`\`python
x = 10
print(type(x))         # <class 'int'>
y = str(x)              # int to string: "10"
z = float(x)            # int to float: 10.0
a = int("25")           # string to int: 25
b = int(3.9)            # float to int: 3 (truncates!)
\`\`\`

> ⚠️ \`int("12.5")\` will CRASH — use \`int(float("12.5"))\` instead.

### Input and Output Statements
\`\`\`python
name = input("Enter your name: ")   # always returns a STRING
age = int(input("Enter your age: "))  # convert to int
print(f"{name} is {age} years old")   # f-string (modern)
\`\`\`

### Expressions and Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | \`+\` \`-\` \`*\` \`/\` \`//\` \`%\` \`**\` |
| Relational | \`==\` \`!=\` \`>\` \`<\` \`>=\` \`<=\` |
| Logical | \`and\` \`or\` \`not\` |
| Assignment | \`=\` \`+=\` \`-=\` \`*=\` \`//=\` \`%=\` |

> ⚠️ \`5/2 = 2.5\` in Python (not 2). Use \`//\` for integer division.

**Operator Precedence (high to low):** \`**\` → \`* / // %\` → \`+ -\` → comparisons → \`not\` → \`and\` → \`or\``,
        examples: [
          { title: "Variables and types", code: `name = "Lakshmi"\nage = 20\nheight = 5.4\nprint(name, age, height)\nprint(type(name))\nprint(type(age))` },
          { title: "Type conversion", code: `roll_no = "101"\nroll_int = int(roll_no)\nprint(roll_int + 1)\n\nmarks = 89\nmarks_str = str(marks)\nprint("Marks: " + marks_str)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create variables: name='Ravi', age=19, cgpa=8.2. Print all three separated by spaces.",
            starterCode: "name = \nage = \ncgpa = \n",
            solution: `name = "Ravi"\nage = 19\ncgpa = 8.2\nprint(name, age, cgpa)`,
            expectedOutput: "Ravi 19 8.2"
          },
          {
            level: "basic",
            question: "marks_str='45'. Convert to int, add 5, print the result.",
            starterCode: `marks_str = "45"\n# convert and add 5\n`,
            solution: `marks_str = "45"\nmarks_int = int(marks_str)\nprint(marks_int + 5)`,
            expectedOutput: "50"
          },
          {
            level: "intermediate",
            question: "num=7.89. Print its type, convert to int, print value and new type.",
            starterCode: "num = 7.89\n",
            solution: `num = 7.89\nprint(type(num))\nnum_int = int(num)\nprint(num_int)\nprint(type(num_int))`,
            expectedOutput: "<class 'float'>\n7\n<class 'int'>"
          },
          {
            level: "advanced",
            question: "Swap a=5, b=10 WITHOUT a third variable using Python tuple swap. Print both.",
            starterCode: "a = 5\nb = 10\n# swap here\n",
            solution: `a = 5\nb = 10\na, b = b, a\nprint(a, b)`,
            expectedOutput: "10 5",
            hints: ["Python allows: a, b = b, a in a single line"]
          }
        ]
      }      ,
      {
        id: "u1t3",
        title: "Input & Output Statements",
        notes: `### Taking Input from the User
\`\`\`python
name = input("Enter your name: ")   # always returns a STRING
print("Hello,", name)
\`\`\`

> ⚠️ **CRITICAL RULE:** input() **always** returns a string, even if the user types a number!

\`\`\`python
age = int(input("Enter your age: "))   # convert to int
price = float(input("Enter price: "))  # convert to float
\`\`\`

### print() with Formatting
\`\`\`python
name = "Ravi"
marks = 92

# f-string (modern, preferred)
print(f"{name} scored {marks} marks")
print(f"CGPA: {8.6789:.2f}")    # 2 decimal places

# sep and end parameters
print("A", "B", "C", sep="-")     # A-B-C
print("Hello", end=" ")
print("World")                      # Hello World (same line)
\`\`\`

### Taking Multiple Inputs
\`\`\`python
a, b = map(int, input().split())   # read two ints on one line
print(a + b)
\`\`\`

> 💡 **Thonny** is the recommended IDE for beginners — it shows variable values as you type.`,
        examples: [
          { title: "Numeric input", code: `a = int(input("First number: "))\nb = int(input("Second number: "))\nprint(f"Sum = {a + b}")` },
          { title: "Formatted output", code: `name = "Priya"\ncgpa = 9.1234\nprint(f"Student: {name}")\nprint(f"CGPA: {cgpa:.2f}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a name, print 'Hello <name>, welcome to ALITS!'",
            starterCode: "name = input()\n",
            solution: `name = input()\nprint(f"Hello {name}, welcome to ALITS!")`,
            expectedOutput: "Hello Khadar, welcome to ALITS!",
            inputs: ["Khadar"]
          },
          {
            level: "intermediate",
            question: "Read two integers, print 'Sum = 15'.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: `a = int(input())\nb = int(input())\nprint(f"Sum = {a+b}")`,
            expectedOutput: "Sum = 15",
            inputs: ["10", "5"]
          },
          {
            level: "intermediate",
            question: "Read a float price, print formatted to 2 decimals: 'Price: 49.99'",
            starterCode: "price = float(input())\n",
            solution: `price = float(input())\nprint(f"Price: {price:.2f}")`,
            expectedOutput: "Price: 49.99",
            inputs: ["49.99"]
          }
        ]
      },
      {
        id: "u1t4",
        title: "Expressions & Operators",
        notes: `### Arithmetic Operators
| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | 8 |
| \`-\` | Subtraction | \`5 - 3\` | 2 |
| \`*\` | Multiplication | \`5 * 3\` | 15 |
| \`/\` | Division (always float) | \`5 / 2\` | 2.5 |
| \`//\` | Floor division | \`5 // 2\` | 2 |
| \`%\` | Modulus (remainder) | \`5 % 2\` | 1 |
| \`**\` | Power | \`2 ** 3\` | 8 |

> ⚠️ 5/2 gives 2.5 in Python (NOT 2). Use // for integer division.

### Relational Operators
\`==\` \`!=\` \`>\` \`<\` \`>=\` \`<=\` — return True or False

### Logical Operators
\`and\`, \`or\`, \`not\` — Python spells these out (no && or || like C/Java)

### Assignment Operators
\`=\` \`+=\` \`-=\` \`*=\` \`/=\` \`//=\` \`%=\` \`**=\`

### Operator Precedence (high to low)
\`**\` → \`* / // %\` → \`+ -\` → comparisons → \`not\` → \`and\` → \`or\`

### Expressions
\`\`\`python
a, b = 17, 5
print(a + b)    # 22
print(a / b)    # 3.4
print(a // b)   # 3
print(a % b)    # 2
print(a ** 2)   # 289
print(a > b and b > 0)   # True
\`\`\``,
        examples: [
          { title: "Arithmetic operators", code: `a, b = 17, 5\nprint(f"{a} + {b} = {a+b}")\nprint(f"{a} // {b} = {a//b}")\nprint(f"{a} % {b} = {a%b}")\nprint(f"{a} ** 2 = {a**2}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read two integers a and b. Print a // b and a % b on separate lines.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: `a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)`,
            expectedOutput: "3\n1",
            inputs: ["10", "3"]
          },
          {
            level: "intermediate",
            question: "Check if a number is divisible by both 3 and 5. Print True or False.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nprint(n % 3 == 0 and n % 5 == 0)`,
            expectedOutput: "True",
            inputs: ["15"]
          },
          {
            level: "advanced",
            question: "Calculate Simple Interest SI=(P*R*T)/100. Read P, R, T as floats. Print to 2 decimals.",
            starterCode: "P = float(input())\nR = float(input())\nT = float(input())\n",
            solution: `P = float(input())\nR = float(input())\nT = float(input())\nSI = (P * R * T) / 100\nprint(f"{SI:.2f}")`,
            expectedOutput: "750.00",
            inputs: ["5000", "5", "3"]
          }
        ]
      }
    ]
  },
  {
    id: "u2",
    title: "Decision Making & Looping",
    icon: "🔀",
    desc: "if/elif/else, Loops, break/continue, Problem Solving",
    syllabus: [
      "Decision control: Boolean expressions; if, if-else, if-elif-else, nested if; ternary operator",
      "Looping: while, for, nested loops, infinite loops; break, continue, pass; else with loops",
      "Practical: prime check, pattern programs, menu-driven programs"
    ],
    hours: 10, co: "CO2",
    topics: [
      {
        id: "u2t1",
        title: "if / if-else / if-elif-else",
        notes: `### Boolean Expressions
A Boolean expression evaluates to \`True\` or \`False\`.

\`\`\`python
x = 10
print(x > 5)      # True
print(x == 5)     # False
\`\`\`

**Falsy values:** \`0\`, \`""\`, \`[]\`, \`{}\`, \`None\`, \`False\`
**Truthy values:** Any non-zero number, non-empty string/list

### if, if-else, if-elif-else
\`\`\`python
# if
marks = 75
if marks >= 40:
    print("Pass")

# if-else
age = 16
if age >= 18:
    print("Eligible")
else:
    print("Not eligible")

# if-elif-else
marks = 67
if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 60:
    grade = "C"
else:
    grade = "F"
print(grade)
\`\`\`

### Nested if
\`\`\`python
num = 15
if num > 0:
    if num % 2 == 0:
        print("Positive even")
    else:
        print("Positive odd")
else:
    print("Not positive")
\`\`\`

### Conditional Expressions (Ternary Operator)
\`\`\`python
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)
\`\`\`

> 💡 **Tool:** Use Python Tutor to visualize if-else execution step by step.`,
        examples: [
          { title: "Grade calculator", code: `marks = 82\nif marks >= 90:\n    grade = "A"\nelif marks >= 75:\n    grade = "B"\nelif marks >= 60:\n    grade = "C"\nelse:\n    grade = "F"\nprint(f"Grade: {grade}")` },
          { title: "Leap year check", code: `year = 2024\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print(f"{year} is a leap year")\nelse:\n    print(f"{year} is not a leap year")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read an integer. Print 'Positive', 'Negative', or 'Zero'.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nif n > 0:\n    print("Positive")\nelif n < 0:\n    print("Negative")\nelse:\n    print("Zero")`,
            expectedOutput: "Positive", inputs: ["7"]
          },
          {
            level: "basic",
            question: "Read age. Print 'Eligible' if >= 18, else 'Not Eligible'.",
            starterCode: "age = int(input())\n",
            solution: `age = int(input())\nif age >= 18:\n    print("Eligible")\nelse:\n    print("Not Eligible")`,
            expectedOutput: "Eligible", inputs: ["20"]
          },
          {
            level: "intermediate",
            question: "Read marks (0-100). Print grade: A(>=90), B(>=75), C(>=60), D(>=40), F(below 40).",
            starterCode: "marks = int(input())\n",
            solution: `marks = int(input())\nif marks >= 90:\n    print("A")\nelif marks >= 75:\n    print("B")\nelif marks >= 60:\n    print("C")\nelif marks >= 40:\n    print("D")\nelse:\n    print("F")`,
            expectedOutput: "B", inputs: ["78"]
          },
          {
            level: "advanced",
            question: "Read 3 triangle sides. Print 'Equilateral', 'Isosceles', 'Scalene', or 'Invalid triangle'.",
            starterCode: "a = int(input())\nb = int(input())\nc = int(input())\n",
            solution: `a = int(input())\nb = int(input())\nc = int(input())\nif a + b <= c or b + c <= a or a + c <= b:\n    print("Invalid triangle")\nelif a == b == c:\n    print("Equilateral")\nelif a == b or b == c or a == c:\n    print("Isosceles")\nelse:\n    print("Scalene")`,
            expectedOutput: "Isosceles", inputs: ["5","5","8"]
          }
        ]
      },
      {
        id: "u2t2",
        title: "while Loop",
        notes: `### while Loop
Repeats a block while a condition is True.

\`\`\`python
i = 1
while i <= 5:
    print(i)
    i += 1   # CRITICAL: forgetting this = infinite loop!
\`\`\`

### Iteration Techniques
\`\`\`python
# Count-controlled
count = 0
while count < 5:
    print(count)
    count += 1

# Sentinel-controlled
num = int(input())
while num != -1:
    print(f"You entered: {num}")
    num = int(input())
\`\`\`

### Infinite Loops
\`\`\`python
while True:
    response = input("Continue? (yes/no): ")
    if response == "no":
        break
\`\`\`

### Loop Control — break, continue, pass
\`\`\`python
i = 0
while i < 10:
    i += 1
    if i == 5:
        continue    # skip 5
    if i == 8:
        break       # stop at 8
    print(i)
\`\`\`

### else with while
The else block runs only if the loop completes without break.
\`\`\`python
i = 1
while i <= 3:
    print(i)
    i += 1
else:
    print("Loop completed normally")
\`\`\`

> 💡 **Tool:** Use Thonny to debug loop-based programs step by step.`,
        examples: [
          { title: "Sum of first N numbers", code: `n = 5\ni = 1\ntotal = 0\nwhile i <= n:\n    total += i\n    i += 1\nprint(f"Sum = {total}")` },
          { title: "Reverse digits", code: `num = 1234\nreversed_num = 0\nwhile num > 0:\n    digit = num % 10\n    reversed_num = reversed_num * 10 + digit\n    num = num // 10\nprint(f"Reversed: {reversed_num}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print numbers 1 to n using while loop.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\ni = 1\nwhile i <= n:\n    print(i)\n    i += 1`,
            expectedOutput: "1\n2\n3\n4\n5", inputs: ["5"]
          },
          {
            level: "intermediate",
            question: "Read n. Find sum of digits of n using while loop.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)`,
            expectedOutput: "6", inputs: ["123"]
          },
          {
            level: "intermediate",
            question: "Check if a number is a palindrome using while. Print True or False.",
            starterCode: "n = int(input())\noriginal = n\n",
            solution: `n = int(input())\noriginal = n\nreversed_num = 0\nwhile n > 0:\n    digit = n % 10\n    reversed_num = reversed_num * 10 + digit\n    n //= 10\nprint(reversed_num == original)`,
            expectedOutput: "True", inputs: ["121"]
          },
          {
            level: "advanced",
            question: "Find GCD using Euclidean algorithm (while b != 0: a, b = b, a % b). Print GCD.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: `a = int(input())\nb = int(input())\nwhile b != 0:\n    a, b = b, a % b\nprint(a)`,
            expectedOutput: "6", inputs: ["48","18"]
          }
        ]
      },
      {
        id: "u2t3",
        title: "for Loop & range()",
        notes: `### for Loop
The for loop iterates over a sequence.

\`\`\`python
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8 (step)
    print(i)
\`\`\`

> ⚠️ range(n) stops BEFORE n — does NOT include n.

### Iteration Techniques
\`\`\`python
# Loop over a string
for ch in "ALITS":
    print(ch)

# Loop over a list
for fruit in ["apple", "banana", "mango"]:
    print(fruit)

# enumerate() — index and value
for index, fruit in enumerate(["apple", "banana"]):
    print(index, fruit)
\`\`\`

### Nested Loops — Pattern Programs
\`\`\`python
# Star triangle
for i in range(1, 5):
    for j in range(i):
        print("*", end="")
    print()
\`\`\`

### Practical Problem Solving
**Prime number check:**
\`\`\`python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
\`\`\`

**Menu-driven program:**
\`\`\`python
while True:
    print("1. Add  2. Subtract  3. Exit")
    choice = int(input("Enter choice: "))
    if choice == 1:
        print(int(input()) + int(input()))
    elif choice == 2:
        print(int(input()) - int(input()))
    elif choice == 3:
        break
\`\`\`

> 💡 **Tools:** Use Python Tutor to visualize loop execution step by step. Use **Thonny** to debug loop-based programs.`,
        examples: [
          { title: "Multiplication table", code: `n = 5\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n*i}")` },
          { title: "Star pyramid", code: `rows = 4\nfor i in range(1, rows+1):\n    print("*" * i)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print multiplication table of n from 1 to 10.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n*i}")`,
            expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30",
            inputs: ["3"]
          },
          {
            level: "basic",
            question: "Read n. Find factorial using for loop.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint(fact)`,
            expectedOutput: "120", inputs: ["5"]
          },
          {
            level: "intermediate",
            question: "Read rows. Print right-angled star triangle.",
            starterCode: "rows = int(input())\n",
            solution: `rows = int(input())\nfor i in range(1, rows+1):\n    print("*" * i)`,
            expectedOutput: "*\n**\n***\n****", inputs: ["4"]
          },
          {
            level: "intermediate",
            question: "Read n. Print all prime numbers from 2 to n inclusive.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfor num in range(2, n+1):\n    is_prime = True\n    for i in range(2, int(num**0.5)+1):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num)`,
            expectedOutput: "2\n3\n5\n7", inputs: ["10"]
          },
          {
            level: "advanced",
            question: "Print number pyramid for n=4:\n1 \n1 2 \n1 2 3 \n1 2 3 4 ",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        print(j, end=" ")\n    print()`,
            expectedOutput: "1 \n1 2 \n1 2 3 \n1 2 3 4 ", inputs: ["4"]
          }
        ]
      },
      {
        id: "u2t4",
        title: "break, continue, pass",
        notes: `### break — exit the loop immediately
\`\`\`python
for i in range(1, 10):
    if i == 5:
        break
    print(i)
# prints 1 2 3 4
\`\`\`

### continue — skip current iteration
\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
# prints 1 2 4 5
\`\`\`

### pass — do nothing (placeholder)
\`\`\`python
for i in range(5):
    if i == 3:
        pass    # TODO: implement later
    print(i)
\`\`\`

### else with Loops
The else block runs only if the loop completes without break.

\`\`\`python
# Practical: prime check using for-else
n = 17
for i in range(2, n):
    if n % i == 0:
        print(f"{n} is not prime")
        break
else:
    print(f"{n} is prime")  # runs only if no break
\`\`\`

> 💡 **Tool:** Use Thonny to step through and debug loop programs.`,
        examples: [
          { title: "Find first multiple of 7", code: `for i in range(1, 100):\n    if i % 7 == 0:\n        print(f"Found: {i}")\n        break` },
          { title: "Print odd numbers using continue", code: `for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    print(i)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print 1 to n but stop (break) when you reach 6.",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfor i in range(1, n+1):\n    if i == 6:\n        break\n    print(i)`,
            expectedOutput: "1\n2\n3\n4\n5", inputs: ["10"]
          },
          {
            level: "intermediate",
            question: "Read n. Print 1 to n except multiples of 3 (use continue).",
            starterCode: "n = int(input())\n",
            solution: `n = int(input())\nfor i in range(1, n+1):\n    if i % 3 == 0:\n        continue\n    print(i)`,
            expectedOutput: "1\n2\n4\n5\n7\n8\n10", inputs: ["10"]
          }
        ]
      }
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
      "Tuples: creation, operations, packing and unpacking; Sets: union, intersection, difference, frozen sets"
    ],
    hours: 10, co: "CO3",
    topics: [
      {
        id: "u3t1",
        title: "Strings",
        notes: `### String Representation
A string is a sequence of characters enclosed in quotes.
\`\`\`python
s1 = 'Hello'
s2 = "World"
s3 = """This is a
multi-line string"""
\`\`\`

### Indexing and Slicing
\`\`\`python
s = "Python"
print(s[0])       # 'P'   — positive index from start
print(s[-1])      # 'n'   — negative index from end
print(s[0:4])     # 'Pyth'  — start:stop (stop excluded)
print(s[:4])      # 'Pyth'  — start defaults to 0
print(s[2:])      # 'thon'  — stop defaults to end
print(s[::-1])    # 'nohtyP'  — reverses the string
print(s[::2])     # 'Pto'    — every 2nd character
\`\`\`

### Operations
\`\`\`python
s1 = "Hello"
s2 = "World"
print(s1 + " " + s2)   # concatenation: "Hello World"
print(s1 * 3)            # repetition: "HelloHelloHello"
print("Hello" in s1)     # membership: True
print(len(s1))            # length: 5
\`\`\`

### Built-in Functions and Methods
\`\`\`python
s = "  Hello World  "
print(s.strip())              # "Hello World" — remove whitespace
print(s.lower())              # all lowercase
print(s.upper())              # all uppercase
print(s.title())              # Title Case
print(s.replace("World", "Python"))
print(s.split())              # ['Hello', 'World']
print(s.find("World"))        # index of first occurrence
print(s.count("l"))           # count occurrences: 3
print(s.startswith("  He"))   # True
print("123".isdigit())        # True
print("abc".isalpha())        # True

# join — combine list into string
words = ["I", "love", "Python"]
print(" ".join(words))  # "I love Python"
\`\`\`

> 💡 Strings are **immutable** — \`s[0] = 'X'\` throws an error.
> 
> **Tool:** Use NLTK and TextBlob for text analysis (sentiment, word frequency).`,
        examples: [
          { title: "String slicing and methods", code: `s = "ALITS Anantapur"\nprint(s[:5])\nprint(s[6:])\nprint(s[::-1])\nprint(s.upper())\nprint(len(s))` },
          { title: "Counting vowels", code: `s = "Engineering"\ncount = 0\nfor ch in s.lower():\n    if ch in "aeiou":\n        count += 1\nprint(f"Vowels: {count}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a string. Print its length using len().",
            starterCode: "s = input()\n",
            solution: `s = input()\nprint(len(s))`,
            expectedOutput: "6", inputs: ["Python"]
          },
          {
            level: "basic",
            question: "Read a string. Print it reversed using slicing [::-1].",
            starterCode: "s = input()\n",
            solution: `s = input()\nprint(s[::-1])`,
            expectedOutput: "nohtyP", inputs: ["Python"]
          },
          {
            level: "intermediate",
            question: "Read a string. Check if palindrome (ignore case). Print True or False.",
            starterCode: "s = input()\n",
            solution: `s = input()\ns = s.lower()\nprint(s == s[::-1])`,
            expectedOutput: "True", inputs: ["Madam"]
          },
          {
            level: "intermediate",
            question: "Read a sentence. Count vowels (a,e,i,o,u, case-insensitive). Print count.",
            starterCode: "s = input()\n",
            solution: `s = input()\ncount = 0\nfor ch in s.lower():\n    if ch in "aeiou":\n        count += 1\nprint(count)`,
            expectedOutput: "5", inputs: ["Engineering"]
          },
          {
            level: "advanced",
            question: "Read a sentence. Print each word with its length as 'word:length' separated by spaces.",
            starterCode: "s = input()\n",
            solution: `s = input()\nwords = s.split()\nresult = []\nfor w in words:\n    result.append(f"{w}:{len(w)}")\nprint(" ".join(result))`,
            expectedOutput: "I:1 love:4 Python:6", inputs: ["I love Python"]
          }
        ]
      },
      {
        id: "u3t2",
        title: "Lists",
        notes: `### List Creation and Indexing
\`\`\`python
fruits = ["apple", "banana", "mango"]
nums = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

print(fruits[0])    # 'apple'
print(fruits[-1])   # 'mango'
\`\`\`

### Slicing
\`\`\`python
nums = [10, 20, 30, 40, 50]
print(nums[1:3])    # [20, 30]
print(nums[:3])     # [10, 20, 30]
print(nums[::2])    # [10, 30, 50]
print(nums[::-1])   # [50, 40, 30, 20, 10]
\`\`\`

### Operations
\`\`\`python
a = [1, 2, 3]
b = [4, 5, 6]
print(a + b)        # [1,2,3,4,5,6]
print(a * 2)        # [1,2,3,1,2,3]
print(3 in a)       # True
print(len(a))       # 3
\`\`\`

### Built-in Functions
\`\`\`python
nums = [5, 2, 8, 1, 9]
print(len(nums))    # 5
print(sum(nums))    # 25
print(max(nums))    # 9
print(min(nums))    # 1
print(sorted(nums)) # [1,2,5,8,9] — new sorted list
\`\`\`

### List Methods
\`\`\`python
fruits = ["apple", "banana", "mango"]
fruits.append("kiwi")         # add to end
fruits.insert(1, "grape")     # insert at index
fruits.remove("banana")       # remove first match
fruits.pop()                  # remove and return last
fruits.sort()                 # sort in place
fruits.sort(reverse=True)     # sort descending
fruits.reverse()              # reverse in place
fruits.index("mango")         # find index of value
fruits.count("apple")         # count occurrences
fruits.clear()                # remove all elements
\`\`\`

### Nested Lists
\`\`\`python
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]
print(matrix[1][2])  # 6 (row 1, col 2)
\`\`\`

### List Comprehension
\`\`\`python
squares = [x**2 for x in range(1, 6)]
evens = [x for x in range(1, 21) if x % 2 == 0]
\`\`\`

> 💡 **Tool:** Use NLTK to perform word frequency analysis using lists.`,
        examples: [
          { title: "Basic list operations", code: `marks = [78, 65, 90, 55, 88]\nmarks.append(72)\nprint(marks)\nprint("Max:", max(marks))\nprint("Average:", sum(marks)/len(marks))\nmarks.sort()\nprint("Sorted:", marks)` },
          { title: "List comprehension", code: `squares = [x**2 for x in range(1, 6)]\nprint(squares)\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read 5 integers into a list. Print the list.",
            starterCode: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\n",
            solution: `nums = []\nfor i in range(5):\n    nums.append(int(input()))\nprint(nums)`,
            expectedOutput: "[3, 1, 4, 1, 5]", inputs: ["3","1","4","1","5"]
          },
          {
            level: "basic",
            question: "Given nums=[12,45,7,89,23], print max and min.",
            starterCode: "nums = [12, 45, 7, 89, 23]\n",
            solution: `nums = [12, 45, 7, 89, 23]\nprint(max(nums))\nprint(min(nums))`,
            expectedOutput: "89\n7"
          },
          {
            level: "intermediate",
            question: "Read 5 integers. Print sorted in descending order.",
            starterCode: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\n",
            solution: `nums = []\nfor i in range(5):\n    nums.append(int(input()))\nnums.sort(reverse=True)\nprint(nums)`,
            expectedOutput: "[9, 8, 5, 4, 1]", inputs: ["5","1","9","4","8"]
          },
          {
            level: "intermediate",
            question: "Use list comprehension on [1..10] to get only even numbers. Print the list.",
            starterCode: "nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n",
            solution: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)`,
            expectedOutput: "[2, 4, 6, 8, 10]"
          },
          {
            level: "advanced",
            question: "Read 6 integers. Remove duplicates preserving order. Print the result.",
            starterCode: "nums = []\nfor i in range(6):\n    nums.append(int(input()))\n",
            solution: `nums = []\nfor i in range(6):\n    nums.append(int(input()))\nresult = []\nfor n in nums:\n    if n not in result:\n        result.append(n)\nprint(result)`,
            expectedOutput: "[1, 2, 3, 4]", inputs: ["1","2","2","3","4","1"]
          }
        ]
      },
      {
        id: "u3t3",
        title: "Tuples & Sets",
        notes: `### Tuples — Ordered, Immutable

**Creation:**
\`\`\`python
t1 = (1, 2, 3)
t2 = (1,)          # single-element — note the comma!
t3 = 1, 2, 3       # parentheses optional
empty = ()
\`\`\`

**Operations:**
\`\`\`python
t = (10, 20, 30, 40, 50)
print(t[0])       # 10 — indexing
print(t[1:4])     # (20, 30, 40) — slicing
print(t + (60,))  # concatenation
print(t * 2)      # repetition
print(len(t))     # 5
print(30 in t)    # True
\`\`\`

**Packing and Unpacking:**
\`\`\`python
# Packing
student = ("Ravi", 21, 8.5)

# Unpacking
name, age, cgpa = student
print(name, age, cgpa)  # Ravi 21 8.5

# Swap using unpacking
a, b = 5, 10
a, b = b, a
print(a, b)  # 10 5
\`\`\`

> Tuples are faster than lists and safe for data that shouldn't change.

---

### Sets — Unordered, Unique Elements

**Creation:**
\`\`\`python
s = {1, 2, 3, 3, 2, 1}
print(s)          # {1, 2, 3} — duplicates removed!
empty_set = set() # NOT {} — that creates a dict!
\`\`\`

**Set Operations — Union, Intersection, Difference:**
\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)    # union: {1,2,3,4,5,6}
print(a & b)    # intersection: {3,4}
print(a - b)    # difference (in a, not b): {1,2}
print(a ^ b)    # symmetric difference: {1,2,5,6}
\`\`\`

**Set Methods:**
\`\`\`python
s = {1, 2, 3}
s.add(4)           # add element
s.remove(1)        # remove (error if missing)
s.discard(10)      # remove safely (no error)
s.clear()          # remove all
\`\`\`

### Frozen Sets
An immutable version of a set — cannot be modified after creation.
\`\`\`python
fs = frozenset([1, 2, 3])
print(fs)   # frozenset({1, 2, 3})
# fs.add(4)  # AttributeError!
\`\`\``,
        examples: [
          { title: "Tuple unpacking", code: `student = ("Ravi", 21, 8.5)\nname, age, cgpa = student\nprint(f"{name} is {age} years old with CGPA {cgpa}")` },
          { title: "Set operations", code: `a = {"Ravi", "Priya", "Khadar"}\nb = {"Priya", "Suresh", "Khadar"}\nprint("Both:", a & b)\nprint("Either:", a | b)\nprint("Only A:", a - b)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create coords = (3, 4). Print sum of its two elements.",
            starterCode: "coords = (3, 4)\n",
            solution: `coords = (3, 4)\nprint(coords[0] + coords[1])`,
            expectedOutput: "7"
          },
          {
            level: "intermediate",
            question: "Read 7 integers. Convert to set to remove duplicates. Print count of unique elements.",
            starterCode: "nums = []\nfor i in range(7):\n    nums.append(int(input()))\n",
            solution: `nums = []\nfor i in range(7):\n    nums.append(int(input()))\nprint(len(set(nums)))`,
            expectedOutput: "4", inputs: ["1","2","2","3","3","3","4"]
          },
          {
            level: "advanced",
            question: "Given a={1,2,3,4,5} and b={4,5,6,7,8}, print union, intersection, difference (a-b) as sorted lists.",
            starterCode: "a = {1,2,3,4,5}\nb = {4,5,6,7,8}\n",
            solution: `a = {1,2,3,4,5}\nb = {4,5,6,7,8}\nprint(sorted(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))`,
            expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8]\n[4, 5]\n[1, 2, 3]"
          }
        ]
      }
    ]
  },
  {
    id: "u4",
    title: "Functions & Problem Solving",
    icon: "⚙️",
    desc: "Dictionaries, Functions, Recursion, Lambda",
    syllabus: [
      "Dictionaries: creation, operations, methods; dictionary-based applications",
      "Functions: built-in/user-defined, positional/keyword/default/variable-length arguments, scope",
      "Recursion: factorial, Fibonacci; lambda functions; applications in problem solving"
    ],
    hours: 10, co: "CO4",
    topics: [
      {
        id: "u4t1",
        title: "Dictionaries",
        notes: `### Dictionary Creation
A dictionary stores key-value pairs — like a real dictionary (word → meaning).

\`\`\`python
student = {"name": "Ravi", "age": 21, "branch": "ECE"}
empty = {}
d2 = dict(name="Khadar", marks=90)
\`\`\`

### Operations
\`\`\`python
# Access
print(student["name"])              # 'Ravi'
print(student.get("phone", "N/A")) # safe access — no KeyError

# Add / Update
student["cgpa"] = 8.5    # add new key
student["age"] = 22      # update existing

# Delete
del student["age"]       # delete key
student.pop("cgpa")      # remove and return value

# Membership (checks KEYS, not values)
print("name" in student)  # True
\`\`\`

### Methods
\`\`\`python
d = {"a": 1, "b": 2, "c": 3}
print(d.keys())     # dict_keys(['a', 'b', 'c'])
print(d.values())   # dict_values([1, 2, 3])
print(d.items())    # dict_items([('a',1), ...])
d.update({"d": 4}) # merge another dict
d.clear()           # remove all
\`\`\`

### Iterating
\`\`\`python
for key, value in student.items():
    print(key, ":", value)
\`\`\`

### Dictionary-Based Applications
\`\`\`python
# Word frequency counter
text = "the quick brown fox the lazy dog the fox"
freq = {}
for word in text.split():
    freq[word] = freq.get(word, 0) + 1
print(freq)
\`\`\`

### Dictionary Comprehension
\`\`\`python
squares = {x: x**2 for x in range(1, 6)}
\`\`\`

> 💡 Use \`SymPy\` for symbolic mathematical dictionary-based expressions.`,
        examples: [
          { title: "Student record", code: `student = {"name": "Lakshmi", "age": 20, "branch": "ECE", "cgpa": 9.1}\nfor key, value in student.items():\n    print(f"{key}: {value}")` },
          { title: "Word frequency", code: `text = "the quick brown fox the lazy dog the fox"\nfreq = {}\nfor word in text.split():\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create student={'name':'Ravi','marks':88}. Print value for 'marks'.",
            starterCode: `student = {"name": "Ravi", "marks": 88}\n`,
            solution: `student = {"name": "Ravi", "marks": 88}\nprint(student["marks"])`,
            expectedOutput: "88"
          },
          {
            level: "intermediate",
            question: "Read 4 words. Count frequency using a dict. Print the dict.",
            starterCode: "freq = {}\nfor i in range(4):\n    word = input()\n",
            solution: `freq = {}\nfor i in range(4):\n    word = input()\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)`,
            expectedOutput: "{'apple': 2, 'banana': 1, 'mango': 1}",
            inputs: ["apple","banana","apple","mango"]
          },
          {
            level: "advanced",
            question: "Given marks={'Ravi':78,'Priya':92,'Suresh':65,'Lakshmi':88}, print name with highest marks.",
            starterCode: `marks = {"Ravi": 78, "Priya": 92, "Suresh": 65, "Lakshmi": 88}\n`,
            solution: `marks = {"Ravi": 78, "Priya": 92, "Suresh": 65, "Lakshmi": 88}\nprint(max(marks, key=marks.get))`,
            expectedOutput: "Priya"
          }
        ]
      },
      {
        id: "u4t2",
        title: "Defining & Calling Functions",
        notes: `### Built-in Functions
Python has many ready-to-use functions: \`print()\`, \`input()\`, \`len()\`, \`range()\`, \`type()\`, \`int()\`, \`str()\`, \`max()\`, \`min()\`, \`sum()\`, \`abs()\`, \`round()\`

### User-Defined Functions — Definition and Calling
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Ravi")
greet("Priya")
\`\`\`

### Types of Arguments

**Positional arguments** — order matters:
\`\`\`python
def add(a, b):
    return a + b
print(add(3, 5))   # a=3, b=5
\`\`\`

**Keyword arguments** — order doesn't matter:
\`\`\`python
def student_info(name, age, branch):
    print(f"{name}, {age}, {branch}")
student_info(age=21, name="Ravi", branch="ECE")
\`\`\`

**Default arguments:**
\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")
greet("Ravi")                   # uses default
greet("Priya", "Good morning")  # overrides default
\`\`\`

**Variable-length arguments (*args, **kwargs):**
\`\`\`python
def total(*args):
    return sum(args)
print(total(1, 2, 3, 4))   # 10

def show_info(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}: {v}")
show_info(name="Khadar", dept="ECE")
\`\`\`

### Scope of Variables (Local and Global)
**Local** — defined inside a function, only accessible there.
**Global** — defined outside, accessible everywhere.

\`\`\`python
x = 10   # global

def modify():
    global x
    x = 20   # modifies the global x

modify()
print(x)   # 20
\`\`\`

> 💡 **Tool:** Use PyCharm for modular program development with functions.`,
        examples: [
          { title: "Function with return", code: `def calculate_area(length, width):\n    return length * width\n\narea = calculate_area(5, 3)\nprint(f"Area: {area}")` },
          { title: "Variable-length args", code: `def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3))        # 6\nprint(total(10, 20, 30, 40)) # 100` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define square(n) returning n*n. Read n, call it, print result.",
            starterCode: "def square(n):\n    # write your code\n\nnum = int(input())\n",
            solution: `def square(n):\n    return n * n\n\nnum = int(input())\nprint(square(num))`,
            expectedOutput: "49", inputs: ["7"]
          },
          {
            level: "basic",
            question: "Define is_even(n) returning True if even. Read n, print result.",
            starterCode: "def is_even(n):\n    # write your code\n\nnum = int(input())\n",
            solution: `def is_even(n):\n    return n % 2 == 0\n\nnum = int(input())\nprint(is_even(num))`,
            expectedOutput: "True", inputs: ["10"]
          },
          {
            level: "intermediate",
            question: "Define calculate_grade(marks): A>=90, B>=75, C>=60, else F. Read marks, print grade.",
            starterCode: "def calculate_grade(marks):\n    # write your code\n\nmarks = int(input())\n",
            solution: `def calculate_grade(marks):\n    if marks >= 90:\n        return "A"\n    elif marks >= 75:\n        return "B"\n    elif marks >= 60:\n        return "C"\n    else:\n        return "F"\n\nmarks = int(input())\nprint(calculate_grade(marks))`,
            expectedOutput: "B", inputs: ["80"]
          },
          {
            level: "advanced",
            question: "Define stats(numbers) returning (min, max, avg). Use [12,45,7,89,23], print all three.",
            starterCode: "def stats(numbers):\n    # return (min, max, avg)\n\nnums = [12, 45, 7, 89, 23]\n",
            solution: `def stats(numbers):\n    return min(numbers), max(numbers), sum(numbers)/len(numbers)\n\nnums = [12, 45, 7, 89, 23]\nlow, high, avg = stats(nums)\nprint(low, high, avg)`,
            expectedOutput: "7 89 35.2"
          }
        ]
      },
      {
        id: "u4t3",
        title: "Variable Scope (Local vs Global)",
        notes: `### Local Scope
Variables defined inside a function exist only within that function.

\`\`\`python
def show():
    y = 5    # local variable
    print(y)

show()
# print(y)  # NameError: y is not defined outside
\`\`\`

### Global Scope
Variables defined outside all functions are global.

\`\`\`python
x = 10   # global

def show():
    print(x)   # can READ global x

show()   # 10
\`\`\`

### Modifying Global Variables
Assignment inside a function creates a new local variable by default.

\`\`\`python
x = 10
def wrong():
    x = 20      # creates LOCAL x
    print(x)    # 20

wrong()
print(x)        # 10 — global unchanged!
\`\`\`

Use the \`global\` keyword to modify the global:
\`\`\`python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)   # 2
\`\`\`

### nonlocal (for nested functions)
\`\`\`python
def outer():
    x = 5
    def inner():
        nonlocal x
        x += 1
        return x
    return inner()

print(outer())   # 6
\`\`\``,
        examples: [
          { title: "Global counter", code: `total = 0\n\ndef add_to_total(value):\n    global total\n    total += value\n\nadd_to_total(10)\nadd_to_total(20)\nprint(f"Total: {total}")` }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Global balance=1000. Define withdraw(amount) using global. Call withdraw(250), print balance.",
            starterCode: "balance = 1000\n\ndef withdraw(amount):\n    # write your code\n",
            solution: `balance = 1000\n\ndef withdraw(amount):\n    global balance\n    balance -= amount\n\nwithdraw(250)\nprint(balance)`,
            expectedOutput: "750"
          }
        ]
      },
      {
        id: "u4t4",
        title: "Recursion",
        notes: `### What is Recursion?
A function that calls itself to solve a smaller version of the same problem.

Every recursive function needs:
1. A **base case** — where it stops
2. A **recursive case** — where it calls itself with a simpler input

### Recursive Factorial
\`\`\`python
def factorial(n):
    if n == 0 or n == 1:    # base case
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(5))   # 120
\`\`\`

How it unfolds: factorial(5) = 5 × 4 × 3 × 2 × 1 = 120

### Recursive Fibonacci
\`\`\`python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

for i in range(8):
    print(fib(i), end=" ")   # 0 1 1 2 3 5 8 13
\`\`\`

### Lambda Functions (Anonymous Functions)
A compact, one-line function without a name.

\`\`\`python
square = lambda x: x ** 2
add = lambda a, b: a + b

print(square(5))    # 25
print(add(3, 4))    # 7
\`\`\`

Used with map(), filter(), sorted():
\`\`\`python
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))
sorted_list = sorted(students, key=lambda s: s[1], reverse=True)
\`\`\`

### Applications of Functions in Problem Solving
- Breaking complex problems into smaller sub-problems
- Reusing code across multiple programs
- Divide and conquer algorithms (merge sort, binary search)
- Tree traversal in data structures

> ⚠️ Forgetting the base case causes RecursionError: maximum recursion depth exceeded.
> 💡 Use **SymPy** for symbolic mathematical expressions in function-based problems.
> 💡 Use **PyCharm** for modular program development with functions and recursion.`,
        examples: [
          { title: "Recursive factorial", code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))` },
          { title: "Lambda with map and filter", code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsquared_evens = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))\nprint(squared_evens)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define recursive factorial(n). Read n, print factorial(n).",
            starterCode: "def factorial(n):\n    # write your code\n\nn = int(input())\n",
            solution: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nprint(factorial(n))`,
            expectedOutput: "120", inputs: ["5"]
          },
          {
            level: "intermediate",
            question: "Define recursive fibonacci(n) (0-indexed). Read n, print fibonacci(n).",
            starterCode: "def fibonacci(n):\n    # write your code\n\nn = int(input())\n",
            solution: `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nn = int(input())\nprint(fibonacci(n))`,
            expectedOutput: "21", inputs: ["8"]
          },
          {
            level: "advanced",
            question: "Define recursive power(base, exp) without **. Read base, exp, print result.",
            starterCode: "def power(base, exp):\n    # write your code\n\nbase = int(input())\nexp = int(input())\n",
            solution: `def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nbase = int(input())\nexp = int(input())\nprint(power(base, exp))`,
            expectedOutput: "32", inputs: ["2","5"]
          }
        ]
      },
      {
        id: "u4t5",
        title: "Lambda Functions",
        notes: `### Lambda — Anonymous Functions
Creates a short, throwaway function in a single line.

\`\`\`python
# Syntax: lambda arguments: expression
square = lambda x: x ** 2
add = lambda a, b: a + b
is_even = lambda x: x % 2 == 0

print(square(5))      # 25
print(add(3, 4))      # 7
print(is_even(10))    # True
\`\`\`

### lambda vs def
\`\`\`python
# These are equivalent:
def cube(x):
    return x ** 3

cube_lambda = lambda x: x ** 3
\`\`\`

When to use lambda: short, throwaway logic passed into sorted(), map(), filter().
When to use def: multi-line logic or functions you'll reuse by name.

### map() — Apply function to every element
\`\`\`python
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))
print(squared)   # [1, 4, 9, 16, 25]
\`\`\`

### filter() — Keep only matching elements
\`\`\`python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)   # [2, 4, 6]
\`\`\`

### sorted() with custom key
\`\`\`python
students = [("Ravi", 78), ("Priya", 92), ("Suresh", 65)]
sorted_by_marks = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_by_marks)
# [('Priya', 92), ('Ravi', 78), ('Suresh', 65)]
\`\`\`

### Applications
\`\`\`python
# Sort words by length
words = ["banana", "apple", "kiwi", "mango"]
print(sorted(words, key=lambda w: len(w)))
# ['kiwi', 'apple', 'mango', 'banana']
\`\`\``,
        examples: [
          { title: "map and filter combined", code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsquared_evens = list(map(lambda x: x**2,\n                         filter(lambda x: x % 2 == 0, nums)))\nprint(squared_evens)` },
          { title: "Sort by custom key", code: `students = [("Ravi", 78), ("Priya", 92), ("Suresh", 65)]\ntop = sorted(students, key=lambda s: s[1], reverse=True)\nfor name, marks in top:\n    print(name, marks)` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create lambda 'cube' returning x**3. Print cube(3).",
            starterCode: "cube = lambda x: # complete this\n",
            solution: `cube = lambda x: x ** 3\nprint(cube(3))`,
            expectedOutput: "27"
          },
          {
            level: "intermediate",
            question: "Given nums=[1..10], use map() with lambda to double each. Print the list.",
            starterCode: "nums = [1,2,3,4,5,6,7,8,9,10]\n",
            solution: `nums = [1,2,3,4,5,6,7,8,9,10]\ndoubled = list(map(lambda x: x*2, nums))\nprint(doubled)`,
            expectedOutput: "[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
          },
          {
            level: "advanced",
            question: "Sort students=[('Ravi',78),('Priya',92),('Suresh',65),('Lakshmi',88)] by marks descending. Print.",
            starterCode: `students = [("Ravi",78), ("Priya",92), ("Suresh",65), ("Lakshmi",88)]\n`,
            solution: `students = [("Ravi",78), ("Priya",92), ("Suresh",65), ("Lakshmi",88)]\nresult = sorted(students, key=lambda s: s[1], reverse=True)\nprint(result)`,
            expectedOutput: "[('Priya', 92), ('Lakshmi', 88), ('Ravi', 78), ('Suresh', 65)]"
          }
        ]
      }
    ]
  },
  {
    id: "u5",
    title: "File Handling, Exceptions & OOP",
    icon: "🛡️",
    desc: "Modules, File Handling, Exceptions, OOP",
    syllabus: [
      "Modules: creating/importing modules; standard library (math, os, random, datetime)",
      "File handling: opening, reading, writing, closing; file modes; text files; CSV and Excel files",
      "Exception handling: syntax/runtime/logical errors; try, except, finally; raising exceptions",
      "OOP: classes, objects, attributes, methods, constructors, self keyword; basic OOP applications"
    ],
    hours: 10, co: "CO5",
    topics: [
      {
        id: "u5t1",
        title: "Modules & Packages",
        notes: `### Creating and Importing Modules
A module is a Python file (.py) with functions, variables, and classes you can reuse.

Creating a module:
\`\`\`python
# math_utils.py
def square(n):
    return n * n

def cube(n):
    return n * n * n

PI = 3.14159
\`\`\`

Importing:
\`\`\`python
import math_utils
print(math_utils.square(4))     # 16

from math_utils import square    # import specific function
print(square(5))                 # 25

import math_utils as mu          # alias
print(mu.cube(2))                # 8

from math_utils import *         # import everything (use carefully)
\`\`\`

### Standard Library Modules

**math:**
\`\`\`python
import math
print(math.sqrt(16))       # 4.0
print(math.pi)             # 3.14159...
print(math.factorial(5))   # 120
print(math.ceil(4.3))      # 5
print(math.floor(4.9))     # 4
print(math.pow(2, 10))     # 1024.0
\`\`\`

**os:**
\`\`\`python
import os
print(os.getcwd())           # current directory
print(os.listdir("."))       # files in current dir
os.mkdir("new_folder")       # create directory
os.rename("old.txt","new.txt")
os.remove("file.txt")
\`\`\`

**random:**
\`\`\`python
import random
print(random.randint(1, 6))          # random integer 1-6
print(random.random())                # float 0.0-1.0
print(random.choice(["a","b","c"]))   # pick one randomly
random.shuffle([1,2,3,4,5])           # shuffle list in place
\`\`\`

**datetime:**
\`\`\`python
import datetime
today = datetime.date.today()
print(today)                    # e.g. 2025-07-14
now = datetime.datetime.now()
print(now.strftime("%d/%m/%Y")) # 14/07/2025
\`\`\`

### Packages
A package is a folder of related modules with an __init__.py file.
Install third-party packages: \`pip install numpy\`, \`pip install pandas\``,
        examples: [
          { title: "Using math module", code: `import math\nprint(math.sqrt(144))\nprint(math.pi)\nprint(math.factorial(6))` },
          { title: "Using random module", code: `import random\nfor _ in range(5):\n    print(random.randint(1, 10))` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Import math. Print floor(7.8) and ceil(7.2).",
            starterCode: "import math\n",
            solution: `import math\nprint(math.floor(7.8))\nprint(math.ceil(7.2))`,
            expectedOutput: "7\n8"
          },
          {
            level: "intermediate",
            question: "Using random, set seed to 42, then print random.randint(1,100).",
            starterCode: "import random\n",
            solution: `import random\nrandom.seed(42)\nprint(random.randint(1,100))`,
            expectedOutput: "82"
          }
        ]
      },
      {
        id: "u5t2",
        title: "File Handling",
        notes: `### Opening, Reading, Writing, Closing Files

\`\`\`python
# Basic open/close
f = open("data.txt", "w")
f.write("Hello, file!")
f.close()   # always close to save changes

# Better: use 'with' — auto-closes even if an error occurs
with open("data.txt", "w") as f:
    f.write("Hello, file!")
\`\`\`

### File Modes

| Mode | Meaning |
|------|---------|
| \`"r"\` | Read (default; file must exist) |
| \`"w"\` | Write (creates new or overwrites) |
| \`"a"\` | Append (adds to end) |
| \`"r+"\` | Read and write |
| \`"b"\` | Binary mode (combine: "rb", "wb") |

### Working with Text Files

Writing:
\`\`\`python
with open("notes.txt", "w") as f:
    f.write("Line 1\n")
    f.writelines(["Line 2\n", "Line 3\n"])
\`\`\`

Reading:
\`\`\`python
with open("notes.txt", "r") as f:
    content = f.read()          # entire file as string

with open("notes.txt", "r") as f:
    lines = f.readlines()       # list of lines

with open("notes.txt", "r") as f:
    for line in f:              # memory-efficient
        print(line.strip())
\`\`\`

Appending:
\`\`\`python
with open("log.txt", "a") as f:
    f.write("New log entry\n")
\`\`\`

### Processing CSV Files
\`\`\`python
import csv

# Writing CSV
with open("students.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Marks"])
    writer.writerow(["Ravi", 85])

# Reading CSV
with open("students.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
\`\`\`

### Processing Excel Files
\`\`\`python
# pip install openpyxl
import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws["A1"] = "Name"
ws["B1"] = "Marks"
wb.save("students.xlsx")
\`\`\``,
        examples: [
          { title: "Write and read a file", code: `with open("notes.txt", "w") as f:\n    f.write("Python is fun\n")\n    f.write("File handling is easy\n")\n\nwith open("notes.txt", "r") as f:\n    print(f.read())` },
          { title: "Count lines and words", code: `with open("data.txt", "w") as f:\n    f.write("Hello World\nPython Programming\nALITS College\n")\n\nwith open("data.txt", "r") as f:\n    lines = f.readlines()\n    print(f"Lines: {len(lines)}")\n    total_words = sum(len(line.split()) for line in lines)\n    print(f"Words: {total_words}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Write 'Hello ALITS Students' to greeting.txt, read it back and print.",
            starterCode: "",
            solution: `with open("greeting.txt", "w") as f:\n    f.write("Hello ALITS Students")\n\nwith open("greeting.txt", "r") as f:\n    print(f.read())`,
            expectedOutput: "Hello ALITS Students"
          },
          {
            level: "intermediate",
            question: "Write 'Python\\nis\\nfun\\n' to words.txt. Read back with readlines(). Print total lines.",
            starterCode: "",
            solution: `with open("words.txt", "w") as f:\n    f.write("Python\nis\nfun\n")\n\nwith open("words.txt", "r") as f:\n    lines = f.readlines()\n    print(len(lines))`,
            expectedOutput: "3"
          },
          {
            level: "advanced",
            question: "Write 1 to 5 to numbers.txt (each on new line). Read back, convert to int, print sum.",
            starterCode: "",
            solution: `with open("numbers.txt", "w") as f:\n    for i in range(1, 6):\n        f.write(f"{i}\n")\n\ntotal = 0\nwith open("numbers.txt", "r") as f:\n    for line in f:\n        total += int(line.strip())\nprint(total)`,
            expectedOutput: "15"
          }
        ]
      },
      {
        id: "u5t3",
        title: "Exception Handling",
        notes: `### Types of Errors

**Syntax errors** — detected before running (incorrect code structure):
print("Hello"   # SyntaxError: missing closing parenthesis

**Runtime errors** — occur while running:
\`\`\`python
x = 10 / 0       # ZeroDivisionError
int("abc")        # ValueError
lst = [1,2,3]; lst[10]  # IndexError
\`\`\`

**Logical errors** — program runs but gives wrong output:
\`\`\`python
def average(a, b):
    return a + b / 2   # Wrong! Should be (a+b)/2
\`\`\`

### try / except Block
\`\`\`python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
    print(result)
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Invalid number!")
\`\`\`

### Common Built-in Exceptions

| Exception | When it occurs |
|-----------|----------------|
| \`ZeroDivisionError\` | Division by zero |
| \`ValueError\` | Wrong type/value (e.g. int("abc")) |
| \`TypeError\` | Wrong type in operation |
| \`IndexError\` | Index out of range |
| \`KeyError\` | Dictionary key doesn't exist |
| \`FileNotFoundError\` | File doesn't exist |
| \`NameError\` | Variable not defined |

### try / except / else / finally
\`\`\`python
try:
    result = 100 / num
except ZeroDivisionError:
    print("Division by zero")
else:
    print(f"Result: {result}")    # only if no exception
finally:
    print("This ALWAYS runs")      # cleanup code
\`\`\`

### Raising Exceptions
\`\`\`python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount

try:
    withdraw(100, 500)
except ValueError as e:
    print(e)   # Insufficient funds
\`\`\``,
        examples: [
          { title: "Safe division", code: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error: Division by zero"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a, b. Divide a/b. Catch ZeroDivisionError and print 'Cannot divide by zero'.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: `a = int(input())\nb = int(input())\ntry:\n    print(a / b)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`,
            expectedOutput: "Cannot divide by zero", inputs: ["10","0"]
          },
          {
            level: "intermediate",
            question: "Read a string. Try to convert to int. Print 'Valid number: n' or 'Invalid number'.",
            starterCode: "s = input()\n",
            solution: `s = input()\ntry:\n    n = int(s)\n    print(f"Valid number: {n}")\nexcept ValueError:\n    print("Invalid number")`,
            expectedOutput: "Invalid number", inputs: ["abc"]
          },
          {
            level: "advanced",
            question: "Define safe_list_access(lst, index) catching IndexError, returning 'Index out of range'. Test with [1,2,3] at index 10.",
            starterCode: "def safe_list_access(lst, index):\n    # write your code\n\nlst = [1, 2, 3]\n",
            solution: `def safe_list_access(lst, index):\n    try:\n        return lst[index]\n    except IndexError:\n        return "Index out of range"\n\nlst = [1, 2, 3]\nprint(safe_list_access(lst, 10))`,
            expectedOutput: "Index out of range"
          }
        ]
      },
      {
        id: "u5t4",
        title: "Classes & Objects",
        notes: `### Introduction to OOP
Object-Oriented Programming models real-world entities as objects bundling data (attributes) and behaviour (methods).

Four pillars of OOP:
- **Encapsulation** — hiding internal data
- **Inheritance** — child class reuses parent features
- **Polymorphism** — same method name, different behaviour
- **Abstraction** — hiding implementation details

### Classes, Objects, Attributes, Methods

\`\`\`python
class Student:                       # class definition
    college = "ALITS"                # class attribute (shared by all)

    def __init__(self, name, age):   # constructor
        self.name = name             # instance attribute (unique per object)
        self.age = age

    def display(self):               # method
        print(f"Name: {self.name}, Age: {self.age}")

s1 = Student("Ravi", 20)            # creating an object
s2 = Student("Priya", 21)
s1.display()   # Name: Ravi, Age: 20
\`\`\`

### Constructors and self Keyword
The \`__init__\` method runs automatically when an object is created.
\`self\` refers to the current object — Python passes it automatically.

### Basic Applications of OOP in Python
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance   # private attribute

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient funds")
        else:
            self.__balance -= amount

    def get_balance(self):
        return self.__balance

acc = BankAccount("Ravi", 1000)
acc.deposit(500)
acc.withdraw(200)
print(acc.get_balance())   # 1300
\`\`\``,
        examples: [
          { title: "Rectangle class", code: `class Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n\n    def area(self):\n        return self.length * self.width\n\n    def perimeter(self):\n        return 2 * (self.length + self.width)\n\nr = Rectangle(5, 3)\nprint(f"Area: {r.area()}")\nprint(f"Perimeter: {r.perimeter()}")` }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define Circle with __init__(radius) and area()=3.14*r*r. Create Circle(5), print area().",
            starterCode: "class Circle:\n    def __init__(self, radius):\n        # write your code\n\n    def area(self):\n        # write your code\n\nc = Circle(5)\n",
            solution: `class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14 * self.radius * self.radius\n\nc = Circle(5)\nprint(c.area())`,
            expectedOutput: "78.5"
          },
          {
            level: "intermediate",
            question: "Define Student(name, marks) with get_grade(): Pass if marks>=40 else Fail. Create Student('Ravi',35), print grade.",
            starterCode: "class Student:\n    def __init__(self, name, marks):\n        # write your code\n\n    def get_grade(self):\n        # write your code\n\ns = Student(\"Ravi\", 35)\n",
            solution: `class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n\n    def get_grade(self):\n        return "Pass" if self.marks >= 40 else "Fail"\n\ns = Student("Ravi", 35)\nprint(s.get_grade())`,
            expectedOutput: "Fail"
          },
          {
            level: "advanced",
            question: "Define BankAccount with deposit(), withdraw() (no negative balance). Start=1000, deposit 500, withdraw 2000 (fail), withdraw 300, print balance.",
            starterCode: "class BankAccount:\n    def __init__(self, balance):\n        # write your code\n\n    def deposit(self, amount):\n        # write your code\n\n    def withdraw(self, amount):\n        # write your code\n\nacc = BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\n",
            solution: `class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print("Insufficient funds")\n        else:\n            self.balance -= amount\n\nacc = BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\nprint(acc.balance)`,
            expectedOutput: "Insufficient funds\n1200"
          }
        ]
      },
      {
        id: "u5t5",
        title: "Inheritance",
        notes: `### Inheritance
A child class reuses and extends a parent class — avoids code duplication.

\`\`\`python
class Animal:                    # parent / base class
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):               # child / derived class
    def speak(self):             # method overriding
        print(f"{self.name} barks")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} meows")

d = Dog("Tommy")
d.speak()   # Tommy barks
\`\`\`

### super() — Call Parent's Method
\`\`\`python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)    # calls Animal's __init__
        self.breed = breed

    def speak(self):
        super().speak()            # call parent's speak
        print(f"{self.name} ({self.breed}) also barks")
\`\`\`

### Types of Inheritance
- **Single** — one parent, one child
- **Multi-level** — A → B → C
- **Multiple** — class C(A, B)
- **Hierarchical** — one parent, many children`,
        examples: [
          { title: "Shape inheritance", code: `class Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nshapes = [Square(4), Circle(3)]\nfor s in shapes:\n    print(f"Area: {s.area()}")` }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Define Employee(name, salary) with annual_salary()=salary*12. Subclass Manager adds bonus, overrides annual_salary. Create Manager('Ravi',50000,20000), print annual_salary().",
            starterCode: "class Employee:\n    def __init__(self, name, salary):\n        pass\n    def annual_salary(self):\n        pass\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        pass\n    def annual_salary(self):\n        pass\n\nm = Manager(\"Ravi\", 50000, 20000)\n",
            solution: `class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n    def annual_salary(self):\n        return self.salary * 12\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n    def annual_salary(self):\n        return super().annual_salary() + self.bonus\n\nm = Manager("Ravi", 50000, 20000)\nprint(m.annual_salary())`,
            expectedOutput: "620000"
          }
        ]
      },
      {
        id: "u5t6",
        title: "Encapsulation & Polymorphism",
        notes: `### Encapsulation
Hiding internal data and exposing only what's needed through methods.

Access modifiers (by convention):
\`\`\`python
class Person:
    def __init__(self):
        self.name = "Ravi"       # public
        self._age = 21            # protected — don't access directly from outside
        self.__salary = 50000      # private — name-mangled to _Person__salary
\`\`\`

Private attributes and getters/setters:
\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance   # private

    def get_balance(self):         # getter
        return self.__balance

    def deposit(self, amount):     # controlled write
        if amount > 0:
            self.__balance += amount

acc = BankAccount(1000)
print(acc.get_balance())    # 1000
# acc.__balance  # AttributeError!
\`\`\`

### Polymorphism
Same method name, different behaviour depending on the object.

\`\`\`python
class Cat:
    def speak(self): return "Meow"

class Dog:
    def speak(self): return "Woof"

class Duck:
    def speak(self): return "Quack"

animals = [Cat(), Dog(), Duck()]
for animal in animals:
    print(animal.speak())
\`\`\`

This is called duck typing in Python — code works with any object that has a .speak() method, regardless of its exact type.

### Method Overriding
Child class provides its own version of an inherited method.

\`\`\`python
class Shape:
    def area(self):
        return 0    # default

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):          # overrides parent
        return 3.14 * self.r ** 2
\`\`\``,
        examples: [
          { title: "Polymorphism with shapes", code: `class Square:\n    def __init__(self, side): self.side = side\n    def area(self): return self.side ** 2\n\nclass Triangle:\n    def __init__(self, base, height): self.base=base; self.height=height\n    def area(self): return 0.5 * self.base * self.height\n\nshapes = [Square(4), Triangle(6, 3)]\nfor shape in shapes:\n    print(f"{type(shape).__name__} area: {shape.area()}")` }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Define Account with private __pin. Add verify_pin(pin) returning True if matches. Create Account(1234), print verify_pin(1234) and verify_pin(9999).",
            starterCode: "class Account:\n    def __init__(self, pin):\n        # write your code\n    def verify_pin(self, pin):\n        # write your code\n\nacc = Account(1234)\n",
            solution: `class Account:\n    def __init__(self, pin):\n        self.__pin = pin\n    def verify_pin(self, pin):\n        return self.__pin == pin\n\nacc = Account(1234)\nprint(acc.verify_pin(1234))\nprint(acc.verify_pin(9999))`,
            expectedOutput: "True\nFalse"
          },
          {
            level: "advanced",
            question: "Define Circle, Square, Rectangle each with area(). Put one in a list. Print each area using a for loop (polymorphism).",
            starterCode: "class Circle:\n    def __init__(self, radius): pass\n    def area(self): pass\n\nclass Square:\n    def __init__(self, side): pass\n    def area(self): pass\n\nclass Rectangle:\n    def __init__(self, length, width): pass\n    def area(self): pass\n\nshapes = [Circle(2), Square(3), Rectangle(4, 5)]\n",
            solution: `class Circle:\n    def __init__(self, radius): self.radius = radius\n    def area(self): return 3.14 * self.radius ** 2\n\nclass Square:\n    def __init__(self, side): self.side = side\n    def area(self): return self.side ** 2\n\nclass Rectangle:\n    def __init__(self, length, width): self.length=length; self.width=width\n    def area(self): return self.length * self.width\n\nshapes = [Circle(2), Square(3), Rectangle(4, 5)]\nfor s in shapes:\n    print(s.area())`,
            expectedOutput: "12.56\n9\n20"
          }
        ]
      }
    ]
  }
];

const PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);
const PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);
