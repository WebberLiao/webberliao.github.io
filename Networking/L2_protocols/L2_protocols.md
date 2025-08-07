<link rel="stylesheet" type="text/css" href="../../styles.css">

# LLDP
## lldpd
- CDP (Cisco Discovery Protocol)
    It is a proprietary protocol developed by Cisco Systems for discovering and identifying other Cisco devices on the network.
    It allows Cisco devices to advertise information about themselves, such as device ID, software version, platform, and the interfaces they are connected to.
    This information can be used to create a topology map of the network and identify the connectivity between Cisco devices.
- FDP (Foundry Discovery Protocol)
    FDP is a proprietary protocol developed by Foundry Networks (now part of Brocade/Broadcom) for discovering and identifying other Foundry devices on the network.
    It serves a similar purpose to CDP, allowing Foundry devices to advertise their information, such as device type, software version, and port information.
- EDP (Extreme Discovery Protocol)
    EDP is a proprietary protocol developed by Extreme Networks for discovering and identifying other Extreme devices on the network.
    It allows Extreme devices to advertise their information, including device type, software version, and port details

<hr>

# L2TP
Layer 2 Tunneling Protocol  
L2TP is a tunneling protocol used to support virtual private networks (VPNs) and to carry data over the internet.
It is often used in conjunction with other protocols, such as IPsec, to provide encryption and secure data transmission.

## Features
- Tunneling:  
    L2TP encapsulates data packets for transmission over a public network, creating a secure tunnel.
- Support for Multiple Protocols:  
    It can carry various types of network traffic, including PPP.
- No Encryption:  
    L2TP itself does not provide encryption; it relies on other protocols (like IPsec) for security.
- Widely Used:  
    It is commonly used for remote access and site-to-site VPNs.



# STP
Spanning Tree Protocol, 802.1D
Uses Bridge Protocol Data Units (BPDUs) prevents layer 2 loops in switched networks, 
provides path redundancy, ensures a loop-free logical topology.

## Features
### Mechanism
1. Elects a Root Bridge
2. Selects Root Ports
3. Identifies Designated Ports
4. Blocks Alternate/Backup Ports

### Port States
- Disabled
- Blocking
- Listening
- Learning
- Forwarding

### Convergence Process
1. Root Bridge Election
2. Root Port Selection
3. Designated Port Selection
4. Blocking Redundant Ports 

## RSTP
Rapid Spanning Tree Protocol, 802.1w
Faster convergence than STP, more efficient port state transitions, backward compatible with STP.
### New Port States
- Discarding (Disabled, Blocking, Listening)
- Learning
- Forwarding

### Mechanism
- proposal/Agreement Handshake
- Direct Synchronization

## MSTP
Multiple Spanning Tree Protocol, 802.1s
### Features
- Supports multiple VLANs to different spanning tree instances
- Allows load balancing across redundant links
- Provides better scalability for large networks and better network segmentation.
- Supports per-VLAN load balancing


### CST
Common Spanning Tree
### Features
- Single logical topology across network
- It's the default spanning tree in MSTP

## Version Comparison
| Feature | STP | RSTP | MSTP |
| :--- | :--- | :--- | :--- |
| Convergence | 30-50 seconds | 15 seconds | 15 seconds |
| Port States | 5 | 3 | 3 |
| VLAN Support | Limited | Limited | Advanced |
| Load Balance | No | No | Yes |

## Guards
### TCN Guard
Topology Change Notification
Prevent unnecessary network reconvergence.
Limit the impact of frequent topology changes.
#### Mechanism
- Suppresses TCN BPDUs
- Provides stability in network topology

### Root Guard
- Prevents unauthorized switches from becoming root bridge
- Protects network topology from malicious or misconfigured switches to protect core network infrastructure
- Ensures designated root bridge remains stable
#### Mechanism
**FORWARDING -> Receives superior BPDU -> DISCARDING (Until not received superior BPDUs)**
- Blocks ports receiving superior BPDUs
- Moves port to root-inconsistent state to prevents topology changes  

### BPUD Guard
Disable ports receiving BPDUs to protect access ports from unauthorized network devices.
#### Mechanism
**FORWARDING -> Received BPDUs -> Link down (Link up manually)**
- Shutdown port when BPDU is received
- Requires manual intervention to re-enable
- Typically used on access ports (End-user device connections)

### Loop Guard
Prevent unidirectional link failures
#### Mechanism
**FORWARDING -> Not received BPDUs -> DISCARDING (Until received BPDUs)**
- Blocks ports not receiving BPDUs to prevents forwarding on potentially faulty links

### Guards Comparison
| Guard Type | Purpose | Trigger | Action | State Transition | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Root Guard | Prevent unauthorized root bridge | Superior BPDU | Block port | Forwarding → Discarding | STP topology |
| Loop Guard | Prevent unidirectional link failures | No BPDU received | Block port | Forwarding → Discarding | Redundant links |
| BPDU Guard | Prevent unauthorized devices | Any BPDU received | Shutdown interface | Forwarding → Link Down (Err-Disabled) | Access ports |
| TCN Guard | Limit topology change notifications | Excessive TCN BPDUs | Suppress notifications | No state change | Network stability |

## BPDU Filter & Portfast
### BPDU Filter
Completely stops BPDU transmission/reception.
Removes port from STP calculations.
#### Mechanism
- Stops sending/receiving BPDUs

### Portfast
Accelerate port transition to forwarding state.
Reduce convergence time to optimize access port performance.
Typically used on access ports
#### Mechanism
- Bypasses listening and learning states and moves port to forwarding state immediately.
- But it still can receive BPDU.


#