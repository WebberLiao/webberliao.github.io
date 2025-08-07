<link rel="stylesheet" type="text/css" href="../../styles.css">

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

## BIND
Berkeley Internet Name Domain

### Install BIND9
``` Shell
sudo apt install bind9 bind9utils bind9-doc -y

```

### Config & Execute
1. Config 
   ``` Shell
   sudo vi /etc/bind/named.conf.local
   ```
1. Create zone with a domain 
   ``` Shell
   zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
    };
   ```
1. Create zone file 
   ``` Shell
   sudo cp /etc/bind/db.local /etc/bind/db.example.com
   ```
1. Setup the zone file (Sample) 
   ``` Shell  
   $TTL    604800
    @       IN      SOA     ns.example.com. admin.example.com. (
                            2               ; Serial
                            604800          ; Refresh
                            86400           ; Retry
                            2419200         ; Expire
                            604800 )        ; Negative Cache TTL
    ;
    @       IN      NS      ns.example.com.
    @       IN      A       192.168.1.10   ; Your server's IP address
    ns      IN      A       192.168.1.10   ; Your server's IP address
    www     IN      A       192.168.1.10   ; Your server's IP address
   ```
1. Check Configuration syntax
   ``` Shell
   sudo named-checkconf
   ```
1. Start and enable BIND9  
   ``` Shell
   sudo systemctl start bind9
    sudo systemctl enable bind9
   ```
1. Configure firewall  
   ``` Shell
   ufw allow 53
   ```
1. Install dnsutils to test the DNS server
   ``` Shell
   sudo apt install dnsutils -y
   ```
1. Test by command as below
   ``` Shell
   dig @localhost example.com
   ```
1. Config client to use the DNS server
   ``` Shell
   sudo vi /etc/resolv.conf

   nameserver {Your DNS server IP address}
   ```
1. Restart DNS service
   ``` Shell
   sudo systemctl restart bind9
   ```



## DoH
DNS over HTTPS  
It is a protocol that allows DNS resolution to be performed over the HTTPS protocol.  
To use DoH, users typically need to configure their web browsers or operating systems to use a DoH-compatible DNS resolver.

- Popular DoH Providers
  - [Cloudflare](https://cloudflare-dns.com/dns-query)
  - [Google](https://dns.google/dns-query)
  - [Mozilla](https://mozilla.cloudflare-dns.com/dns-query)


### Feature
1. Privacy and Security  
   - Encryption:  
    DoH encrypts DNS queries, making it difficult for third parties (like ISPs or malicious actors) to intercept or monitor the DNS requests made by users.  
   - Confidentiality:  
    By using HTTPS, DoH helps protect user privacy by preventing eavesdropping on DNS queries.
2. Integrity  
   - Data Integrity:  
    The use of HTTPS ensures that the data sent and received cannot be tampered with during transmission. This helps prevent DNS spoofing attacks.
3. Bypassing Censorship
   - Access to Blocked Content:  
   Since DoH queries are sent over HTTPS, they can bypass certain types of censorship that rely on monitoring DNS traffic.
4. Improved Performance
   - Reduced Latency:  
   In some cases, DoH can improve performance by allowing DNS queries to be resolved faster, especially when using a nearby DoH server.

## Behavior
1. Client Initiation:  
   When a user wants to visit a website, their browser sends a DNS query to a DoH server instead of a traditional DNS server.
2. HTTPS Request:  
   The DNS query is sent as an HTTPS request, which is encrypted.
3. Resolution:  
    The DoH server processes the request, resolves the domain name to an IP address, and sends the response back to the client over the secure connection.
4. Accessing the Website:  
   The client receives the IP address and can then connect to the desired website.


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


# IS-IS
Intermediate System to Intermediate System  
IS-IS is a link-state routing protocol used in large networks to facilitate the exchange of routing information between routers. It was originally developed for use in the ISO (International Organization for Standardization) networking model but has since been adapted for use in IP networks.
## Features
- Hierarchical Routing:  
    IS-IS supports a two-level hierarchy (Level 1 and Level 2) to optimize routing within and between areas.
- Scalability:  
    It is designed to handle large networks efficiently.
- Protocol Independence:  
    IS-IS can carry multiple network layer protocols, making it versatile for different types of traffic.
- Fast Convergence:  
    It quickly adapts to changes in the network topology, which is crucial for maintaining efficient routing.




# VRRP
Virtual Router Redundancy Protocol  
VRRP is a network protocol that provides high availability by allowing multiple routers to work together to present the appearance of a single virtual router to the end devices.
## Features
- Redundancy:  
    VRRP enables automatic failover to a backup router if the primary router fails, ensuring continuous network availability.
- Virtual IP Address:  
    A virtual IP address is shared among the routers, allowing devices to send traffic to this address without needing to know the specific router's IP.
- Master/Backup Roles:  
    One router is elected as the master (active) router, while others remain in a backup state, ready to take over if needed.
- Interoperability:  
    It is compatible with various routing protocols and can be used in different network environments.




# PIM
Protocol Independent Multicast
PIM is a multicast routing protocol used to efficiently route multicast traffic across a network. It is termed "protocol independent" because it can operate over any underlying unicast routing protocol.
## Features
- Multicast Support:  
    PIM is designed to manage the distribution of multicast data streams, such as video or audio broadcasts.
- Scalability:  
    It can scale to support large numbers of multicast groups and receivers.
- Modes of Operation:  
    PIM has several modes, including PIM Sparse Mode (PIM-SM) for networks with sparse receivers and PIM Dense Mode (PIM-DM) for networks with many receivers.
- Flexibility:  
    It can work with various unicast routing protocols, making it adaptable to different network architectures.


# BGP
## Features
Border Gateway Protocol
It is a standardized exterior gateway protocol used to exchange routing information between different autonomous systems (AS) on the internet.
It is a critical protocol for the functioning of the internet, enabling efficient and reliable routing between different autonomous systems. Its ability to handle complex routing policies, scalability, and security features.
It provides load balancing, redundancy and failover.

- Path Vector Protocol
  - Path Information:  
    BGP uses a path vector mechanism to maintain the path information that gets updated dynamically as the network topology changes.
    Each BGP router maintains a table of network paths, known as the BGP routing table.
  - AS Path Attribute:  
    BGP includes an AS path attribute that lists the ASes a route has traversed, 
    helping to prevent routing loops and providing information about the route's origin.

- Inter-Domain Routing
  - Exterior Gateway Protocol:  
    BGP is primarily used for inter-domain routing, meaning it facilitates routing between different autonomous systems, 
    as opposed to interior gateway protocols (IGPs) like OSPF or EIGRP, which operate within a single AS.
  - Policy-Based Routing:  
    BGP allows network administrators to implement routing policies based on various attributes, 
    enabling fine-grained control over route selection.

- Route Selection Process
BGP employs a multi-step process to select the best route among multiple available paths.
  - Highest Local Preference:  
    Routes with the highest local preference value are preferred.
  - Shortest AS Path:  
    If multiple routes exist, the one with the shortest AS path is chosen.
  - Origin Type:  
    Routes are classified as IGP, EGP, or incomplete, with IGP being preferred.
  - MED (Multi-Exit Discriminator):  
    If routes are from the same AS, the one with the lowest MED value is preferred.
  - eBGP over iBGP:  
    Routes learned from eBGP peers are preferred over those learned from iBGP peers.

- Security Features
  - BGP Session Authentication:  
    BGP supports authentication mechanisms to secure BGP sessions between peers, helping to prevent unauthorized route updates.
  - Route Filtering:  
    Network operators can implement route filtering to control which routes are accepted or advertised, enhancing security and stability.

- Scalability
  - Scalable Design:  
    BGP is designed to handle a large number of routes, making it suitable for the vast and complex structure of the internet.
  - Hierarchical Structure:  
    BGP's design allows for a hierarchical routing structure, which helps manage routing information efficiently.

### Messsage Types
| Type | Description |
| :--- | :--- |
| OPEN | Initiates a BGP session and establishes parameters for communication. |
| UPDATE | Used to advertise new routes or withdraw previously advertised routes. |
| KEEPALIVE | Sent periodically to maintain the connection and ensure that the peer is still reachable. |
| NOTIFICATION | Indicates an error or issue with the BGP session, prompting the termination of the connection. |  


# EIGRP
Enhanced Interior Gateway Routing Protocol
EIGRP is a Cisco proprietary routing protocol that combines the advantages of both distance vector and link-state protocols. It is designed to facilitate efficient routing within an autonomous system (AS) and is widely used in enterprise networks.

## Features
- Hybrid Routing Protocol
  - Distance Vector and Link-State:  
    EIGRP is often referred to as a hybrid protocol because it incorporates features from both distance vector protocols (like RIP) and link-state protocols (like OSPF).
    It uses distance vector principles for routing decisions while maintaining a topology map of the network.
  - Diffusing Update Algorithm (DUAL):  
    EIGRP uses DUAL to calculate the best path to a destination and to ensure loop-free routing.
    DUAL allows EIGRP to quickly converge and maintain optimal routing paths.

- Metrics and Path Selection
  - Composite Metric:
    EIGRP uses a composite metric based on several factors, including bandwidth, delay, load, and reliability.
    The formula for calculating the EIGRP metric is: Metric = ( 10^7 / minimum bandwidth​ + total delay ) × 256.
  - Feasible Successor:
    EIGRP maintains a list of feasible successors, which are backup routes that can be used if the primary route fails.
    This allows for rapid failover and improved network reliability.

- Fast Convergence
  - Rapid Convergence:  
    EIGRP is known for its fast convergence times, which are achieved through the use of DUAL.
    When a topology change occurs, EIGRP quickly recalculates the best paths and updates the routing table.
  - Partial Updates:
    Instead of sending full routing updates, EIGRP sends only the changes (partial updates) to its neighbors, 
    reducing bandwidth usage and improving efficiency.

- Security Features
  - Authentication:  
    EIGRP supports authentication mechanisms to secure routing updates, 
    ensuring that only authorized routers can participate in the routing process.
  - Route Filtering:  
    Network administrators can implement route filtering to control 
    which routes are advertised or accepted, enhancing security and stability.

- Scalability
  - Hierarchical Design:
    EIGRP is designed to scale well in large networks, supporting thousands of routes 
    and multiple routers without significant performance degradation.
  - Support for Multiple Protocols:
    EIGRP can operate over various network layer protocols, including IPv4 and IPv6, 
    making it versatile for different network environments.

### Messsage Types
| Type | Description |
| :--- | :--- |
| Hello | Used to discover and maintain neighbor relationships. |
| Update | Contains routing information and is sent when there are changes in the network topology. |
| Query | Sent to request routing information from neighbors when a route is lost. |
| Reply | Sent in response to a query, providing the requested routing information. |
| ACK | Confirms the receipt of EIGRP messages. |




