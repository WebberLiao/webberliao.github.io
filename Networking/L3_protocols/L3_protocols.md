<link rel="stylesheet" type="text/css" href="styles.css">

# DNS
## mDNS
Multicast DNS. It is a zero-configuration service, using essentially the same programming interfaces, packet formats and operating semantics as unicast Domain Name System (DNS).
- IPv4 address: 224.0.0.251
- IPv6 address: ff02::fb
- UDP port: 5353
- IPv4 MAC address: 01:00:5E:00:00:FB
- IPv6 address: 33:33:00:00:00:FB

### Queries
| Field | Description | Length bits |
| --- | --- | --- |
| QNAME | Name of the node to which the query pertains | Variable |
| QTYPE | The type of the query | 16 |
| UNICAST-RESPONSE | Boolean flag indicating whether a unicast-response is desired. | 1 |
| QCLASS | Class code | 15 |


### Resource Records
| Field | Description | Length bits |
| --- | --- | --- |
| RRNAME | Name of the node to which the record pertains | Variable |
| RRTYPE | The type of the Resource Record | 16 |
| CACHE-FLUSH | Boolean flag indicating whether outdated cached records should be purged. | 1 |
| RRCLASS | Class code, 1 a.k.a. "IN" for the Internet and IP networks | 15 |
| TTL | Time interval (in seconds) that the RR should be cached | 32 |
| RDLENGTH | Integer representing the length (in octets) of the RDATA field | 16 |
| RDATA | Resource data; internal structure varies by RRTYPE | Variable |

## dnsmasq
It is a lightweight DNS forwarder and DHCP server designed for small networks. It is commonly used in home routers and embedded systems due to its simplicity and efficiency.
It also can serve files via TFTP, useful for network booting.
- DNS Resolution:
    When a device on the network requests a domain name, dnsmasq checks its local cache. If the name is not cached, it forwards the request to an upstream DNS server (e.g., Google DNS, OpenDNS) and caches the response for future queries.
- DHCP Functionality:
    When a device connects to the network, it sends a DHCP request. dnsmasq responds with an IP address from its configured pool, along with other network configuration parameters (e.g., subnet mask, gateway, DNS servers).
- Configuration:
    dnsmasq can be configured through a configuration file (e.g., /etc/dnsmasq.conf) or through the Unified Configuration Interface (UCI) in OpenWrt.
``` Shell
# dnsmasq configuration
# cat /etc/config/dhcp
config dnsmasq
    option domainneeded '1'
    option boguspriv '1'
    option filterwin2k '0'
    option localise_queries '1'
    option rebind_protection '1'
    option rebind_localhost '1'
    option local '/lan/'
    option domain 'lan'
    option expandhosts '1'
    option nonegcache '0'
    option cachesize '1000'
    option authoritative '1'
    option readethers '1'
    option leasefile '/tmp/dhcp.leases'
    option resolvfile '/tmp/resolv.conf.d/resolv.conf.auto'
    option nonwildcard '1'
    option localservice '1'
    option ednspacket_max '1232'
    option filter_aaaa '0'
    option filter_a '0'

# static IP
# cat /etc/config/dhcp
config host
    option name 'nas'
    list mac '11:22:33:44:55:66'
    option ip '192.168.1.123'
    option leasetime 'infinite'

# dns configuration
# cat /etc/hosts
127.0.0.1 localhost

::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

# DHCP
## Option 43
Option 43 is a user-defined option, indicating vendor-specific information.
A device that supports Option 43 is used to connect to different terminals such as IP phones and APs.
When a DHCP server receives a DHCP request message with parameter 43 encapsulated in Option 55, 
it encapsulates Option 43 in a reply message and sends the message to the DHCP client.


## odhcpd
It is a DHCPv6 and DHCP server for IPv4 and IPv6 networks, primarily used in embedded systems and routers. It is part of the OpenWrt project, which is a Linux-based operating system designed for networking devices. Here’s a detailed overview of odhcpd, including its features, configuration, and usage.
It can be configured using the Unified Configuration Interface (UCI), making it easier to manage settings in OpenWrt.
And it provides logging capabilities to monitor DHCP requests and leases, which can be useful for troubleshooting.
It is typically configured through the /etc/config/dhcp file in OpenWrt.
``` Shell
# /etc/config/dhcp
config dhcp 'lan'
    option interface 'lan'
    option start '100'
    option limit '150'
    option leasetime '12h'
    option dhcpv4 'server'
    option dhcpv6 'server'
    option ra 'server'
    option ra_slaac '1'
    list ra_flags 'managed-config'
    list ra_flags 'other-config'
    option force '1'

config dhcp 'wan'
    option interface 'wan'
    option ignore '1'

# Commands
# Check the status of odhcpd
/etc/init.d/odhcpd status

# Start odhcpd
/etc/init.d/odhcpd start

# Stop odhcpd
/etc/init.d/odhcpd stop

# Restart odhcpd
/etc/init.d/odhcpd restart
```
