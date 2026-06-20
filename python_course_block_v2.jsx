
// ════════════════════════════════════════════════════════════════════════════
// PYTHON COURSE MODULE — toggled on/off from Admin → Settings
// Self-contained: own home page + full curriculum + in-browser Python runner
// (Pyodide) + throttled live activity sync for Admin monitoring.
// Loaded ONLY when settings.pythonCourseMode === true
// ════════════════════════════════════════════════════════════════════════════

// ─── PYTHON CURRICULUM DATA (full 6-unit, 21-topic, 67-problem syllabus) ───────
const PY_CURRICULUM = [
  {
    id: "u1",
    title: "Python Fundamentals",
    icon: "🔤",
    desc: "Variables, Data Types, Input/Output, Operators",
    topics: [
      {
        id: "u1t1",
        title: "Introduction & Your First Program",
        notes: "\n### Why Python?\nPython is the most beginner-friendly programming language used in industry today — it reads almost like English. It is used in AI, web development, data science, automation, and is the #1 recommended language for engineering first-years because it lets you focus on **logic** instead of fighting complicated syntax.\n\n### Writing your first program\nEvery Python program is just a sequence of instructions executed top to bottom.\n\n```python\nprint(\"Hello, World!\")\nprint(\"Welcome to B.Tech Python Programming\")\n```\n\n**Key points:**\n- `print()` is a built-in function that displays output on the screen.\n- Text must be inside quotes (single `'...'` or double `\"...\"`) — this is called a **string**.\n- Python does NOT use semicolons `;` to end lines (unlike C/Java) and does NOT need a `main()` function to run.\n- Indentation (spaces at the start of a line) is part of Python's syntax — not just style. Get this wrong and your program will crash.\n\n### Comments\nComments are notes for humans; Python ignores them.\n```python\n# This is a single-line comment\nprint(\"This runs\")  # comment after code also works\n\n\"\"\"\nThis is a\nmulti-line comment / docstring\n\"\"\"\n```\n\n> 💡 **Rural-classroom tip:** Think of a Python program like a recipe written in very precise English. The computer does *exactly* what you write, line by line — nothing more, nothing less.\n      ",
        examples: [
          {
            title: "Basic Hello World",
            code: "print(\"Hello, World!\")\nprint(\"My name is Python\")"
          },
          {
            title: "Printing multiple values",
            code: "print(\"Sum of 5 and 3 is:\", 5 + 3)\nprint(\"A\", \"B\", \"C\", sep=\" - \")\nprint(\"No newline after this\", end=\" >> \")\nprint(\"continued on same line\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Write a program to print your college name 'ALITS' on one line and 'Anantapur' on the next line.",
            starterCode: "# Write your code below\n",
            solution: "print(\"ALITS\")\nprint(\"Anantapur\")",
            expectedOutput: "ALITS\nAnantapur",
            hints: [
              "Use two separate print() statements",
              "Each print() automatically moves to a new line after"
            ]
          },
          {
            level: "basic",
            question: "Print the text: I am learning Python — using only ONE print statement and the comma separator to print 'I', 'am', 'learning', 'Python' as separate words.",
            starterCode: "# Use one print() with commas\n",
            solution: "print(\"I\", \"am\", \"learning\", \"Python\")",
            expectedOutput: "I am learning Python",
            hints: [
              "print() automatically adds a space between comma-separated items"
            ]
          },
          {
            level: "intermediate",
            question: "Print 'Total Marks: 95' and 'Percentage: 95.0%' using a single print() statement that uses the sep parameter to separate them with ' | '.",
            starterCode: "",
            solution: "print(\"Total Marks: 95\", \"Percentage: 95.0%\", sep=\" | \")",
            expectedOutput: "Total Marks: 95 | Percentage: 95.0%",
            hints: [
              "sep=' | ' replaces the default space between print arguments"
            ]
          }
        ]
      },
      {
        id: "u1t2",
        title: "Variables & Data Types",
        notes: "\n### Variables\nA variable is a labeled box that stores a value. Python figures out the type automatically (this is called **dynamic typing** — no need to declare `int x` like in C).\n\n```python\nname = \"Khadar\"        # string\nage = 21                # integer\ncgpa = 8.75              # float (decimal number)\nis_passed = True         # boolean (True/False)\n```\n\n**Rules for naming variables:**\n- Must start with a letter or underscore (`_`), not a number\n- Can contain letters, numbers, underscores — no spaces or symbols\n- Case-sensitive: `marks` and `Marks` are different variables\n- Cannot use Python reserved words (`if`, `for`, `class`, etc.)\n\n### Core Data Types\n\n| Type | Example | Description |\n|------|---------|-------------|\n| `int` | `10`, `-5` | Whole numbers |\n| `float` | `3.14`, `-0.5` | Decimal numbers |\n| `str` | `\"hello\"` | Text |\n| `bool` | `True`, `False` | Logical value |\n| `complex` | `2+3j` | Complex numbers (rare for first year) |\n\n### Checking type and converting (type casting)\n```python\nx = 10\nprint(type(x))         # <class 'int'>\n\ny = str(x)              # convert int to string -> \"10\"\nz = float(x)             # convert int to float -> 10.0\na = int(\"25\")            # convert string to int -> 25\nb = int(3.9)              # convert float to int -> 3 (truncates, doesn't round)\n```\n\n> ⚠️ **Common mistake:** `int(\"12.5\")` will CRASH — Python can't directly convert a decimal-looking string to int. You must do `int(float(\"12.5\"))` first.\n      ",
        examples: [
          {
            title: "Variable assignment and type checking",
            code: "name = \"Lakshmi\"\nage = 20\nheight = 5.4\nis_student = True\n\nprint(name, age, height, is_student)\nprint(type(name))\nprint(type(age))\nprint(type(height))\nprint(type(is_student))"
          },
          {
            title: "Type conversion",
            code: "roll_no = \"101\"\nroll_no_int = int(roll_no)\nprint(roll_no_int + 1)   # 102\n\nmarks = 89\nmarks_str = str(marks)\nprint(\"Marks: \" + marks_str)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create variables: name (string) = 'Ravi', age (int) = 19, cgpa (float) = 8.2. Print all three separated by spaces.",
            starterCode: "name = \nage = \ncgpa = \n",
            solution: "name = \"Ravi\"\nage = 19\ncgpa = 8.2\nprint(name, age, cgpa)",
            expectedOutput: "Ravi 19 8.2",
            hints: [
              "Strings need quotes, numbers don't"
            ]
          },
          {
            level: "basic",
            question: "Take the string '45' stored in a variable called marks_str, convert it to an integer, add 5 to it, and print the result.",
            starterCode: "marks_str = \"45\"\n# convert and add 5\n",
            solution: "marks_str = \"45\"\nmarks_int = int(marks_str)\nprint(marks_int + 5)",
            expectedOutput: "50",
            hints: [
              "Use int() to convert",
              "You can't add a number to a string directly"
            ]
          },
          {
            level: "intermediate",
            question: "A variable num = 7.89. Print its type, then convert it to int and print the converted value and its new type.",
            starterCode: "num = 7.89\n",
            solution: "num = 7.89\nprint(type(num))\nnum_int = int(num)\nprint(num_int)\nprint(type(num_int))",
            expectedOutput: "<class 'float'>\n7\n<class 'int'>",
            hints: [
              "int() truncates decimals, it does not round"
            ]
          },
          {
            level: "advanced",
            question: "Swap the values of two variables a=5 and b=10 WITHOUT using a third variable (Python allows tuple-style swapping), then print both.",
            starterCode: "a = 5\nb = 10\n# swap here\n",
            solution: "a = 5\nb = 10\na, b = b, a\nprint(a, b)",
            expectedOutput: "10 5",
            hints: [
              "Python allows: a, b = b, a in a single line",
              "This is a unique Python feature not available directly in C"
            ]
          }
        ]
      },
      {
        id: "u1t3",
        title: "Input & Output",
        notes: "\n### Taking input from the user\n```python\nname = input(\"Enter your name: \")\nprint(\"Hello,\", name)\n```\n\n> ⚠️ **CRITICAL RULE:** `input()` **always** returns a string, even if the user types a number! You must convert it manually.\n\n```python\nage = input(\"Enter your age: \")      # age is a STRING \"21\", not the number 21\nage = int(input(\"Enter your age: \")) # now age is the INTEGER 21\n```\n\n### Formatted output — f-strings (the modern, preferred way)\n```python\nname = \"Priya\"\nmarks = 92\nprint(f\"{name} scored {marks} marks\")          # Priya scored 92 marks\nprint(f\"{name} scored {marks*2} marks\")          # expressions work inside {}\nprint(f\"CGPA: {8.6789:.2f}\")                       # CGPA: 8.68  (.2f = 2 decimal places)\n```\n\n### Other formatting styles (you'll see these in older code)\n```python\nprint(\"%s scored %d marks\" % (name, marks))        # old C-style\nprint(\"{} scored {} marks\".format(name, marks))     # .format() style\n```\n\n> 💡 **For this course, always prefer f-strings** — they are the cleanest and most readable, and are what real companies use today.\n      ",
        examples: [
          {
            title: "Basic input and output",
            code: "name = input(\"Enter your name: \")\nprint(f\"Welcome, {name}!\")"
          },
          {
            title: "Numeric input with conversion",
            code: "a = int(input(\"Enter first number: \"))\nb = int(input(\"Enter second number: \"))\nprint(f\"Sum = {a + b}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read the user's name using input() and print 'Hello <name>, welcome to ALITS!' (with the actual name inserted, e.g. for input 'Khadar' it prints 'Hello Khadar, welcome to ALITS!')",
            starterCode: "name = input()\n",
            solution: "name = input()\nprint(f\"Hello {name}, welcome to ALITS!\")",
            expectedOutput: "Hello Khadar, welcome to ALITS!",
            hints: [
              "Use an f-string: f'Hello {name}, welcome to ALITS!'"
            ],
            inputs: [
              "Khadar"
            ]
          },
          {
            level: "intermediate",
            question: "Read two integers (each on its own input() call) and print their sum using an f-string in the format: 'Sum = 15'",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nprint(f\"Sum = {a + b}\")",
            expectedOutput: "Sum = 15",
            inputs: [
              "10",
              "5"
            ],
            hints: [
              "Don't forget int() — input() gives strings by default"
            ]
          },
          {
            level: "intermediate",
            question: "Read a float for 'price' and print it formatted to exactly 2 decimal places using f-string formatting, like: 'Price: 49.99'",
            starterCode: "price = float(input())\n",
            solution: "price = float(input())\nprint(f\"Price: {price:.2f}\")",
            expectedOutput: "Price: 49.99",
            inputs: [
              "49.99"
            ],
            hints: [
              "Use {variable:.2f} inside the f-string"
            ]
          }
        ]
      },
      {
        id: "u1t4",
        title: "Operators",
        notes: "\n### Arithmetic Operators\n| Operator | Meaning | Example | Result |\n|----------|---------|---------|--------|\n| `+` | Addition | `5 + 3` | 8 |\n| `-` | Subtraction | `5 - 3` | 2 |\n| `*` | Multiplication | `5 * 3` | 15 |\n| `/` | Division (always float) | `5 / 2` | 2.5 |\n| `//` | Floor division (integer result) | `5 // 2` | 2 |\n| `%` | Modulus (remainder) | `5 % 2` | 1 |\n| `**` | Exponent (power) | `2 ** 3` | 8 |\n\n> ⚠️ This trips up most students coming from C: `5 / 2` gives `2.5` in Python (NOT 2). Use `//` if you want the old C-style integer division.\n\n### Comparison Operators (return True/False)\n`==`  `!=`  `>`  `<`  `>=`  `<=`\n\n### Logical Operators\n`and`, `or`, `not` (Python spells these out — no `&&`, `||` like C/Java)\n```python\nage = 20\nhas_id = True\nprint(age >= 18 and has_id)   # True\n```\n\n### Assignment Operators (shortcuts)\n```python\nx = 10\nx += 5    # same as x = x + 5  -> 15\nx -= 2    # x = x - 2 -> 13\nx *= 3    # x = x * 3 -> 39\nx //= 4   # x = x // 4 -> 9\n```\n\n### Operator Precedence (order of evaluation)\n`**` > `* / // %` > `+ -` > comparisons > `not` > `and` > `or`\nUse parentheses `()` when unsure — it never hurts and avoids bugs.\n      ",
        examples: [
          {
            title: "Arithmetic operators in action",
            code: "a, b = 17, 5\nprint(f\"{a} + {b} = {a+b}\")\nprint(f\"{a} - {b} = {a-b}\")\nprint(f\"{a} * {b} = {a*b}\")\nprint(f\"{a} / {b} = {a/b}\")\nprint(f\"{a} // {b} = {a//b}\")\nprint(f\"{a} % {b} = {a%b}\")\nprint(f\"{a} ** 2 = {a**2}\")"
          },
          {
            title: "Logical operators",
            code: "marks = 85\nattendance = 78\neligible = marks >= 40 and attendance >= 75\nprint(\"Eligible for exam:\", eligible)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read two integers a and b. Print the result of a // b and a % b on separate lines (quotient and remainder).",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)",
            expectedOutput: "3\n1",
            inputs: [
              "10",
              "3"
            ],
            hints: [
              "// gives integer quotient, % gives the remainder"
            ]
          },
          {
            level: "intermediate",
            question: "Check if a number entered by the user is divisible by both 3 and 5. Print True or False.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nprint(n % 3 == 0 and n % 5 == 0)",
            expectedOutput: "True",
            inputs: [
              "15"
            ],
            hints: [
              "Use % to check divisibility (remainder 0 means divisible)",
              "Combine two conditions with 'and'"
            ]
          },
          {
            level: "advanced",
            question: "Calculate Simple Interest using SI = (P*R*T)/100 where P=principal, R=rate, T=time are read as inputs (floats). Print the result rounded to 2 decimals using f-string formatting.",
            starterCode: "P = float(input())\nR = float(input())\nT = float(input())\n",
            solution: "P = float(input())\nR = float(input())\nT = float(input())\nSI = (P * R * T) / 100\nprint(f\"{SI:.2f}\")",
            expectedOutput: "750.00",
            inputs: [
              "5000",
              "5",
              "3"
            ],
            hints: [
              "SI formula: (Principal * Rate * Time) / 100"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "u2",
    title: "Control Flow",
    icon: "🔀",
    desc: "Conditional Statements & Loops",
    topics: [
      {
        id: "u2t1",
        title: "Conditional Statements (if / elif / else)",
        notes: "\n### Basic if statement\nPython uses **indentation** (usually 4 spaces) instead of `{ }` to mark what's inside a block. This is not optional — wrong indentation = crash or wrong logic.\n\n```python\nmarks = 75\nif marks >= 40:\n    print(\"Pass\")\n```\n\n### if / else\n```python\nage = 16\nif age >= 18:\n    print(\"Eligible to vote\")\nelse:\n    print(\"Not eligible\")\n```\n\n### if / elif / else (multiple conditions)\n```python\nmarks = 67\nif marks >= 90:\n    grade = \"A\"\nelif marks >= 75:\n    grade = \"B\"\nelif marks >= 60:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(grade)\n```\n\n> 💡 **Note:** Python has no `switch` statement (until very recent versions added `match`). `if/elif/else` chains do the same job and are what you should use in first year.\n\n### Nested conditions\n```python\nnum = 15\nif num > 0:\n    if num % 2 == 0:\n        print(\"Positive even\")\n    else:\n        print(\"Positive odd\")\nelse:\n    print(\"Not positive\")\n```\n\n### Ternary (one-line if-else)\n```python\nage = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(status)\n```\n      ",
        examples: [
          {
            title: "Grade calculator",
            code: "marks = 82\nif marks >= 90:\n    grade = \"A\"\nelif marks >= 75:\n    grade = \"B\"\nelif marks >= 60:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(f\"Grade: {grade}\")"
          },
          {
            title: "Leap year check",
            code: "year = 2024\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print(f\"{year} is a leap year\")\nelse:\n    print(f\"{year} is not a leap year\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read an integer. Print 'Positive' if greater than 0, 'Negative' if less than 0, else print 'Zero'.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nif n > 0:\n    print(\"Positive\")\nelif n < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")",
            expectedOutput: "Positive",
            inputs: [
              "7"
            ],
            hints: [
              "Use if / elif / else in order"
            ]
          },
          {
            level: "basic",
            question: "Read an integer age. Print 'Eligible' if age >= 18, else print 'Not Eligible'.",
            starterCode: "age = int(input())\n",
            solution: "age = int(input())\nif age >= 18:\n    print(\"Eligible\")\nelse:\n    print(\"Not Eligible\")",
            expectedOutput: "Eligible",
            inputs: [
              "20"
            ]
          },
          {
            level: "intermediate",
            question: "Read marks (0-100). Print grade as: A (>=90), B (>=75), C (>=60), D (>=40), F (below 40).",
            starterCode: "marks = int(input())\n",
            solution: "marks = int(input())\nif marks >= 90:\n    print(\"A\")\nelif marks >= 75:\n    print(\"B\")\nelif marks >= 60:\n    print(\"C\")\nelif marks >= 40:\n    print(\"D\")\nelse:\n    print(\"F\")",
            expectedOutput: "B",
            inputs: [
              "78"
            ],
            hints: [
              "Check from highest range down to lowest using elif"
            ]
          },
          {
            level: "advanced",
            question: "Read three integers (sides of a triangle). Print 'Equilateral' if all equal, 'Isosceles' if exactly two equal, 'Scalene' if all different. Also print 'Invalid triangle' instead if the triangle inequality fails (sum of any two sides must exceed the third).",
            starterCode: "a = int(input())\nb = int(input())\nc = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nc = int(input())\nif a + b <= c or b + c <= a or a + c <= b:\n    print(\"Invalid triangle\")\nelif a == b == c:\n    print(\"Equilateral\")\nelif a == b or b == c or a == c:\n    print(\"Isosceles\")\nelse:\n    print(\"Scalene\")",
            expectedOutput: "Isosceles",
            inputs: [
              "5",
              "5",
              "8"
            ],
            hints: [
              "Check triangle validity FIRST before classifying",
              "a == b == c checks all three equal in one line"
            ]
          }
        ]
      },
      {
        id: "u2t2",
        title: "while Loop",
        notes: "\n### Basic while loop\nRepeats a block **as long as a condition is True**. You must manually update the condition variable, or you get an infinite loop.\n\n```python\ni = 1\nwhile i <= 5:\n    print(i)\n    i += 1   # CRITICAL: forgetting this causes an infinite loop!\n```\n\n### while with else (Python-specific feature)\n```python\ni = 1\nwhile i <= 3:\n    print(i)\n    i += 1\nelse:\n    print(\"Loop finished normally\")\n```\n\n### break and continue\n- `break` → exits the loop immediately\n- `continue` → skips to the next iteration, doesn't execute the code below it in that iteration\n\n```python\ni = 0\nwhile i < 10:\n    i += 1\n    if i == 5:\n        continue    # skip printing 5\n    if i == 8:\n        break        # stop loop entirely at 8\n    print(i)\n```\n\n> 💡 **Rural-classroom analogy:** Think of `while` like checking attendance at a gate — \"while there are still students in line, let the next one in.\" You keep checking the condition every single time before letting the next iteration happen.\n      ",
        examples: [
          {
            title: "Sum of first N numbers using while",
            code: "n = 5\ni = 1\ntotal = 0\nwhile i <= n:\n    total += i\n    i += 1\nprint(f\"Sum = {total}\")"
          },
          {
            title: "Reverse digits of a number",
            code: "num = 1234\nreversed_num = 0\nwhile num > 0:\n    digit = num % 10\n    reversed_num = reversed_num * 10 + digit\n    num = num // 10\nprint(f\"Reversed: {reversed_num}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read an integer n. Print numbers from 1 to n, each on its own line, using a while loop.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\ni = 1\nwhile i <= n:\n    print(i)\n    i += 1",
            expectedOutput: "1\n2\n3\n4\n5",
            inputs: [
              "5"
            ]
          },
          {
            level: "intermediate",
            question: "Read an integer n. Find the sum of digits of n using a while loop (e.g., 123 -> 1+2+3 = 6). Print the sum.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)",
            expectedOutput: "6",
            inputs: [
              "123"
            ],
            hints: [
              "n % 10 gets the last digit",
              "n // 10 removes the last digit"
            ]
          },
          {
            level: "intermediate",
            question: "Check if a number is a palindrome (reads same forwards and backwards, e.g. 121) using a while loop. Print True or False.",
            starterCode: "n = int(input())\noriginal = n\n",
            solution: "n = int(input())\noriginal = n\nreversed_num = 0\nwhile n > 0:\n    digit = n % 10\n    reversed_num = reversed_num * 10 + digit\n    n //= 10\nprint(reversed_num == original)",
            expectedOutput: "True",
            inputs: [
              "121"
            ],
            hints: [
              "Reverse the number, then compare to the original"
            ]
          },
          {
            level: "advanced",
            question: "Find the GCD (Greatest Common Divisor) of two numbers using the Euclidean algorithm with a while loop (while b != 0: a, b = b, a % b). Print the GCD.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\nwhile b != 0:\n    a, b = b, a % b\nprint(a)",
            expectedOutput: "6",
            inputs: [
              "48",
              "18"
            ],
            hints: [
              "Euclidean algorithm: repeatedly replace (a,b) with (b, a%b) until b is 0",
              "The simultaneous assignment a, b = b, a % b avoids needing a temp variable"
            ]
          }
        ]
      },
      {
        id: "u2t3",
        title: "for Loop & range()",
        notes: "\n### for loop with range()\nThe `for` loop in Python is mainly used to iterate over a **sequence** (numbers, strings, lists, etc.) — it's different from C's for loop.\n\n```python\nfor i in range(5):        # 0, 1, 2, 3, 4  (stops BEFORE 5)\n    print(i)\n\nfor i in range(1, 6):      # 1, 2, 3, 4, 5  (start, stop)\n    print(i)\n\nfor i in range(0, 10, 2):   # 0, 2, 4, 6, 8  (start, stop, step)\n    print(i)\n\nfor i in range(10, 0, -1):   # 10, 9, 8, ... 1  (counting down)\n    print(i)\n```\n\n> ⚠️ **Most common beginner bug:** `range(n)` stops BEFORE `n`, it does NOT include `n`. `range(5)` gives 0,1,2,3,4 — five numbers, not including 5.\n\n### Looping over strings and lists directly\n```python\nfor ch in \"ALITS\":\n    print(ch)\n\nfruits = [\"apple\", \"banana\", \"mango\"]\nfor fruit in fruits:\n    print(fruit)\n```\n\n### Nested loops (loop inside a loop) — used for patterns, tables\n```python\nfor i in range(1, 4):\n    for j in range(1, 4):\n        print(f\"({i},{j})\", end=\" \")\n    print()  # new line after inner loop finishes\n```\n\n### for...else\nLike while, `for` can have an `else` that runs only if the loop completes without `break`.\n      ",
        examples: [
          {
            title: "Multiplication table",
            code: "n = 5\nfor i in range(1, 11):\n    print(f\"{n} x {i} = {n*i}\")"
          },
          {
            title: "Simple star pattern",
            code: "rows = 4\nfor i in range(1, rows+1):\n    print(\"*\" * i)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read an integer n. Print the multiplication table of n from 1 to 10 in the format 'n x i = result' (e.g., '5 x 1 = 5').",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, 11):\n    print(f\"{n} x {i} = {n*i}\")",
            expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30",
            inputs: [
              "3"
            ]
          },
          {
            level: "basic",
            question: "Read an integer n. Find the factorial of n using a for loop. Print the result.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint(fact)",
            expectedOutput: "120",
            inputs: [
              "5"
            ],
            hints: [
              "factorial = 1*2*3*...*n",
              "Start fact at 1, not 0 (else everything multiplies to 0)"
            ]
          },
          {
            level: "intermediate",
            question: "Read an integer rows. Print a right-angled triangle pattern of '*' with that many rows (row 1 has 1 star, row 2 has 2 stars, etc.)",
            starterCode: "rows = int(input())\n",
            solution: "rows = int(input())\nfor i in range(1, rows+1):\n    print(\"*\" * i)",
            expectedOutput: "*\n**\n***\n****",
            inputs: [
              "4"
            ],
            hints: [
              "'*' * i repeats the star i times"
            ]
          },
          {
            level: "intermediate",
            question: "Read an integer n. Print all prime numbers from 2 to n (inclusive), each on a new line.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor num in range(2, n+1):\n    is_prime = True\n    for i in range(2, int(num**0.5)+1):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num)",
            expectedOutput: "2\n3\n5\n7",
            inputs: [
              "10"
            ],
            hints: [
              "A number is prime if it has no divisors other than 1 and itself",
              "You only need to check divisors up to sqrt(num)"
            ]
          },
          {
            level: "advanced",
            question: "Print a number pyramid pattern for n=4 rows like:\n1\n1 2\n1 2 3\n1 2 3 4\n(read n from input, use nested for loops)",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        print(j, end=\" \")\n    print()",
            expectedOutput: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
            inputs: [
              "4"
            ],
            hints: [
              "Outer loop controls the row number",
              "Inner loop prints numbers 1 to current row number",
              "Use end=' ' to keep numbers on same line, then print() alone for newline"
            ]
          }
        ]
      },
      {
        id: "u2t4",
        title: "break, continue, pass",
        notes: "\n### break\nImmediately exits the nearest enclosing loop.\n```python\nfor i in range(1, 10):\n    if i == 5:\n        break\n    print(i)\n# prints 1 2 3 4, then stops\n```\n\n### continue\nSkips the rest of the current iteration and moves to the next one.\n```python\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)\n# prints 1 2 4 5 (skips 3)\n```\n\n### pass\nDoes nothing — it's a placeholder when Python's syntax requires a statement but you have no code to write yet.\n```python\nfor i in range(5):\n    if i == 3:\n        pass    # TODO: implement later\n    print(i)\n```\n\n> 💡 Use `pass` while you're still designing your program structure and haven't written the logic for a branch yet — it lets the code run without errors.\n      ",
        examples: [
          {
            title: "Find first number divisible by 7 in a range",
            code: "for i in range(1, 100):\n    if i % 7 == 0:\n        print(f\"Found: {i}\")\n        break"
          },
          {
            title: "Print only odd numbers using continue",
            code: "for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    print(i)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read an integer n. Print numbers 1 to n, but stop completely (using break) as soon as you reach 6, even if n is larger.",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    if i == 6:\n        break\n    print(i)",
            expectedOutput: "1\n2\n3\n4\n5",
            inputs: [
              "10"
            ]
          },
          {
            level: "intermediate",
            question: "Read an integer n. Print all numbers from 1 to n EXCEPT multiples of 3 (use continue to skip them).",
            starterCode: "n = int(input())\n",
            solution: "n = int(input())\nfor i in range(1, n+1):\n    if i % 3 == 0:\n        continue\n    print(i)",
            expectedOutput: "1\n2\n4\n5\n7\n8\n10",
            inputs: [
              "10"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "u3",
    title: "Data Structures",
    icon: "📦",
    desc: "Strings, Lists, Tuples, Dictionaries, Sets",
    topics: [
      {
        id: "u3t1",
        title: "Strings",
        notes: "\n### Strings are sequences of characters\n```python\ns = \"Python Programming\"\nprint(s[0])        # 'P'  (indexing starts at 0)\nprint(s[-1])         # 'g' (negative index = from the end)\nprint(s[0:6])          # 'Python' (slicing: start:stop, stop NOT included)\nprint(s[:6])             # 'Python' (start defaults to 0)\nprint(s[7:])               # 'Programming' (stop defaults to end)\nprint(s[::-1])               # reverses the whole string!\n```\n\n### Strings are immutable\nYou **cannot** change a character in place: `s[0] = 'X'` will throw an error. You must create a new string.\n\n### Common string methods\n```python\ns = \"  Hello World  \"\nprint(s.strip())          # removes leading/trailing spaces -> \"Hello World\"\nprint(s.lower())            # \"  hello world  \"\nprint(s.upper())              # \"  HELLO WORLD  \"\nprint(s.replace(\"World\", \"Python\"))   # \"  Hello Python  \"\nprint(s.split())                # ['Hello', 'World']  (splits by whitespace)\nprint(len(s))                     # length of the string\nprint(\"Hello\" in s)                  # True (membership check)\nprint(s.strip().split(\" \"))           # ['Hello', 'World']\n```\n\n### String concatenation & repetition\n```python\na = \"Hello\"\nb = \"World\"\nprint(a + \" \" + b)     # \"Hello World\"\nprint(a * 3)              # \"HelloHelloHello\"\n```\n\n### join() — combining a list into a string\n```python\nwords = [\"I\", \"love\", \"Python\"]\nsentence = \" \".join(words)\nprint(sentence)   # \"I love Python\"\n```\n      ",
        examples: [
          {
            title: "String slicing and reversing",
            code: "s = \"ALITS Anantapur\"\nprint(s[:5])\nprint(s[6:])\nprint(s[::-1])\nprint(s.upper())\nprint(len(s))"
          },
          {
            title: "Counting vowels in a string",
            code: "s = \"Engineering\"\ncount = 0\nfor ch in s.lower():\n    if ch in \"aeiou\":\n        count += 1\nprint(f\"Vowels: {count}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read a string. Print its length using len().",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(len(s))",
            expectedOutput: "6",
            inputs: [
              "Python"
            ]
          },
          {
            level: "basic",
            question: "Read a string and print it in reverse using slicing ([::-1]).",
            starterCode: "s = input()\n",
            solution: "s = input()\nprint(s[::-1])",
            expectedOutput: "nohtyP",
            inputs: [
              "Python"
            ]
          },
          {
            level: "intermediate",
            question: "Read a string. Check whether it is a palindrome (ignoring case). Print True or False. Example: 'Madam' is a palindrome.",
            starterCode: "s = input()\n",
            solution: "s = input()\ns = s.lower()\nprint(s == s[::-1])",
            expectedOutput: "True",
            inputs: [
              "Madam"
            ],
            hints: [
              "Convert to lowercase first so case doesn't matter",
              "Compare the string to its reverse"
            ]
          },
          {
            level: "intermediate",
            question: "Read a sentence. Count and print the number of vowels (a, e, i, o, u — case-insensitive) in it.",
            starterCode: "s = input()\n",
            solution: "s = input()\ncount = 0\nfor ch in s.lower():\n    if ch in \"aeiou\":\n        count += 1\nprint(count)",
            expectedOutput: "5",
            inputs: [
              "Engineering"
            ]
          },
          {
            level: "advanced",
            question: "Read a sentence. Print the count of each word's length in the format 'word:length' separated by spaces. Example input 'I love Python' -> output 'I:1 love:4 Python:6'",
            starterCode: "s = input()\n",
            solution: "s = input()\nwords = s.split()\nresult = []\nfor w in words:\n    result.append(f\"{w}:{len(w)}\")\nprint(\" \".join(result))",
            expectedOutput: "I:1 love:4 Python:6",
            inputs: [
              "I love Python"
            ],
            hints: [
              "split() breaks the sentence into a list of words",
              "Build a list of formatted strings, then join() them with spaces"
            ]
          }
        ]
      },
      {
        id: "u3t2",
        title: "Lists",
        notes: "\n### Lists — ordered, changeable collections\n```python\nfruits = [\"apple\", \"banana\", \"mango\"]\nprint(fruits[0])        # 'apple'\nfruits[1] = \"grape\"        # lists ARE mutable (unlike strings)\nprint(fruits)                # ['apple', 'grape', 'mango']\n```\n\n### Common list operations\n```python\nnums = [5, 2, 8, 1, 9]\nnums.append(10)        # add to end -> [5,2,8,1,9,10]\nnums.insert(0, 100)       # insert at index 0 -> [100,5,2,8,1,9,10]\nnums.remove(8)              # removes first occurrence of value 8\nnums.pop()                    # removes & returns LAST element\nnums.sort()                     # sorts in place, ascending\nnums.sort(reverse=True)           # descending\nnums.reverse()                      # reverses order in place\nprint(len(nums))                      # number of elements\nprint(sum(nums), max(nums), min(nums))   # built-in aggregate functions\n```\n\n### List slicing (same rules as strings)\n```python\nnums = [10, 20, 30, 40, 50]\nprint(nums[1:3])      # [20, 30]\nprint(nums[:3])         # [10, 20, 30]\nprint(nums[::-1])         # reversed\n```\n\n### List comprehension — Python's powerful one-liner for building lists\n```python\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)       # [2, 4, 6, ..., 20]\n```\n\n### Iterating over a list\n```python\nfor item in fruits:\n    print(item)\n\nfor index, item in enumerate(fruits):    # get both index and value\n    print(index, item)\n```\n      ",
        examples: [
          {
            title: "Basic list operations",
            code: "marks = [78, 65, 90, 55, 88]\nmarks.append(72)\nprint(marks)\nprint(\"Max:\", max(marks))\nprint(\"Min:\", min(marks))\nprint(\"Average:\", sum(marks)/len(marks))\nmarks.sort()\nprint(\"Sorted:\", marks)"
          },
          {
            title: "List comprehension",
            code: "squares = [x**2 for x in range(1, 6)]\nprint(squares)\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint(evens)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read 5 integers (one per line) into a list using a loop. Print the list.",
            starterCode: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\n",
            solution: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\nprint(nums)",
            expectedOutput: "[3, 1, 4, 1, 5]",
            inputs: [
              "3",
              "1",
              "4",
              "1",
              "5"
            ]
          },
          {
            level: "basic",
            question: "Given the list nums = [12, 45, 7, 89, 23], print the maximum and minimum values using max() and min().",
            starterCode: "nums = [12, 45, 7, 89, 23]\n",
            solution: "nums = [12, 45, 7, 89, 23]\nprint(max(nums))\nprint(min(nums))",
            expectedOutput: "89\n7"
          },
          {
            level: "intermediate",
            question: "Read 5 integers into a list. Print the list sorted in descending order.",
            starterCode: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\n",
            solution: "nums = []\nfor i in range(5):\n    nums.append(int(input()))\nnums.sort(reverse=True)\nprint(nums)",
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
            question: "Given a list nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], use a list comprehension to create and print a new list containing only the even numbers.",
            starterCode: "nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n",
            solution: "nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)",
            expectedOutput: "[2, 4, 6, 8, 10]"
          },
          {
            level: "advanced",
            question: "Read 6 integers into a list. Remove duplicates while preserving original order (don't use set() directly for the output order — build it manually), and print the resulting list.",
            starterCode: "nums = []\nfor i in range(6):\n    nums.append(int(input()))\n",
            solution: "nums = []\nfor i in range(6):\n    nums.append(int(input()))\nresult = []\nfor n in nums:\n    if n not in result:\n        result.append(n)\nprint(result)",
            expectedOutput: "[1, 2, 3, 4]",
            inputs: [
              "1",
              "2",
              "2",
              "3",
              "4",
              "1"
            ],
            hints: [
              "Build a new empty list",
              "Only append a number if it's not already in the new list"
            ]
          }
        ]
      },
      {
        id: "u3t3",
        title: "Tuples & Sets",
        notes: "\n### Tuples — like lists, but IMMUTABLE (cannot be changed after creation)\n```python\npoint = (10, 20)\nprint(point[0])     # 10\n# point[0] = 99     # ERROR! Tuples cannot be modified\n\na, b = point          # unpacking\nprint(a, b)              # 10 20\n```\n**Why use tuples?** When you want to guarantee data doesn't accidentally change (e.g., coordinates, RGB colors, database records) and they're slightly faster than lists.\n\n### Sets — unordered collections of UNIQUE elements\n```python\ns = {1, 2, 3, 3, 2, 1}\nprint(s)          # {1, 2, 3}  (duplicates automatically removed!)\n\ns.add(4)             # add an element\ns.remove(1)             # remove an element\nprint(3 in s)              # membership check -> True\n\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a | b)    # union -> {1,2,3,4}\nprint(a & b)      # intersection -> {2,3}\nprint(a - b)        # difference -> {1}\n```\n\n> 💡 **Practical use case:** Sets are the fastest way to remove duplicates from a list: `unique = list(set(my_list))`\n      ",
        examples: [
          {
            title: "Tuple unpacking",
            code: "student = (\"Ravi\", 21, 8.5)\nname, age, cgpa = student\nprint(f\"{name} is {age} years old with CGPA {cgpa}\")"
          },
          {
            title: "Set operations",
            code: "branch_a = {\"Ravi\", \"Priya\", \"Khadar\"}\nbranch_b = {\"Priya\", \"Suresh\", \"Khadar\"}\nprint(\"Both branches:\", branch_a & branch_b)\nprint(\"Either branch:\", branch_a | branch_b)\nprint(\"Only branch A:\", branch_a - branch_b)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create a tuple coords = (3, 4). Print the sum of its two elements.",
            starterCode: "coords = (3, 4)\n",
            solution: "coords = (3, 4)\nprint(coords[0] + coords[1])",
            expectedOutput: "7"
          },
          {
            level: "intermediate",
            question: "Read 7 integers into a list. Convert to a set to remove duplicates, then print the count of unique elements.",
            starterCode: "nums = []\nfor i in range(7):\n    nums.append(int(input()))\n",
            solution: "nums = []\nfor i in range(7):\n    nums.append(int(input()))\nunique = set(nums)\nprint(len(unique))",
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
            question: "Given two sets a = {1,2,3,4,5} and b = {4,5,6,7,8}, print the union, intersection, and difference (a-b) each on its own line, as sorted lists (use sorted() to make output predictable).",
            starterCode: "a = {1,2,3,4,5}\nb = {4,5,6,7,8}\n",
            solution: "a = {1,2,3,4,5}\nb = {4,5,6,7,8}\nprint(sorted(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))",
            expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8]\n[4, 5]\n[1, 2, 3]",
            hints: [
              "sorted() converts a set to an ordered list for consistent printing"
            ]
          }
        ]
      },
      {
        id: "u3t4",
        title: "Dictionaries",
        notes: "\n### Dictionaries — key-value pairs (like a real-world dictionary: word -> meaning)\n```python\nstudent = {\"name\": \"Ravi\", \"age\": 21, \"branch\": \"ECE\"}\nprint(student[\"name\"])         # 'Ravi'\nstudent[\"cgpa\"] = 8.5             # add a new key\nstudent[\"age\"] = 22                 # update existing key\nprint(student)\n```\n\n### Common dictionary methods\n```python\nprint(student.keys())       # dict_keys(['name', 'age', 'branch', 'cgpa'])\nprint(student.values())       # dict_values(['Ravi', 22, 'ECE', 8.5])\nprint(student.items())          # all key-value pairs\n\nif \"name\" in student:               # membership checks keys, not values\n    print(\"Found\")\n\nprint(student.get(\"phone\", \"N/A\"))    # safe access — won't crash if key missing\nstudent.pop(\"age\")                       # removes the key\n```\n\n### Iterating over a dictionary\n```python\nfor key, value in student.items():\n    print(key, \":\", value)\n```\n\n### Dictionary comprehension\n```python\nsquares = {x: x**2 for x in range(1, 6)}\nprint(squares)    # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n```\n\n> 💡 **Why dictionaries matter:** Almost all real-world JSON data (APIs, web apps, databases) maps directly to Python dictionaries — this is one of the most important data structures for any future software job.\n      ",
        examples: [
          {
            title: "Student record dictionary",
            code: "student = {\"name\": \"Lakshmi\", \"age\": 20, \"branch\": \"ECE\", \"cgpa\": 9.1}\nfor key, value in student.items():\n    print(f\"{key}: {value}\")"
          },
          {
            title: "Counting word frequency",
            code: "text = \"the quick brown fox the lazy dog the fox\"\nwords = text.split()\nfreq = {}\nfor word in words:\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create a dictionary student with keys 'name'='Ravi' and 'marks'=88. Print the value for 'marks'.",
            starterCode: "student = {\"name\": \"Ravi\", \"marks\": 88}\n",
            solution: "student = {\"name\": \"Ravi\", \"marks\": 88}\nprint(student[\"marks\"])",
            expectedOutput: "88"
          },
          {
            level: "intermediate",
            question: "Read 4 lines, each containing a word. Count the frequency of each word using a dictionary, then print the dictionary.",
            starterCode: "freq = {}\nfor i in range(4):\n    word = input()\n",
            solution: "freq = {}\nfor i in range(4):\n    word = input()\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)",
            expectedOutput: "{'apple': 2, 'banana': 1, 'mango': 1}",
            inputs: [
              "apple",
              "banana",
              "apple",
              "mango"
            ],
            hints: [
              "dict.get(key, 0) returns 0 if the key doesn't exist yet, avoiding a KeyError"
            ]
          },
          {
            level: "advanced",
            question: "Given marks = {'Ravi': 78, 'Priya': 92, 'Suresh': 65, 'Lakshmi': 88}, find and print the name of the student with the highest marks.",
            starterCode: "marks = {\"Ravi\": 78, \"Priya\": 92, \"Suresh\": 65, \"Lakshmi\": 88}\n",
            solution: "marks = {\"Ravi\": 78, \"Priya\": 92, \"Suresh\": 65, \"Lakshmi\": 88}\ntopper = max(marks, key=marks.get)\nprint(topper)",
            expectedOutput: "Priya",
            hints: [
              "max() with key=dict.get finds the key with the highest value"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "u4",
    title: "Functions",
    icon: "⚙️",
    desc: "Defining Functions, Parameters, Scope, Recursion, Lambda",
    topics: [
      {
        id: "u4t1",
        title: "Defining & Calling Functions",
        notes: "\n### Why functions?\nFunctions let you write a block of logic once and reuse it many times — avoiding repeated code (DRY: Don't Repeat Yourself), and making programs easier to read, test, and debug.\n\n```python\ndef greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Ravi\")     # call the function\ngreet(\"Priya\")\n```\n\n### return vs print\n- `print()` only displays something on screen — it does NOT give the value back to the program.\n- `return` sends a value back to wherever the function was called, so you can use it further.\n\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)     # result now holds 8\nprint(result)\nprint(add(10, 20))       # can also use the call directly\n```\n\n### Default parameter values\n```python\ndef greet(name, greeting=\"Hello\"):\n    print(f\"{greeting}, {name}!\")\n\ngreet(\"Ravi\")                  # uses default -> \"Hello, Ravi!\"\ngreet(\"Priya\", \"Good morning\")    # overrides default\n```\n\n### Keyword arguments\n```python\ndef student_info(name, age, branch):\n    print(f\"{name}, {age}, {branch}\")\n\nstudent_info(age=21, name=\"Ravi\", branch=\"ECE\")   # order doesn't matter with keywords\n```\n\n### Multiple return values\n```python\ndef min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([5, 2, 9, 1])\nprint(low, high)   # 1 9\n```\n      ",
        examples: [
          {
            title: "Function with return value",
            code: "def calculate_area(length, width):\n    return length * width\n\narea = calculate_area(5, 3)\nprint(f\"Area: {area}\")"
          },
          {
            title: "Function with default parameter",
            code: "def power(base, exponent=2):\n    return base ** exponent\n\nprint(power(5))         # uses default exponent=2 -> 25\nprint(power(2, 3))         # 8"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define a function 'square' that takes a number and returns its square. Read an integer from input, call the function, and print the result.",
            starterCode: "def square(n):\n    # write your code\n\nnum = int(input())\n",
            solution: "def square(n):\n    return n * n\n\nnum = int(input())\nprint(square(num))",
            expectedOutput: "49",
            inputs: [
              "7"
            ]
          },
          {
            level: "basic",
            question: "Define a function 'is_even' that takes a number and returns True if even, False otherwise. Read input, call it, and print the result.",
            starterCode: "def is_even(n):\n    # write your code\n\nnum = int(input())\n",
            solution: "def is_even(n):\n    return n % 2 == 0\n\nnum = int(input())\nprint(is_even(num))",
            expectedOutput: "True",
            inputs: [
              "10"
            ]
          },
          {
            level: "intermediate",
            question: "Define a function 'calculate_grade(marks)' that returns 'A' if marks>=90, 'B' if >=75, 'C' if >=60, else 'F'. Read marks from input and print the grade.",
            starterCode: "def calculate_grade(marks):\n    # write your code\n\nmarks = int(input())\n",
            solution: "def calculate_grade(marks):\n    if marks >= 90:\n        return \"A\"\n    elif marks >= 75:\n        return \"B\"\n    elif marks >= 60:\n        return \"C\"\n    else:\n        return \"F\"\n\nmarks = int(input())\nprint(calculate_grade(marks))",
            expectedOutput: "B",
            inputs: [
              "80"
            ]
          },
          {
            level: "advanced",
            question: "Define a function 'stats(numbers)' that takes a list and returns a tuple of (minimum, maximum, average). Use the list [12, 45, 7, 89, 23], call the function, and print all three values separated by spaces.",
            starterCode: "def stats(numbers):\n    # write your code, return (min, max, avg)\n\nnums = [12, 45, 7, 89, 23]\n",
            solution: "def stats(numbers):\n    return min(numbers), max(numbers), sum(numbers)/len(numbers)\n\nnums = [12, 45, 7, 89, 23]\nlow, high, avg = stats(nums)\nprint(low, high, avg)",
            expectedOutput: "7 89 35.2",
            hints: [
              "You can return multiple values as a tuple: return a, b, c",
              "Unpack them directly: a, b, c = function(...)"
            ]
          }
        ]
      },
      {
        id: "u4t2",
        title: "Variable Scope (Local vs Global)",
        notes: "\n### Local vs global variables\nA variable defined **inside** a function is **local** — it only exists inside that function. A variable defined **outside** any function is **global** — accessible everywhere.\n\n```python\nx = 10   # global variable\n\ndef show():\n    y = 5    # local variable, only exists inside show()\n    print(x, y)   # can READ the global x\n\nshow()\nprint(x)         # 10\n# print(y)       # ERROR! y doesn't exist outside the function\n```\n\n### Modifying a global variable inside a function\nBy default, assigning to a variable inside a function creates a NEW local variable, even if a global one has the same name. To actually modify the global, use `global`.\n\n```python\ncount = 0\n\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)   # 2\n```\n\n> ⚠️ **Best practice:** Avoid overusing global variables — prefer passing values in as parameters and getting results back via `return`. It makes code easier to test and debug. Use `global` sparingly, mainly for counters/accumulators when there's no cleaner option.\n      ",
        examples: [
          {
            title: "Local vs global scope demonstration",
            code: "total = 0  # global\n\ndef add_to_total(value):\n    global total\n    total += value\n\nadd_to_total(10)\nadd_to_total(20)\nprint(f\"Total: {total}\")"
          }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Create a global variable 'balance' = 1000. Define a function 'withdraw(amount)' that uses the global keyword to subtract amount from balance. Call withdraw(250), then print balance.",
            starterCode: "balance = 1000\n\ndef withdraw(amount):\n    # write your code\n",
            solution: "balance = 1000\n\ndef withdraw(amount):\n    global balance\n    balance -= amount\n\nwithdraw(250)\nprint(balance)",
            expectedOutput: "750"
          }
        ]
      },
      {
        id: "u4t3",
        title: "Recursion",
        notes: "\n### What is recursion?\nA function that **calls itself** to solve smaller versions of the same problem. Every recursive function needs:\n1. A **base case** — the condition where it stops calling itself\n2. A **recursive case** — where it calls itself with a smaller/simpler input\n\n```python\ndef factorial(n):\n    if n == 0 or n == 1:    # base case\n        return 1\n    return n * factorial(n - 1)   # recursive case\n\nprint(factorial(5))   # 5*4*3*2*1 = 120\n```\n\n**How it unfolds for factorial(4):**\n```\nfactorial(4) = 4 * factorial(3)\n             = 4 * (3 * factorial(2))\n             = 4 * (3 * (2 * factorial(1)))\n             = 4 * (3 * (2 * 1))\n             = 24\n```\n\n### Fibonacci with recursion\n```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nfor i in range(8):\n    print(fib(i), end=\" \")   # 0 1 1 2 3 5 8 13\n```\n\n> ⚠️ **Common mistake:** Forgetting the base case causes infinite recursion → `RecursionError: maximum recursion depth exceeded`. Always make sure your recursive calls move TOWARD the base case.\n\n> 💡 **When to use recursion vs loops:** Recursion is elegant for naturally recursive problems (factorial, Fibonacci, tree traversal, divide-and-conquer). For simple repetition, loops are usually more efficient and easier to read.\n      ",
        examples: [
          {
            title: "Recursive factorial",
            code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))"
          },
          {
            title: "Recursive sum of a list",
            code: "def recursive_sum(lst):\n    if len(lst) == 0:\n        return 0\n    return lst[0] + recursive_sum(lst[1:])\n\nprint(recursive_sum([1, 2, 3, 4, 5]))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define a recursive function 'factorial(n)'. Read n from input and print factorial(n).",
            starterCode: "def factorial(n):\n    # write your code\n\nn = int(input())\n",
            solution: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nprint(factorial(n))",
            expectedOutput: "120",
            inputs: [
              "5"
            ]
          },
          {
            level: "intermediate",
            question: "Define a recursive function 'fibonacci(n)' that returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1). Read n and print fibonacci(n).",
            starterCode: "def fibonacci(n):\n    # write your code\n\nn = int(input())\n",
            solution: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nn = int(input())\nprint(fibonacci(n))",
            expectedOutput: "21",
            inputs: [
              "8"
            ]
          },
          {
            level: "advanced",
            question: "Define a recursive function 'power(base, exp)' that calculates base^exp without using the ** operator (base case: exp==0 returns 1). Read base and exp, print the result.",
            starterCode: "def power(base, exp):\n    # write your code\n\nbase = int(input())\nexp = int(input())\n",
            solution: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nbase = int(input())\nexp = int(input())\nprint(power(base, exp))",
            expectedOutput: "32",
            inputs: [
              "2",
              "5"
            ],
            hints: [
              "base^exp = base * base^(exp-1)",
              "base^0 = 1 is your base case"
            ]
          }
        ]
      },
      {
        id: "u4t4",
        title: "Lambda Functions & Built-in Functional Tools",
        notes: "\n### Lambda — anonymous, one-line functions\n```python\nsquare = lambda x: x ** 2\nprint(square(5))    # 25\n\nadd = lambda a, b: a + b\nprint(add(3, 4))      # 7\n```\n\nLambdas are most useful when passed directly into another function, rather than stored:\n\n### map() — apply a function to every item in a list\n```python\nnums = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)   # [1, 4, 9, 16, 25]\n```\n\n### filter() — keep only items matching a condition\n```python\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)   # [2, 4, 6, 8, 10]\n```\n\n### sorted() with a custom key\n```python\nstudents = [(\"Ravi\", 78), (\"Priya\", 92), (\"Suresh\", 65)]\nsorted_by_marks = sorted(students, key=lambda s: s[1], reverse=True)\nprint(sorted_by_marks)   # [('Priya', 92), ('Ravi', 78), ('Suresh', 65)]\n```\n\n> 💡 **When to use lambda vs def:** Use lambda for short, throwaway logic passed into `sorted()`, `map()`, `filter()`. Use a regular `def` function for anything with multiple lines or that you'll reuse by name.\n      ",
        examples: [
          {
            title: "map and filter together",
            code: "nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsquared_evens = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))\nprint(squared_evens)"
          },
          {
            title: "Sorting a list of tuples by custom key",
            code: "students = [(\"Ravi\", 78), (\"Priya\", 92), (\"Suresh\", 65)]\ntopper_first = sorted(students, key=lambda s: s[1], reverse=True)\nfor name, marks in topper_first:\n    print(name, marks)"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Create a lambda function 'cube' that returns x cubed. Print cube(3).",
            starterCode: "cube = lambda x: # complete this\n",
            solution: "cube = lambda x: x ** 3\nprint(cube(3))",
            expectedOutput: "27"
          },
          {
            level: "intermediate",
            question: "Given nums = [1,2,3,4,5,6,7,8,9,10], use map() with a lambda to create a list where each number is doubled. Print the resulting list.",
            starterCode: "nums = [1,2,3,4,5,6,7,8,9,10]\n",
            solution: "nums = [1,2,3,4,5,6,7,8,9,10]\ndoubled = list(map(lambda x: x*2, nums))\nprint(doubled)",
            expectedOutput: "[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
          },
          {
            level: "advanced",
            question: "Given a list of student tuples: students = [('Ravi',78), ('Priya',92), ('Suresh',65), ('Lakshmi',88)], sort them by marks in descending order using sorted() with a lambda key, and print the sorted list.",
            starterCode: "students = [(\"Ravi\",78), (\"Priya\",92), (\"Suresh\",65), (\"Lakshmi\",88)]\n",
            solution: "students = [(\"Ravi\",78), (\"Priya\",92), (\"Suresh\",65), (\"Lakshmi\",88)]\nresult = sorted(students, key=lambda s: s[1], reverse=True)\nprint(result)",
            expectedOutput: "[('Priya', 92), ('Lakshmi', 88), ('Ravi', 78), ('Suresh', 65)]",
            hints: [
              "key=lambda s: s[1] tells sorted() to compare by the second element of each tuple"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "u5",
    title: "Object-Oriented Programming",
    icon: "🧩",
    desc: "Classes, Objects, Inheritance, Polymorphism, Encapsulation",
    topics: [
      {
        id: "u5t1",
        title: "Classes & Objects",
        notes: "\n### Why OOP?\nObject-Oriented Programming lets you model real-world things (a Student, a Car, a Bank Account) as **objects** that bundle together data (attributes) and behavior (methods). This is how almost all large real-world software is structured.\n\n```python\nclass Student:\n    def __init__(self, name, age):    # constructor - runs when object is created\n        self.name = name                 # self.name is an INSTANCE attribute\n        self.age = age\n\n    def display(self):                     # method - a function belonging to the class\n        print(f\"Name: {self.name}, Age: {self.age}\")\n\ns1 = Student(\"Ravi\", 20)     # creating an object (instance) of the class\ns2 = Student(\"Priya\", 21)\ns1.display()                    # Name: Ravi, Age: 20\ns2.display()                       # Name: Priya, Age: 21\n```\n\n### Understanding `self`\n`self` refers to the **specific object** the method is being called on. Every method in a class must take `self` as its first parameter (Python passes it automatically — you never type it when calling).\n\n### Class attributes vs instance attributes\n```python\nclass Student:\n    college = \"ALITS\"     # class attribute - SHARED by all objects\n\n    def __init__(self, name):\n        self.name = name    # instance attribute - UNIQUE to each object\n\ns1 = Student(\"Ravi\")\ns2 = Student(\"Priya\")\nprint(s1.college, s2.college)   # ALITS ALITS (shared)\nprint(s1.name, s2.name)            # Ravi Priya (different)\n```\n      ",
        examples: [
          {
            title: "Basic class with constructor and method",
            code: "class Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n\n    def area(self):\n        return self.length * self.width\n\n    def perimeter(self):\n        return 2 * (self.length + self.width)\n\nr = Rectangle(5, 3)\nprint(f\"Area: {r.area()}\")\nprint(f\"Perimeter: {r.perimeter()}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Define a class 'Circle' with __init__ taking radius, and a method 'area' that returns 3.14 * radius * radius. Create a Circle with radius 5 and print its area.",
            starterCode: "class Circle:\n    def __init__(self, radius):\n        # write your code\n\n    def area(self):\n        # write your code\n\nc = Circle(5)\n",
            solution: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14 * self.radius * self.radius\n\nc = Circle(5)\nprint(c.area())",
            expectedOutput: "78.5"
          },
          {
            level: "intermediate",
            question: "Define a class 'Student' with __init__ taking name and marks. Add a method 'get_grade' that returns 'Pass' if marks>=40 else 'Fail'. Create a Student('Ravi', 35) and print the grade.",
            starterCode: "class Student:\n    def __init__(self, name, marks):\n        # write your code\n\n    def get_grade(self):\n        # write your code\n\ns = Student(\"Ravi\", 35)\n",
            solution: "class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n\n    def get_grade(self):\n        return \"Pass\" if self.marks >= 40 else \"Fail\"\n\ns = Student(\"Ravi\", 35)\nprint(s.get_grade())",
            expectedOutput: "Fail"
          },
          {
            level: "advanced",
            question: "Define a class 'BankAccount' with __init__ taking an initial balance, methods 'deposit(amount)' and 'withdraw(amount)' (withdraw should not allow balance to go negative — print 'Insufficient funds' and do nothing if it would). Create an account with balance 1000, deposit 500, withdraw 2000 (should fail), withdraw 300, then print final balance.",
            starterCode: "class BankAccount:\n    def __init__(self, balance):\n        # write your code\n\n    def deposit(self, amount):\n        # write your code\n\n    def withdraw(self, amount):\n        # write your code\n\nacc = BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\n",
            solution: "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print(\"Insufficient funds\")\n        else:\n            self.balance -= amount\n\nacc = BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(2000)\nacc.withdraw(300)\nprint(acc.balance)",
            expectedOutput: "Insufficient funds\n1200"
          }
        ]
      },
      {
        id: "u5t2",
        title: "Inheritance",
        notes: "\n### Inheritance — a class can reuse and extend another class\n```python\nclass Animal:                    # parent / base class\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print(f\"{self.name} makes a sound\")\n\nclass Dog(Animal):                  # child / derived class - inherits from Animal\n    def speak(self):                   # method OVERRIDING - replaces parent's version\n        print(f\"{self.name} barks\")\n\na = Animal(\"Generic Animal\")\nd = Dog(\"Tommy\")\na.speak()     # Generic Animal makes a sound\nd.speak()        # Tommy barks (overridden version used)\n```\n\n### Using super() to call the parent's version\n```python\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)    # calls Animal's __init__\n        self.breed = breed\n\n    def speak(self):\n        super().speak()              # call parent's speak() too\n        print(f\"{self.name} (a {self.breed}) barks\")\n\nd = Dog(\"Tommy\", \"Labrador\")\nd.speak()\n```\n\n### Why inheritance matters\nIt avoids rewriting code: common behavior lives in the parent class, and child classes only add/change what's different. This models real hierarchies naturally — e.g., `Vehicle` → `Car`, `Bike`; `Employee` → `Manager`, `Developer`.\n      ",
        examples: [
          {
            title: "Basic inheritance with method override",
            code: "class Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side * self.side\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nshapes = [Square(4), Circle(3)]\nfor s in shapes:\n    print(f\"Area: {s.area()}\")"
          }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Define a base class 'Employee' with __init__(self, name, salary) and a method 'annual_salary' returning salary*12. Define a subclass 'Manager' that inherits Employee and adds a 'bonus' attribute in its own __init__ (use super()), overriding annual_salary to add the bonus. Create Manager('Ravi', 50000, 20000) and print annual_salary().",
            starterCode: "class Employee:\n    def __init__(self, name, salary):\n        # write your code\n\n    def annual_salary(self):\n        # write your code\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        # write your code using super()\n\n    def annual_salary(self):\n        # write your code\n\nm = Manager(\"Ravi\", 50000, 20000)\n",
            solution: "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def annual_salary(self):\n        return self.salary * 12\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n\n    def annual_salary(self):\n        return super().annual_salary() + self.bonus\n\nm = Manager(\"Ravi\", 50000, 20000)\nprint(m.annual_salary())",
            expectedOutput: "620000"
          }
        ]
      },
      {
        id: "u5t3",
        title: "Encapsulation & Polymorphism",
        notes: "\n### Encapsulation — restricting direct access to internal data\nPython uses naming conventions (not strict enforcement like Java's `private`):\n- `self.name` → public, accessible from anywhere\n- `self._name` → \"protected\" by convention (a hint: \"don't touch this from outside\")\n- `self.__name` → \"private\" — Python name-mangles it to make accidental access harder\n\n```python\nclass BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance      # private attribute\n\n    def get_balance(self):               # public method to safely READ private data\n        return self.__balance\n\n    def deposit(self, amount):              # public method to safely MODIFY private data\n        if amount > 0:\n            self.__balance += amount\n\nacc = BankAccount(1000)\nprint(acc.get_balance())     # 1000\n# print(acc.__balance)       # ERROR - can't access directly from outside\n```\n\n**Why encapsulate?** It protects data from being changed in invalid ways — e.g., you can ensure balance never gets set directly to a negative number, by only allowing changes through controlled methods.\n\n### Polymorphism — same method name, different behavior per class\n```python\nclass Cat:\n    def speak(self):\n        return \"Meow\"\n\nclass Dog:\n    def speak(self):\n        return \"Woof\"\n\nanimals = [Cat(), Dog()]\nfor a in animals:\n    print(a.speak())     # each object responds in its own way to the same call\n```\n\nThis is powerful because you can write code that works with ANY object that has a `.speak()` method, without caring exactly what type it is — this is called **duck typing** in Python (\"if it walks like a duck and quacks like a duck...\").\n      ",
        examples: [
          {
            title: "Encapsulation with private balance",
            code: "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance\n\n    def get_balance(self):\n        return self.__balance\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\nacc = BankAccount(500)\nacc.deposit(200)\nprint(acc.get_balance())"
          },
          {
            title: "Polymorphism across shape classes",
            code: "class Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Triangle:\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        return 0.5 * self.base * self.height\n\nshapes = [Square(4), Triangle(6, 3)]\nfor shape in shapes:\n    print(f\"{type(shape).__name__} area: {shape.area()}\")"
          }
        ],
        testCases: [
          {
            level: "intermediate",
            question: "Define a class 'Account' with a private attribute __pin set in __init__. Add a method 'verify_pin(self, pin)' returning True if it matches. Create Account(1234), then print verify_pin(1234) and verify_pin(9999).",
            starterCode: "class Account:\n    def __init__(self, pin):\n        # write your code\n\n    def verify_pin(self, pin):\n        # write your code\n\nacc = Account(1234)\n",
            solution: "class Account:\n    def __init__(self, pin):\n        self.__pin = pin\n\n    def verify_pin(self, pin):\n        return self.__pin == pin\n\nacc = Account(1234)\nprint(acc.verify_pin(1234))\nprint(acc.verify_pin(9999))",
            expectedOutput: "True\nFalse"
          },
          {
            level: "advanced",
            question: "Define three classes Circle, Square, Rectangle each with an 'area()' method (Circle takes radius, use 3.14; Square takes side; Rectangle takes length,width). Put one instance of each in a list and print each one's area using a single for loop (polymorphism).",
            starterCode: "class Circle:\n    def __init__(self, radius):\n        # write code\n    def area(self):\n        # write code\n\nclass Square:\n    def __init__(self, side):\n        # write code\n    def area(self):\n        # write code\n\nclass Rectangle:\n    def __init__(self, length, width):\n        # write code\n    def area(self):\n        # write code\n\nshapes = [Circle(2), Square(3), Rectangle(4, 5)]\n",
            solution: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nclass Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n    def area(self):\n        return self.length * self.width\n\nshapes = [Circle(2), Square(3), Rectangle(4, 5)]\nfor s in shapes:\n    print(s.area())",
            expectedOutput: "12.56\n9\n20"
          }
        ]
      }
    ]
  },
  {
    id: "u6",
    title: "Exceptions & File Handling",
    icon: "🛡️",
    desc: "try/except, raising exceptions, reading/writing files",
    topics: [
      {
        id: "u6t1",
        title: "Exception Handling",
        notes: "\n### Why handle exceptions?\nWithout handling, a runtime error **crashes your entire program**. Exception handling lets you catch the error and respond gracefully instead.\n\n```python\ntry:\n    num = int(input(\"Enter a number: \"))\n    result = 10 / num\n    print(result)\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept ValueError:\n    print(\"That's not a valid number!\")\n```\n\n### Common built-in exceptions\n| Exception | When it happens |\n|-----------|------------------|\n| `ZeroDivisionError` | Dividing by zero |\n| `ValueError` | Wrong value type, e.g. `int(\"abc\")` |\n| `TypeError` | Wrong type used in an operation, e.g. `\"5\" + 5` |\n| `IndexError` | List index out of range |\n| `KeyError` | Dictionary key doesn't exist |\n| `FileNotFoundError` | File doesn't exist when opening |\n\n### try / except / else / finally\n```python\ntry:\n    num = int(input())\n    result = 100 / num\nexcept ZeroDivisionError:\n    print(\"Division by zero\")\nexcept ValueError:\n    print(\"Invalid input\")\nelse:\n    print(f\"Result: {result}\")     # runs ONLY if no exception occurred\nfinally:\n    print(\"Execution complete\")      # ALWAYS runs, error or not (cleanup code)\n```\n\n### Catching any exception generically (use sparingly)\n```python\ntry:\n    risky_code()\nexcept Exception as e:\n    print(f\"An error occurred: {e}\")\n```\n\n### Raising your own exceptions\n```python\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError(\"Insufficient funds\")\n    return balance - amount\n\ntry:\n    withdraw(100, 500)\nexcept ValueError as e:\n    print(e)\n```\n      ",
        examples: [
          {
            title: "Safe division with exception handling",
            code: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return \"Error: Division by zero\"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))"
          },
          {
            title: "Validating user input with a loop and exceptions",
            code: "def get_valid_age():\n    while True:\n        try:\n            age = int(input(\"Enter age: \"))\n            if age < 0:\n                raise ValueError(\"Age cannot be negative\")\n            return age\n        except ValueError as e:\n            print(f\"Invalid input: {e}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Read two integers a and b. Try to divide a by b and print the result. If b is 0, catch the ZeroDivisionError and print 'Cannot divide by zero'.",
            starterCode: "a = int(input())\nb = int(input())\n",
            solution: "a = int(input())\nb = int(input())\ntry:\n    print(a / b)\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero\")",
            expectedOutput: "Cannot divide by zero",
            inputs: [
              "10",
              "0"
            ]
          },
          {
            level: "intermediate",
            question: "Read a string. Try to convert it to an integer and print 'Valid number: <n>'. If it fails (ValueError), print 'Invalid number'.",
            starterCode: "s = input()\n",
            solution: "s = input()\ntry:\n    n = int(s)\n    print(f\"Valid number: {n}\")\nexcept ValueError:\n    print(\"Invalid number\")",
            expectedOutput: "Invalid number",
            inputs: [
              "abc"
            ]
          },
          {
            level: "advanced",
            question: "Define a function 'safe_list_access(lst, index)' that returns lst[index], but catches IndexError and returns 'Index out of range' if it fails. Test with the list [1,2,3] and index 10, print the result.",
            starterCode: "def safe_list_access(lst, index):\n    # write your code\n\nlst = [1, 2, 3]\n",
            solution: "def safe_list_access(lst, index):\n    try:\n        return lst[index]\n    except IndexError:\n        return \"Index out of range\"\n\nlst = [1, 2, 3]\nprint(safe_list_access(lst, 10))",
            expectedOutput: "Index out of range"
          }
        ]
      },
      {
        id: "u6t2",
        title: "File Handling",
        notes: "\n### Opening and closing files\n```python\nf = open(\"data.txt\", \"w\")    # 'w' = write mode (creates/overwrites)\nf.write(\"Hello, file!\")\nf.close()                       # ALWAYS close to save changes properly\n```\n\n### The `with` statement (preferred — auto-closes the file)\n```python\nwith open(\"data.txt\", \"w\") as f:\n    f.write(\"Line 1\\n\")\n    f.write(\"Line 2\\n\")\n# file is automatically closed here, even if an error happens\n```\n\n### File modes\n| Mode | Meaning |\n|------|---------|\n| `\"r\"` | Read (default; file must exist) |\n| `\"w\"` | Write (creates new or overwrites existing) |\n| `\"a\"` | Append (adds to end without erasing) |\n| `\"r+\"` | Read and write |\n\n### Reading files\n```python\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()           # reads ENTIRE file as one string\n    print(content)\n\nwith open(\"data.txt\", \"r\") as f:\n    lines = f.readlines()          # reads as a LIST of lines\n    for line in lines:\n        print(line.strip())           # .strip() removes the trailing \\n\n\nwith open(\"data.txt\", \"r\") as f:\n    for line in f:                    # most memory-efficient way for big files\n        print(line.strip())\n```\n\n### Appending to a file\n```python\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"New log entry\\n\")\n```\n\n> 💡 **In this online practice environment**, the in-browser Python interpreter runs in a virtual file system — file operations work exactly as on a real computer, but files don't persist between separate program runs. This is exactly how file handling works on your own laptop/PC.\n      ",
        examples: [
          {
            title: "Writing and reading a file",
            code: "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"Python is fun\\n\")\n    f.write(\"File handling is easy\\n\")\n\nwith open(\"notes.txt\", \"r\") as f:\n    content = f.read()\n    print(content)"
          },
          {
            title: "Counting lines and words in a file",
            code: "with open(\"data.txt\", \"w\") as f:\n    f.write(\"Hello World\\nPython Programming\\nALITS College\\n\")\n\nwith open(\"data.txt\", \"r\") as f:\n    lines = f.readlines()\n    print(f\"Lines: {len(lines)}\")\n    total_words = sum(len(line.split()) for line in lines)\n    print(f\"Words: {total_words}\")"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Write the text 'Hello ALITS Students' to a file called 'greeting.txt', then read it back and print it.",
            starterCode: "",
            solution: "with open(\"greeting.txt\", \"w\") as f:\n    f.write(\"Hello ALITS Students\")\n\nwith open(\"greeting.txt\", \"r\") as f:\n    print(f.read())",
            expectedOutput: "Hello ALITS Students"
          },
          {
            level: "intermediate",
            question: "Write three lines 'Python\\nis\\nfun' to a file 'words.txt' (each word on its own line). Read the file back using readlines() and print the total number of lines.",
            starterCode: "",
            solution: "with open(\"words.txt\", \"w\") as f:\n    f.write(\"Python\\nis\\nfun\\n\")\n\nwith open(\"words.txt\", \"r\") as f:\n    lines = f.readlines()\n    print(len(lines))",
            expectedOutput: "3"
          },
          {
            level: "advanced",
            question: "Write the numbers 1 to 5 to a file 'numbers.txt', each on a new line. Then read the file back, convert each line to an integer, and print their sum.",
            starterCode: "",
            solution: "with open(\"numbers.txt\", \"w\") as f:\n    for i in range(1, 6):\n        f.write(f\"{i}\\n\")\n\ntotal = 0\nwith open(\"numbers.txt\", \"r\") as f:\n    for line in f:\n        total += int(line.strip())\nprint(total)",
            expectedOutput: "15",
            hints: [
              "strip() removes the newline character before converting to int"
            ]
          }
        ]
      }
    ]
  }
];

const PY_TOTAL_TOPICS = PY_CURRICULUM.reduce((s, u) => s + u.topics.length, 0);
const PY_TOTAL_TESTS = PY_CURRICULUM.reduce((s, u) => s + u.topics.reduce((s2, t) => s2 + (t.testCases?.length || 0), 0), 0);

// ─── LIGHTWEIGHT MARKDOWN RENDERER FOR NOTES ───────────────────────────────────
// Handles: ### headings, ```python code blocks, **bold**, `inline code`, > blockquotes,
// - bullet lists, | tables |. Purpose-built for this curriculum's notes content.
function PyNotesRenderer({ content }) {
  return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, parsePyBlocks(content.trim()));
}

function parsePyBlocks(text) {
  const lines = text.split("\n");
  const out = [];
  let i = 0, key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const codeLines = []; i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { codeLines.push(lines[i]); i++; }
      i++;
      out.push(React.createElement("pre", { key: key++, style: { background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13, padding: 14, borderRadius: 10, overflowX: "auto", lineHeight: 1.6, border: "1px solid rgba(255,255,255,0.06)", margin: 0 } }, codeLines.join("\n")));
      continue;
    }

    if (line.trim().startsWith("|")) {
      const tLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { tLines.push(lines[i]); i++; }
      out.push(renderPyTable(tLines, key++));
      continue;
    }

    if (line.trim().startsWith(">")) {
      const qLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { qLines.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      out.push(React.createElement("div", { key: key++, style: { background: "rgba(255,106,0,0.06)", borderLeft: "3px solid #FF6A00", padding: "10px 14px", borderRadius: "0 8px 8px 0", fontSize: 13, color: "rgba(255,255,255,0.7)" } },
        qLines.map((q, idx) => React.createElement("p", { key: idx, style: { margin: 0 } }, renderPyInline(q)))));
      continue;
    }

    if (line.startsWith("### ")) {
      out.push(React.createElement("h4", { key: key++, style: { fontSize: 15, fontWeight: 800, color: "#fff", margin: "6px 0 0" } }, renderPyInline(line.slice(4))));
      i++; continue;
    }
    if (line.startsWith("## ")) {
      out.push(React.createElement("h3", { key: key++, style: { fontSize: 17, fontWeight: 800, color: "#fff", margin: "6px 0 0" } }, renderPyInline(line.slice(3))));
      i++; continue;
    }

    if (line.trim().startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) { items.push(lines[i].trim().slice(2)); i++; }
      out.push(React.createElement("ul", { key: key++, style: { margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4, fontSize: 13.5, color: "rgba(255,255,255,0.7)" } },
        items.map((it, idx) => React.createElement("li", { key: idx }, renderPyInline(it)))));
      continue;
    }
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, "")); i++; }
      out.push(React.createElement("ol", { key: key++, style: { margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4, fontSize: 13.5, color: "rgba(255,255,255,0.7)" } },
        items.map((it, idx) => React.createElement("li", { key: idx }, renderPyInline(it)))));
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" && !isPyBlockStart(lines[i])) { paraLines.push(lines[i]); i++; }
    out.push(React.createElement("p", { key: key++, style: { fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, margin: 0 } }, renderPyInline(paraLines.join(" "))));
  }
  return out;
}

function isPyBlockStart(line) {
  const t = line.trim();
  return t.startsWith("```") || t.startsWith("|") || t.startsWith(">") || t.startsWith("### ") || t.startsWith("## ") || t.startsWith("- ") || /^\d+\.\s/.test(t);
}

function renderPyTable(tLines, key) {
  const rows = tLines.filter(l => !/^\|[\s\-:|]+\|$/.test(l.trim()));
  const cells = rows.map(r => r.split("|").slice(1, -1).map(c => c.trim()));
  const header = cells[0] || [];
  const body = cells.slice(1);

  const headerCells = header.map((h, i) => React.createElement(
    "th",
    { key: i, style: { textAlign: "left", padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", fontWeight: 700 } },
    renderPyInline(h)
  ));
  const headRow = React.createElement("tr", null, headerCells);
  const thead = React.createElement("thead", null, headRow);

  const bodyRows = body.map((row, ri) => {
    const tds = row.map((c, ci) => React.createElement(
      "td",
      { key: ci, style: { padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", fontFamily: "Menlo,Consolas,monospace", fontSize: 12 } },
      renderPyInline(c)
    ));
    return React.createElement("tr", { key: ri }, tds);
  });
  const tbody = React.createElement("tbody", null, bodyRows);

  const table = React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 } }, thead, tbody);
  return React.createElement("div", { key, style: { overflowX: "auto" } }, table);
}

function renderPyInline(text) {
  const parts = [];
  const pattern = /(\*\*.+?\*\*|`[^`]+?`)/g;
  let lastIndex = 0, match, key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(React.createElement("strong", { key: key++, style: { fontWeight: 800, color: "#fff" } }, token.slice(2, -2)));
    } else {
      parts.push(React.createElement("code", { key: key++, style: { background: "rgba(255,255,255,0.08)", color: "#ff9a5c", padding: "1px 6px", borderRadius: 5, fontFamily: "Menlo,Consolas,monospace", fontSize: "0.9em" } }, token.slice(1, -1)));
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
}

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

// ─── LIVE ACTIVITY SYNC ─────────────────────────────────────────────────────────
// Writes a throttled snapshot of what a student is doing to Firestore, so admins
// can see near-live activity without per-keystroke writes (cost + privacy tradeoff,
// see python_activity collection — one doc per active student session).
const PY_ACTIVITY_SYNC_MS = 4000; // throttle: at most one write per 4 seconds while typing
const PY_ACTIVITY_STALE_MS = 30000; // considered "inactive" after 30s of no updates

function usePyActivitySync(user, topicTitle, unitTitle, tcIndex, tcQuestion) {
  const lastSentRef = useRef(0);
  const pendingRef = useRef(null);
  const timerRef = useRef(null);

  const sync = useCallback((code, status) => {
    if (!user?.uid) return; // only track logged-in students
    const now = Date.now();
    const doWrite = () => {
      lastSentRef.current = Date.now();
      setDoc(doc(db, "python_activity", user.uid), {
        uid: user.uid,
        name: user.name || user.email || "Student",
        email: user.email || null,
        unitTitle: unitTitle || null,
        topicTitle: topicTitle || null,
        problemIndex: tcIndex,
        question: tcQuestion ? tcQuestion.slice(0, 140) : null,
        code: (code || "").slice(0, 4000), // cap size to keep doc small & cheap
        status: status || "typing", // typing | running | pass | fail
        updatedAt: serverTimestamp(),
      }, { merge: true }).catch(() => {});
    };

    if (now - lastSentRef.current >= PY_ACTIVITY_SYNC_MS) {
      doWrite();
    } else {
      // throttle: schedule a trailing write so the last keystrokes aren't lost
      pendingRef.current = { code, status };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (pendingRef.current) doWrite();
      }, PY_ACTIVITY_SYNC_MS - (now - lastSentRef.current));
    }
  }, [user, unitTitle, topicTitle, tcIndex, tcQuestion]);

  // Clean up on unmount: mark the student as no longer on this problem.
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return sync;
}

// ─── ADMIN: LIVE PYTHON ACTIVITY TAB ────────────────────────────────────────────
function PyActivityAdminTab() {
  const [activity, setActivity] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [expandedUid, setExpandedUid] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "python_activity"), orderBy("updatedAt", "desc"), limit(100));
    const unsub = onSnapshot(q, snap => {
      setActivity(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Tick every few seconds so "active just now" / "idle" labels stay fresh without a full reload.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 3000);
    return () => clearInterval(t);
  }, []);

  const isActive = (a) => {
    const t = a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : 0;
    return now - t < PY_ACTIVITY_STALE_MS;
  };

  const activeStudents = activity.filter(isActive);
  const recentStudents = activity.filter(a => !isActive(a));

  const statusBadge = (status) => {
    const map = {
      typing: { l: "✍️ Typing", c: "#3b82f6" },
      running: { l: "⏳ Running", c: "#f59e0b" },
      pass: { l: "✅ Passed", c: "#22c55e" },
      fail: { l: "✕ Failed", c: "#ef4444" },
    };
    return map[status] || map.typing;
  };

  const renderCard = (a, active) => {
    const sb = statusBadge(a.status);
    const t = a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : 0;
    const secsAgo = Math.max(0, Math.round((now - t) / 1000));
    const timeLabel = secsAgo < 5 ? "just now" : secsAgo < 60 ? `${secsAgo}s ago` : `${Math.round(secsAgo / 60)}m ago`;
    const open = expandedUid === a.uid;

    return (
      <div key={a.uid} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid", borderColor: active ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.08)", borderRadius: 14, padding: 16, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setExpandedUid(open ? null : a.uid)}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: active ? "#22c55e" : "#444", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14, flexShrink: 0, position: "relative" }}>
            {(a.name || "?").charAt(0).toUpperCase()}
            {active && <span style={{ position: "absolute", top: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #060608" }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#fff" }}>{a.name}</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {a.unitTitle ? `${a.unitTitle} → ${a.topicTitle}` : "Browsing course"}
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: sb.c, background: sb.c + "1a", padding: "3px 9px", borderRadius: 100, flexShrink: 0 }}>{sb.l}</span>
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", flexShrink: 0, minWidth: 56, textAlign: "right" }}>{timeLabel}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{open ? "▾" : "▸"}</span>
        </div>
        {open && (
          <div style={{ marginTop: 12 }}>
            {a.question && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>{a.question}</div>}
            <pre style={{ background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 12.5, padding: 12, borderRadius: 9, overflowX: "auto", margin: 0, maxHeight: 280, overflowY: "auto", border: "1px solid rgba(255,255,255,0.06)" }}>
              {a.code || "(no code yet)"}
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontWeight: 900, marginBottom: 4 }}>🐍 Python Activity</h3>
          <p style={{ color: "#888", fontSize: 12.5 }}>Updates every few seconds — not true keystroke-by-keystroke, to keep Firestore costs low.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#22c55e" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          {activeStudents.length} active now
        </div>
      </div>

      {activity.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          No student activity yet. This fills in as students start practicing in the Python course.
        </div>
      )}

      {activeStudents.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(34,197,94,0.8)", marginBottom: 10, letterSpacing: ".04em" }}>Active Now</div>
          {activeStudents.map(a => renderCard(a, true))}
        </div>
      )}

      {recentStudents.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: ".04em" }}>Recently Active</div>
          {recentStudents.slice(0, 20).map(a => renderCard(a, false))}
        </div>
      )}
    </div>
  );
}

// ─── PYTHON CODE EDITOR (one practice problem) — now syncs activity to Firestore ──
function PyCodeEditor({ tc, tcIndex, runPython, pyStatus, ensureLoaded, user, unitTitle, topicTitle }) {
  const [code, setCode] = useState(tc.starterCode || "");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const taRef = useRef(null);
  const syncActivity = usePyActivitySync(user, topicTitle, unitTitle, tcIndex, tc.question);

  useEffect(() => { setCode(tc.starterCode || ""); setOutput(null); setVerdict(null); setShowSolution(false); }, [tc]);

  const handleChange = (e) => {
    const next = e.target.value;
    setCode(next);
    syncActivity(next, "typing");
  };

  const handleRun = async () => {
    setRunning(true); setOutput(null); setVerdict(null);
    syncActivity(code, "running");
    try {
      if (pyStatus !== "ready") await ensureLoaded();
      const result = await runPython(code, tc.inputs || []);
      setOutput(result);
      let finalStatus = "fail";
      if (result.ok && tc.expectedOutput !== undefined) {
        const actual = result.stdout.replace(/\n+$/, "");
        const expected = tc.expectedOutput.replace(/\n+$/, "");
        const passed = actual === expected;
        setVerdict(passed ? "pass" : "fail");
        finalStatus = passed ? "pass" : "fail";
      } else if (!result.ok) {
        finalStatus = "fail";
      }
      syncActivity(code, finalStatus);
    } catch (e) {
      setOutput({ ok: false, error: e?.message || "Failed to run" });
      syncActivity(code, "fail");
    } finally { setRunning(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = taRef.current;
      const start = el.selectionStart, end = el.selectionEnd;
      const next = code.slice(0, start) + "    " + code.slice(end);
      setCode(next);
      syncActivity(next, "typing");
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
        ref={taRef} value={code} onChange={handleChange} onKeyDown={handleKeyDown}
        spellCheck={false} autoCapitalize="off" autoCorrect="off"
        style={{ width: "100%", minHeight: 110, background: "#08080a", color: "#e5e5e5", fontFamily: "Menlo,Consolas,monospace", fontSize: 13.5, padding: 16, border: "none", outline: "none", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
        placeholder="# Write your Python code here"
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", flexWrap: "wrap" }}>
        <button onClick={handleRun} disabled={running} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: "none", background: running ? "#15803d" : "linear-gradient(90deg,#22c55e,#16a34a)", color: "#fff", fontWeight: 800, fontSize: 12.5, cursor: running ? "default" : "pointer" }}>
          {running ? (pyStatus !== "ready" ? "Loading Python…" : "Running…") : "▶ Run Code"}
        </button>
        <button onClick={() => { setCode(tc.starterCode || ""); setOutput(null); setVerdict(null); }} style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>↺ Reset</button>
        {tc.hints && tc.hints.length > 0 && (
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>💡 {tc.hints[0]}</span>
        )}
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

// ─── PYTHON COURSE — TOPIC VIEW (uses markdown renderer for full notes) ────────
function PythonTopicView({ topic, unitTitle, runner, user }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 60px" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{unitTitle}</div>
      <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, color: "#fff" }}>{topic.title}</h2>
      <div style={{ marginBottom: 28, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
        <PyNotesRenderer content={topic.notes} />
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
            <PyCodeEditor key={i} tc={tc} tcIndex={i} runPython={runner.runPython} pyStatus={runner.pyStatus} ensureLoaded={runner.ensureLoaded} user={user} unitTitle={unitTitle} topicTitle={topic.title} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PYTHON COURSE — SIDEBAR + SHELL ────────────────────────────────────────────
function PythonCourseShell({ onExitToAdmin, isAdmin, user }) {
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
          <PythonTopicView topic={activeTopic} unitTitle={activeTopic.unitTitle} runner={runner} user={user} />
        ) : (
          <PythonCourseHome onStart={() => goTopic(allTopics[0].id)} />
        )}
      </main>
    </div>
  );
}

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
