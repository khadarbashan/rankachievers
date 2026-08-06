const PY_CURRICULUM = [
  {
    id: "u1",
    title: "Computational Thinking & Programming Basics",
    icon: "\ud83e\udde0",
    desc: "Algorithms, Flowcharts, Python Basics, Variables, Operators",
    hours: 10,
    co: "CO1",
    topics: [
      {
        id: "u1t1",
        title: "1.1.1 \u2014 Characteristics of Computational Thinking",
        notes: "### Characteristics of Computational Thinking\n\nComputational thinking is a way of solving problems that can be understood and executed by a computer. It has four core characteristics:\n\n| Characteristic | Meaning |\n|----------------|---------|\n| **Logical** | Problems are solved using rules and logic |\n| **Structured** | Steps are organized and ordered |\n| **Generalized** | Solutions can be applied to similar problems |\n| **Efficient** | Solutions use minimal steps and resources |\n\nComputational thinking is NOT programming \u2014 it is the **thought process** before writing code.\n\n> \ud83d\udca1 A doctor diagnosing a patient uses computational thinking \u2014 identifying symptoms (input), applying medical rules (algorithm), producing a diagnosis (output).",
        examples: [
          {
            title: "Identifying inputs and outputs",
            code: "# Problem: Find if a number is even or odd\n# Input: a number\n# Process: check if divisible by 2\n# Output: 'Even' or 'Odd'\nnum = 7\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Print 'Even' if num is even, else 'Odd' for num=4.",
            starterCode: "num = 4\n",
            solution: "num = 4\nprint('Even' if num % 2 == 0 else 'Odd')",
            expectedOutput: "Even"
          }
        ]
      },
      {
        id: "u1t2",
        title: "1.1.2 \u2014 Problem-Solving Strategies",
        notes: "### Problem-Solving Strategies in Computational Thinking\n\nGood programmers use systematic strategies before writing a single line of code:\n\n**1. Understand the problem**\n- What is the input? What is the expected output?\n- Are there any constraints or edge cases?\n\n**2. Decomposition**\nBreak a complex problem into smaller, manageable sub-problems.\n\n```\nProblem: Calculate student result\n  \u2192 Sub-problem 1: Read all subject marks\n  \u2192 Sub-problem 2: Calculate total and average\n  \u2192 Sub-problem 3: Assign grade\n  \u2192 Sub-problem 4: Print result\n```\n\n**3. Pattern Recognition**\nFind similarities between this problem and problems you've solved before.\n\n**4. Abstraction**\nFocus only on the relevant details. Ignore unnecessary information.\n\n**5. Algorithm Design**\nWrite step-by-step instructions to solve the problem.\n\n> \ud83d\udca1 Always solve the problem on paper before coding.",
        examples: [
          {
            title: "Decomposition example",
            code: "# Decomposed student result program\ndef read_marks():\n    return [75, 88, 92, 65, 80]\n\ndef calculate_average(marks):\n    return sum(marks) / len(marks)\n\ndef assign_grade(avg):\n    if avg >= 90: return 'A'\n    elif avg >= 75: return 'B'\n    elif avg >= 60: return 'C'\n    else: return 'F'\n\nmarks = read_marks()\navg = calculate_average(marks)\ngrade = assign_grade(avg)\nprint(f'Average: {avg:.1f}, Grade: {grade}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Use decomposition: define get_total(marks) returning sum. Call with [70,80,90], print total.",
            starterCode: "def get_total(marks):\n    # write here\n\nprint(get_total([70, 80, 90]))",
            solution: "def get_total(marks):\n    return sum(marks)\nprint(get_total([70, 80, 90]))",
            expectedOutput: "240"
          }
        ]
      },
      {
        id: "u1t3",
        title: "1.1.3 \u2014 Steps in Problem Solving",
        notes: "### Steps in Problem Solving\n\nEvery programming problem is solved using a standard sequence of steps:\n\n**Step 1 \u2014 Problem Analysis**\nUnderstand what the problem is asking. Identify inputs and outputs.\n\n**Step 2 \u2014 Algorithm Design**\nWrite a step-by-step procedure in plain English (or pseudocode).\n\n**Step 3 \u2014 Flowchart (optional)**\nDraw a visual representation of the algorithm.\n\n**Step 4 \u2014 Coding**\nTranslate the algorithm into Python code.\n\n**Step 5 \u2014 Testing and Debugging**\nRun the program with different inputs. Fix any errors.\n\n**Step 6 \u2014 Documentation**\nAdd comments to explain the code.\n\n### Example: Find the largest of three numbers\n\n```\nStep 1: Input \u2014 three numbers A, B, C\nStep 2: Algorithm\n  IF A > B AND A > C: largest = A\n  ELSE IF B > C: largest = B\n  ELSE: largest = C\nStep 3: Output \u2014 print largest\n```\n\n```python\n# Step 4: Python code\na, b, c = 10, 25, 18\nif a > b and a > c:\n    largest = a\nelif b > c:\n    largest = b\nelse:\n    largest = c\nprint(\"Largest:\", largest)\n```",
        examples: [
          {
            title: "Largest of three numbers",
            code: "a, b, c = 10, 25, 18\nif a > b and a > c:\n    largest = a\nelif b > c:\n    largest = b\nelse:\n    largest = c\nprint('Largest:', largest)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read 3 integers. Print the largest.",
            starterCode: "a = int(input())\nb = int(input())\nc = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nc = int(input())\nprint(max(a, b, c))",
            expectedOutput: "25",
            inputs: [
              "10",
              "25",
              "18"
            ]
          }
        ]
      },
      {
        id: "u1t4",
        title: "1.1.4 \u2014 Algorithms: Definition and Properties",
        notes: "### Algorithms \u2014 Definition and Properties\n\nAn **algorithm** is a finite, well-defined sequence of steps to solve a problem and produce an output.\n\n### Properties of a Good Algorithm\n\n| Property | Meaning | Example |\n|----------|---------|---------|\n| **Finiteness** | Must terminate after finite steps | No infinite loops |\n| **Definiteness** | Each step is clear and unambiguous | No vague instructions |\n| **Input** | Zero or more inputs | Numbers to sort |\n| **Output** | One or more outputs | Sorted list |\n| **Effectiveness** | Each step is simple and feasible | Basic arithmetic only |\n\n### Example Algorithm: Calculate factorial\n\n```\nAlgorithm: FACTORIAL(n)\n1. START\n2. Set result = 1\n3. For i = 1 to n:\n     result = result \u00d7 i\n4. PRINT result\n5. STOP\n```\n\n```python\n# Python implementation\ndef factorial(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))   # 120\n```\n\n### Types of Algorithms\n- **Sequential** \u2014 steps executed one after another\n- **Conditional** \u2014 steps chosen based on a condition\n- **Iterative** \u2014 steps repeated in a loop\n- **Recursive** \u2014 algorithm calls itself",
        examples: [
          {
            title: "Factorial algorithm",
            code: "def factorial(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nfor n in range(1, 6):\n    print(f'{n}! = {factorial(n)}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Compute factorial using a loop. Print result.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nresult = 1\nfor i in range(1, n+1):\n    result *= i\nprint(result)",
            expectedOutput: "120",
            inputs: [
              "5"
            ]
          }
        ]
      },
      {
        id: "u1t5",
        title: "1.1.5 \u2014 Flowcharts: Symbols and Construction",
        notes: "### Flowcharts \u2014 Symbols and Construction\n\nA **flowchart** is a pictorial representation of an algorithm using standardized symbols.\n\n### Standard Flowchart Symbols\n\n| Symbol | Shape | Purpose |\n|--------|-------|---------|\n| **Terminal** | Oval / Rounded rectangle | Start / Stop |\n| **Process** | Rectangle | Calculations, assignments |\n| **Decision** | Diamond | if / else branching |\n| **Input/Output** | Parallelogram | Read / Print |\n| **Connector** | Circle | Connect parts of flowchart |\n| **Flow line** | Arrow | Shows direction of execution |\n\n### Rules for Drawing Flowcharts\n1. Start with a Terminal (START)\n2. Use arrows to show flow direction\n3. Decision boxes must have YES/NO (or True/False) branches\n4. End with a Terminal (STOP)\n5. Only one entry and exit point per symbol (except decisions)\n\n### Example: Flowchart for Even/Odd Check\n```\nSTART\n  \u2193\nRead N\n  \u2193\nIs N % 2 == 0? \u2192 YES \u2192 Print \"Even\"\n       \u2193 NO                \u2193\n  Print \"Odd\"           (join)\n       \u2193                   \u2193\n        STOP\n```\n\n```python\n# Equivalent Python code\nn = int(input(\"Enter a number: \"))\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")\n```\n\n> \ud83d\udca1 **Tool:** Use **Flowgorithm** to draw and simulate flowcharts. Use **Lucidchart** for professional diagrams.",
        examples: [
          {
            title: "Even/Odd \u2014 flowchart \u2192 code",
            code: "# Implements the Even/Odd flowchart\nn = 7\n# Decision diamond\nif n % 2 == 0:\n    print('Even')   # YES branch\nelse:\n    print('Odd')    # NO branch"
          },
          {
            title: "Grade flowchart \u2192 code",
            code: "# Flowchart: Start\u2192Read marks\u2192marks>=60?\u2192Yes:Pass / No:Fail\u2192Stop\nmarks = int(input())\nif marks >= 60:\n    print('Pass')\nelse:\n    print('Fail')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read marks. Following the flowchart: if marks>=60 print 'Pass' else 'Fail'.",
            starterCode: "marks = int(input())\n",
            solution: "marks = int(input())\nif marks >= 60:\n    print('Pass')\nelse:\n    print('Fail')",
            expectedOutput: "Pass",
            inputs: [
              "75"
            ]
          },
          {
            level: "intermediate",
            question: "Read three numbers. Following the algorithm flowchart, print the largest.",
            starterCode: "a = int(input())\nb = int(input())\nc = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nc = int(input())\nprint(max(a,b,c))",
            expectedOutput: "25",
            inputs: [
              "10",
              "25",
              "18"
            ]
          }
        ]
      },
      {
        id: "u1t6",
        title: "1.1.6 \u2014 Pseudo Code: Writing and Conversion",
        notes: "### Pseudo Code \u2014 Writing and Conversion\n\n**Pseudo code** is an informal, English-like description of an algorithm that is halfway between English and actual programming code.\n\n### Rules for Writing Pseudo Code\n- Use UPPERCASE for keywords: BEGIN, END, IF, ELSE, WHILE, FOR, READ, PRINT\n- Use indentation to show structure\n- Be precise enough that anyone can implement it in any language\n- No specific syntax required \u2014 clarity is the goal\n\n### Pseudo Code Keywords\n\n| Keyword | Meaning |\n|---------|---------|\n| BEGIN / END | Start and end of algorithm |\n| READ / INPUT | Get input from user |\n| PRINT / OUTPUT | Display output |\n| IF / ELSE / ENDIF | Conditional |\n| WHILE / ENDWHILE | Loop with condition |\n| FOR / ENDFOR | Count-controlled loop |\n| SET / LET | Assignment |\n\n### Example 1: Sum of N numbers\n```\nBEGIN\n  READ n\n  SET total = 0\n  FOR i = 1 TO n DO\n    READ num\n    SET total = total + num\n  ENDFOR\n  PRINT total\nEND\n```\n\n```python\n# Converted to Python\nn = int(input())\ntotal = 0\nfor i in range(n):\n    num = int(input())\n    total += num\nprint(total)\n```\n\n### Example 2: Find largest of two numbers\n```\nBEGIN\n  READ A, B\n  IF A > B THEN\n    PRINT A, \"is largest\"\n  ELSE\n    PRINT B, \"is largest\"\n  ENDIF\nEND\n```\n\n```python\n# Converted to Python\na = int(input())\nb = int(input())\nif a > b:\n    print(a, \"is largest\")\nelse:\n    print(b, \"is largest\")\n```",
        examples: [
          {
            title: "Pseudo code \u2192 Python: Sum of N",
            code: "# Pseudo: READ n, total=0, FOR i=1 TO n: READ num, total+=num, PRINT total\nn = int(input())\ntotal = 0\nfor i in range(n):\n    num = int(input())\n    total += num\nprint(total)"
          },
          {
            title: "Pseudo code \u2192 Python: Largest of two",
            code: "a = int(input())\nb = int(input())\nif a > b:\n    print(a, 'is largest')\nelse:\n    print(b, 'is largest')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Convert pseudo code to Python: READ a, b \u2192 PRINT a+b.",
            starterCode: "a = int(input())\nb = int(input())\n# print sum\n",
            solution: "a = int(input())\nb = int(input())\nprint(a + b)",
            expectedOutput: "30",
            inputs: [
              "10",
              "20"
            ]
          },
          {
            level: "intermediate",
            question: "Convert: READ n \u2192 total=0 \u2192 FOR i=1 to n: total+=i \u2192 PRINT total. Run for n=5.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\ntotal = 0\nfor i in range(1, n+1):\n    total += i\nprint(total)",
            expectedOutput: "15",
            inputs: [
              "5"
            ]
          }
        ]
      },
      {
        id: "u1t7",
        title: "1.1.7 \u2014 Abstraction, Decomposition, Pattern Recognition, Algorithm Efficiency",
        notes: "### Abstraction\n\n**Abstraction** means hiding unnecessary details and showing only what is relevant.\n\n```python\n# With abstraction \u2014 you don't need to know HOW len() works\nname = \"Khadar\"\nprint(len(name))   # 6\n\n# Without abstraction (doing it manually)\ncount = 0\nfor ch in name:\n    count += 1\nprint(count)   # 6\n```\n\n### Decomposition\n\n**Decomposition** means breaking a large problem into smaller, manageable sub-problems.\n\n```python\n# Full program broken into sub-problems\ndef get_marks():\n    return [85, 90, 78, 92, 88]\n\ndef calculate_average(marks):\n    return sum(marks) / len(marks)\n\ndef get_grade(avg):\n    if avg >= 90: return 'O'\n    elif avg >= 75: return 'A'\n    else: return 'B'\n\nmarks = get_marks()\navg = calculate_average(marks)\nprint(f\"Average: {avg:.1f}, Grade: {get_grade(avg)}\")\n```\n\n### Pattern Recognition\n\n**Pattern Recognition** means identifying repeated structures across problems.\n\n```python\n# Pattern: sum of squares of 1 to N\n# Once you recognize this pattern, you can apply it anywhere\nn = 5\ntotal = sum(i**2 for i in range(1, n+1))\nprint(total)   # 55\n\n# Same pattern applied to sum of cubes\ntotal_cubes = sum(i**3 for i in range(1, n+1))\nprint(total_cubes)   # 225\n```\n\n### Algorithm Efficiency\n\n**Efficiency** means solving the problem using the least time and memory.\n\n```python\n# Inefficient: O(n) \u2014 check every number\ndef is_prime_slow(n):\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True\n\n# Efficient: O(\u221an) \u2014 only check up to square root\ndef is_prime_fast(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime_fast(97))   # True\n```\n\n> \ud83d\udca1 **Tool:** Use **Algorithm Visualizer** to compare algorithm efficiency visually.",
        examples: [
          {
            title: "Abstraction with functions",
            code: "# Abstraction: caller doesn't need to know how it works\ndef celsius_to_fahrenheit(c):\n    return (c * 9/5) + 32\n\nprint(celsius_to_fahrenheit(0))    # 32.0\nprint(celsius_to_fahrenheit(100))  # 212.0"
          },
          {
            title: "Efficient prime check",
            code: "def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprimes = [n for n in range(2, 30) if is_prime(n)]\nprint(primes)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Use abstraction: define circle_area(r) returning 3.14*r*r. Call with r=7, print result.",
            starterCode: "def circle_area(r):\n    # write here\n\nprint(circle_area(7))",
            solution: "def circle_area(r):\n    return 3.14 * r * r\nprint(circle_area(7))",
            expectedOutput: "153.86"
          },
          {
            level: "intermediate",
            question: "Efficient prime check: read n, print True if prime (check only up to sqrt(n)).",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nif n < 2:\n    print(False)\nelse:\n    prime = True\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            prime = False\n            break\n    print(prime)",
            expectedOutput: "True",
            inputs: [
              "97"
            ]
          }
        ]
      },
      {
        id: "u1t8",
        title: "1.2.1 \u2014 Installation and Execution Environment",
        notes: "### Installation and Execution Environment\n\n### Installing Python\n1. Go to **python.org** \u2192 Downloads \u2192 Select your OS\n2. Run the installer \u2014 **check \"Add Python to PATH\"**\n3. Verify: open terminal \u2192 type `python3 --version`\n\n### Execution Environments\n\n| Environment | Best For | How to Run |\n|-------------|----------|-----------|\n| **IDLE** | Beginners, quick tests | Built-in with Python |\n| **Thonny** | Beginners, debugging | Download from thonny.org |\n| **VS Code** | Projects, all levels | Install Python extension |\n| **PyCharm** | Large projects | JetBrains IDE |\n| **Jupyter Notebook** | Data science | `pip install notebook` |\n| **Replit.com** | Online, no install | Browser-based |\n\n### Running Python\n\n```bash\n# Interactive mode (REPL)\npython3\n>>> print(\"Hello\")\nHello\n>>> 2 + 3\n5\n>>> exit()\n\n# Script mode\npython3 filename.py\n```\n\n### Your First Python Script\n```python\n# hello.py\nprint(\"Hello, World!\")\nprint(\"I am learning Python at ALITS\")\n```\n\nRun it: `python3 hello.py`\n\n### Python as a Calculator\n```python\n>>> 10 + 3    # 13\n>>> 10 - 3    # 7\n>>> 10 * 3    # 30\n>>> 10 / 3    # 3.333...\n>>> 10 // 3   # 3\n>>> 10 % 3    # 1\n>>> 2 ** 8    # 256\n```\n\n> \ud83d\udca1 **Recommended for beginners:** Use **Thonny** \u2014 it shows variable values as you type and has a built-in debugger.",
        examples: [
          {
            title: "First Python program",
            code: "print('Hello, World!')\nprint('I am learning Python at ALITS')\nprint('2 + 3 =', 2 + 3)"
          },
          {
            title: "Python as calculator",
            code: "print(10 + 3)\nprint(10 - 3)\nprint(10 * 3)\nprint(10 / 3)\nprint(10 // 3)\nprint(10 % 3)\nprint(2 ** 8)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Print 'Hello ALITS' and on the next line print '2 ** 10 =' followed by the result.",
            starterCode: "",
            solution: "print('Hello ALITS')\nprint('2 ** 10 =', 2**10)",
            expectedOutput: "Hello ALITS\n2 ** 10 = 1024"
          }
        ]
      },
      {
        id: "u1t9",
        title: "1.2.2 \u2014 Variables, Identifiers, Keywords",
        notes: "### Variables\n\nA **variable** is a named storage location in memory that holds a value.\n\n```python\nname = \"Khadar\"    # string variable\nage = 21           # integer variable\ncgpa = 8.75        # float variable\nis_passed = True   # boolean variable\n```\n\nPython is **dynamically typed** \u2014 you don't declare the type, Python infers it.\n\n### Identifiers\n\nAn **identifier** is the name given to a variable, function, or class.\n\n**Rules:**\n- Must start with a **letter (a-z, A-Z)** or **underscore (_)**\n- Can contain letters, digits (0-9), underscores\n- **Case-sensitive**: `marks` \u2260 `Marks` \u2260 `MARKS`\n- Cannot use Python keywords\n- No spaces \u2014 use `student_name` not `student name`\n\n```python\n# Valid identifiers\nstudent_name = \"Ravi\"\n_private = 10\nmarks2024 = 85\n\n# Invalid identifiers\n# 2marks = 85      # starts with digit \u2014 ERROR\n# my-marks = 85    # hyphen not allowed \u2014 ERROR\n# class = \"ECE\"    # keyword \u2014 ERROR\n```\n\n### Keywords\n\nPython has **35 reserved keywords** that cannot be used as identifiers:\n\n```\nFalse    None     True     and      as       assert\nasync    await    break    class    continue def\ndel      elif     else     except   finally  for\nfrom     global   if       import   in       is\nlambda   nonlocal not      or       pass     raise\nreturn   try      while    with     yield\n```\n\n```python\n# Check if a word is a keyword\nimport keyword\nprint(keyword.iskeyword(\"for\"))     # True\nprint(keyword.iskeyword(\"marks\"))   # False\nprint(keyword.kwlist)               # list all keywords\n```\n\n### Multiple Assignment\n```python\nx = y = z = 0           # all three = 0\na, b, c = 10, 20, 30   # tuple unpacking\n```",
        examples: [
          {
            title: "Variables and types",
            code: "name = 'Lakshmi'\nage = 20\ncgpa = 9.1\nis_student = True\n\nprint(name, age, cgpa, is_student)\nprint(type(name))\nprint(type(age))\nprint(type(cgpa))\nprint(type(is_student))"
          },
          {
            title: "Multiple assignment",
            code: "# Assign same value\nx = y = z = 0\nprint(x, y, z)\n\n# Tuple unpacking\na, b, c = 10, 20, 30\nprint(a, b, c)\n\n# Swap\na, b = b, a\nprint(a, b)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create: name='Ravi', age=19, cgpa=8.2. Print all three separated by spaces.",
            starterCode: "",
            solution: "name = 'Ravi'\nage = 19\ncgpa = 8.2\nprint(name, age, cgpa)",
            expectedOutput: "Ravi 19 8.2"
          },
          {
            level: "intermediate",
            question: "Swap a=5, b=10 without a third variable. Print both.",
            starterCode: "a = 5\nb = 10\n",
            solution: "a = 5\nb = 10\na, b = b, a\nprint(a, b)",
            expectedOutput: "10 5"
          }
        ]
      },
      {
        id: "u1t10",
        title: "1.2.3 \u2014 Data Types and Type Conversion",
        notes: "### Data Types in Python\n\nPython has several built-in data types:\n\n| Type | Example | Description |\n|------|---------|-------------|\n| `int` | `10`, `-5`, `0` | Whole numbers |\n| `float` | `3.14`, `-0.5` | Decimal numbers |\n| `str` | `\"hello\"`, `'world'` | Text |\n| `bool` | `True`, `False` | Logical value |\n| `complex` | `2+3j` | Complex numbers |\n| `list` | `[1,2,3]` | Ordered mutable collection |\n| `tuple` | `(1,2,3)` | Ordered immutable collection |\n| `dict` | `{\"a\":1}` | Key-value pairs |\n| `set` | `{1,2,3}` | Unordered unique elements |\n| `NoneType` | `None` | Absence of value |\n\n```python\nx = 10\nprint(type(x))          # <class 'int'>\ny = 3.14\nprint(type(y))          # <class 'float'>\nz = \"Python\"\nprint(type(z))          # <class 'str'>\n```\n\n### Type Conversion (Casting)\n\n**Implicit conversion** \u2014 Python does it automatically:\n```python\nx = 5      # int\ny = 2.0    # float\nz = x + y  # Python converts x to float automatically\nprint(z)         # 7.0\nprint(type(z))   # <class 'float'>\n```\n\n**Explicit conversion** \u2014 you do it manually:\n```python\n# int() \u2014 convert to integer (truncates decimals)\nprint(int(3.9))       # 3\nprint(int(\"25\"))      # 25\nprint(int(True))      # 1\n\n# float() \u2014 convert to float\nprint(float(5))       # 5.0\nprint(float(\"3.14\"))  # 3.14\n\n# str() \u2014 convert to string\nprint(str(100))       # \"100\"\nprint(str(3.14))      # \"3.14\"\n\n# bool() \u2014 convert to boolean\nprint(bool(0))        # False\nprint(bool(1))        # True\nprint(bool(\"\"))       # False\nprint(bool(\"hello\"))  # True\n```\n\n> \u26a0\ufe0f `int(\"12.5\")` will CRASH \u2014 first convert to float: `int(float(\"12.5\"))` \u2192 12",
        examples: [
          {
            title: "Type checking and conversion",
            code: "values = [10, 3.14, 'hello', True, None]\nfor v in values:\n    print(f'{repr(v):15} \u2192 {type(v).__name__}')"
          },
          {
            title: "Explicit type conversion",
            code: "# String to int\nmarks_str = '85'\nmarks = int(marks_str)\nprint(marks + 5)   # 90\n\n# Int to float\nage = 20\nage_float = float(age)\nprint(age_float)   # 20.0\n\n# Float to int (truncates)\npi = 3.99\nprint(int(pi))     # 3"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "marks_str='45'. Convert to int, add 5, print result.",
            starterCode: "marks_str = '45'\n",
            solution: "marks_str = '45'\nprint(int(marks_str) + 5)",
            expectedOutput: "50"
          },
          {
            level: "intermediate",
            question: "num=7.89. Print type, convert to int, print value and new type.",
            starterCode: "num = 7.89\n",
            solution: "num = 7.89\nprint(type(num))\nnum_int = int(num)\nprint(num_int)\nprint(type(num_int))",
            expectedOutput: "<class 'float'>\n7\n<class 'int'>"
          },
          {
            level: "advanced",
            question: "Read a float as string. Convert to float, multiply by 2, print rounded to 2 decimals.",
            starterCode: "s = input()\n",
            solution: "s = input()\nresult = float(s) * 2\nprint(f'{result:.2f}')",
            expectedOutput: "6.28",
            inputs: [
              "3.14"
            ]
          }
        ]
      },
      {
        id: "u1t11",
        title: "1.2.4 \u2014 Input and Output Statements",
        notes: "### input() \u2014 Reading User Input\n\n```python\nname = input(\"Enter your name: \")\nprint(\"Hello,\", name)\n```\n\n> \u26a0\ufe0f **Critical rule:** `input()` **always returns a string**, even if the user types a number!\n\n```python\nage = input(\"Age: \")\nprint(type(age))     # <class 'str'>  \u2014 NOT int!\n\n# Convert to int\nage = int(input(\"Age: \"))\nprint(type(age))     # <class 'int'>\n```\n\n### Reading Different Types\n```python\nname = input()                      # string\nage = int(input())                  # integer\nprice = float(input())              # float\na, b = map(int, input().split())    # two ints on one line\nnums = list(map(int, input().split()))  # list of ints\n```\n\n### print() \u2014 Displaying Output\n\n```python\n# Basic print\nprint(\"Hello\")               # Hello\nprint(10 + 5)                # 15\nprint(\"Sum:\", 10 + 5)        # Sum: 15\n\n# sep parameter \u2014 separator between items (default: space)\nprint(\"A\", \"B\", \"C\", sep=\"-\")    # A-B-C\nprint(\"A\", \"B\", \"C\", sep=\"\")     # ABC\n\n# end parameter \u2014 what to print at end (default: newline)\nprint(\"Hello\", end=\" \")\nprint(\"World\")                # Hello World (same line)\n\n# f-strings (formatted string literals)\nname = \"Ravi\"\nmarks = 92\nprint(f\"{name} scored {marks} marks\")\nprint(f\"Average: {marks/100:.2%}\")   # percentage\nprint(f\"PI = {3.14159:.2f}\")          # 2 decimal places\n\n# format() method\nprint(\"{} scored {}\".format(name, marks))\n```\n\n### Formatted Output Examples\n```python\ncgpa = 8.6789\nprint(f\"CGPA: {cgpa:.2f}\")       # CGPA: 8.68\nprint(f\"CGPA: {cgpa:.4f}\")       # CGPA: 8.6789\n\nnum = 42\nprint(f\"Binary: {num:b}\")        # Binary: 101010\nprint(f\"Octal:  {num:o}\")        # Octal:  52\nprint(f\"Hex:    {num:x}\")        # Hex:    2a\n```",
        examples: [
          {
            title: "Input and formatted output",
            code: "name = input()\nmarks = int(input())\nprint(f'Student: {name}')\nprint(f'Marks: {marks}')\nprint(f'Grade: {\"Pass\" if marks >= 40 else \"Fail\"}')"
          },
          {
            title: "Reading multiple inputs",
            code: "# Read two numbers on one line\na, b = map(int, input().split())\nprint(f'{a} + {b} = {a+b}')\nprint(f'{a} - {b} = {a-b}')\nprint(f'{a} * {b} = {a*b}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a name, print 'Hello <name>, welcome to ALITS!'",
            starterCode: "name = input()\n",
            solution: "name = input()\nprint(f'Hello {name}, welcome to ALITS!')",
            expectedOutput: "Hello Khadar, welcome to ALITS!",
            inputs: [
              "Khadar"
            ]
          },
          {
            level: "intermediate",
            question: "Read two integers, print their sum as 'Sum = 15'.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nprint(f'Sum = {a+b}')",
            expectedOutput: "Sum = 15",
            inputs: [
              "10",
              "5"
            ]
          },
          {
            level: "intermediate",
            question: "Read a float price, print formatted to 2 decimals: 'Price: 49.99'",
            starterCode: "price = float(input())\n",
            solution: "price = float(input())\nprint(f'Price: {price:.2f}')",
            expectedOutput: "Price: 49.99",
            inputs: [
              "49.99"
            ]
          }
        ]
      },
      {
        id: "u1t12",
        title: "1.2.5 \u2014 Expressions and Operators",
        notes: "### Arithmetic Operators\n\n| Operator | Name | Example | Result |\n|----------|------|---------|--------|\n| `+` | Addition | `5 + 3` | `8` |\n| `-` | Subtraction | `5 - 3` | `2` |\n| `*` | Multiplication | `5 * 3` | `15` |\n| `/` | Division (float) | `5 / 2` | `2.5` |\n| `//` | Floor division | `5 // 2` | `2` |\n| `%` | Modulus | `5 % 2` | `1` |\n| `**` | Exponentiation | `2 ** 3` | `8` |\n\n> \u26a0\ufe0f `/` always returns **float** in Python. Use `//` for integer division.\n\n```python\na, b = 17, 5\nprint(a + b)    # 22\nprint(a - b)    # 12\nprint(a * b)    # 85\nprint(a / b)    # 3.4\nprint(a // b)   # 3\nprint(a % b)    # 2\nprint(a ** 2)   # 289\n```\n\n### Relational (Comparison) Operators\n\nReturn `True` or `False`:\n\n| Operator | Meaning | Example |\n|----------|---------|---------|\n| `==` | Equal to | `5 == 5` \u2192 `True` |\n| `!=` | Not equal | `5 != 3` \u2192 `True` |\n| `>` | Greater than | `7 > 3` \u2192 `True` |\n| `<` | Less than | `3 < 7` \u2192 `True` |\n| `>=` | Greater or equal | `5 >= 5` \u2192 `True` |\n| `<=` | Less or equal | `3 <= 7` \u2192 `True` |\n\n### Logical Operators\n\n| Operator | Meaning | Example |\n|----------|---------|---------|\n| `and` | Both must be True | `True and False` \u2192 `False` |\n| `or` | At least one True | `True or False` \u2192 `True` |\n| `not` | Reverses | `not True` \u2192 `False` |\n\n```python\nage = 20\nis_student = True\nprint(age >= 18 and is_student)    # True\nprint(age < 18 or is_student)      # True\nprint(not is_student)               # False\n```\n\n### Assignment Operators\n\n```python\nx = 10\nx += 5    # x = x + 5 = 15\nx -= 3    # x = x - 3 = 12\nx *= 2    # x = x * 2 = 24\nx //= 5   # x = x // 5 = 4\nx **= 3   # x = x ** 3 = 64\nx %= 10   # x = x % 10 = 4\n```",
        examples: [
          {
            title: "All arithmetic operators",
            code: "a, b = 17, 5\nprint(f'{a} + {b} = {a+b}')\nprint(f'{a} - {b} = {a-b}')\nprint(f'{a} * {b} = {a*b}')\nprint(f'{a} / {b} = {a/b}')\nprint(f'{a} // {b} = {a//b}')\nprint(f'{a} % {b} = {a%b}')\nprint(f'{a} ** 2 = {a**2}')"
          },
          {
            title: "Logical operators",
            code: "age = 20\nmarks = 85\nprint(age >= 18 and marks >= 60)   # True\nprint(age < 18 or marks >= 60)     # True\nprint(not (marks < 60))              # True"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a and b. Print a//b and a%b on separate lines.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)",
            expectedOutput: "3\n1",
            inputs: [
              "10",
              "3"
            ]
          },
          {
            level: "intermediate",
            question: "Check if n is divisible by both 3 and 5. Print True or False.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nprint(n % 3 == 0 and n % 5 == 0)",
            expectedOutput: "True",
            inputs: [
              "15"
            ]
          },
          {
            level: "advanced",
            question: "Calculate SI = (P*R*T)/100. Read P, R, T as floats. Print to 2 decimal places.",
            starterCode: "P = float(input())\nR = float(input())\nT = float(input())\n",
            solution: "P = float(input())\nR = float(input())\nT = float(input())\nSI = (P * R * T) / 100\nprint(f'{SI:.2f}')",
            expectedOutput: "750.00",
            inputs: [
              "5000",
              "5",
              "3"
            ]
          }
        ]
      },
      {
        id: "u1t13",
        title: "1.2.6 \u2014 Operator Precedence",
        notes: "### Operator Precedence\n\nWhen an expression has multiple operators, Python follows **precedence rules** (similar to BODMAS/PEMDAS in mathematics) to decide which operation to perform first.\n\n### Precedence Table (Highest to Lowest)\n\n| Priority | Operator | Name |\n|----------|----------|------|\n| 1 (highest) | `()` | Parentheses |\n| 2 | `**` | Exponentiation |\n| 3 | `+x`, `-x`, `~x` | Unary plus, minus |\n| 4 | `*`, `/`, `//`, `%` | Multiplication, Division |\n| 5 | `+`, `-` | Addition, Subtraction |\n| 6 | `<<`, `>>` | Bitwise shifts |\n| 7 | `&` | Bitwise AND |\n| 8 | `^` | Bitwise XOR |\n| 9 | `|` | Bitwise OR |\n| 10 | `==`, `!=`, `>`, `<`, `>=`, `<=` | Comparisons |\n| 11 | `not` | Logical NOT |\n| 12 | `and` | Logical AND |\n| 13 (lowest) | `or` | Logical OR |\n\n### Examples\n\n```python\n# Without parentheses\nprint(2 + 3 * 4)       # 14  (not 20) \u2014 * before +\nprint(10 - 4 / 2)      # 8.0 \u2014 / before -\nprint(2 ** 3 ** 2)     # 512 \u2014 ** is RIGHT-associative: 3**2=9, then 2**9=512\n\n# With parentheses \u2014 overrides precedence\nprint((2 + 3) * 4)     # 20\nprint(10 / (2 + 3))    # 2.0\n```\n\n### Common Mistakes\n\n```python\n# WRONG: thinking + before *\nresult = 2 + 3 * 4\nprint(result)   # 14, not 20\n\n# CORRECT: use parentheses when needed\nresult = (2 + 3) * 4\nprint(result)   # 20\n\n# RIGHT-associativity of **\nprint(2 ** 3 ** 2)    # 512 = 2^(3^2) = 2^9\nprint((2 ** 3) ** 2)  # 64  = (2^3)^2 = 8^2\n```\n\n### Associativity\n- Most operators are **left-associative**: `10 - 4 - 2` = `(10-4)-2` = `4`\n- `**` is **right-associative**: `2 ** 3 ** 2` = `2 ** (3**2)` = `2**9` = `512`",
        examples: [
          {
            title: "Precedence demonstration",
            code: "print('2 + 3 * 4 =', 2 + 3 * 4)          # 14\nprint('(2 + 3) * 4 =', (2 + 3) * 4)    # 20\nprint('2 ** 3 ** 2 =', 2 ** 3 ** 2)    # 512\nprint('10 - 4 / 2 =', 10 - 4 / 2)      # 8.0"
          },
          {
            title: "Compound expressions",
            code: "# Evaluate step by step\na = 5 + 2 * 3 - 1\nprint(a)   # 5 + 6 - 1 = 10\n\nb = (5 + 2) * (3 - 1)\nprint(b)   # 7 * 2 = 14\n\nc = 2 ** 2 ** 3\nprint(c)   # 2 ** 8 = 256"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Evaluate: 2 + 3 * 4. Print the result (no parentheses).",
            starterCode: "",
            solution: "print(2 + 3 * 4)",
            expectedOutput: "14"
          },
          {
            level: "intermediate",
            question: "Print results of: (10+5)*2, 10+5*2, 2**3**2 \u2014 each on a separate line.",
            starterCode: "",
            solution: "print((10+5)*2)\nprint(10+5*2)\nprint(2**3**2)",
            expectedOutput: "30\n20\n512"
          },
          {
            level: "advanced",
            question: "SI formula: P=5000, R=5, T=3. Compute SI=(P*R*T)/100. Without parentheses around P*R*T, what would you get? Print correct SI.",
            starterCode: "P, R, T = 5000, 5, 3\n",
            solution: "P, R, T = 5000, 5, 3\nSI = (P * R * T) / 100\nprint(f'{SI:.2f}')",
            expectedOutput: "750.00"
          }
        ]
      }
    ]
  },
  {
    id: "u2",
    title: "Decision Making & Looping",
    icon: "\ud83d\udd00",
    desc: "Control statements, loops, practical problem solving",
    hours: 10,
    co: "CO2",
    topics: [
      {
        id: "u2t1",
        title: "2.1.1 \u2014 Boolean Expressions",
        notes: "### Boolean Expressions\n\nA **Boolean expression** is any expression that evaluates to `True` or `False`.\n\n```python\nprint(5 > 3)       # True\nprint(5 == 3)      # False\nprint(10 != 5)     # True\n```\n\n### Comparison Operators\n| Operator | Meaning | Example | Result |\n|----------|---------|---------|--------|\n| `==` | Equal | `5 == 5` | `True` |\n| `!=` | Not equal | `5 != 3` | `True` |\n| `>` | Greater | `7 > 3` | `True` |\n| `<` | Less | `3 < 7` | `True` |\n| `>=` | Greater or equal | `5 >= 5` | `True` |\n| `<=` | Less or equal | `3 <= 7` | `True` |\n\n### Logical Operators\n```python\nage = 20\nmarks = 85\n\nprint(age >= 18 and marks >= 60)   # True \u2014 both conditions True\nprint(age < 18 or marks >= 60)     # True \u2014 at least one True\nprint(not (age < 18))               # True \u2014 reverses False\n```\n\n### Truthy and Falsy Values\n**Falsy** (treated as False): `0`, `0.0`, `''`, `[]`, `{}`, `()`, `None`, `False`\n**Truthy** (treated as True): any non-zero number, non-empty string/list\n\n```python\nprint(bool(0))       # False\nprint(bool(1))       # True\nprint(bool(''))      # False\nprint(bool('hi'))    # True\nprint(bool([]))      # False\nprint(bool([1,2]))   # True\n```\n\n### Short-Circuit Evaluation\n```python\n# 'and' stops at first False\n# 'or' stops at first True\nprint(False and print('never runs'))   # False (print never executes)\nprint(True or print('never runs'))     # True  (print never executes)\n```",
        examples: [
          {
            title: "Boolean expressions",
            code: "age = 20\nmarks = 85\nprint(age >= 18)                      # True\nprint(marks > 90)                     # False\nprint(age >= 18 and marks >= 60)     # True\nprint(age < 18 or marks >= 60)       # True\nprint(not (marks < 40))               # True"
          },
          {
            title: "Truthy and Falsy",
            code: "values = [0, 1, '', 'hello', [], [1,2], None, True, False]\nfor v in values:\n    print(f'bool({repr(v):10}) = {bool(v)}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Print True if n is between 10 and 20 (inclusive) for n=15.",
            starterCode: "n = 15\n",
            solution: "n = 15\nprint(10 <= n <= 20)",
            expectedOutput: "True"
          },
          {
            level: "intermediate",
            question: "Read age and marks. Print True if eligible (age>=18 AND marks>=50).",
            starterCode: "age = int(input())\nmarks = int(input())\n",
            solution: "age = int(input())\nmarks = int(input())\nprint(age >= 18 and marks >= 50)",
            expectedOutput: "True",
            inputs: [
              "20",
              "75"
            ]
          }
        ]
      },
      {
        id: "u2t2",
        title: "2.1.2 \u2014 if, if-else, if-elif-else, nested if",
        notes: "### if Statement\nExecutes a block only when the condition is True.\n```python\nmarks = 75\nif marks >= 40:\n    print('Pass')\n```\n\n### if-else Statement\n```python\nage = 16\nif age >= 18:\n    print('Eligible to vote')\nelse:\n    print('Not eligible')\n```\n\n### if-elif-else Statement\n```python\nmarks = 67\nif marks >= 90:\n    grade = 'A'\nelif marks >= 75:\n    grade = 'B'\nelif marks >= 60:\n    grade = 'C'\nelif marks >= 40:\n    grade = 'D'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')\n```\n\n### Nested if\nAn if inside another if:\n```python\nnum = 15\nif num > 0:\n    if num % 2 == 0:\n        print('Positive even')\n    else:\n        print('Positive odd')\nelse:\n    print('Not positive')\n```\n\n### Leap Year Example (nested if)\n```python\nyear = 2024\nif year % 4 == 0:\n    if year % 100 == 0:\n        if year % 400 == 0:\n            print('Leap year')    # divisible by 400\n        else:\n            print('Not a leap year')  # divisible by 100 not 400\n    else:\n        print('Leap year')        # divisible by 4 not 100\nelse:\n    print('Not a leap year')\n```",
        examples: [
          {
            title: "Grade calculator",
            code: "marks = int(input())\nif marks >= 90:\n    grade = 'A'\nelif marks >= 75:\n    grade = 'B'\nelif marks >= 60:\n    grade = 'C'\nelif marks >= 40:\n    grade = 'D'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')"
          },
          {
            title: "Triangle type",
            code: "a = int(input())\nb = int(input())\nc = int(input())\nif a+b<=c or b+c<=a or a+c<=b:\n    print('Invalid triangle')\nelif a==b==c:\n    print('Equilateral')\nelif a==b or b==c or a==c:\n    print('Isosceles')\nelse:\n    print('Scalene')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print 'Positive', 'Negative', or 'Zero'.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nif n > 0:\n    print('Positive')\nelif n < 0:\n    print('Negative')\nelse:\n    print('Zero')",
            expectedOutput: "Positive",
            inputs: [
              "7"
            ]
          },
          {
            level: "intermediate",
            question: "Read marks. Print grade: A(>=90), B(>=75), C(>=60), D(>=40), F(below 40).",
            starterCode: "marks = int(input())\n",
            solution: "marks = int(input())\nif marks>=90: print('A')\nelif marks>=75: print('B')\nelif marks>=60: print('C')\nelif marks>=40: print('D')\nelse: print('F')",
            expectedOutput: "B",
            inputs: [
              "78"
            ]
          },
          {
            level: "advanced",
            question: "Read year. Print 'Leap year' or 'Not a leap year' using nested if.",
            starterCode: "year = int(input())\n",
            solution: "year = int(input())\nif year%4==0:\n    if year%100==0:\n        if year%400==0: print('Leap year')\n        else: print('Not a leap year')\n    else: print('Leap year')\nelse: print('Not a leap year')",
            expectedOutput: "Leap year",
            inputs: [
              "2024"
            ]
          }
        ]
      },
      {
        id: "u2t3",
        title: "2.1.3 \u2014 Conditional Expressions (Ternary Operator)",
        notes: "### Conditional Expression (Ternary Operator)\nA compact way to write if-else in a single line.\n\n**Syntax:** `value_if_true if condition else value_if_false`\n\n```python\nage = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)   # Adult\n```\n\n### Compared with if-else\n```python\n# Multi-line if-else\nif marks >= 40:\n    result = 'Pass'\nelse:\n    result = 'Fail'\n\n# Equivalent ternary\nresult = 'Pass' if marks >= 40 else 'Fail'\n```\n\n### Nested Ternary (use carefully)\n```python\nmarks = 75\ngrade = 'A' if marks >= 90 else 'B' if marks >= 75 else 'C' if marks >= 60 else 'F'\nprint(grade)   # B\n```\n\n### Common Uses\n```python\n# Max of two numbers\na, b = 10, 20\nmaximum = a if a > b else b\nprint(maximum)   # 20\n\n# Absolute value\nx = -5\nabs_x = x if x >= 0 else -x\nprint(abs_x)   # 5\n\n# Odd or even\nn = 7\nprint('Even' if n % 2 == 0 else 'Odd')   # Odd\n```",
        examples: [
          {
            title: "Ternary examples",
            code: "# Max of two\na, b = 15, 23\nprint('Max:', a if a > b else b)\n\n# Pass/Fail\nmarks = 55\nprint('Pass' if marks >= 40 else 'Fail')\n\n# Positive/Negative/Zero\nn = -7\nprint('Positive' if n > 0 else 'Negative' if n < 0 else 'Zero')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Use ternary: print 'Even' or 'Odd' for n=7.",
            starterCode: "n = 7\n",
            solution: "n = 7\nprint('Even' if n % 2 == 0 else 'Odd')",
            expectedOutput: "Odd"
          },
          {
            level: "intermediate",
            question: "Read a and b. Print max using ternary operator.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nprint(a if a > b else b)",
            expectedOutput: "20",
            inputs: [
              "15",
              "20"
            ]
          }
        ]
      },
      {
        id: "u2t4",
        title: "2.2.1 \u2014 while Loop",
        notes: "### while Loop\nRepeats a block **as long as the condition is True**.\n\n```python\ni = 1\nwhile i <= 5:\n    print(i)\n    i += 1   # CRITICAL: update variable or infinite loop!\n```\n\n### Count-Controlled while\n```python\ncount = 0\nwhile count < 5:\n    print(f'Count: {count}')\n    count += 1\n```\n\n### Sentinel-Controlled while\nLoop until a special value (sentinel) is entered:\n```python\ntotal = 0\nnum = int(input('Enter number (-1 to stop): '))\nwhile num != -1:\n    total += num\n    num = int(input('Enter number (-1 to stop): '))\nprint('Total:', total)\n```\n\n### while with break\n```python\ni = 0\nwhile True:      # infinite loop\n    i += 1\n    if i == 5:\n        break    # exit when i reaches 5\nprint('Stopped at:', i)\n```\n\n### Sum, Product, Reverse using while\n```python\n# Sum of digits\nn = 1234\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint('Sum of digits:', total)   # 10\n\n# Reverse a number\nn = 1234\nrev = 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10\nprint('Reversed:', rev)   # 4321\n```",
        examples: [
          {
            title: "Sum of digits",
            code: "n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)"
          },
          {
            title: "GCD using Euclidean algorithm",
            code: "a = int(input())\nb = int(input())\nwhile b != 0:\n    a, b = b, a % b\nprint('GCD:', a)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print 1 to n using while loop.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\ni = 1\nwhile i <= n:\n    print(i)\n    i += 1",
            expectedOutput: "1\n2\n3\n4\n5",
            inputs: [
              "5"
            ]
          },
          {
            level: "intermediate",
            question: "Read n. Find sum of digits using while loop.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)",
            expectedOutput: "6",
            inputs: [
              "123"
            ]
          },
          {
            level: "advanced",
            question: "Find GCD of two numbers using while (Euclidean algorithm).",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nwhile b != 0:\n    a, b = b, a % b\nprint(a)",
            expectedOutput: "6",
            inputs: [
              "48",
              "18"
            ]
          }
        ]
      },
      {
        id: "u2t5",
        title: "2.2.2 \u2014 for Loop",
        notes: "### for Loop\nIterates over a **sequence** (list, string, range, tuple, etc.).\n\n```python\n# Loop over a range\nfor i in range(5):\n    print(i)   # 0 1 2 3 4\n\n# Loop over a list\nfruits = ['apple', 'banana', 'mango']\nfor fruit in fruits:\n    print(fruit)\n\n# Loop over a string\nfor ch in 'ALITS':\n    print(ch)\n```\n\n### range() Function\n```python\nrange(5)          # 0, 1, 2, 3, 4\nrange(1, 6)       # 1, 2, 3, 4, 5\nrange(0, 10, 2)   # 0, 2, 4, 6, 8\nrange(10, 0, -1)  # 10, 9, 8, ..., 1  (countdown)\nrange(5, 0, -1)   # 5, 4, 3, 2, 1\n```\n\n> \u26a0\ufe0f range(n) stops **BEFORE** n \u2014 does NOT include n.\n\n### enumerate() \u2014 Index + Value\n```python\nfruits = ['apple', 'banana', 'mango']\nfor index, fruit in enumerate(fruits):\n    print(f'{index}: {fruit}')\n# 0: apple\n# 1: banana\n# 2: mango\n```\n\n### Multiplication Table\n```python\nn = 5\nfor i in range(1, 11):\n    print(f'{n} x {i} = {n*i}')\n```",
        examples: [
          {
            title: "for loop with range",
            code: "for i in range(1, 6):\n    print(i, end=' ')\nprint()\nfor i in range(10, 0, -2):\n    print(i, end=' ')"
          },
          {
            title: "enumerate and list loop",
            code: "students = ['Ravi', 'Priya', 'Khadar']\nfor i, name in enumerate(students, start=1):\n    print(f'{i}. {name}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print multiplication table of n from 1 to 10.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, 11):\n    print(f'{n} x {i} = {n*i}')",
            expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30",
            inputs: [
              "3"
            ]
          },
          {
            level: "basic",
            question: "Read n. Find factorial using for loop.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint(fact)",
            expectedOutput: "120",
            inputs: [
              "5"
            ]
          }
        ]
      },
      {
        id: "u2t6",
        title: "2.2.3 \u2014 Iteration Techniques",
        notes: "### Iteration Techniques\n\n### 1. zip() \u2014 Iterate Two Lists Together\n```python\nnames = ['Ravi', 'Priya', 'Suresh']\nmarks = [85, 92, 78]\nfor name, mark in zip(names, marks):\n    print(f'{name}: {mark}')\n```\n\n### 2. List Comprehension \u2014 Compact Loop\n```python\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)   # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n```\n\n### 3. reversed() \u2014 Reverse Order\n```python\nfor i in reversed(range(1, 6)):\n    print(i, end=' ')   # 5 4 3 2 1\n```\n\n### 4. Iterating with Step\n```python\n# Every 3rd number from 1 to 30\nfor i in range(1, 31, 3):\n    print(i, end=' ')   # 1 4 7 10 13 16 19 22 25 28\n```\n\n### 5. sum(), max(), min() with for loop alternative\n```python\nnums = [5, 2, 8, 1, 9, 3]\n# Manual sum using for loop\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)   # 28\n\n# Built-in (preferred)\nprint(sum(nums), max(nums), min(nums))\n```",
        examples: [
          {
            title: "zip and enumerate",
            code: "names = ['Ravi', 'Priya', 'Suresh']\nmarks = [85, 92, 78]\nfor i, (name, mark) in enumerate(zip(names, marks), 1):\n    print(f'{i}. {name}: {mark}')"
          },
          {
            title: "List comprehension",
            code: "squares = [x**2 for x in range(1, 11)]\nprint(squares)\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)\n\nwords = ['hello', 'world', 'python']\nupper = [w.upper() for w in words]\nprint(upper)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Use list comprehension to get squares of 1-5. Print.",
            starterCode: "",
            solution: "print([x**2 for x in range(1, 6)])",
            expectedOutput: "[1, 4, 9, 16, 25]"
          },
          {
            level: "intermediate",
            question: "Read 5 integers into a list. Use list comprehension to double each. Print.",
            starterCode: "nums = [int(input()) for _ in range(5)]\n",
            solution: "nums = [int(input()) for _ in range(5)]\nprint([x*2 for x in nums])",
            expectedOutput: "[2, 4, 6, 8, 10]",
            inputs: [
              "1",
              "2",
              "3",
              "4",
              "5"
            ]
          }
        ]
      },
      {
        id: "u2t7",
        title: "2.2.4 \u2014 Nested Loops and Infinite Loops",
        notes: "### Nested Loops\nA loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.\n\n```python\n# Basic nested loop\nfor i in range(1, 4):        # outer: 1, 2, 3\n    for j in range(1, 4):    # inner: 1, 2, 3 for each i\n        print(f'({i},{j})', end=' ')\n    print()   # new line after each row\n```\n\n### Pattern Programs\n```python\n# Right-angled star triangle\nrows = 4\nfor i in range(1, rows+1):\n    print('*' * i)\n# *\n# **\n# ***\n# ****\n\n# Number pyramid\nfor i in range(1, rows+1):\n    for j in range(1, i+1):\n        print(j, end=' ')\n    print()\n# 1\n# 1 2\n# 1 2 3\n# 1 2 3 4\n\n# Multiplication table grid\nfor i in range(1, 5):\n    for j in range(1, 5):\n        print(f'{i*j:4}', end='')\n    print()\n```\n\n### Infinite Loops\nA loop that never ends unless explicitly stopped with `break`.\n```python\n# Intentional infinite loop\nwhile True:\n    choice = input('Continue? (yes/no): ')\n    if choice.lower() == 'no':\n        break\n    print('Continuing...')\n\n# Infinite loop with counter as safety\ncount = 0\nwhile True:\n    count += 1\n    if count >= 5:\n        break\nprint('Stopped at:', count)\n```",
        examples: [
          {
            title: "Star patterns",
            code: "# Right triangle\nfor i in range(1, 5):\n    print('*' * i)\nprint()\n# Inverted triangle\nfor i in range(4, 0, -1):\n    print('*' * i)"
          },
          {
            title: "Number pyramid",
            code: "n = 4\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        print(j, end=' ')\n    print()"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read rows. Print right-angled star triangle.",
            starterCode: "rows = int(input())\n",
            solution: "rows = int(input())\nfor i in range(1, rows+1):\n    print('*' * i)",
            expectedOutput: "*\n**\n***\n****",
            inputs: [
              "4"
            ]
          },
          {
            level: "intermediate",
            question: "Print 4x4 multiplication table grid (formatted with 4 chars per number).",
            starterCode: "",
            solution: "for i in range(1, 5):\n    for j in range(1, 5):\n        print(f'{i*j:4}', end='')\n    print()",
            expectedOutput: "   1   2   3   4\n   2   4   6   8\n   3   6   9  12\n   4   8  12  16"
          },
          {
            level: "advanced",
            question: "Print number pyramid for n=4 rows (1 / 1 2 / 1 2 3 / 1 2 3 4 with trailing space).",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        print(j, end=' ')\n    print()",
            expectedOutput: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
            inputs: [
              "4"
            ]
          }
        ]
      },
      {
        id: "u2t8",
        title: "2.2.5 \u2014 Loop Control: break, continue, pass; else with Loops",
        notes: "### break \u2014 Exit Loop Immediately\n```python\nfor i in range(1, 10):\n    if i == 5:\n        break\n    print(i)\n# prints: 1 2 3 4\n```\n\n### continue \u2014 Skip Current Iteration\n```python\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)\n# prints: 1 2 4 5\n```\n\n### pass \u2014 Do Nothing (Placeholder)\n```python\nfor i in range(5):\n    if i == 3:\n        pass   # placeholder, do nothing\n    print(i)\n# prints: 0 1 2 3 4  (all print, including 3)\n```\n\n### else with Loops\nThe `else` block runs **only if the loop completes WITHOUT hitting break**.\n\n```python\n# Prime check using for-else\nn = 17\nfor i in range(2, int(n**0.5) + 1):\n    if n % i == 0:\n        print(f'{n} is not prime')\n        break\nelse:\n    print(f'{n} is prime')   # runs only if no break\n```\n\n```python\n# while-else\ni = 1\nwhile i <= 5:\n    print(i)\n    i += 1\nelse:\n    print('Loop completed without break')\n```",
        examples: [
          {
            title: "break and continue",
            code: "print('break:')\nfor i in range(1, 10):\n    if i == 6: break\n    print(i, end=' ')\n\nprint('\\ncontinue:')\nfor i in range(1, 10):\n    if i % 3 == 0: continue\n    print(i, end=' ')"
          },
          {
            title: "for-else prime check",
            code: "n = int(input())\nfor i in range(2, int(n**0.5)+1):\n    if n % i == 0:\n        print(f'{n} is not prime')\n        break\nelse:\n    print(f'{n} is prime')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Print 1 to n but stop (break) when you reach 6. n=10.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    if i == 6: break\n    print(i)",
            expectedOutput: "1\n2\n3\n4\n5",
            inputs: [
              "10"
            ]
          },
          {
            level: "intermediate",
            question: "Print 1 to 10 except multiples of 3 (use continue).",
            starterCode: "",
            solution: "for i in range(1, 11):\n    if i % 3 == 0: continue\n    print(i)",
            expectedOutput: "1\n2\n4\n5\n7\n8\n10"
          },
          {
            level: "advanced",
            question: "Read n. Use for-else to print 'prime' or 'not prime'.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nif n < 2:\n    print('not prime')\nelse:\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            print('not prime')\n            break\n    else:\n        print('prime')",
            expectedOutput: "prime",
            inputs: [
              "17"
            ]
          }
        ]
      },
      {
        id: "u2t9",
        title: "2.3.1 \u2014 Prime Number Check",
        notes: "### Prime Number Check\n\nA **prime number** is a number greater than 1 that has no factors other than 1 and itself.\n\n### Basic Method \u2014 O(n)\n```python\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True\n```\n\n### Efficient Method \u2014 O(\u221an)\nOnly check up to the square root of n:\n```python\nimport math\n\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(math.sqrt(n)) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))    # True\nprint(is_prime(100))   # False\n```\n\n### Print All Primes from 2 to N\n```python\nn = int(input())\nfor num in range(2, n+1):\n    is_prime = True\n    for i in range(2, int(num**0.5)+1):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num, end=' ')\n```\n\n### Sieve of Eratosthenes \u2014 Most Efficient\n```python\ndef sieve(n):\n    primes = [True] * (n+1)\n    primes[0] = primes[1] = False\n    for i in range(2, int(n**0.5)+1):\n        if primes[i]:\n            for j in range(i*i, n+1, i):\n                primes[j] = False\n    return [i for i in range(2, n+1) if primes[i]]\n\nprint(sieve(30))\n```",
        examples: [
          {
            title: "Efficient prime check",
            code: "def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))\nprint(is_prime(100))\nprint([n for n in range(2,30) if is_prime(n)])"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read n. Print 'Prime' or 'Not Prime'.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nif n < 2:\n    print('Not Prime')\nelse:\n    prime = True\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            prime = False\n            break\n    print('Prime' if prime else 'Not Prime')",
            expectedOutput: "Prime",
            inputs: [
              "17"
            ]
          },
          {
            level: "intermediate",
            question: "Read n. Print all primes from 2 to n.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor num in range(2, n+1):\n    p = all(num%i!=0 for i in range(2,int(num**0.5)+1))\n    if p: print(num)",
            expectedOutput: "2\n3\n5\n7",
            inputs: [
              "10"
            ]
          }
        ]
      },
      {
        id: "u2t10",
        title: "2.3.2 \u2014 Pattern Programs Using Nested Loops",
        notes: "### Pattern Programs\n\nPattern programs use nested loops to print shapes made of characters.\n\n### Types of Patterns\n\n**1. Right-angled triangle**\n```python\nrows = 4\nfor i in range(1, rows+1):\n    print('*' * i)\n```\n\n**2. Inverted triangle**\n```python\nfor i in range(rows, 0, -1):\n    print('*' * i)\n```\n\n**3. Pyramid (centred)**\n```python\nfor i in range(1, rows+1):\n    print(' ' * (rows-i) + '*' * (2*i-1))\n```\n\n**4. Number triangle**\n```python\nfor i in range(1, rows+1):\n    for j in range(1, i+1):\n        print(j, end=' ')\n    print()\n```\n\n**5. Floyd's triangle**\n```python\nnum = 1\nfor i in range(1, rows+1):\n    for j in range(i):\n        print(num, end=' ')\n        num += 1\n    print()\n# 1\n# 2 3\n# 4 5 6\n# 7 8 9 10\n```\n\n**6. Diamond pattern**\n```python\nfor i in range(1, rows+1):\n    print(' '*(rows-i) + '*'*(2*i-1))\nfor i in range(rows-1, 0, -1):\n    print(' '*(rows-i) + '*'*(2*i-1))\n```",
        examples: [
          {
            title: "Multiple patterns",
            code: "n = 4\nprint('Right triangle:')\nfor i in range(1, n+1): print('*'*i)\n\nprint('Pyramid:')\nfor i in range(1, n+1): print(' '*(n-i)+'*'*(2*i-1))\n\nprint('Floyd triangle:')\nnum=1\nfor i in range(1,n+1):\n    for j in range(i): print(num,end=' '); num+=1\n    print()"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Print 4-row right-angled star triangle.",
            starterCode: "rows = int(input())\n",
            solution: "rows = int(input())\nfor i in range(1, rows+1):\n    print('*' * i)",
            expectedOutput: "*\n**\n***\n****",
            inputs: [
              "4"
            ]
          },
          {
            level: "intermediate",
            question: "Print pyramid pattern for n=4 rows (centred stars).",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    print(' '*(n-i) + '*'*(2*i-1))",
            expectedOutput: "   *\n  ***\n *****\n*******",
            inputs: [
              "4"
            ]
          },
          {
            level: "advanced",
            question: "Print Floyd's triangle for 4 rows.",
            starterCode: "rows = int(input())\n",
            solution: "rows = int(input())\nnum = 1\nfor i in range(1, rows+1):\n    for j in range(i):\n        print(num, end=' ')\n        num += 1\n    print()",
            expectedOutput: "1 \n2 3 \n4 5 6 \n7 8 9 10 ",
            inputs: [
              "4"
            ]
          }
        ]
      },
      {
        id: "u2t11",
        title: "2.3.3 \u2014 Menu-Driven Programs",
        notes: "### Menu-Driven Programs\n\nA menu-driven program repeatedly shows a menu and executes the chosen operation until the user quits.\n\n### Structure\n```python\nwhile True:\n    # Display menu\n    print('\\n=== MENU ===')\n    print('1. Option A')\n    print('2. Option B')\n    print('3. Exit')\n    \n    choice = int(input('Enter choice: '))\n    \n    if choice == 1:\n        # Do option A\n    elif choice == 2:\n        # Do option B\n    elif choice == 3:\n        print('Goodbye!')\n        break\n    else:\n        print('Invalid choice!')\n```\n\n### Calculator Menu Program\n```python\nwhile True:\n    print('\\n=== Calculator ===')\n    print('1. Add')\n    print('2. Subtract')\n    print('3. Multiply')\n    print('4. Divide')\n    print('5. Exit')\n    \n    choice = int(input('Enter choice (1-5): '))\n    \n    if choice == 5:\n        print('Thank you!')\n        break\n    \n    a = float(input('Enter first number: '))\n    b = float(input('Enter second number: '))\n    \n    if choice == 1:\n        print(f'Result: {a + b}')\n    elif choice == 2:\n        print(f'Result: {a - b}')\n    elif choice == 3:\n        print(f'Result: {a * b}')\n    elif choice == 4:\n        if b == 0:\n            print('Cannot divide by zero!')\n        else:\n            print(f'Result: {a / b}')\n    else:\n        print('Invalid choice!')\n```",
        examples: [
          {
            title: "Simple menu calculator",
            code: "while True:\n    print('1.Add 2.Sub 3.Mul 4.Div 5.Exit')\n    c = int(input())\n    if c == 5: break\n    a = float(input())\n    b = float(input())\n    if c==1: print(a+b)\n    elif c==2: print(a-b)\n    elif c==3: print(a*b)\n    elif c==4: print('Error' if b==0 else a/b)"
          }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Menu: 1.Add 2.Subtract 3.Exit. Read choice=1, then a=10, b=5. Print result.",
            starterCode: "",
            solution: "choice = int(input())\na = float(input())\nb = float(input())\nif choice == 1: print(a + b)\nelif choice == 2: print(a - b)",
            expectedOutput: "15.0",
            inputs: [
              "1",
              "10",
              "5"
            ]
          },
          {
            level: "advanced",
            question: "Menu program: choice=2 (subtract), a=20, b=7. Print result.",
            starterCode: "",
            solution: "choice = int(input())\na = float(input())\nb = float(input())\nif choice==1: print(a+b)\nelif choice==2: print(a-b)\nelif choice==3: print(a*b)\nelif choice==4: print('Error' if b==0 else a/b)",
            expectedOutput: "13.0",
            inputs: [
              "2",
              "20",
              "7"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "u3",
    title: "Strings & Data Structures",
    icon: "\ud83d\udce6",
    desc: "Strings, Lists, Tuples, Sets",
    hours: 10,
    co: "CO3",
    topics: [
      {
        id: "u3t1",
        title: "3.1.1 \u2014 String Representation and Indexing",
        notes: "### String Representation\nA string is a sequence of characters enclosed in quotes.\n```python\ns1 = 'Hello'\ns2 = \"World\"\ns3 = '''Multi\nline string'''\ns4 = \"\"\"Also\nmulti-line\"\"\"\nprint(type(s1))   # <class 'str'>\n```\n\n### Indexing\nEach character has a **positive** (left to right) and **negative** (right to left) index.\n```\n  H  e  l  l  o\n  0  1  2  3  4   (positive)\n -5 -4 -3 -2 -1   (negative)\n```\n```python\ns = 'Python'\nprint(s[0])    # 'P'  \u2014 first character\nprint(s[5])    # 'n'  \u2014 last character\nprint(s[-1])   # 'n'  \u2014 last (negative index)\nprint(s[-3])   # 'h'  \u2014 third from end\n# s[10]  # IndexError!\n```\n\n### Slicing\n`string[start:stop:step]` \u2014 stop is excluded\n```python\ns = 'Python'\nprint(s[0:4])    # 'Pyth'  (index 0,1,2,3)\nprint(s[2:])     # 'thon'  (from 2 to end)\nprint(s[:4])     # 'Pyth'  (from start to 3)\nprint(s[::2])    # 'Pto'   (every 2nd)\nprint(s[::-1])   # 'nohtyP'  (reversed)\nprint(s[1:5:2])  # 'yh'   (index 1,3)\n```",
        examples: [
          {
            title: "Indexing and slicing",
            code: "s = 'ALITS Anantapur'\nprint(s[0])       # A\nprint(s[-1])      # r\nprint(s[0:5])     # ALITS\nprint(s[6:])      # Anantapur\nprint(s[::-1])    # reversed\nprint(s[::2])     # every 2nd char"
          },
          {
            title: "Reverse and palindrome check",
            code: "s = input()\nrev = s[::-1]\nprint(rev)\nprint('Palindrome' if s.lower() == rev.lower() else 'Not palindrome')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a string. Print its first and last character.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(s[0])\nprint(s[-1])",
            expectedOutput: "P\nn",
            inputs: [
              "Python"
            ]
          },
          {
            level: "basic",
            question: "Read a string. Print it reversed using slicing.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(s[::-1])",
            expectedOutput: "nohtyP",
            inputs: [
              "Python"
            ]
          },
          {
            level: "intermediate",
            question: "Read a string. Print every alternate character starting from index 0.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(s[::2])",
            expectedOutput: "Pto",
            inputs: [
              "Python"
            ]
          }
        ]
      },
      {
        id: "u3t2",
        title: "3.1.2 \u2014 String Operations, Built-in Functions and Methods",
        notes: "### String Operations\n```python\ns1 = 'Hello'\ns2 = 'World'\nprint(s1 + ' ' + s2)   # concatenation: 'Hello World'\nprint(s1 * 3)            # repetition: 'HelloHelloHello'\nprint('Hello' in s1)     # membership: True\nprint('xyz' not in s1)   # True\nprint(len(s1))            # 5\n```\n\n### Built-in Functions\n```python\ns = 'Python'\nprint(len(s))     # 6\nprint(min(s))     # 'P' (smallest ASCII)\nprint(max(s))     # 'y' (largest ASCII)\nprint(sorted(s))  # ['P','h','n','o','t','y']\n```\n\n### String Methods\n```python\ns = '  Hello World  '\nprint(s.strip())          # 'Hello World'\nprint(s.lstrip())         # 'Hello World  '\nprint(s.rstrip())         # '  Hello World'\nprint(s.lower())          # '  hello world  '\nprint(s.upper())          # '  HELLO WORLD  '\nprint(s.title())          # '  Hello World  '\nprint(s.swapcase())       # '  hELLO wORLD  '\n\nprint(s.replace('World','Python'))\nprint(s.strip().split())  # ['Hello', 'World']\nprint(s.find('World'))    # 8\nprint(s.count('l'))       # 3\nprint(s.startswith('  He'))  # True\nprint(s.endswith('  '))      # True\nprint('123'.isdigit())       # True\nprint('abc'.isalpha())       # True\nprint('Hello World'.isalnum())  # False (has space)\n\n# join \u2014 combine list into string\nwords = ['I', 'love', 'Python']\nprint(' '.join(words))    # 'I love Python'\nprint(','.join(words))    # 'I,love,Python'\n```\n\n> \ud83d\udca1 **Tool:** Use **NLTK** and **TextBlob** to perform text analysis (sentiment analysis, word frequency) on strings.",
        examples: [
          {
            title: "String methods chain",
            code: "s = '  Hello World  '\nprint(s.strip())\nprint(s.strip().lower())\nprint(s.strip().upper())\nprint(s.strip().split())\nprint('-'.join(s.strip().split()))"
          },
          {
            title: "Count vowels and words",
            code: "sentence = input()\nvowels = sum(1 for c in sentence.lower() if c in 'aeiou')\nwords = len(sentence.split())\nprint(f'Vowels: {vowels}')\nprint(f'Words: {words}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a string. Print its length.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(len(s))",
            expectedOutput: "6",
            inputs: [
              "Python"
            ]
          },
          {
            level: "intermediate",
            question: "Read a sentence. Count vowels (a,e,i,o,u case-insensitive). Print count.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(sum(1 for c in s.lower() if c in 'aeiou'))",
            expectedOutput: "5",
            inputs: [
              "Engineering"
            ]
          },
          {
            level: "intermediate",
            question: "Read a string. Print it as title case with hyphens: 'I love Python' \u2192 'I-Love-Python'.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint('-'.join(w.title() for w in s.split()))",
            expectedOutput: "I-Love-Python",
            inputs: [
              "I love Python"
            ]
          },
          {
            level: "advanced",
            question: "Read a sentence. Print each word with its length as 'word:length' separated by spaces.",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(' '.join(f'{w}:{len(w)}' for w in s.split()))",
            expectedOutput: "I:1 love:4 Python:6",
            inputs: [
              "I love Python"
            ]
          }
        ]
      },
      {
        id: "u3t3",
        title: "3.2.1 \u2014 List Creation, Indexing and Slicing",
        notes: "### List Creation\nA list is an **ordered, mutable** (changeable) collection.\n```python\nfruits = ['apple', 'banana', 'mango']\nnums = [1, 2, 3, 4, 5]\nmixed = [1, 'hello', 3.14, True]\nempty = []\nnested = [[1,2],[3,4],[5,6]]\n\n# Using list()\nletters = list('Python')   # ['P','y','t','h','o','n']\nrange_list = list(range(1, 6))   # [1,2,3,4,5]\n```\n\n### Indexing\nSame as strings \u2014 positive and negative indexes.\n```python\nfruits = ['apple', 'banana', 'mango', 'kiwi']\nprint(fruits[0])    # 'apple'\nprint(fruits[-1])   # 'kiwi'\nprint(fruits[1])    # 'banana'\n```\n\n### Slicing\n```python\nnums = [10, 20, 30, 40, 50]\nprint(nums[1:3])    # [20, 30]\nprint(nums[:3])     # [10, 20, 30]\nprint(nums[2:])     # [30, 40, 50]\nprint(nums[::2])    # [10, 30, 50]\nprint(nums[::-1])   # [50, 40, 30, 20, 10]\n```\n\n### Nested List Indexing\n```python\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nprint(matrix[0])      # [1,2,3]\nprint(matrix[1][2])   # 6  (row 1, col 2)\nprint(matrix[2][0])   # 7\n```",
        examples: [
          {
            title: "List creation and indexing",
            code: "fruits = ['apple', 'banana', 'mango', 'kiwi', 'grape']\nprint(fruits[0], fruits[-1])\nprint(fruits[1:4])\nprint(fruits[::-1])\n\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nfor row in matrix:\n    print(row)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Given nums=[10,20,30,40,50], print elements from index 1 to 3.",
            starterCode: "nums = [10,20,30,40,50]\n",
            solution: "nums = [10,20,30,40,50]\nprint(nums[1:4])",
            expectedOutput: "[20, 30, 40]"
          },
          {
            level: "intermediate",
            question: "Read 5 integers into a list. Print the list reversed.",
            starterCode: "nums = [int(input()) for _ in range(5)]\n",
            solution: "nums = [int(input()) for _ in range(5)]\nprint(nums[::-1])",
            expectedOutput: "[5, 4, 3, 2, 1]",
            inputs: [
              "1",
              "2",
              "3",
              "4",
              "5"
            ]
          }
        ]
      },
      {
        id: "u3t4",
        title: "3.2.2 \u2014 List Operations and Functions",
        notes: "### List Operations\n```python\na = [1, 2, 3]\nb = [4, 5, 6]\n\nprint(a + b)         # [1,2,3,4,5,6]  concatenation\nprint(a * 2)          # [1,2,3,1,2,3]  repetition\nprint(3 in a)         # True  membership\nprint(7 not in a)     # True\nprint(len(a))         # 3\n```\n\n### Built-in Functions for Lists\n```python\nnums = [5, 2, 8, 1, 9, 3]\nprint(len(nums))      # 6\nprint(sum(nums))      # 28\nprint(max(nums))      # 9\nprint(min(nums))      # 1\nprint(sorted(nums))   # [1,2,3,5,8,9]  returns NEW list\nprint(sorted(nums, reverse=True))  # [9,8,5,3,2,1]\nprint(list(reversed(nums)))  # original reversed\n```\n\n### List Comprehension\n```python\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)\n\n# Nested comprehension \u2014 flatten matrix\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nflat = [num for row in matrix for num in row]\nprint(flat)   # [1,2,3,4,5,6,7,8,9]\n```",
        examples: [
          {
            title: "List operations",
            code: "nums = [5, 2, 8, 1, 9, 3]\nprint('Sum:', sum(nums))\nprint('Max:', max(nums))\nprint('Min:', min(nums))\nprint('Sorted:', sorted(nums))\nprint('Squares:', [x**2 for x in nums])"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Given nums=[12,45,7,89,23], print max and min.",
            starterCode: "nums = [12,45,7,89,23]\n",
            solution: "nums = [12,45,7,89,23]\nprint(max(nums))\nprint(min(nums))",
            expectedOutput: "89\n7"
          },
          {
            level: "intermediate",
            question: "Use list comprehension to get all even numbers from 1 to 20.",
            starterCode: "",
            solution: "print([x for x in range(1,21) if x%2==0])",
            expectedOutput: "[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
          },
          {
            level: "advanced",
            question: "Read 5 integers. Print squares of only the even numbers using list comprehension.",
            starterCode: "nums = [int(input()) for _ in range(5)]\n",
            solution: "nums = [int(input()) for _ in range(5)]\nprint([x**2 for x in nums if x%2==0])",
            expectedOutput: "[4, 16]",
            inputs: [
              "1",
              "2",
              "3",
              "4",
              "5"
            ]
          }
        ]
      },
      {
        id: "u3t5",
        title: "3.2.3 \u2014 List Methods and Nested Lists",
        notes: "### List Methods\n```python\nfruits = ['apple', 'banana', 'mango']\n\nfruits.append('kiwi')          # add to end\nfruits.insert(1, 'grape')      # insert at index 1\nfruits.remove('banana')        # remove first match\npopped = fruits.pop()          # remove & return last\npopped2 = fruits.pop(0)        # remove & return at index\nfruits.sort()                  # sort ascending in place\nfruits.sort(reverse=True)      # sort descending\nfruits.reverse()               # reverse in place\nidx = fruits.index('mango')    # find index\ncnt = fruits.count('apple')    # count occurrences\nfruits2 = fruits.copy()        # shallow copy\nfruits.extend([1, 2])          # add multiple items\nfruits.clear()                 # remove all\n```\n\n### Mutable \u2014 Lists Can Be Changed\n```python\nnums = [1, 2, 3]\nnums[1] = 99         # modify element\nprint(nums)           # [1, 99, 3]\nnums[0:2] = [10, 20]  # modify slice\nprint(nums)           # [10, 20, 3]\n```\n\n### Nested Lists\n```python\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n# Access element\nprint(matrix[1][2])   # 6\n\n# Print all elements\nfor row in matrix:\n    for elem in row:\n        print(elem, end=' ')\n    print()\n\n# Transpose a matrix\ntranspose = [[matrix[j][i] for j in range(3)] for i in range(3)]\n```",
        examples: [
          {
            title: "List methods demo",
            code: "lst = [3, 1, 4, 1, 5, 9, 2, 6]\nprint('Original:', lst)\nlst.sort()\nprint('Sorted:', lst)\nlst.append(7)\nprint('After append:', lst)\nlst.remove(1)\nprint('After remove 1:', lst)\nprint('Count of 1:', lst.count(1))"
          },
          {
            title: "Matrix operations",
            code: "matrix = [[1,2,3],[4,5,6],[7,8,9]]\nprint('Element [1][2]:', matrix[1][2])\nprint('Row 0:', matrix[0])\n# Transpose\ntranspose = [[matrix[j][i] for j in range(3)] for i in range(3)]\nfor row in transpose:\n    print(row)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read 5 integers. Sort and print in descending order.",
            starterCode: "nums = [int(input()) for _ in range(5)]\n",
            solution: "nums = [int(input()) for _ in range(5)]\nnums.sort(reverse=True)\nprint(nums)",
            expectedOutput: "[9, 8, 5, 4, 1]",
            inputs: [
              "5",
              "1",
              "9",
              "4",
              "8"
            ]
          },
          {
            level: "intermediate",
            question: "Read 6 integers. Remove duplicates preserving order. Print result.",
            starterCode: "nums = [int(input()) for _ in range(6)]\n",
            solution: "nums = [int(input()) for _ in range(6)]\nresult = []\nfor n in nums:\n    if n not in result:\n        result.append(n)\nprint(result)",
            expectedOutput: "[1, 2, 3, 4]",
            inputs: [
              "1",
              "2",
              "2",
              "3",
              "4",
              "1"
            ]
          }
        ]
      },
      {
        id: "u3t6",
        title: "3.3.1 \u2014 Tuple Creation and Operations",
        notes: "### Tuple Creation\nTuples are **ordered, immutable** (cannot be changed after creation).\n```python\nt1 = (1, 2, 3)\nt2 = (1,)            # single element \u2014 comma required!\nt3 = 1, 2, 3         # parentheses optional\nempty = ()\nt4 = tuple([1,2,3])  # from list\n```\n\n### Why Use Tuples?\n- Faster than lists\n- Protect data that should not change\n- Can be used as dictionary keys (lists cannot)\n- Function return values\n\n### Tuple Operations\n```python\nt = (10, 20, 30, 40, 50)\nprint(t[0])        # 10 \u2014 indexing\nprint(t[-1])       # 50\nprint(t[1:4])      # (20, 30, 40) \u2014 slicing\nprint(t + (60,))   # concatenation\nprint(t * 2)       # repetition\nprint(len(t))      # 5\nprint(30 in t)     # True\nprint(max(t), min(t), sum(t))\n```\n\n### Tuple Methods (only 2!)\n```python\nt = (1, 2, 3, 2, 4, 2)\nprint(t.count(2))    # 3 \u2014 count occurrences\nprint(t.index(3))    # 2 \u2014 first index of value\n```\n\n### Immutability\n```python\nt = (1, 2, 3)\n# t[0] = 99    # TypeError: tuple does not support item assignment!\n\n# But a tuple can contain mutable objects\nt = (1, [2, 3], 4)\nt[1].append(5)    # This works! Modifying the LIST inside\nprint(t)   # (1, [2, 3, 5], 4)\n```",
        examples: [
          {
            title: "Tuple operations",
            code: "t = (10, 20, 30, 40, 50)\nprint(t[0], t[-1])\nprint(t[1:4])\nprint(t + (60, 70))\nprint(len(t), max(t), min(t))\nprint(t.count(20))\nprint(t.index(30))"
          },
          {
            title: "Mutable object in tuple",
            code: "# Tuples are immutable, but can hold mutable objects\nt = (1, [2, 3], 4)\nprint('Before:', t)\nt[1].append(5)   # modifying the list inside\nprint('After:', t)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create t=(3,4). Print sum of elements.",
            starterCode: "t = (3, 4)\n",
            solution: "t = (3, 4)\nprint(t[0] + t[1])",
            expectedOutput: "7"
          },
          {
            level: "intermediate",
            question: "Create t=(5,2,8,1,9). Print max, min, sum using built-in functions.",
            starterCode: "t = (5,2,8,1,9)\n",
            solution: "t = (5,2,8,1,9)\nprint(max(t))\nprint(min(t))\nprint(sum(t))",
            expectedOutput: "9\n1\n25"
          }
        ]
      },
      {
        id: "u3t7",
        title: "3.3.2 \u2014 Tuple Packing and Unpacking",
        notes: "### Packing\nAssigning multiple values to a single tuple:\n```python\nstudent = ('Ravi', 21, 8.5, 'ECE')   # packing\nprint(student)   # ('Ravi', 21, 8.5, 'ECE')\n```\n\n### Unpacking\nAssigning tuple elements to individual variables:\n```python\nstudent = ('Ravi', 21, 8.5, 'ECE')\nname, age, cgpa, branch = student   # unpacking\nprint(name)    # Ravi\nprint(age)     # 21\nprint(cgpa)    # 8.5\n```\n\n> \u26a0\ufe0f Number of variables must match number of elements!\n\n### Extended Unpacking with *\n```python\nfirst, *rest = (1, 2, 3, 4, 5)\nprint(first)   # 1\nprint(rest)    # [2, 3, 4, 5]\n\n*start, last = (1, 2, 3, 4, 5)\nprint(start)   # [1, 2, 3, 4]\nprint(last)    # 5\n```\n\n### Swap Variables (using tuple unpacking)\n```python\na = 10\nb = 20\na, b = b, a   # swap without temp variable\nprint(a, b)   # 20 10\n```\n\n### Functions Returning Tuples\n```python\ndef min_max(nums):\n    return min(nums), max(nums)   # returns a tuple\n\nlow, high = min_max([5, 2, 8, 1, 9])\nprint(low, high)   # 1 9\n```",
        examples: [
          {
            title: "Packing and unpacking",
            code: "# Pack\npoint = (10, 20, 30)\nprint('Packed:', point)\n\n# Unpack\nx, y, z = point\nprint(f'x={x}, y={y}, z={z}')\n\n# Extended unpack\nfirst, *middle, last = (1, 2, 3, 4, 5)\nprint(first, middle, last)"
          },
          {
            title: "Swap and function return",
            code: "a, b = 5, 10\nprint('Before:', a, b)\na, b = b, a\nprint('After swap:', a, b)\n\ndef stats(nums):\n    return min(nums), max(nums), sum(nums)/len(nums)\n\nlo, hi, avg = stats([5, 2, 8, 1, 9])\nprint(f'Min={lo}, Max={hi}, Avg={avg:.1f}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "student=('Ravi',21,'ECE'). Unpack and print name and branch.",
            starterCode: "student = ('Ravi', 21, 'ECE')\n",
            solution: "student = ('Ravi', 21, 'ECE')\nname, age, branch = student\nprint(name)\nprint(branch)",
            expectedOutput: "Ravi\nECE"
          },
          {
            level: "intermediate",
            question: "Swap a=5, b=10 using tuple unpacking. Print both.",
            starterCode: "a = 5\nb = 10\n",
            solution: "a = 5\nb = 10\na, b = b, a\nprint(a, b)",
            expectedOutput: "10 5"
          }
        ]
      },
      {
        id: "u3t8",
        title: "3.4.1 \u2014 Set Creation and Set Operations",
        notes: "### Set Creation\nA set is an **unordered, mutable** collection of **unique** elements.\n```python\ns1 = {1, 2, 3, 3, 2, 1}   # duplicates removed!\nprint(s1)   # {1, 2, 3}\n\ns2 = set([1, 2, 2, 3, 4])  # from list\nprint(s2)   # {1, 2, 3, 4}\n\nempty_set = set()   # NOT {} \u2014 that creates a dict!\n```\n\n### Set Operations\n```python\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\n\n# Union \u2014 all elements from both\nprint(a | b)          # {1,2,3,4,5,6,7,8}\nprint(a.union(b))\n\n# Intersection \u2014 elements in BOTH\nprint(a & b)          # {4, 5}\nprint(a.intersection(b))\n\n# Difference \u2014 in a but NOT in b\nprint(a - b)          # {1, 2, 3}\nprint(a.difference(b))\n\n# Symmetric Difference \u2014 in either but NOT both\nprint(a ^ b)          # {1,2,3,6,7,8}\nprint(a.symmetric_difference(b))\n\n# Subset and superset\nprint({1,2} <= {1,2,3})   # True \u2014 subset\nprint({1,2,3} >= {1,2})   # True \u2014 superset\n```\n\n### Practical Use\n```python\n# Remove duplicates from a list\nnums = [1, 2, 2, 3, 4, 4, 5]\nunique = list(set(nums))\nprint(unique)\n\n# Common elements in two lists\nlist1 = [1, 2, 3, 4]\nlist2 = [3, 4, 5, 6]\ncommon = list(set(list1) & set(list2))\nprint(common)   # [3, 4]\n```",
        examples: [
          {
            title: "Set operations",
            code: "a = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint('Union:', a | b)\nprint('Intersection:', a & b)\nprint('Difference a-b:', a - b)\nprint('Sym diff:', a ^ b)"
          },
          {
            title: "Deduplication",
            code: "nums = [1, 2, 2, 3, 3, 3, 4, 5, 5]\nprint('Original:', nums)\nprint('Unique:', sorted(set(nums)))\nprint('Count unique:', len(set(nums)))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Given a={1,2,3,4,5} b={4,5,6,7,8}, print intersection as sorted list.",
            starterCode: "a = {1,2,3,4,5}\nb = {4,5,6,7,8}\n",
            solution: "a = {1,2,3,4,5}\nb = {4,5,6,7,8}\nprint(sorted(a & b))",
            expectedOutput: "[4, 5]"
          },
          {
            level: "intermediate",
            question: "Read 7 integers. Print count of unique elements.",
            starterCode: "nums = [int(input()) for _ in range(7)]\n",
            solution: "nums = [int(input()) for _ in range(7)]\nprint(len(set(nums)))",
            expectedOutput: "4",
            inputs: [
              "1",
              "2",
              "2",
              "3",
              "3",
              "3",
              "4"
            ]
          },
          {
            level: "advanced",
            question: "Given a={1,2,3,4,5} b={4,5,6,7,8}, print union, intersection, difference as sorted lists.",
            starterCode: "a={1,2,3,4,5}\nb={4,5,6,7,8}\n",
            solution: "a={1,2,3,4,5}\nb={4,5,6,7,8}\nprint(sorted(a|b))\nprint(sorted(a&b))\nprint(sorted(a-b))",
            expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8]\n[4, 5]\n[1, 2, 3]"
          }
        ]
      },
      {
        id: "u3t9",
        title: "3.4.2 \u2014 Frozen Sets",
        notes: "### Frozen Sets\nA **frozenset** is an immutable version of a set.\n```python\nfs = frozenset([1, 2, 3, 4])\nprint(fs)   # frozenset({1, 2, 3, 4})\nprint(type(fs))   # <class 'frozenset'>\n\n# frozenset supports all READ operations\nprint(len(fs))         # 4\nprint(2 in fs)          # True\nprint(fs | {5, 6})     # union \u2014 returns new frozenset\nprint(fs & {2, 3})     # intersection\n\n# frozenset does NOT support modification\n# fs.add(5)      # AttributeError!\n# fs.remove(1)   # AttributeError!\n```\n\n### When to Use Frozen Sets\n- When you need a set that should NOT be changed\n- As **dictionary keys** (regular sets cannot be used as keys)\n- As elements inside another set\n\n```python\n# frozenset as dictionary key\ngraph = {\n    frozenset({1, 2}): 'edge A',\n    frozenset({2, 3}): 'edge B',\n}\nprint(graph[frozenset({1, 2})])   # 'edge A'\n\n# Set of frozensets\ncollection = {frozenset({1,2}), frozenset({3,4})}\nprint(collection)\n```\n\n### Comparison: set vs frozenset\n| Feature | set | frozenset |\n|---------|-----|-----------|\n| Mutable | \u2705 | \u274c |\n| Hashable | \u274c | \u2705 |\n| Dict key | \u274c | \u2705 |\n| Set element | \u274c | \u2705 |",
        examples: [
          {
            title: "Frozenset operations",
            code: "fs = frozenset([1, 2, 3, 4, 5])\nprint(fs)\nprint(len(fs))\nprint(3 in fs)\nprint(fs | frozenset([6, 7]))\nprint(fs & frozenset([3, 4, 5, 6]))"
          },
          {
            title: "Frozenset as dict key",
            code: "edges = {\n    frozenset({'A','B'}): 10,\n    frozenset({'B','C'}): 20,\n    frozenset({'A','C'}): 15\n}\nfor edge, weight in edges.items():\n    print(f'{sorted(edge)} : {weight}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create fs=frozenset([1,2,3,4,5]). Print its length and check if 3 is in it.",
            starterCode: "fs = frozenset([1,2,3,4,5])\n",
            solution: "fs = frozenset([1,2,3,4,5])\nprint(len(fs))\nprint(3 in fs)",
            expectedOutput: "5\nTrue"
          },
          {
            level: "intermediate",
            question: "Create fs=frozenset([1,2,3]). Print union with {3,4,5} as sorted list.",
            starterCode: "fs = frozenset([1,2,3])\n",
            solution: "fs = frozenset([1,2,3])\nresult = fs | frozenset([3,4,5])\nprint(sorted(result))",
            expectedOutput: "[1, 2, 3, 4, 5]"
          }
        ]
      }
    ]
  },
  {
    id: "u4",
    title: "Functions & Problem Solving",
    icon: "\u2699\ufe0f",
    desc: "Dictionaries, Functions, Recursion, Lambda",
    hours: 10,
    co: "CO4",
    topics: [
      {
        id: "u4t1",
        title: "4.1.1 \u2014 Dictionary Creation and Operations",
        notes: "### Dictionary Creation\nA dictionary stores **key-value pairs**.\n```python\nstudent = {'name': 'Ravi', 'age': 21, 'branch': 'ECE'}\nempty = {}\nd2 = dict(name='Khadar', marks=90)\nd3 = dict([('a',1),('b',2)])   # from list of tuples\n```\n\n### Accessing Values\n```python\nprint(student['name'])              # 'Ravi'\nprint(student.get('phone', 'N/A')) # safe \u2014 no KeyError\n```\n\n### Adding and Updating\n```python\nstudent['cgpa'] = 8.5      # add new key\nstudent['age'] = 22         # update existing\nstudent.update({'city': 'Anantapur', 'age': 23})\n```\n\n### Deleting\n```python\ndel student['age']             # delete key\nval = student.pop('cgpa')      # remove & return\nstudent.popitem()              # remove last inserted\n```\n\n### Membership (checks keys)\n```python\nprint('name' in student)    # True\nprint('phone' in student)   # False\n```\n\n### Iterating\n```python\nfor key in student:\n    print(key)\n\nfor value in student.values():\n    print(value)\n\nfor key, value in student.items():\n    print(f'{key}: {value}')\n```",
        examples: [
          {
            title: "Dictionary operations",
            code: "student = {'name': 'Ravi', 'age': 21, 'branch': 'ECE'}\nstudent['cgpa'] = 8.5\nstudent['age'] = 22\nfor k, v in student.items():\n    print(f'{k}: {v}')"
          },
          {
            title: "Word frequency counter",
            code: "text = 'the quick brown fox the lazy dog the fox'\nfreq = {}\nfor word in text.split():\n    freq[word] = freq.get(word, 0) + 1\nfor word, count in sorted(freq.items(), key=lambda x: -x[1]):\n    print(f'{word}: {count}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create d={'name':'Ravi','marks':88}. Print the value for 'marks'.",
            starterCode: "d = {'name': 'Ravi', 'marks': 88}\n",
            solution: "d = {'name': 'Ravi', 'marks': 88}\nprint(d['marks'])",
            expectedOutput: "88"
          },
          {
            level: "intermediate",
            question: "Read 4 words. Count frequency. Print the dict.",
            starterCode: "freq = {}\nfor i in range(4):\n    w = input()\n",
            solution: "freq = {}\nfor i in range(4):\n    w = input()\n    freq[w] = freq.get(w, 0) + 1\nprint(freq)",
            expectedOutput: "{'apple': 2, 'banana': 1, 'mango': 1}",
            inputs: [
              "apple",
              "banana",
              "apple",
              "mango"
            ]
          }
        ]
      },
      {
        id: "u4t2",
        title: "4.1.2 \u2014 Dictionary Methods and Applications",
        notes: "### Dictionary Methods\n```python\nd = {'a': 1, 'b': 2, 'c': 3}\n\nprint(d.keys())      # dict_keys(['a','b','c'])\nprint(d.values())    # dict_values([1,2,3])\nprint(d.items())     # dict_items([('a',1),('b',2),('c',3)])\n\nd2 = d.copy()        # shallow copy\nd.update({'d': 4, 'e': 5})  # merge\nd.setdefault('f', 0)  # add only if key missing\nd.clear()            # remove all\n```\n\n### Dictionary Comprehension\n```python\nsquares = {x: x**2 for x in range(1, 6)}\nprint(squares)   # {1:1, 2:4, 3:9, 4:16, 5:25}\n\n# Filter \u2014 only even squares\neven_sq = {x: x**2 for x in range(1,11) if x%2==0}\n\n# Invert a dictionary\norig = {'a': 1, 'b': 2, 'c': 3}\ninverted = {v: k for k, v in orig.items()}\nprint(inverted)   # {1:'a', 2:'b', 3:'c'}\n```\n\n### Dictionary Applications\n```python\n# Phone book\nphone_book = {'Ravi': '9876543210', 'Priya': '9123456789'}\nname = input('Enter name: ')\nprint(phone_book.get(name, 'Not found'))\n\n# Student marks \u2014 find topper\nmarks = {'Ravi':78, 'Priya':92, 'Suresh':65}\ntopper = max(marks, key=marks.get)\nprint(f'Topper: {topper} with {marks[topper]}')\n\n# Group students by grade\nstudents = {'Ravi':78, 'Priya':92, 'Suresh':65, 'Lakshmi':88}\ngrades = {}\nfor name, m in students.items():\n    g = 'A' if m>=90 else 'B' if m>=75 else 'C'\n    grades.setdefault(g, []).append(name)\nprint(grades)\n```",
        examples: [
          {
            title: "Dictionary comprehension",
            code: "squares = {x: x**2 for x in range(1,6)}\nprint(squares)\n\ninverted = {v:k for k,v in squares.items()}\nprint(inverted)"
          },
          {
            title: "Find topper",
            code: "marks = {'Ravi':78, 'Priya':92, 'Suresh':65, 'Lakshmi':88}\ntopper = max(marks, key=marks.get)\nprint(f'Topper: {topper} with {marks[topper]} marks')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "marks={'Ravi':78,'Priya':92,'Suresh':65}. Print name with highest marks.",
            starterCode: "marks = {'Ravi':78,'Priya':92,'Suresh':65}\n",
            solution: "marks = {'Ravi':78,'Priya':92,'Suresh':65}\nprint(max(marks, key=marks.get))",
            expectedOutput: "Priya"
          },
          {
            level: "intermediate",
            question: "Create dict comprehension: keys 1-5, values = cubes. Print.",
            starterCode: "",
            solution: "print({x: x**3 for x in range(1,6)})",
            expectedOutput: "{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}"
          }
        ]
      },
      {
        id: "u4t3",
        title: "4.2.1 \u2014 Built-in and User-Defined Functions",
        notes: "### Built-in Functions\nPython provides many ready-to-use functions:\n```python\nprint(abs(-10))          # 10\nprint(round(3.14159, 2)) # 3.14\nprint(pow(2, 8))         # 256\nprint(divmod(17, 5))     # (3, 2)\nprint(max(5, 2, 8, 1))   # 8\nprint(min([5,2,8,1]))    # 1\nprint(sum([1,2,3,4,5]))  # 15\nprint(len('Python'))     # 6\nprint(type(3.14))        # <class 'float'>\nprint(isinstance(5, int))   # True\nprint(id(x))             # memory address\n```\n\n### User-Defined Functions\n```python\n# Syntax\ndef function_name(parameters):\n    \"\"\"Docstring \u2014 describes what the function does\"\"\"\n    # body\n    return value\n\n# Example\ndef greet(name):\n    \"\"\"Greet a person by name.\"\"\"\n    return f'Hello, {name}!'\n\nprint(greet('Ravi'))    # Hello, Ravi!\nprint(greet('Priya'))   # Hello, Priya!\n```\n\n### Functions with Multiple Returns\n```python\ndef divide(a, b):\n    if b == 0:\n        return None, 'Division by zero'\n    return a / b, None\n\nresult, error = divide(10, 3)\nif error:\n    print('Error:', error)\nelse:\n    print(f'Result: {result:.4f}')\n```\n\n### Docstrings\n```python\ndef factorial(n):\n    \"\"\"Return n! (n factorial).\n    \n    Args:\n        n: non-negative integer\n    Returns:\n        factorial of n\n    \"\"\"\n    if n == 0: return 1\n    return n * factorial(n-1)\n\nprint(factorial.__doc__)\n```",
        examples: [
          {
            title: "Built-in functions",
            code: "nums = [5, 2, 8, 1, 9, 3]\nprint('max:', max(nums))\nprint('min:', min(nums))\nprint('sum:', sum(nums))\nprint('sorted:', sorted(nums))\nprint('reversed:', list(reversed(nums)))\nprint('enumerate:', list(enumerate(nums, 1)))"
          },
          {
            title: "User-defined function",
            code: "def bmi(weight, height):\n    \"\"\"Calculate BMI = weight(kg) / height(m)^2\"\"\"\n    bmi_val = weight / height**2\n    if bmi_val < 18.5: category = 'Underweight'\n    elif bmi_val < 25: category = 'Normal'\n    elif bmi_val < 30: category = 'Overweight'\n    else: category = 'Obese'\n    return round(bmi_val, 2), category\n\nbmi_val, cat = bmi(70, 1.75)\nprint(f'BMI: {bmi_val} ({cat})')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define square(n) returning n*n. Read n, call it, print result.",
            starterCode: "def square(n):\n    pass\nn = int(input())\n",
            solution: "def square(n):\n    return n * n\nn = int(input())\nprint(square(n))",
            expectedOutput: "49",
            inputs: [
              "7"
            ]
          },
          {
            level: "intermediate",
            question: "Define is_prime(n) returning True if prime. Read n, print result.",
            starterCode: "def is_prime(n):\n    pass\nn = int(input())\n",
            solution: "def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n%i==0: return False\n    return True\nn = int(input())\nprint(is_prime(n))",
            expectedOutput: "True",
            inputs: [
              "17"
            ]
          }
        ]
      },
      {
        id: "u4t4",
        title: "4.2.2 \u2014 Function Definition and Calling",
        notes: "### Function Definition\n```python\ndef function_name(param1, param2):\n    # body\n    return result\n```\n\n### Calling a Function\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)     # calling\nprint(result)           # 8\nprint(add(10, 20))      # can call multiple times\n```\n\n### void Functions (no return)\n```python\ndef print_border(char='*', width=20):\n    print(char * width)\n\nprint_border()          # ********************\nprint_border('-', 30)   # ------------------------------\n```\n\n### Nested Functions\n```python\ndef outer(x):\n    def inner(y):     # defined inside outer\n        return y * 2\n    return inner(x) + x\n\nprint(outer(5))   # inner(5)+5 = 10+5 = 15\n```\n\n### Recursion Preview\n```python\ndef countdown(n):\n    if n <= 0:\n        print('Go!')\n        return\n    print(n)\n    countdown(n - 1)   # calls itself\n\ncountdown(5)\n# 5\n# 4\n# 3\n# 2\n# 1\n# Go!\n```",
        examples: [
          {
            title: "Function examples",
            code: "def greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\nprint(greet('Ravi'))\nprint(greet('Priya', 'Good morning'))\n\ndef circle_info(r):\n    area = 3.14159 * r**2\n    circumference = 2 * 3.14159 * r\n    return round(area,2), round(circumference,2)\n\na, c = circle_info(5)\nprint(f'Area={a}, Circumference={c}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define greet(name) returning 'Hello <name>'. Call with 'Khadar'.",
            starterCode: "def greet(name):\n    pass\n",
            solution: "def greet(name):\n    return f'Hello {name}'\nprint(greet('Khadar'))",
            expectedOutput: "Hello Khadar"
          },
          {
            level: "intermediate",
            question: "Define grade(marks): A>=90,B>=75,C>=60,else F. Read marks, print grade.",
            starterCode: "def grade(marks):\n    pass\nmarks = int(input())\n",
            solution: "def grade(marks):\n    if marks>=90: return 'A'\n    elif marks>=75: return 'B'\n    elif marks>=60: return 'C'\n    else: return 'F'\nmarks = int(input())\nprint(grade(marks))",
            expectedOutput: "B",
            inputs: [
              "80"
            ]
          }
        ]
      },
      {
        id: "u4t5",
        title: "4.2.3 \u2014 Arguments: Positional, Keyword, Default, Variable-length",
        notes: "### 1. Positional Arguments\nOrder matters \u2014 values matched by position:\n```python\ndef subtract(a, b):\n    return a - b\n\nprint(subtract(10, 3))   # 7  (a=10, b=3)\nprint(subtract(3, 10))   # -7 (a=3, b=10)\n```\n\n### 2. Keyword Arguments\nOrder doesn't matter \u2014 values matched by name:\n```python\ndef student_info(name, age, branch):\n    print(f'{name}, {age}, {branch}')\n\nstudent_info(age=21, name='Ravi', branch='ECE')\nstudent_info('Priya', branch='CSE', age=20)\n```\n\n### 3. Default Arguments\nDefault value used when argument not provided:\n```python\ndef greet(name, greeting='Hello'):\n    print(f'{greeting}, {name}!')\n\ngreet('Ravi')                   # Hello, Ravi!\ngreet('Priya', 'Good morning')  # Good morning, Priya!\n\n# Default args must come AFTER non-default args\ndef power(base, exp=2):   # OK\n    return base ** exp\n# def power(exp=2, base): # ERROR!\n```\n\n### 4. Variable-length Arguments\n```python\n# *args \u2014 any number of positional arguments\ndef total(*args):\n    print(type(args))   # <class 'tuple'>\n    return sum(args)\n\nprint(total(1, 2, 3))        # 6\nprint(total(10, 20, 30, 40)) # 100\n\n# **kwargs \u2014 any number of keyword arguments\ndef show_info(**kwargs):\n    print(type(kwargs))   # <class 'dict'>\n    for k, v in kwargs.items():\n        print(f'{k}: {v}')\n\nshow_info(name='Khadar', dept='ECE', college='ALITS')\n\n# Combined\ndef mixed(a, b, *args, **kwargs):\n    print(a, b, args, kwargs)\n\nmixed(1, 2, 3, 4, x=5, y=6)\n# 1 2 (3, 4) {'x':5, 'y':6}\n```",
        examples: [
          {
            title: "All argument types",
            code: "def demo(a, b=10, *args, **kwargs):\n    print(f'a={a}, b={b}')\n    print(f'args={args}')\n    print(f'kwargs={kwargs}')\n\ndemo(1)\ndemo(1, 2)\ndemo(1, 2, 3, 4, x=5, y=6)"
          },
          {
            title: "*args for flexible sum",
            code: "def total(*args):\n    return sum(args)\n\nprint(total(1, 2))          # 3\nprint(total(1,2,3,4,5))    # 15\nprint(total(10,20,30))     # 60"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define power(base, exp=2). Call power(3) and power(2,10). Print both.",
            starterCode: "def power(base, exp=2):\n    pass\n",
            solution: "def power(base, exp=2):\n    return base ** exp\nprint(power(3))\nprint(power(2,10))",
            expectedOutput: "9\n1024"
          },
          {
            level: "intermediate",
            question: "Define total(*args) returning sum. Call with (1,2,3,4,5). Print.",
            starterCode: "def total(*args):\n    pass\n",
            solution: "def total(*args):\n    return sum(args)\nprint(total(1,2,3,4,5))",
            expectedOutput: "15"
          }
        ]
      },
      {
        id: "u4t6",
        title: "4.2.4 \u2014 Scope of Variables (Local and Global)",
        notes: "### Scope\nScope determines where a variable is **accessible**.\n\n### Local Scope\nVariables defined inside a function \u2014 only exist there:\n```python\ndef my_func():\n    x = 10   # local to my_func\n    print(x)\n\nmy_func()    # 10\n# print(x)   # NameError: x not defined here!\n```\n\n### Global Scope\nVariables defined outside all functions:\n```python\nx = 100   # global\n\ndef show():\n    print(x)   # can READ global\n\nshow()    # 100\n```\n\n### Modifying Global Variable \u2014 global keyword\n```python\ncount = 0\n\ndef increment():\n    global count   # tell Python: use the GLOBAL count\n    count += 1\n\nincrement()\nincrement()\nprint(count)   # 2\n```\n\n### Local vs Global Conflict\n```python\nx = 'global'\n\ndef func():\n    x = 'local'    # creates NEW local x\n    print(x)        # 'local'\n\nfunc()\nprint(x)   # 'global' \u2014 unchanged!\n```\n\n### nonlocal \u2014 Nested Function Scope\n```python\ndef outer():\n    x = 5\n    def inner():\n        nonlocal x   # refers to outer's x\n        x += 1\n        return x\n    return inner()\n\nprint(outer())   # 6\n```\n\n### LEGB Rule\nPython looks up variables in this order:\n**L**ocal \u2192 **E**nclosing \u2192 **G**lobal \u2192 **B**uilt-in",
        examples: [
          {
            title: "Scope demonstration",
            code: "x = 'global'\n\ndef outer():\n    x = 'outer'\n    def inner():\n        x = 'inner'\n        print('inner:', x)\n    inner()\n    print('outer:', x)\n\nouter()\nprint('global:', x)"
          },
          {
            title: "Global counter",
            code: "total = 0\n\ndef add(n):\n    global total\n    total += n\n\nadd(10)\nadd(20)\nadd(30)\nprint('Total:', total)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Global balance=1000. Define withdraw(n) using global. Call withdraw(250). Print balance.",
            starterCode: "balance = 1000\ndef withdraw(n):\n    pass\n",
            solution: "balance = 1000\ndef withdraw(n):\n    global balance\n    balance -= n\nwithdraw(250)\nprint(balance)",
            expectedOutput: "750"
          },
          {
            level: "intermediate",
            question: "Define counter with nonlocal: outer() has count=0, inner() increments and returns. Call outer() 3 times. Print each result.",
            starterCode: "",
            solution: "def make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\ncounter = make_counter()\nprint(counter())\nprint(counter())\nprint(counter())",
            expectedOutput: "1\n2\n3"
          }
        ]
      },
      {
        id: "u4t7",
        title: "4.3.1 \u2014 Recursive Functions: Factorial and Fibonacci",
        notes: "### What is Recursion?\nA function that **calls itself** to solve a smaller version of the same problem.\n\nEvery recursive function needs:\n1. **Base case** \u2014 stops the recursion\n2. **Recursive case** \u2014 calls itself with simpler input\n\n### Recursive Factorial\n```python\ndef factorial(n):\n    if n == 0 or n == 1:       # base case\n        return 1\n    return n * factorial(n-1)  # recursive case\n\nprint(factorial(5))   # 120\n```\n\nHow it unfolds:\n```\nfactorial(5)\n= 5 \u00d7 factorial(4)\n= 5 \u00d7 4 \u00d7 factorial(3)\n= 5 \u00d7 4 \u00d7 3 \u00d7 factorial(2)\n= 5 \u00d7 4 \u00d7 3 \u00d7 2 \u00d7 factorial(1)\n= 5 \u00d7 4 \u00d7 3 \u00d7 2 \u00d7 1\n= 120\n```\n\n### Recursive Fibonacci\n```python\ndef fib(n):\n    if n <= 1:              # base case\n        return n\n    return fib(n-1) + fib(n-2)   # recursive case\n\n# 0, 1, 1, 2, 3, 5, 8, 13, 21...\nfor i in range(9):\n    print(fib(i), end=' ')\n```\n\n### Recursion vs Iteration\n```python\n# Recursive factorial\ndef fact_recursive(n):\n    if n <= 1: return 1\n    return n * fact_recursive(n-1)\n\n# Iterative factorial (faster, no stack overflow risk)\ndef fact_iterative(n):\n    result = 1\n    for i in range(1, n+1):\n        result *= i\n    return result\n```\n\n> \u26a0\ufe0f Forgetting the base case causes `RecursionError: maximum recursion depth exceeded`",
        examples: [
          {
            title: "Factorial and Fibonacci",
            code: "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n-1)\n\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\nfor i in range(1, 7):\n    print(f'{i}! = {factorial(i)}')\n\nprint('Fibonacci:', [fib(i) for i in range(8)])"
          },
          {
            title: "Recursive sum of list",
            code: "def recursive_sum(lst):\n    if len(lst) == 0:\n        return 0\n    return lst[0] + recursive_sum(lst[1:])\n\nprint(recursive_sum([1,2,3,4,5]))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define recursive factorial(n). Read n, print result.",
            starterCode: "def factorial(n):\n    pass\nn = int(input())\n",
            solution: "def factorial(n):\n    if n<=1: return 1\n    return n * factorial(n-1)\nn = int(input())\nprint(factorial(n))",
            expectedOutput: "120",
            inputs: [
              "5"
            ]
          },
          {
            level: "intermediate",
            question: "Define recursive fib(n) (0-indexed). Read n, print fib(n).",
            starterCode: "def fib(n):\n    pass\nn = int(input())\n",
            solution: "def fib(n):\n    if n<=1: return n\n    return fib(n-1)+fib(n-2)\nn = int(input())\nprint(fib(n))",
            expectedOutput: "21",
            inputs: [
              "8"
            ]
          },
          {
            level: "advanced",
            question: "Define recursive power(base,exp) without **. Read base,exp, print result.",
            starterCode: "def power(base, exp):\n    pass\nbase = int(input())\nexp = int(input())\n",
            solution: "def power(base, exp):\n    if exp==0: return 1\n    return base * power(base, exp-1)\nbase=int(input())\nexp=int(input())\nprint(power(base,exp))",
            expectedOutput: "32",
            inputs: [
              "2",
              "5"
            ]
          }
        ]
      },
      {
        id: "u4t8",
        title: "4.3.2 \u2014 Lambda Functions (Anonymous Functions)",
        notes: "### Lambda \u2014 Anonymous Functions\nA compact, one-line function without a name.\n\n**Syntax:** `lambda arguments: expression`\n\n```python\nsquare = lambda x: x**2\nadd = lambda a, b: a + b\ngreet = lambda name: f'Hello, {name}!'\n\nprint(square(5))        # 25\nprint(add(3, 4))        # 7\nprint(greet('Ravi'))    # Hello, Ravi!\n```\n\n### Lambda vs def\n```python\n# These are exactly equivalent:\ndef cube(x):\n    return x**3\n\ncube_lambda = lambda x: x**3\n\nprint(cube(3))         # 27\nprint(cube_lambda(3))  # 27\n```\n\n### Used with map()\nApply function to every element:\n```python\nnums = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)   # [1, 4, 9, 16, 25]\n\ndoubled = list(map(lambda x: x*2, nums))\nprint(doubled)   # [2, 4, 6, 8, 10]\n```\n\n### Used with filter()\nKeep only elements where function returns True:\n```python\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x%2==0, nums))\nprint(evens)   # [2, 4, 6, 8, 10]\n\nbig = list(filter(lambda x: x>5, nums))\nprint(big)   # [6, 7, 8, 9, 10]\n```\n\n### Used with sorted()\nCustom sort key:\n```python\nstudents = [('Ravi',78), ('Priya',92), ('Suresh',65)]\nby_marks = sorted(students, key=lambda s: s[1], reverse=True)\nprint(by_marks)   # [('Priya',92),('Ravi',78),('Suresh',65)]\n\nwords = ['banana','apple','kiwi','mango']\nby_length = sorted(words, key=lambda w: len(w))\nprint(by_length)   # ['kiwi','apple','mango','banana']\n```",
        examples: [
          {
            title: "map, filter, sorted with lambda",
            code: "nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nprint('Squared:', list(map(lambda x: x**2, nums)))\nprint('Evens:', list(filter(lambda x: x%2==0, nums)))\nprint('Odd squares:', list(map(lambda x: x**2, filter(lambda x: x%2!=0, nums))))"
          },
          {
            title: "Sort by custom key",
            code: "students = [('Ravi',78),('Priya',92),('Suresh',65),('Lakshmi',88)]\nprint('By marks (desc):', sorted(students, key=lambda s: s[1], reverse=True))\nprint('By name:', sorted(students, key=lambda s: s[0]))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create lambda 'cube' = x**3. Print cube(3).",
            starterCode: "cube = lambda x: ",
            solution: "cube = lambda x: x**3\nprint(cube(3))",
            expectedOutput: "27"
          },
          {
            level: "intermediate",
            question: "nums=[1..10]. Use filter+lambda to get only numbers >5. Print.",
            starterCode: "nums = list(range(1,11))\n",
            solution: "nums = list(range(1,11))\nprint(list(filter(lambda x: x>5, nums)))",
            expectedOutput: "[6, 7, 8, 9, 10]"
          },
          {
            level: "advanced",
            question: "students=[('Ravi',78),('Priya',92),('Suresh',65),('Lakshmi',88)]. Sort by marks desc. Print.",
            starterCode: "students = [('Ravi',78),('Priya',92),('Suresh',65),('Lakshmi',88)]\n",
            solution: "students = [('Ravi',78),('Priya',92),('Suresh',65),('Lakshmi',88)]\nprint(sorted(students, key=lambda s: s[1], reverse=True))",
            expectedOutput: "[('Priya', 92), ('Lakshmi', 88), ('Ravi', 78), ('Suresh', 65)]"
          }
        ]
      },
      {
        id: "u4t9",
        title: "4.3.3 \u2014 Applications of Functions in Problem Solving",
        notes: "### Functions in Problem Solving\n\nFunctions let you write modular, reusable solutions.\n\n### 1. Number Theory\n```python\ndef is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n%i==0: return False\n    return True\n\ndef primes_up_to(n):\n    return [x for x in range(2, n+1) if is_prime(x)]\n\nprint(primes_up_to(30))\n```\n\n### 2. String Processing\n```python\ndef is_palindrome(s):\n    s = s.lower().replace(' ', '')\n    return s == s[::-1]\n\ndef word_frequency(text):\n    words = text.lower().split()\n    return {w: words.count(w) for w in set(words)}\n\nprint(is_palindrome('A man a plan a canal Panama'))\nprint(word_frequency('the fox jumped over the fox'))\n```\n\n### 3. Sorting Algorithms\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))\n```\n\n### 4. Mathematical Applications\n```python\ndef lcm(a, b):\n    def gcd(x, y):\n        while y: x, y = y, x%y\n        return x\n    return a * b // gcd(a, b)\n\ndef combinations(n, r):\n    \"\"\"nCr = n! / (r! * (n-r)!)\"\"\"\n    def fact(k):\n        return 1 if k<=1 else k*fact(k-1)\n    return fact(n) // (fact(r) * fact(n-r))\n\nprint(lcm(12, 18))       # 36\nprint(combinations(5,2)) # 10\n```\n\n> \ud83d\udca1 **Tools:** Use **SymPy** for symbolic math. Use **PyCharm** for modular program development.",
        examples: [
          {
            title: "Problem solving with functions",
            code: "def gcd(a, b):\n    while b: a, b = b, a%b\n    return a\n\ndef lcm(a, b):\n    return a * b // gcd(a, b)\n\ndef is_perfect(n):\n    return sum(i for i in range(1,n) if n%i==0) == n\n\nprint('GCD(48,18):', gcd(48,18))\nprint('LCM(12,18):', lcm(12,18))\nprint('Is 28 perfect?', is_perfect(28))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define gcd(a,b) using Euclidean algorithm. Read a,b, print gcd.",
            starterCode: "def gcd(a, b):\n    pass\na=int(input())\nb=int(input())\n",
            solution: "def gcd(a,b):\n    while b: a,b=b,a%b\n    return a\na=int(input())\nb=int(input())\nprint(gcd(a,b))",
            expectedOutput: "6",
            inputs: [
              "48",
              "18"
            ]
          },
          {
            level: "advanced",
            question: "Define is_perfect(n): returns True if sum of proper divisors equals n. Test n=28.",
            starterCode: "def is_perfect(n):\n    pass\n",
            solution: "def is_perfect(n):\n    return sum(i for i in range(1,n) if n%i==0)==n\nprint(is_perfect(28))",
            expectedOutput: "True"
          }
        ]
      }
    ]
  },
  {
    id: "u5",
    title: "File Handling, Exceptions & OOP",
    icon: "\ud83d\udee1\ufe0f",
    desc: "Modules, File Handling, Exceptions, OOP",
    hours: 10,
    co: "CO5",
    topics: [
      {
        id: "u5t1",
        title: "5.1.1 \u2014 Creating and Importing Modules",
        notes: "### What is a Module?\nA module is a Python file (.py) containing functions, variables, and classes you can reuse.\n\n### Creating a Module\n```python\n# Save as: math_utils.py\ndef square(n):\n    return n * n\n\ndef cube(n):\n    return n * n * n\n\ndef is_even(n):\n    return n % 2 == 0\n\nPI = 3.14159\n```\n\n### Importing Styles\n```python\n# 1. Import entire module\nimport math_utils\nprint(math_utils.square(4))     # 16\nprint(math_utils.PI)             # 3.14159\n\n# 2. Import specific items\nfrom math_utils import square, cube\nprint(square(5))   # 25\nprint(cube(3))     # 27\n\n# 3. Import with alias\nimport math_utils as mu\nprint(mu.square(6))   # 36\n\n# 4. Import everything (use carefully \u2014 pollutes namespace)\nfrom math_utils import *\nprint(cube(4))   # 64\n```\n\n### __name__ == '__main__'\n```python\n# In math_utils.py\ndef square(n):\n    return n * n\n\n# This only runs when the file is run directly,\n# NOT when it is imported\nif __name__ == '__main__':\n    print(square(5))   # test code\n```\n\n### Checking Module Contents\n```python\nimport math\nprint(dir(math))     # list all attributes/functions\nprint(help(math.sqrt))  # documentation\n```",
        examples: [
          {
            title: "Using math module",
            code: "import math\nprint(math.sqrt(144))\nprint(math.pi)\nprint(math.factorial(6))\nprint(math.ceil(4.3))\nprint(math.floor(4.9))\nprint(math.pow(2,10))"
          },
          {
            title: "from import style",
            code: "from math import sqrt, pi, factorial\nprint(f'sqrt(25) = {sqrt(25)}')\nprint(f'pi = {pi:.5f}')\nprint(f'6! = {factorial(6)}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Import math. Print floor(7.8) and ceil(7.2).",
            starterCode: "import math\n",
            solution: "import math\nprint(math.floor(7.8))\nprint(math.ceil(7.2))",
            expectedOutput: "7\n8"
          },
          {
            level: "intermediate",
            question: "Use math to compute hypotenuse of right triangle with sides 3,4 (sqrt(3^2+4^2)).",
            starterCode: "import math\n",
            solution: "import math\nprint(math.sqrt(3**2 + 4**2))",
            expectedOutput: "5.0"
          }
        ]
      },
      {
        id: "u5t2",
        title: "5.1.2 \u2014 Standard Library Modules",
        notes: "### Python Standard Library\nPython ships with hundreds of built-in modules \u2014 no installation needed.\n\n### math Module\n```python\nimport math\nprint(math.sqrt(16))       # 4.0\nprint(math.pi)             # 3.14159265...\nprint(math.e)              # 2.71828...\nprint(math.factorial(5))   # 120\nprint(math.ceil(4.3))      # 5\nprint(math.floor(4.9))     # 4\nprint(math.log(100, 10))   # 2.0\nprint(math.sin(math.pi/2)) # 1.0\n```\n\n### random Module\n```python\nimport random\nrandom.seed(42)                          # reproducible\nprint(random.randint(1, 6))              # random int 1-6\nprint(random.random())                   # float 0.0-1.0\nprint(random.choice(['a','b','c']))      # pick one\nlst = [1,2,3,4,5]\nrandom.shuffle(lst)                      # shuffle in place\nprint(lst)\nprint(random.sample(range(100), 5))     # 5 unique randoms\n```\n\n### os Module\n```python\nimport os\nprint(os.getcwd())                  # current directory\nprint(os.listdir('.'))              # list files\nos.mkdir('new_folder')              # create directory\nos.rename('old.txt', 'new.txt')    # rename\nos.remove('file.txt')               # delete file\nprint(os.path.exists('data.txt'))  # check if exists\nprint(os.path.join('folder','file.txt'))  # path join\n```\n\n### datetime Module\n```python\nimport datetime\ntoday = datetime.date.today()\nprint(today)                              # 2025-07-14\n\nnow = datetime.datetime.now()\nprint(now)                                # 2025-07-14 10:30:45\nprint(now.strftime('%d/%m/%Y'))          # 14/07/2025\nprint(now.strftime('%I:%M %p'))          # 10:30 AM\n\nbirth = datetime.date(2004, 6, 15)\nage_days = (today - birth).days\nprint(f'Age: {age_days // 365} years')\n```",
        examples: [
          {
            title: "Standard library showcase",
            code: "import math, random, datetime\n\nprint('math.sqrt(2):', round(math.sqrt(2), 4))\nrandom.seed(42)\nprint('random dice:', random.randint(1,6))\nprint('Today:', datetime.date.today())"
          },
          {
            title: "random for simulation",
            code: "import random\nrandom.seed(42)\n# Simulate 10 dice rolls\nrolls = [random.randint(1,6) for _ in range(10)]\nprint('Rolls:', rolls)\nprint('Average:', sum(rolls)/len(rolls))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Import random. Set seed to 42. Print random.randint(1,100).",
            starterCode: "import random\n",
            solution: "import random\nrandom.seed(42)\nprint(random.randint(1,100))",
            expectedOutput: "82"
          },
          {
            level: "intermediate",
            question: "Import math. Print sin(90 degrees) \u2014 convert degrees to radians first using math.radians().",
            starterCode: "import math\n",
            solution: "import math\nprint(round(math.sin(math.radians(90)), 1))",
            expectedOutput: "1.0"
          }
        ]
      },
      {
        id: "u5t3",
        title: "5.2.1 \u2014 File Handling: Opening, Reading, Writing, Closing",
        notes: "### Opening and Closing Files\n```python\n# Old style \u2014 must manually close\nf = open('data.txt', 'w')\nf.write('Hello')\nf.close()   # MUST close to save!\n\n# New style \u2014 with statement (recommended)\nwith open('data.txt', 'w') as f:\n    f.write('Hello')\n# Auto-closed when block ends\n```\n\n### File Modes\n| Mode | Meaning |\n|------|--------|\n| `'r'` | Read (default; error if not exists) |\n| `'w'` | Write (creates new / overwrites) |\n| `'a'` | Append (adds to end) |\n| `'r+'` | Read + Write |\n| `'x'` | Create new (error if exists) |\n| `'b'` | Binary (add to others: `'rb'`, `'wb'`) |\n\n### Writing to Files\n```python\nwith open('notes.txt', 'w') as f:\n    f.write('Line 1\\n')               # write string\n    f.writelines(['Line 2\\n','Line 3\\n'])  # write list\n```\n\n### Reading from Files\n```python\n# read() \u2014 entire file as one string\nwith open('notes.txt', 'r') as f:\n    content = f.read()\n    print(content)\n\n# readline() \u2014 one line at a time\nwith open('notes.txt', 'r') as f:\n    line = f.readline()   # 'Line 1\\n'\n\n# readlines() \u2014 all lines as list\nwith open('notes.txt', 'r') as f:\n    lines = f.readlines()   # ['Line 1\\n', 'Line 2\\n', ...]\n\n# Iterate line by line (memory efficient)\nwith open('notes.txt', 'r') as f:\n    for line in f:\n        print(line.strip())\n```\n\n### Appending\n```python\nwith open('log.txt', 'a') as f:\n    f.write('New entry\\n')   # adds to end, doesn't overwrite\n```\n\n### CSV Files\n```python\nimport csv\n# Write\nwith open('students.csv', 'w', newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['Name', 'Marks'])\n    writer.writerow(['Ravi', 85])\n    writer.writerow(['Priya', 92])\n# Read\nwith open('students.csv', 'r') as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)\n```",
        examples: [
          {
            title: "Write and read",
            code: "with open('test.txt', 'w') as f:\n    f.write('Python Programming\\n')\n    f.write('ALITS College\\n')\n    f.write('Anantapur\\n')\n\nwith open('test.txt', 'r') as f:\n    for line in f:\n        print(line.strip())"
          },
          {
            title: "Count lines and words",
            code: "with open('sample.txt', 'w') as f:\n    f.write('Hello World Python\\nALITS Anantapur\\n')\n\nwith open('sample.txt', 'r') as f:\n    lines = f.readlines()\n    print('Lines:', len(lines))\n    words = sum(len(l.split()) for l in lines)\n    print('Words:', words)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Write 'Hello ALITS Students' to greeting.txt, read it back and print.",
            starterCode: "",
            solution: "with open('greeting.txt','w') as f:\n    f.write('Hello ALITS Students')\nwith open('greeting.txt','r') as f:\n    print(f.read())",
            expectedOutput: "Hello ALITS Students"
          },
          {
            level: "intermediate",
            question: "Write lines 'Python','is','fun' to words.txt. Read back and print total lines.",
            starterCode: "",
            solution: "with open('words.txt','w') as f:\n    f.write('Python\\nis\\nfun\\n')\nwith open('words.txt','r') as f:\n    print(len(f.readlines()))",
            expectedOutput: "3"
          },
          {
            level: "advanced",
            question: "Write 1-5 to numbers.txt (each on new line). Read back, convert to int, print sum.",
            starterCode: "",
            solution: "with open('numbers.txt','w') as f:\n    for i in range(1,6): f.write(f'{i}\\n')\ntotal=0\nwith open('numbers.txt','r') as f:\n    for line in f: total+=int(line.strip())\nprint(total)",
            expectedOutput: "15"
          }
        ]
      },
      {
        id: "u5t4",
        title: "5.3.1 \u2014 Types of Errors: Syntax, Runtime, Logical",
        notes: "### Types of Errors in Python\n\n### 1. Syntax Errors\nDetected **before** the program runs \u2014 Python cannot parse the code.\n```python\n# Missing closing parenthesis\nprint('Hello'    # SyntaxError\n\n# Wrong indentation\nif True:\nprint('hi')      # IndentationError (type of SyntaxError)\n\n# Missing colon\nif x > 0        # SyntaxError\n    print(x)\n```\n\n### 2. Runtime Errors (Exceptions)\nOccur **while** the program is running.\n```python\n# ZeroDivisionError\nprint(10 / 0)\n\n# ValueError\nprint(int('abc'))\n\n# IndexError\nlst = [1,2,3]\nprint(lst[10])\n\n# KeyError\nd = {'a':1}\nprint(d['z'])\n\n# NameError\nprint(undefined_variable)\n\n# TypeError\nprint('5' + 5)\n\n# FileNotFoundError\nopen('nonexistent.txt')\n\n# AttributeError\n'hello'.nonexistent_method()\n```\n\n### 3. Logical Errors\nProgram runs but produces **wrong output** \u2014 hardest to find!\n```python\n# Bug: wrong formula (missing parentheses)\ndef average(a, b):\n    return a + b / 2   # WRONG! Should be (a+b)/2\n\nprint(average(10, 20))   # prints 20.0 instead of 15.0\n\n# Fix:\ndef average_correct(a, b):\n    return (a + b) / 2\n\nprint(average_correct(10, 20))   # 15.0 (correct)\n```\n\n### Common Exception Types\n| Exception | Cause |\n|-----------|-------|\n| `ZeroDivisionError` | Divide by zero |\n| `ValueError` | Wrong value type |\n| `TypeError` | Wrong data type |\n| `IndexError` | Index out of range |\n| `KeyError` | Dict key missing |\n| `FileNotFoundError` | File doesn't exist |\n| `NameError` | Variable not defined |\n| `AttributeError` | Method doesn't exist |",
        examples: [
          {
            title: "Demonstrating error types",
            code: "# Runtime errors caught with try-except\nerrors = [\n    ('ZeroDivision', lambda: 1/0),\n    ('ValueError', lambda: int('abc')),\n    ('IndexError', lambda: [1,2,3][10]),\n    ('KeyError', lambda: {'a':1}['z']),\n]\nfor name, fn in errors:\n    try:\n        fn()\n    except Exception as e:\n        print(f'{name}: {type(e).__name__}')"
          },
          {
            title: "Logical error example",
            code: "# Logical error \u2014 wrong formula\ndef wrong_avg(a, b):\n    return a + b / 2   # bug\n\ndef correct_avg(a, b):\n    return (a + b) / 2  # fixed\n\nprint('Wrong:', wrong_avg(10, 20))    # 20.0\nprint('Correct:', correct_avg(10, 20)) # 15.0"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Fix the logical error: def avg(a,b): return a+b/2  \u2192 should be (a+b)/2. Read a,b, print correct average.",
            starterCode: "def avg(a, b):\n    return (a + b) / 2   # correct formula\na = int(input())\nb = int(input())\n",
            solution: "def avg(a, b):\n    return (a + b) / 2\na = int(input())\nb = int(input())\nprint(avg(a, b))",
            expectedOutput: "15.0",
            inputs: [
              "10",
              "20"
            ]
          },
          {
            level: "intermediate",
            question: "Identify and handle: try int('hello'), catch ValueError, print 'Not a number'.",
            starterCode: "",
            solution: "try:\n    x = int('hello')\nexcept ValueError:\n    print('Not a number')",
            expectedOutput: "Not a number"
          }
        ]
      },
      {
        id: "u5t5",
        title: "5.3.2 \u2014 try, except, finally Blocks",
        notes: "### try / except\n```python\ntry:\n    result = 10 / int(input())\n    print(result)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nexcept ValueError:\n    print('Please enter a valid integer!')\n```\n\n### Multiple except Blocks\n```python\ntry:\n    n = int(input())\n    lst = [1,2,3]\n    print(lst[n])\nexcept ValueError:\n    print('Not a number')\nexcept IndexError:\n    print('Index out of range')\nexcept Exception as e:\n    print(f'Unexpected error: {e}')\n```\n\n### else Clause\nRuns only if **no exception** occurred:\n```python\ntry:\n    result = 100 / int(input())\nexcept ZeroDivisionError:\n    print('Error')\nelse:\n    print(f'Result: {result}')  # only if no exception\n```\n\n### finally Clause\nAlways runs \u2014 used for cleanup:\n```python\ntry:\n    f = open('data.txt', 'r')\n    content = f.read()\nexcept FileNotFoundError:\n    print('File not found')\nfinally:\n    print('Execution complete')  # ALWAYS runs\n    # f.close()  # cleanup here\n```\n\n### Complete Structure\n```python\ntry:\n    # risky code\nexcept SomeError:\n    # handle specific error\nexcept AnotherError:\n    # handle another\nexcept Exception as e:\n    # catch-all\nelse:\n    # no exception occurred\nfinally:\n    # always runs (cleanup)\n```\n\n### finally with return\n```python\ndef risky():\n    try:\n        return 1\n    finally:\n        print('Cleanup')  # runs BEFORE return!\n\nprint(risky())\n# Output:\n# Cleanup\n# 1\n```",
        examples: [
          {
            title: "Complete exception handling",
            code: "def divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print('Error: division by zero')\n        return None\n    except TypeError:\n        print('Error: invalid types')\n        return None\n    else:\n        print(f'Success: {result}')\n        return result\n    finally:\n        print('divide() completed')\n\ndivide(10, 2)\ndivide(10, 0)"
          },
          {
            title: "Safe file reading",
            code: "def read_file(filename):\n    try:\n        with open(filename, 'r') as f:\n            return f.read()\n    except FileNotFoundError:\n        return f'Error: {filename} not found'\n    except PermissionError:\n        return 'Error: no permission'\n    finally:\n        print('read_file() done')\n\nprint(read_file('nonexistent.txt'))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a,b. Divide. Catch ZeroDivisionError, print 'Cannot divide by zero'.",
            starterCode: "a=int(input())\nb=int(input())\n",
            solution: "a=int(input())\nb=int(input())\ntry:\n    print(a/b)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
            expectedOutput: "Cannot divide by zero",
            inputs: [
              "10",
              "0"
            ]
          },
          {
            level: "intermediate",
            question: "Read string. Try int() conversion. Print 'Valid: n' or 'Invalid number'.",
            starterCode: "s = input()\n",
            solution: "s=input()\ntry:\n    n=int(s)\n    print(f'Valid: {n}')\nexcept ValueError:\n    print('Invalid number')",
            expectedOutput: "Invalid number",
            inputs: [
              "abc"
            ]
          },
          {
            level: "advanced",
            question: "Define safe_divide(a,b) with try/except/else/finally. Test 10/2 and 10/0.",
            starterCode: "",
            solution: "def safe_divide(a,b):\n    try:\n        result=a/b\n    except ZeroDivisionError:\n        print('Error')\n        return\n    else:\n        print(f'Result: {result}')\n    finally:\n        print('Done')\nsafe_divide(10,2)\nsafe_divide(10,0)",
            expectedOutput: "Result: 5.0\nDone\nError\nDone"
          }
        ]
      },
      {
        id: "u5t6",
        title: "5.3.3 \u2014 Raising Exceptions",
        notes: "### Raising Exceptions\nYou can raise exceptions intentionally using `raise`.\n\n### raise Statement\n```python\nraise ValueError('Invalid age')     # raise with message\nraise TypeError                       # raise without message\nraise                                  # re-raise current exception\n```\n\n### Raising in Functions (Input Validation)\n```python\ndef set_age(age):\n    if not isinstance(age, int):\n        raise TypeError('Age must be an integer')\n    if age < 0 or age > 150:\n        raise ValueError(f'Age {age} is out of valid range (0-150)')\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e)   # Age -5 is out of valid range (0-150)\n```\n\n### Custom Exception Classes\n```python\nclass InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(f'Cannot withdraw {amount}, balance is {balance}')\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount\n\ntry:\n    new_balance = withdraw(500, 1000)\nexcept InsufficientFundsError as e:\n    print(e)\n```\n\n### assert Statement\nRaise `AssertionError` if condition is False:\n```python\ndef divide(a, b):\n    assert b != 0, 'Divisor cannot be zero!'\n    return a / b\n\ntry:\n    print(divide(10, 0))\nexcept AssertionError as e:\n    print(f'Assertion failed: {e}')\n```",
        examples: [
          {
            title: "Input validation with raise",
            code: "def set_marks(marks):\n    if not isinstance(marks, (int, float)):\n        raise TypeError('Marks must be a number')\n    if marks < 0 or marks > 100:\n        raise ValueError(f'Marks {marks} out of range 0-100')\n    return marks\n\nfor m in [85, -5, 110, 'abc']:\n    try:\n        print(f'Valid marks: {set_marks(m)}')\n    except (ValueError, TypeError) as e:\n        print(f'Error: {e}')"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define validate_age(age): raise ValueError if age<0 or age>150. Test with -5.",
            starterCode: "def validate_age(age):\n    pass\n",
            solution: "def validate_age(age):\n    if age<0 or age>150:\n        raise ValueError('Invalid age')\n    return age\ntry:\n    validate_age(-5)\nexcept ValueError as e:\n    print(e)",
            expectedOutput: "Invalid age"
          },
          {
            level: "intermediate",
            question: "Define safe_sqrt(n): raise ValueError if n<0. Test with n=-4.",
            starterCode: "import math\ndef safe_sqrt(n):\n    pass\n",
            solution: "import math\ndef safe_sqrt(n):\n    if n<0: raise ValueError(f'Cannot take sqrt of {n}')\n    return math.sqrt(n)\ntry:\n    safe_sqrt(-4)\nexcept ValueError as e:\n    print(e)",
            expectedOutput: "Cannot take sqrt of -4"
          }
        ]
      },
      {
        id: "u5t7",
        title: "5.4.1 \u2014 Classes, Objects, Attributes, Methods",
        notes: "### Introduction to OOP\nObject-Oriented Programming (OOP) models real-world entities as **objects** that bundle data (attributes) and behaviour (methods).\n\n**Four Pillars of OOP:**\n- **Encapsulation** \u2014 hiding internal data\n- **Inheritance** \u2014 reusing parent class features\n- **Polymorphism** \u2014 same method, different behaviour\n- **Abstraction** \u2014 hiding implementation details\n\n### Class and Object\n```python\nclass Student:                    # class definition\n    college = 'ALITS'            # class attribute (shared)\n\n    def __init__(self, name, age):  # constructor\n        self.name = name          # instance attribute (unique)\n        self.age = age\n\n    def display(self):            # method\n        print(f'Name: {self.name}, Age: {self.age}')\n\n    def greet(self):\n        return f'Hi, I am {self.name} from {self.college}'\n\n# Create objects\ns1 = Student('Ravi', 20)\ns2 = Student('Priya', 21)\n\n# Access attributes\nprint(s1.name)          # Ravi\nprint(Student.college)  # ALITS (class attribute)\n\n# Call methods\ns1.display()\nprint(s2.greet())\n```\n\n### Class vs Instance Attributes\n```python\nclass Counter:\n    count = 0             # class attribute \u2014 shared\n\n    def __init__(self):\n        Counter.count += 1\n        self.id = Counter.count   # instance attribute \u2014 unique\n\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count)   # 3\nprint(a.id, b.id, c.id)  # 1 2 3\n```\n\n### Methods\n```python\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14159 * self.radius**2\n\n    def perimeter(self):\n        return 2 * 3.14159 * self.radius\n\n    def __str__(self):   # string representation\n        return f'Circle(radius={self.radius})'\n\nc = Circle(5)\nprint(c.area())\nprint(c)\n```",
        examples: [
          {
            title: "Student class",
            code: "class Student:\n    college = 'ALITS'\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def grade(self):\n        if self.marks>=90: return 'A'\n        elif self.marks>=75: return 'B'\n        else: return 'C'\n    def __str__(self):\n        return f'{self.name}: {self.marks} ({self.grade()})'\n\nstudents = [Student('Ravi',85), Student('Priya',92), Student('Suresh',67)]\nfor s in students:\n    print(s)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define Circle with __init__(radius) and area()=3.14*r*r. Create Circle(5), print area().",
            starterCode: "class Circle:\n    def __init__(self, radius):\n        pass\n    def area(self):\n        pass\nc=Circle(5)\n",
            solution: "class Circle:\n    def __init__(self, radius):\n        self.radius=radius\n    def area(self):\n        return 3.14*self.radius**2\nc=Circle(5)\nprint(c.area())",
            expectedOutput: "78.5"
          },
          {
            level: "intermediate",
            question: "Define Rectangle(length,width) with area() and perimeter(). Create Rectangle(4,6), print both.",
            starterCode: "class Rectangle:\n    def __init__(self,l,w):\n        pass\n    def area(self):\n        pass\n    def perimeter(self):\n        pass\nr=Rectangle(4,6)\n",
            solution: "class Rectangle:\n    def __init__(self,l,w):\n        self.l=l; self.w=w\n    def area(self):\n        return self.l*self.w\n    def perimeter(self):\n        return 2*(self.l+self.w)\nr=Rectangle(4,6)\nprint(r.area())\nprint(r.perimeter())",
            expectedOutput: "24\n20"
          },
          {
            level: "advanced",
            question: "Define BankAccount(balance) with deposit(), withdraw() (no negative). Start=1000, deposit 500, withdraw 2000 (fail), withdraw 300, print balance.",
            starterCode: "class BankAccount:\n    def __init__(self,b): pass\n    def deposit(self,a): pass\n    def withdraw(self,a): pass\nacc=BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\n",
            solution: "class BankAccount:\n    def __init__(self,b): self.balance=b\n    def deposit(self,a): self.balance+=a\n    def withdraw(self,a):\n        if a>self.balance: print('Insufficient funds')\n        else: self.balance-=a\nacc=BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\nprint(acc.balance)",
            expectedOutput: "Insufficient funds\n1200"
          }
        ]
      },
      {
        id: "u5t8",
        title: "5.4.2 \u2014 Constructors and self Keyword",
        notes: "### The __init__ Constructor\n`__init__` is called **automatically** when an object is created.\n\n```python\nclass Person:\n    def __init__(self, name, age):\n        self.name = name   # set attributes\n        self.age = age\n\np1 = Person('Ravi', 21)   # __init__ runs automatically\np2 = Person('Priya', 20)  # separate object, separate data\n```\n\n### The self Keyword\n`self` refers to the **current object** the method is being called on.\nPython passes it automatically \u2014 you never include it when calling.\n\n```python\nclass Dog:\n    def __init__(self, name, breed):\n        self.name = name    # self.name is THIS dog's name\n        self.breed = breed\n\n    def bark(self):\n        return f'{self.name} says Woof!'   # self.name\n\nd1 = Dog('Tommy', 'Labrador')\nd2 = Dog('Kitty', 'Poodle')\n\nprint(d1.bark())  # Tommy says Woof!\nprint(d2.bark())  # Kitty says Woof!\n# self is different for d1 and d2\n```\n\n### Default Parameter in Constructor\n```python\nclass Student:\n    def __init__(self, name, marks=0, branch='ECE'):\n        self.name = name\n        self.marks = marks\n        self.branch = branch\n\ns1 = Student('Ravi', 85)\ns2 = Student('Priya', 92, 'CSE')\ns3 = Student('Suresh')  # uses defaults\n```\n\n### __str__ and __repr__\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):    # for print()\n        return f'Point({self.x}, {self.y})'\n\n    def __repr__(self):   # for debugging\n        return f'Point(x={self.x}, y={self.y})'\n\np = Point(3, 4)\nprint(p)        # Point(3, 4)  \u2014 uses __str__\nprint(repr(p))  # Point(x=3, y=4)  \u2014 uses __repr__\n```",
        examples: [
          {
            title: "Constructor and self",
            code: "class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n\n    def to_fahrenheit(self):\n        return self.celsius * 9/5 + 32\n\n    def to_kelvin(self):\n        return self.celsius + 273.15\n\n    def __str__(self):\n        return f'{self.celsius}\u00b0C = {self.to_fahrenheit():.1f}\u00b0F = {self.to_kelvin():.2f}K'\n\ntemps = [Temperature(0), Temperature(100), Temperature(37)]\nfor t in temps:\n    print(t)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define Student(name, marks). Create Student('Ravi',85). Print name and marks.",
            starterCode: "class Student:\n    def __init__(self, name, marks):\n        pass\ns=Student('Ravi',85)\n",
            solution: "class Student:\n    def __init__(self,name,marks):\n        self.name=name\n        self.marks=marks\ns=Student('Ravi',85)\nprint(s.name)\nprint(s.marks)",
            expectedOutput: "Ravi\n85"
          },
          {
            level: "intermediate",
            question: "Define Point(x,y) with __str__ returning 'Point(x,y)'. Create Point(3,4), print it.",
            starterCode: "class Point:\n    def __init__(self,x,y): pass\n    def __str__(self): pass\n",
            solution: "class Point:\n    def __init__(self,x,y):\n        self.x=x; self.y=y\n    def __str__(self):\n        return f'Point({self.x},{self.y})'\nprint(Point(3,4))",
            expectedOutput: "Point(3,4)"
          }
        ]
      },
      {
        id: "u5t9",
        title: "5.4.3 \u2014 Basic Applications of OOP in Python",
        notes: "### OOP Applications\n\n### 1. Inheritance\nChild class reuses and extends parent class:\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f'{self.name} makes a sound'\n\nclass Dog(Animal):\n    def speak(self):             # method overriding\n        return f'{self.name} barks'\n\nclass Cat(Animal):\n    def speak(self):\n        return f'{self.name} meows'\n\nanimals = [Dog('Tommy'), Cat('Kitty'), Animal('Bird')]\nfor a in animals:\n    print(a.speak())   # polymorphism\n```\n\n### 2. Encapsulation\n```python\nclass BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance   # private (name-mangled)\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\n    def withdraw(self, amount):\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n        else:\n            raise ValueError('Invalid amount')\n\n    def get_balance(self):         # getter\n        return self.__balance\n\nacc = BankAccount(1000)\nacc.deposit(500)\nprint(acc.get_balance())   # 1500\n# acc.__balance   # AttributeError!\n```\n\n### 3. Polymorphism\n```python\nclass Shape:\n    def area(self):\n        return 0\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r**2\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s**2\n\nclass Triangle(Shape):\n    def __init__(self, b, h): self.b=b; self.h=h\n    def area(self): return 0.5*self.b*self.h\n\nshapes = [Circle(5), Square(4), Triangle(6,3)]\nfor shape in shapes:\n    print(f'{type(shape).__name__}: area = {shape.area()}')\n```\n\n### 4. super()\n```python\nclass Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n    def annual(self):\n        return self.salary * 12\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)  # call parent __init__\n        self.bonus = bonus\n    def annual(self):\n        return super().annual() + self.bonus  # extend parent\n\nm = Manager('Khadar', 50000, 20000)\nprint(m.annual())   # 620000\n```",
        examples: [
          {
            title: "Polymorphism with shapes",
            code: "class Shape:\n    def area(self): return 0\n    def name(self): return type(self).__name__\n\nclass Circle(Shape):\n    def __init__(self,r): self.r=r\n    def area(self): return round(3.14159*self.r**2,2)\n\nclass Square(Shape):\n    def __init__(self,s): self.s=s\n    def area(self): return self.s**2\n\nclass Triangle(Shape):\n    def __init__(self,b,h): self.b=b;self.h=h\n    def area(self): return 0.5*self.b*self.h\n\nfor s in [Circle(5),Square(4),Triangle(6,3)]:\n    print(f'{s.name()}: {s.area()}')"
          }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Define Animal with speak(). Dog overrides: 'barks', Cat: 'meows'. Create list of both, print each speak().",
            starterCode: "class Animal:\n    def speak(self): return 'sound'\nclass Dog(Animal):\n    def speak(self): pass\nclass Cat(Animal):\n    def speak(self): pass\n",
            solution: "class Animal:\n    def speak(self): return 'sound'\nclass Dog(Animal):\n    def speak(self): return 'barks'\nclass Cat(Animal):\n    def speak(self): return 'meows'\nfor a in [Dog(),Cat()]:\n    print(a.speak())",
            expectedOutput: "barks\nmeows"
          },
          {
            level: "advanced",
            question: "Define Employee(name,salary) with annual()=salary*12. Manager adds bonus, overrides annual. Create Manager('Ravi',50000,20000), print annual().",
            starterCode: "class Employee:\n    def __init__(self,name,salary): pass\n    def annual(self): pass\nclass Manager(Employee):\n    def __init__(self,name,salary,bonus): pass\n    def annual(self): pass\nm=Manager('Ravi',50000,20000)\n",
            solution: "class Employee:\n    def __init__(self,name,salary):\n        self.name=name;self.salary=salary\n    def annual(self): return self.salary*12\nclass Manager(Employee):\n    def __init__(self,name,salary,bonus):\n        super().__init__(name,salary);self.bonus=bonus\n    def annual(self): return super().annual()+self.bonus\nm=Manager('Ravi',50000,20000)\nprint(m.annual())",
            expectedOutput: "620000"
          }
        ]
      }
    ]
  }
];

const PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);
const PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);
