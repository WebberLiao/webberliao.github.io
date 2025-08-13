<link rel="stylesheet" type="text/css" href="../styles.css">

# Other
- Single Underscore (_identifier):
    Generally used for internal or private identifiers. It is acceptable to use in your own code, but it is a good practice to limit its use to avoid confusion.
- Double Underscore (__identifier):
    Reserved for the implementation. Avoid using these in your own code to prevent conflicts with compiler or library identifiers.
- Double Underscore Before and After (\_\_identifier\_\_):
    Also reserved for the implementation. These should not be used in user-defined identifiers.

# IPv4, Number to String
``` C
#include <winsock.h>

long ip_addr_i = inet_addr("192.168.0.1");
char *ip_addr_s = inet_ntoa(ip_addr_i);

```

# Char Array
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

# Structure
## Default Value
``` C
#define MAX_MAC_STRING 17
#define MAX_IPV4_STRING 15

#define DEFAULT_CONFIG {  \
    .device = "br-lan",  \
    .proto = "static",  \
    .ip_addr = "192.168.1.1",  \
    .netmask = "192.168.1.254",  \
    .dns = "168.95.1.1"  \
}
typedef struct LanIP
{
    int status;
    char device[MAX_MAC_STRING+1];
    char proto[MAX_IPV4_STRING+1];
    char ip_addr[MAX_IPV4_STRING+1];
    char netmask[MAX_IPV4_STRING+1];
    char dns[MAX_IPV4_STRING+1];
} tLanIP;

int main() {
	tLanIP lanip = DEFAULT_CONFIG;
}
```

## Nested Structure
``` C
typedef struct {
    char street[100];
    char city[50];
    char country[50];
} Address;

typedef struct {
    char name[50];
    int age;
    Address home_address;  // Nested structure
} Student;

int main() {
	Student student = {
        "Alice", 
        22, 
        {"123 Main St", "New York", "USA"}
    };
    printf("Student: %s, Age: %d, City: %s\n", 
           student.name, student.age, student.home_address.city);
}
```

## Dynamic
``` C
typedef struct {
    char *first_name;
    char *last_name;
    int age;
} DynamicPerson;

int main() {
    DynamicPerson *dp = malloc(sizeof(DynamicPerson));
    dp->first_name = strdup("Bob");
    dp->last_name = strdup("Johnson");
    dp->age = 35;

    printf("Dynamic Person: %s %s, Age: %d\n", 
           dp->first_name, dp->last_name, *dp.age);
}
```

## Function Pointer
``` C
typedef struct {
    char name[50];
    int (*call_func)(int base_salary);
} StructFunc;

// Bonus calculation function
int function_be_called(int base_salary) {
    return base_salary * 0.1;  // 10% bonus
}

int main() {
    StructFunc funcStruc;
    strcpy(funcStruc.name, "Senior Manager");
    funcStruc.call_func = function_be_called;
    
    int base_salary = 100000;
    printf("Manager Bonus: %d\n", 
           funcStruc.call_func(base_salary));
}
```

## Union
允許在同一記憶體位置儲存不同的資料型別.
所有成員共享同一記憶體空間, 記憶體大小等於最大成員的大小, 同一時間只能使用一個成員.
常使用於需要節省記憶體的嵌入式系統
``` C
typedef union Data {
    int i;
    float f;
    char str[20];
} ;

int main() {
    union Data data;
    data.i = 10;     // using integer
    printf("data: %d, %p\n", data.i, &(data.i)); // data: 10, 0x7ffebd88a250
    data.f = 3.14;   // using float
    printf("data: %f, %p\n", data.f, &(data.f)); // data: 3.140000, 0x7ffebd88a250
    memcpy(data.str, "Data", sizeof(data));   // using string
    printf("data: %s %p\n", data.str, &(data.str)); // data: Data 0x7ffebd88a250
    }
```

# Tokenize a string
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



# Typedef
``` C
typedef int (*MathOperation)(int, int);
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

// Being argument
int calculate(MathOperation op, int x, int y) {
    return op(x, y);
}

int main() {
    // Declare
    MathOperation operation;

    // Point to add function
    operation = add;
    int sum1 = operation(5, 3);  // sum1 = 8

    // Point to sub function
    operation = subtract;
    int diff1 = operation(5, 3);  // diff1 = 2

    int sum2 = calculate(add, 5, 3);       // sum2 = 8
    int diff2 = calculate(subtract, 5, 3);  // diff2 = 2

    return 0;
}
```


# Useful Utility
``` C
/* Transfer to be uppercase */
int toUpperCase(char* str, char* result) {
	if (str == NULL) return 0; // Fail
    for (int i = 0; str[i]; i++) {
        str[i] = toupper(str[i]);
    }
    return 1;
}

/* Transfer to be lowercase */
int toLowerCase(char* str, char* result) {
	if (str == NULL) return 0;
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
    return 1;
}

/* Reverse */
int reverseString(char* str, char* result) {
	if (str == NULL) return 0;
    int length = strlen(str);
    int i = 0;
    while (i < length) {
        result[i] = str[length - i - 1];
        i++;
    }
    return 1;
}
```

# 