<link rel="stylesheet" type="text/css" href="styles.css">

# mosquitto

## Struct
``` C
struct mosquitto_message{
	int mid;
	char *topic;
	void *payload;
	int payloadlen;
	int qos;
	bool retain;
};
```

## Functions
``` C
/* Init */
int mosquitto_lib_init(void)
// It would return MOSQ_ERR_SUCCESS 

/* Clean up */
int mosquitto_lib_cleanup（void）
// It would return MOSQ_ERR_SUCCESS 

/* Clean up */
struct mosquitto *mosquitto_new(const char * id, bool clean_session, void * obj)
// E.g. Create a new mosq with random id
struct mosquitto *mosq = mosquitto_new(NULL, true, NULL);
if (mosq == NULL) {
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Destroy */
void mosquitto_destroy(struct mosquitto * mosq)

/* Connect Callback */
// While agent publish CONNACK message
void mosquitto_connect_callback_set(struct mosquitto * mosq, void (*on_connect)(struct mosquitto *mosq, void *obj, int rc))

void on_connect(struct mosquitto *mosq, void *userdata, int result) {
    if (result == 0) { // Success
        ...
    }
    else {
        printf("%d\r\n", result); // Return error code
    }

}

/* Disconnect Callback  */
// While agent publish DISCONNECT message
void mosquitto_disconnect_callback_set(struct mosquitto *mosq,
    void (*on_disconnect)( struct mosquitto *mosq,void *obj, int rc))

/* Message Callback */
// Received the publish message
void mosquitto_message_callback_set(struct mosquitto * mosq, 
    void (*on_message)(struct mosquitto *, void *, const struct mosquitto_message *))

void on_message(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *msg) {
    cJSON *json = cJSON_Parse(msg->payload);
    cJSON *item = cJSON_GetObjectItem(json, "item");
    ...
}

/* Connect */
int mosquitto_connect(struct mosquitto * mosq, const char * host, int port, int keepalive)
// E.g. Trying to connect
#define DEFAULT_HOST "localhost"
#define DEFAULT_PORT "1883"
#define DEFAULT_KEEPALIVE 60
int ret = mosquitto_connect(mosq, DEFAULT_HOST, DEFAULT_PORT, DEFAULT_KEEPALIVE);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Disconnect */
int mosquitto_disconnect(struct mosquitto * mosq)
// E.g. Trying to disconnect
int ret = mosquitto_disconnect(mosq);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Publish */
int mosquitto_publish(struct mosquitto * mosq, 
    int * mid, const char * topic, int payloadlen, const void * payload, int qos, bool retain)
// E.g. Trying to publish
#define TOPIC_NETWORK_CONFIG_UPDATE "network/config/update"
cJSON *data = cJSON_CreateObject();
char *topic = TOPIC_NETWORK_CONFIG_UPDATE;
char *msg = cJSON_PrintUnformatted(data);
int ret = mosquitto_publish(mosq, NULL, topic, strlen(msg), msg, 0, false);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Subscribe Topic */
int mosquitto_subscribe(struct mosquitto * mosq, int * mid, const char * sub, int qos)
// E.g. Trying to subscribe
#define TOPIC_NETWORK_CONFIG_UPDATE "network/config/update"
int ret = mosquitto_subscribe(mosq, NULL, TOPIC_NETWORK_CONFIG_UPDATE, 0);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Loop */
int mosquitto_loop_forever(struct mosquitto * mosq, int timeout, int max_packets)
/* 
    If timeout is 0, it would return immediately.
    If timeout is less than 0, it would set default value (1000ms).
*/
// E.g. Trying to start a loop
int ret = mosquitto_loop_forever(mosq, -1, 1);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

/* Stop Loop */
int mosquitto_loop_stop(struct mosquitto * mosq, bool force)
/*
    If force is true, cancel the process.
    If force is false, must use mosquitto_disconnect() first.
*/
// E.g. Trying to disconnect
int ret = mosquitto_loop_stop(mosq, true);
if (ret != MOSQ_ERR_SUCCESS) { // Failed
    printf("[ERROR] (%d): %s\r\n", errno, strerror(errno));
}

```


## Reference
[**Formal Link**]("https://mosquitto.org/api/files/mosquitto-h.html")