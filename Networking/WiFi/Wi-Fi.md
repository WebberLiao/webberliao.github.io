<link rel="stylesheet" type="text/css" href="styles.css">

# Wi-Fi

## 4 Way Handshake
An access point broadcasting a secure SSID will advertise its security capabilities in the Robust Security Network Association (RSNA) Information Element.
The RSNA is used in either a pre-shared key (PSK) or 802.1X SSID, in other words,  WPA2-Personal or WPA2-Enterprise.
- In message 1  
The access point sends an EAPOL-Key frame to the client, containing the its ANonce which will be used to generate a PTK. This frame also contains other fields in the information element describing the type of encryption that is being used, such as AES cipher.
- In message 2  
The client sends its EAPOL-Key frame to the access point. This frame contains the SNonce, RSN Element, and the MIC (Message Integrity Code), allowing the client to derive a PTK from the SNonce and ANonce.
- In message 3 (which is sent by the access point)  
Contains an ANonce, RSN Element, and a MIC. What’s important about message 3 is the transportation of the Group Temporal Key (GTK) which is used to protect broadcast and multicast frames.
- In message 4  
It is sent by the client which and contains a MIC. It is the final frame from the 4-Way Handshake. This final message notifies the access point of whether the temporal keys were installed successfully or not. This can be identified by the subfields of Key MIC: Set and Secure: Set.

## Krack Attack (Key Reinstallation Attack)
It targets the weaknesses in the key re-installation process.
The attack targets the four-way handshake used to establish a nonce (a kind of "shared secret") in the WPA2 protocol. The standard for WPA2 anticipates occasional Wi-Fi disconnections, and allows reconnection using the same value for the third handshake (for quick reconnection and continuity). Because the standard does not require a different key to be used in this type of reconnection, which could be needed at any time, a replay attack is possible. 
By repeatedly resetting the nonce transmitted in the third step of the WPA2 handshake, an attacker can gradually match encrypted packets seen before and learn the full keychain used to encrypt the traffic.

## HaLow & LoRaWAN
### HaLow
It provides the most comprehensive, feature-rich protocol available today for secure, long-reach, power-sensitive IoT applications. 
HaLow is marketed as having a range of 1 km.
In line-of-sight tests, it reached 3 km for data communication and over 600 meters (m) for HD-quality video transmission with Wi-Fi HaLow. Wi-Fi HaLow offers different channel configurations and modulation techniques that can maximize range or data speeds, and even more interesting, it can also be deployed in a mesh topography for an even further range if needed.
Wi-Fi HaLow uses the latest WPA3™ security

### LoRaWAN
LoRaWAN is a low-power, wide-area (LPWA) networking protocol.
It provides low-bandwidth connectivity to battery-powered sensor devices.
While that may be its maximum standard range, a typical range in practice is 5 km in an urban environment and 10 km in rural line-of-sight conditions.
LoRaWAN defines multiple data rates which are a combination of Spread Factor (SF) and channel bandwidth (125 kHz, 250 kHz, or 500 kHz). LoRaWAN data transfer speeds range from 250 bps in the longest-range setting to roughly 22 Kbps in its fastest shortest-range configuration.
LoRaWAN uses static keys and dynamically generated session keys.

### Summary
While LoRaWAN may prove sufficient for monitoring low-data sensor networks over kilometers in range, the necessity for transmitting more data such as images, video, or software updates makes Wi-Fi HaLow the obvious choice.