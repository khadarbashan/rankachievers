const PY_CURRICULUM = [
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
    hours: 10,
    co: "CO1",
    topics: [
      {
        id: "u1t1",
        title: "Computational Thinking & Your First Program",
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
        title: "Variables, Data Types & Type Conversion",
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
        title: "Input & Output Statements",
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
        title: "Expressions & Operators",
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
    title: "Decision Making & Looping",
    icon: "🔀",
    desc: "if/elif/else, while, for, break/continue",
    syllabus: [
      "Decision control: Boolean expressions; if, if-else, if-elif-else, nested if; ternary operator",
      "Looping: while loop, for loop, nested loops, infinite loops, iteration techniques",
      "Loop control: break, continue, pass; else with loops; practical problem solving"
    ],
    hours: 10,
    co: "CO2",
    topics: [
      {
        id: "u2t1",
        title: "if / if-else / if-elif-else",
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
    title: "Strings & Data Structures",
    icon: "📦",
    desc: "Strings, Lists, Tuples, Sets",
    syllabus: [
      "Strings: representation, indexing, slicing, operations, built-in functions and methods",
      "Lists: creation, indexing, slicing, operations, functions, methods, nested lists",
      "Tuples: creation, operations, packing and unpacking; Sets: creation, union, intersection, difference, frozen sets"
    ],
    hours: 10,
    co: "CO3",
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
      "Functions: built-in and user-defined; definition, calling, arguments (positional, keyword, default, variable-length); scope (local and global)",
      "Recursion: recursive functions — factorial, Fibonacci; lambda (anonymous) functions; applications in problem solving"
    ],
    hours: 10,
    co: "CO4",
    topics: [
      {
        id: "u4t1",
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
      },
      {
        id: "u4t2",
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
        id: "u4t3",
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
        id: "u4t4",
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
        id: "u4t5",
        title: "Lambda Functions",
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
    title: "File Handling, Exceptions & OOP",
    icon: "🛡️",
    desc: "Modules, File Handling, Exceptions, OOP Basics",
    syllabus: [
      "Modules and packages: creating and importing modules; standard library modules",
      "File handling: opening, reading, writing, closing files; file modes; text files; CSV and Excel files",
      "Exception handling: syntax/runtime/logical errors; try, except, finally; raising exceptions",
      "OOP basics: classes, objects, attributes, methods, constructors, self keyword"
    ],
    hours: 10,
    co: "CO5",
    topics: [
      {
        id: "u5t1",
        title: "Modules & Packages",
        notes: "### What is a Module?\nA module is a Python file containing functions, variables, and classes that you can reuse in other programs. Instead of writing everything from scratch, you import and use it.\n\n```python\n# math_utils.py\ndef square(n):\n    return n * n\n\ndef cube(n):\n    return n * n * n\n```\n\n```python\n# main.py\nimport math_utils\nprint(math_utils.square(4))   # 16\nprint(math_utils.cube(3))       # 27\n\nfrom math_utils import square    # import just one function\nprint(square(5))                   # 25\n\nimport math_utils as mu            # alias\nprint(mu.cube(2))                    # 8\n```\n\n### Standard Library Modules\nPython ships with hundreds of built-in modules — no install needed.\n\n```python\nimport math\nprint(math.sqrt(16))     # 4.0\nprint(math.pi)             # 3.14159...\nprint(math.factorial(5))     # 120\n\nimport random\nprint(random.randint(1, 6))    # random dice roll\nprint(random.choice([\"A\",\"B\",\"C\"]))   # pick one\n\nimport os\nprint(os.getcwd())               # current directory\nprint(os.listdir(\".\"))             # files in current dir\n\nimport datetime\ntoday = datetime.date.today()\nprint(today)                          # e.g. 2025-07-15\n```\n\n> 💡 **Packages** are folders of modules. `pip install package_name` installs third-party packages (like numpy, pandas) from the internet.",
        examples: [
          {
            title: "Using the math module",
            code: "import math\nprint(math.sqrt(144))\nprint(math.pi)\nprint(math.factorial(6))"
          },
          {
            title: "Using random module",
            code: "import random\nfor _ in range(5):\n    print(random.randint(1, 10))"
          }
        ],
        testCases: [
          {
            level: "basic",
            question: "Import the math module. Print the floor value of 7.8 using math.floor() and the ceiling of 7.2 using math.ceil().",
            starterCode: "import math\n",
            solution: "import math\nprint(math.floor(7.8))\nprint(math.ceil(7.2))",
            expectedOutput: "7\n8"
          },
          {
            level: "intermediate",
            question: "Using the random module, set the seed to 42 with random.seed(42), then print random.randint(1,100).",
            starterCode: "import random\n",
            solution: "import random\nrandom.seed(42)\nprint(random.randint(1,100))",
            expectedOutput: "82"
          }
        ]
      },
      {
        id: "u5t2",
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
      },
      {
        id: "u5t3",
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
        id: "u5t4",
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
        id: "u5t5",
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
        id: "u5t6",
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
  }
];
