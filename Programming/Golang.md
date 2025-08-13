<link rel="stylesheet" type="text/css" href="styles.css">

# Feature
A cross-platform, open source programming language.
Go's syntax is similar to C++.
## Used For
- Web development (server-side)
- Developing network-based programs
- Developing cross-platform enterprise applications
- Cloud-native development

# Command
``` Shell
# Check Go version 
go version

# Execute the application
go run <File Name>.go

# Build to be the executable program
go build <File Name>.go


```

# Basic
``` GO
/* Every program is part of a package. */
package main

/* Import files(packages) */
import ("fmt")

// Single line comment

/* Multiple 
lines 
comments
*/

```
## Print & Println & Printf
``` Go
import ("fmt")

// A function made available from the fmt package.
fmt.Println("Something you want to show")

var i, j string = "Hello","World"
var num, num2 int = 100, 101
fmt.Print(i) 
fmt.Print(j) // HelloWorld

fmt.Print(num, i, ", ", j, "\n") // 100Hello, World

/* It would inserts a space between the arguments if neither are strings */
fmt.Print(num, num2, "\n") // 100 101
```

# Variable
1. Variable names are case-sensitive.
  age, Age and AGE are three different variables
2. A variable name cannot start with a digit  
3. A variable name can only contain alpha-numeric characters and underscores
4. A variable name cannot contain spaces.
5. The variable name cannot be any Go keywords

## Iinitialized
``` Go
/* All variables are initialized. */
var a string    // ""
var b int       // 0
var c bool      // false
var d float32   // 0
```

## Declare methods
``` Go
/* 1. Declare and initialize in one line. (Suggest!) */
var iVal int = 100

/* 2. Use short initialization inside a function. */
func () {
    iVal := 100
}

/* 3. Declare and initialize inside a function. */
var iVal int
func () {
    iVal = 100
}
```

## Other declaration situation
``` Go
/* Multiple Variable Declaration */
var a, b, c, d int = 1, 3, 5, 7

/* You can declare different types of variables on the same line */
var a, b = 1, "Hello"
c, d := 2, "World!"

var (
    a = 1
    b = "Hello"
    c = 2
    d = "World!"
)
```

## Constant
Constant names are usually written in uppercase letters
``` Go
/* The variabl is unchangeable and read-only. */
const RESULT_TRUE bool = true

const (
    MAX_LENGTH = 256
    STATUS_ERROR = "ERROR"
    STATUS_INFO = "INFO"
)
```

# Data Type
## int
``` Go
int iVal = 123
int iVal2 = -123
```

## float32
``` Go
float32 fVal = 19.99
float32 fVal2 = -19.99
```

## string
``` Go
string strVal = "Hello"
```

## bool
``` Go
bool bVal = true
bool bVal2 = false
```

# Operator
``` Go

```

# Data Container
``` Go

```

# Control Structure
``` Go

```

# Function
``` Go
/* The left curly bracket '{' cannot come at the start of a line. */
func main()
{ // It woule occur error
  fmt.Println("Hello World!")
}

func main() { // Compilation successful
  fmt.Println("Hello World!")
}
```

# Other

# Reference
