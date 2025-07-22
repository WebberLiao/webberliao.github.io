<link rel="stylesheet" type="text/css" href="../styles.css">

# C

## IPv4, Number to String
``` C
#include <winsock.h>

long ip_addr_i = inet_addr("192.168.0.1");
char *ip_addr_s = inet_ntoa(ip_addr_i);

```

## Char Array
``` C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define LEN 10

// Initialize with a value
char str[LEN] = "Hello";

printf("Before clearing(%d): '%s(%d)'\n", sizeof(str), str, strlen(str));
// Result: Before clearing(10): 'Hello(5)'

// Set all bytes to 0 to clear the contents
memset(str, 0, sizeof(str));

// It whould print an empty string
printf("After clearing(%d): '%s(%d)'\n", sizeof(str), str, strlen(str));
// Result: After clearing(10): '(0)'

// Use str again
snprintf(str, sizeof(str), "World"); // Assign a new value
printf("After assigning new value(%d): '%s(%d)'\n", sizeof(str), str, strlen(str));
// Result: After assigning new value(10): 'World(5)'
```

## Tokenize a string
``` C
char str[256] = {0};
const char *delim = " ,.!"; // Delimiters: space, comma, period, exclamation mark
char *token;

snprintf(str, sizeof(str), "Hello, world! Welcome to C programming.");

// Get the first token
token = strtok(str, delim);

// Continue to get tokens until strtok returns NULL
while (token != NULL) {
    printf("Token: %s\n", token);
    token = strtok(NULL, delim); // Get the next token
}
```


