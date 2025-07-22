# State Machines
- States:  
    Distinct conditions or situations in which a system can exist.
- Transitions:  
    Rules that dictate how the system moves from one state to another, often triggered by events or conditions.
- Events:  
    Inputs or occurrences that can cause a transition between states.
- Actions:  
    Operations that occur as a result of entering a state or during a transition.

---

## Example in C
``` C
#include <stdio.h>

// Define port states
typedef enum {
    BLOCKING,
    LISTENING,
    LEARNING,
    FORWARDING,
    DISABLED
} PortState;

// Define events
typedef enum {
    RECEIVE_BPDU, // Bridge Protocol Data Unit
    TIMEOUT,
    ADMIN_DISABLE,
    PORT_ACTIVE
} Event;

// Function prototypes
void handle_event(PortState *state, Event event);

int main() {
    PortState port_state = BLOCKING; // Initial state

    // Simulate events
    handle_event(&port_state, RECEIVE_BPDU); // Receive BPDU
    handle_event(&port_state, TIMEOUT);       // Timeout
    handle_event(&port_state, PORT_ACTIVE);   // Port becomes active
    handle_event(&port_state, ADMIN_DISABLE);  // Admin disable

    return 0;
}

void handle_event(PortState *state, Event event) {
    switch (*state) {
        case BLOCKING:
            if (event == RECEIVE_BPDU) {
                printf("Port is now Listening.\n");
                *state = LISTENING; // Transition to LISTENING
            }
            break;

        case LISTENING:
            if (event == TIMEOUT) {
                printf("Port is now Learning.\n");
                *state = LEARNING; // Transition to LEARNING
            }
            break;

        case LEARNING:
            if (event == PORT_ACTIVE) {
                printf("Port is now Forwarding.\n");
                *state = FORWARDING; // Transition to FORWARDING
            }
            break;

        case FORWARDING:
            if (event == ADMIN_DISABLE) {
                printf("Port is now Disabled.\n");
                *state = DISABLED; // Transition to DISABLED
            }
            break;

        case DISABLED:
            printf("Port is Disabled. No transitions possible.\n");
            break;

        default:
            printf("Unknown state.\n");
            break;
    }
}
```

---

# Callback Function

## Example in C
``` C
/* Define the callback function type */
typedef void (*CallbackFunction)(int);

/* Implement the callback function */
void my_callback(int value) {
    printf("Callback called with value: %d\n", value);
}

/* Function that accept the callback */
void perform_action(CallbackFunction callback) {
    for (int i = 0; i < 5; i++) {
        // Simulate some action
        printf("Performing action %d...\n", i);
        
        // Call the callback function
        callback(i);
    }
}

/* Invoke the function with callback */
int main() {
    // Call perform_action and pass my_callback as the callback function
    perform_action(my_callback);
    return 0;
}

```

---

# ---
