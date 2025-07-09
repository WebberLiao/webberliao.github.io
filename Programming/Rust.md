<link rel="stylesheet" type="text/css" href="../styles.css">

# Feature
It is used to build everything from web servers to game engines.
It is known for being very fast, and is similar to C and C++ in language.
It requires less memory compared to many other languages

# Installation
``` Shell
# Install
curl https://sh.rustup.rs -sSf | sh 

# Check version
rustc --version

# Create new project
# cargo is the Rust Package Management and also be a formal compiler
# It would create a reposotory named "project_name" with some files:
# /Cargo.toml : Project settings
# /src/main.rs : Main Rust file
cargo new {project_name}

# Build and run the project
cd {project_name}
cargo run
```

# Basic
``` Rust
// It is one line comment
/*
It 
is
multi-line
comments
*/
fn main() /* It is the beginning of every Rust program. */
{
    println!("Hello World!\n"); /* It is a macro, used to output/print text to the screen. */

    /* {} would be the variable */
    println!("Hi! I am {}, I'm {} years old \n", name, age); 
}
```

# Variable
``` Rust
/* Variables are belong to block scope. */
let name = "Webber"; // Declare a const string variable.
let mut age = 30; // Declare a mutable integer variable.

/* 
    Declaere a constant must have the type.
    Or it would build an error, result: "error: missing type for `const` item".
    And setup the name with uppercase is good for entire coding style.
    */
const BIRTH_YEAR: i32 = 1990;
```

# Data Type
## Boolean
``` Rust
/* boolean */
// Only takes the values true or false
let my_bool: bool = true;

```

## Integer & Float
``` Rust
/* integer */
/* Without decimals */
/* Other data types of number: 
    N-bit signed integer
    signed:     i8, i16, i32, i64, i128, isize(as the platform's pointer size)
    unsigned:   u8, u16, u32, u64, u128, usize(as the platform's pointer size)

    float:      f32, f64
*/
let my_num: i32 = 5;
let my_test: i32 = 5.99; // It would build an error, result: "error[E0308]: mismatched types"

/* float */
// Contains one or more decimals
let my_double: f64 = 5.99;

```

## Char
``` Rust
/* char */
// Must be surrounded by single quotes
let my_letter: char = 'D';
let my_d_char: char = "D"; // It would build an error, result: "error[E0308]: mismatched types"
let my_empty: char = ''; // It would build an error, result: "error: empty character literal"
let my_emoji: char = '😊'; // It can save an emoji
```

## String & &str
There are two main types of strings in Rust:
- &str - is called "string slices", and is used for fixed text like "Hello"
- String - used when you need a string that can change
``` Rust
/* &str */
// &str values must be surrounded by double quotes
let my_text: &str = "Hello";
let my_test: &str = 'C'; // It would build an error, result: "error[E0308]: mismatched types"

/* String */
let mut str1 = "Hello".to_string();

/* Length of String &str */
let str1 = "Hello";
str1.len(); // 5
```

### Clone
``` Rust

```

### Combine String & &str & char
String struct has push_str() and push()
Being combined variable should be String type

``` Rust
// Combine String using push_str()
let mut str1 = "Hello".to_string();
let str2 = " World".to_string();        // Method 1
// let str2: &str = " World";           // Method 2
// let str2 = " World";                 // Method 3
str1.push_str(str2); // "Hello World"

// Combine Char using push()
let mut str1 = "Hello".to_string();
let chr1 = '!';
str1.push(chr1);  // "Hello!"

// Combine using format!()
let mut str1 = "Hello";
let str2 = "World".to_string();
let chr1 = '!';
let new_str = format!("{} {}{}", str1, str2, chr1);

```

# Operator
## Arithmetic Operators
``` Rust
let add = 10 + 3;       // 13
let sub = 10 - 3;       // 7
let mul = 10 * 3;       // 30
let div = 10 / 3;       // 3
let div: f64 = 10 / 3;  // error[E0308]: mismatched types
let div = 10.0 / 3.0;   // 3.3333333
let div = 10.0 / 3;     // error[E0277]: cannot divide `{float}` by `{integer}`
let div = 10 / 3.0;     // error[E0277]: cannot divide `{integer}` by `{float}`
let div = 10 / 0;       // error: this operation will panic at runtime
let rem = 10 % 3;       // 1
```

## Assignment Operators
``` Rust
  let mut x = 10;   // 10
  x += 5;           // 15
  x -= 2;           // 13
  x *= 2;           // 26
  x /= 3;           // 8
  x %= 4;           // 0
```

## Comparison Operators
``` Rust
  let a = 5;
  let b = 10;
  let eq = {a == b};    // false
  let ne = {a != b};    // true
  let le = {a < b};     // true
  let gr = {a > b};     // false
```

## Logical Operators
``` Rust
  let t = true;
  let f = false;
  let and_val = t && f; // false
  let or_val = t || f;  // true
  let not_val = !t;     // false
```

# Data Container

## Array
Its indexes starts with 0, like other programming languages.
Fixed-size.
``` Rust
let mut array = ["item1", "item2", "item3"];
/* Get specific item in the array */
array[2]; // "item3"

/* Get size of the array */
array.len();

/* Loop through the array */
for item in array {
    println!("{}", item);
}

/* Print entire array */
println!("{:?}", array);
```

## Vector
It is a resizable array.
``` Rust
let mut vect = vec!["item1", "item2"];

/* Get specific item in the array */
vect[1]; // "item2"

/* Add new element to the vector */
vect.push("item3");

/* Remove the last element of the vector */
vect.pop();

/* Add an item at a specified index, but the index cannot larger than the size of the vector */
vect.insert(3, "item4");

/* Remove the specific element of the vector */
vect.remove(2); // It would remove "item3"

/* Get size of the vector */
vect.len();


/* Loop through the array */
for item in &vect {
    println!("{}", item);
}

/* Print entire array */
println!("{:?}", vect);
```

## Tuple
It can hold multiple values of different types. It is useful when grouping different types together.
``` Rust
/* Declare a tuple */
let mut person = ("Webber", 30, true);
println!("Name: {}", person.0);
println!("Age: {}", person.1);
println!("Is active: {}", person.2); 

/* Unpacking */
let (name, age, active) = person;

/* Return multiple values */
fn get_user() -> (String, i32, bool) {
  return ("Webber".to_string(), 30, true);
}

fn main() {
  let user = get_user();
  println!("User: {} ({} years old)", user.0, user.1);
} 
```

## HashMap
It stores key-value pairs. It lets you look up a value using a key.
But you have to import first.
``` Rust
/* Import HashMap */
use std::collections::HashMap;

/*
    Create a HashMap
    let mut HashMapName = HashMap::new();
*/
let mut capitalCities = HashMap::new();
/* 
    Add keys and values
    HashMapName.insert(key, value);
*/
capitalCities.insert("France", "Paris");
capitalCities.insert("Japan", "Tokyo");
capitalCities.insert("Norway", "Oslo");

/* Update value */
capitalCities.insert("Japan", "Kyoto");

/* Remove pair */
capitalCities.remove("Japan");

/* Print specific value by key */
println!("Capital of Norway is {}", capitalCities["Norway"]);

/* Print all of pairs */
println!("{:?}", capitalCities);

/* Loop through the HashMap */
for (country, city) in &capitalCities {
  println!("The capital of {} is {}.", country, city);
} 
```

## Struct
It is a custom data structure that lets you group related values together.
``` Rust
/* Declare the struct */
struct Student {
    id: i32
    name: String,
    age: u32,
}

/* Create a struct */
let student1 = Student {
    id: 1,
    name: "John".to_string(),
    age: 18,
};

/* Access and print the values */
println!("Name: {}", user.name);
println!("Age: {}", user.age);

/* Update the value */
user.age = 19;
```


## Enum
Short for "enumeration".
``` Rust
/* Declare an enum */
enum Direction {
    North,
    South,
    East,
    West,
}

/* Decalre a variable with enum type */
let my_direction = Direction::North;

/* Using to check the enum value */
match my_direction {
    Direction::Up
         => println!("Going up"),
    Direction::Down
         => println!("Going down"),
    Direction::Left
         => println!("Going left"),
    Direction::Right
         => println!("Going right"),
  }
```

### Enum with data
``` Rust
enum LoginStatus {
    Success(String),
    Error(String),
}

fn login (user: String, password: String) -> LoginStatus {
	if password == "10026109".to_string() {
    	LoginStatus::Success("Login success".to_string())
    }
    else {
    	LoginStatus::Error("Incorrect password".to_string())
    }
}

fn main() {
	let user_name = "Webber".to_string();
    let user_password = 10026108.to_string();
    let result = login(user_name, user_password);
    match result {
        LoginStatus::Success(message) => println!("Success: {}", message),
        LoginStatus::Error(message) => println!("Error: {}", message),
    }
}
```

# Control Structure

## If Condition
``` Rust
if a == 1 {

}
else if  a == 2 {

}
else {

}

/* 
    It can also be the expression
    But it must includes else, this ensures the result always has a value. 
*/
let result = if a == 1 {

}
else {

}
```

## Match Condition
``` Rust
/* 
    _ is used to specify some code to run if there is no match (like default in other languages). 
    Each branch starts with a value, followed by => and a result.
*/
match day {
    1 => println!("Monday"),
    2 => println!("Tuesday"),
    3 => println!("Wednesday"),
    4 => println!("Thursday"),
    5 => println!("Friday"),
    6 => println!("Saturday"),
    7 => println!("Sunday"),
    _ => println!("Invalid day."),
}

/* Multiple mathes */
match day {
    1 | 2 | 3 | 4 | 5 => println!("Weekday"),
    6 | 7 => println!("Weekend"),
    _ => println!("Invalid day"),
}

/* 
    It can also be the expression
    But it must includes _, this ensures the result always has a value.
*/
let result = match day {
    1 | 2 | 3 | 4 | 5 => println!("Weekday"),
    6 | 7 => println!("Weekend"),
    _ => println!("Invalid day"),
}
```

## Loop Condition
### For Loop
``` Rust
/* 1 to N-1 */
for i in 1..N {
  
}
/* 1 to N */
for i in 1..=N {
  if i == 3 {
    continue; // skip 3
  }
  if i == 5 {
    break; // stop before printing 5
  }
}
```

### Loop
``` Rust
let mut count = 1;

/* If you want to end the program, press Ctrl + C */
loop {
    if count == 10 {
        break;
    }
    count += 1;
};

/* You can also stop the loop and return the value */
let result = loop {
    if count == 10 {
        break count;
    }
    count += 1;
};
```

### While Loop
``` Rust
let mut count = 1;
while count <= 10 {
    count += 1;
}

while count <= 10 {
    if { num % 4 == 0 } {
        count += 1;
        continue;
    }
    if count == 8 {
        break;
    }
    count += 1;
}

/* You can also stop the loop and return the value */
let result = loop {
    if count == 3 {
        break count;
    }
    count += 1;
};
```


# Function
``` Rust
/* Basic */
fn function_name() {
  
}

function_name();
```
``` Rust
/* Parameter */
fn function_name(name: &str, age: i32) {
  println!("{} is {} years old!", name, age);
}

function_name("Webber", 30);
```
``` Rust
/* Return Value */
fn function_name(a: i32, b: i32) -> i32 {
  return a + b;
}

let sum = function_name(20, 30); // 50

/* 
    You can omit the return keyword. Just write the value on the last line of the function, without a semicolon
    But I do not like this expression.
*/
fn function_name(a: i32, b: i32) -> i32 {
  a + b
}
```

## Traits
``` Rust
trait Drawable { fn draw(&self); }
```

# Other
## Ownership
Numbers, characters and booleans are copied, not moved.
But &str and String would be moved.

``` Rust
/* Using number as the sample */
let a = 30;
let b = a;
println!("{}", b); // 30
println!("{}", a); // 30

/* Using &str as the sample */
let a &str = "30";
let b = a;
println!("{}", b); // "30"
println!("{}", a); // "30"

/* Using string as the sample */
let a = 30.to_string();
let b = a;
println!("{}", b); // "30"
// println!("{}", a); // It would occur the error, a no longer owns the value

let a = 30.to_string();
let b = a.clone(); // Use the .clone() method to make a copy of the data
println!("{}", b); // "30"
println!("{}", a); // "30"
```

## Borrowing (also mean Reference)
``` Rust
let mut name = String::from("John");
let name_ref = &mut name;
name_ref.push_str(" Doe");

// println!("{}", name); // It would occur error, it mutable borrow to name_ref .
println!("{}", name_ref); // John Doe 
println!("{}", name); // John Doe 
```
## Other
```Rust
let chr1 = '['.to_string();
let chr2 = ']'.to_string();
let combined = [chr1, chr2].concat(); // []
let str1 = "(";
let str2 = ")";
let combined = [str1, str2].concat(); // ()
let string1 = "<".to_string();
let string2 = ">".to_string();
let combined = [string1, string2].concat(); // <>


```

# Reference

