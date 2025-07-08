<link rel="stylesheet" type="text/css" href="styles.css">

# UCI 

## Configs
- ddns
- dhcp
    - dhcp.@dnsmasq[0]=dnsmasq
        - dhcp.@dnsmasq[0].domainneeded='1'
        - dhcp.@dnsmasq[0].boguspriv='1'
        - dhcp.@dnsmasq[0].filterwin2k='0'
        - dhcp.@dnsmasq[0].localise_queries='1'
        - dhcp.@dnsmasq[0].rebind_protection='1'
        - dhcp.@dnsmasq[0].rebind_localhost='1'
        - dhcp.@dnsmasq[0].local='/lan/'
        - dhcp.@dnsmasq[0].domain='lan'
        - dhcp.@dnsmasq[0].leasefile='/tmp/dhcp.leases'
    - dhcp.lan=dhcp
        - dhcp.lan.interface='lan'
        - dhcp.lan.start='1'
        - dhcp.lan.limit='10'
        - dhcp.lan.leasetime='1h'
        - dhcp.lan.dhcpv4='server'
        - dhcp.lan.dhcpv6='server'
        - dhcp.lan.ra='server'
        - dhcp.lan.ra_slaac='1'
        - dhcp.lan.ra_flags='managed-config' 'other-config'
        - dhcp.lan.force='1'
- dhcrelay
- dhcrelay 
- dropbear 
- firewall 
- lldpd
    - lldpd.config=lldpd
        - lldpd.config.enable_cdp='1'
        - lldpd.config.enable_fdp='1'
        - lldpd.config.enable_sonmp='1'
        - lldpd.config.enable_edp='1'
        - lldpd.config.lldp_class='4'
        - lldpd.config.lldp_location='2:FR:6:Commercial Rd:3:Roseville:19:4'
        - lldpd.config.interface='loopback' 'lan'
- network
    - network.loopback=interface
        - network.loopback.device='lo'
        - network.loopback.proto='static'
        - network.loopback.ipaddr='127.0.0.1'
        - network.loopback.netmask='255.0.0.0'
    - network.globals=globals
        - network.globals.ula_prefix='fdbf:58e3:785b::/48'
    - network.@device[0]=device
        - network.@device[0].name='br-lan'
        - network.@device[0].type='bridge'
        - network.@device[0].ports='eth1'
    - network.lan=interface
        - network.lan.device='br-lan'
        - network.lan.proto='static'
        - network.lan.ipaddr='192.168.1.1'
        - network.lan.netmask='255.255.255.0'
        - network.lan.ip6assign='60'
        - network.lan.multicast_querier='0'
        - network.lan.igmp_snooping='0'
        - network.lan.ifname='eth1'
        - network.lan.dns='8.8.8.8'
        - network.lan.force_link='1'
    - network.@switch[0]=switch
        - network.@switch[0].name='switch0'
        - network.@switch[0].reset='1'
        - network.@switch[0].enable_vlan='1'
    - network.wan=interface
        - network.wan.ifname='eth0'
        - network.wan.device='eth0'
        - network.wan.proto='dhcp'
- qcacfg80211.config=qcacfg80211
    - qcacfg80211.config.enable='1'
- rstp.global=rstp
    - rstp.global.enable='0'
    - rstp.global.autoMode='1'
- system
    - system.@system[0]=system
        - system.@system[0].hostname
        - system.@system[0].timezone='UTC'
    - system.ntp=timeserver
        - system.ntp.enabled='1'
        - system.ntp.enable_server='0'
        - system.ntp.server='0.openwrt.pool.ntp.org' '1.openwrt.pool.ntp.org' '2.openwrt.pool.ntp.org' '3.openwrt.pool.ntp.org'
    - system.@rngd[0]=rngd
        - system.@rngd[0].enabled='1'
        - system.@rngd[0].device='/dev/hwrng'
- wireless.wifi0=wifi-device
    - wireless.wifi0=wifi-device
        - wireless.wifi0.type='qcawificfg80211'
        - wireless.wifi0.channel='auto'
        - wireless.wifi0.macaddr
        - wireless.wifi0.hwmode='11axg'
        - wireless.wifi0.disabled='1'
    - wireless.@wifi-iface[0]=wifi-iface
        - wireless.@wifi-iface[0].device='wifi0'
        - wireless.@wifi-iface[0].network='lan'
        - wireless.@wifi-iface[0].mode='ap'
        - wireless.@wifi-iface[0].ssid='OpenWrt'
        - wireless.@wifi-iface[0].encryption='none'
    - wireless.wifi1=wifi-device
        - wireless.wifi1.type='qcawificfg80211'
        - wireless.wifi1.channel='auto'
        - wireless.wifi1.macaddr
        - wireless.wifi1.hwmode='11axa'
        - wireless.wifi1.disabled='1'
    - wireless.@wifi-iface[1]=wifi-iface
        - wireless.@wifi-iface[1].device='wifi1'
        - wireless.@wifi-iface[1].network='lan'
        - wireless.@wifi-iface[1].mode='ap'
        - wireless.@wifi-iface[1].ssid
        - wireless.@wifi-iface[1].encryption='none' 
- wsplcd
    - wsplcd.config=wsplcd
        - wsplcd.config.WPAGetValueRetryCount
        - wsplcd.config.MaxRenewRetry



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
