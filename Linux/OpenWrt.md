<link rel="stylesheet" type="text/css" href="styles.css">

# UCI 
## Usage commands
``` shell
commit     [<config>]
add        <config> <section-type>
add_list   <config>.<section>.<option>=<string>
del_list   <config>.<section>.<option>=<string>
show       [<config>[.<section>[.<option>]]]
get        <config>.<section>[.<option>]
set        <config>.<section>[.<option>]=<value>
delete     <config>[.<section>[[.<option>][=<id>]]]
rename     <config>.<section>[.<option>]=<name>
revert     <config>[.<section>[.<option>]]
reorder    <config>.<section>=<position>
```

## UCI Show Commands
``` shell
uci show # Show all configs that uci can update
uci show network # Show network config
uci show network.lan # Show lan config
uci show network.wan # Show wan config
uci show network.@device[0] # Show br-lan config
uci show dhcp # Show dhcp config
uci show dhcp.lan # Show dhcp lan config
uci show dhcp.@dnsmasq[0] # Show dnsmasq config
uci show lldpd # Show lldp config
uci show firewall # Show firewall config

# E.g.
Config Name: network
Section Name: 'loopback', 'globals', 'lan', 'wan', @device[index], @switch[index]
Section Type: 'interface', 'globals' # This is optional
Option Name: 'device', 'proto', 'ipaddr', 'netmask', 'ports', 'ifname'
```

## Codes
``` C
enum uci_type {
	UCI_TYPE_UNSPEC = 0,
	UCI_TYPE_DELTA = 1,
	UCI_TYPE_PACKAGE = 2,
	UCI_TYPE_SECTION = 3,
	UCI_TYPE_OPTION = 4,
	UCI_TYPE_PATH = 5,
	UCI_TYPE_BACKEND = 6,
	UCI_TYPE_ITEM = 7,
	UCI_TYPE_HOOK = 8,
};

enum uci_option_type {
	UCI_TYPE_STRING = 0,
	UCI_TYPE_LIST = 1,
};

struct uci_list
{
	struct uci_list *next;
	struct uci_list *prev;
};

struct uci_context
{
	/* list of config packages */
	struct uci_list root;

	/* parser context, use for error handling only */
	struct uci_parse_context *pctx;

	/* uci runtime flags */
	enum uci_flags flags;

	char *confdir;
	char *savedir;

	/* search path for delta files */
	struct uci_list delta_path;
};

struct uci_package
{
	struct uci_element e;
	struct uci_list sections;
	struct uci_context *ctx;
	char *path;

	int n_section;
};

struct uci_section
{
	struct uci_element e;
	struct uci_list options;
	struct uci_package *package;
	bool anonymous;
	char *type;
};

struct uci_option
{
	struct uci_element e;
	struct uci_section *section;
	enum uci_option_type type;
	union {
		struct uci_list list;
		char *string;
	} v;
};

struct uci_element
{
	struct uci_list list;
	enum uci_type type;
	char *name;
};

struct uci_ptr
{
	struct uci_package *p;
	struct uci_section *s;
	struct uci_option *o;
	struct uci_element *last;
};

#include <uci.h>
#include <stdio.h>
#include <string.h>

void print_section_options(struct uci_context *ctx, struct uci_section *section) {
    struct uci_option *option;

    // Iterate through options in the section
    uci_foreach_option(option, section) {
        printf("Option: %s = %s\n", option->e.name, option->type == UCI_TYPE_STRING ? option->v.string : "N/A");
    }
}

int main() {
    struct uci_context *ctx;
    struct uci_section *section;
    struct uci_option *option;
    struct uci_ptr ptr;
    struct uci_element *element;
    int ret;

    // Initialize the UCI context
    ctx = uci_alloc_context();
    if (!ctx) {
        fprintf(stderr, "Failed to allocate UCI context\n");
        return 1;
    }

    // uci_lookup_ptr(ctx, &ptr, "config_name.section_name.option_name", true);
    // (e.g., network)
    uci_lookup_ptr(ctx, &ptr, "network", true);
    if (ptr.p == NULL) {
        fprintf(stderr, "Configuration not found\n");
        uci_free_context(ctx);
        return 1;
    }
    printf("Configuration: %s\n", ptr.p->name); // Config Name

    // (e.g., network.lan)
    // It would point to uci_section
    uci_lookup_ptr(ctx, &ptr, "network.lan", true);
    if (ptr.p == NULL) {
        fprintf(stderr, "Section not found\n");
        uci_free_context(ctx);
        return 1;
    }
    section = uci_to_section(ptr.p);
    printf("Section: %s\n", section->name); // Section Name

    // (e.g., network.lan.dns)
    // It would point to uci_option
    uci_lookup_ptr(ctx, &ptr, "network.lan.ipaddr", true);
    if (ptr.p == NULL) {
        fprintf(stderr, "Option not found\n");
        uci_free_context(ctx);
        return 1;
    }
    printf("LAN IP Address: %s\n", ptr.value); // Option Value

    // (e.g., network.lan.dns)
    // It would point to uci_option
    uci_lookup_ptr(ctx, &ptr, "network.lan.dns", true);
    if (ptr.p == NULL) {
        fprintf(stderr, "Option not found\n");
        uci_free_context(ctx);
        return 1;
    }
    option = ptr.p; 
    if (option->type == UCI_TYPE_LIST) {
        // Iterate through the list elements using the uci_element structure
        uci_foreach_element(element, &option->v.list) {
            // Each element is a uci_option, so we can access its value
            struct uci_option *list_option = uci_to_option(element);
            printf("DNS Server %d: %s\n", ++count, list_option->v.string);
        }
    }
    else {
        printf("The option is not a list.\n");
    }

    // Add list
    uci_add_list(ctx, ptr);

    // Save the changed
    ret = uci_set(ctx, &ptr);
    if (ret != UCI_OK) {
        fprintf(stderr, "Failed to set the changed: %s\n", uci_strerror(ret));
        uci_free_context(ctx);
        return 1;
    }

    // Commit changed
    uci_commit(ctx, &ptr.p, true);

    // Clean up
    uci_free_context(ctx);

    return 0;
}

```

## Useful Links
- **[Creating packages]("https://openwrt.org/docs/guide-developer/packages")**

