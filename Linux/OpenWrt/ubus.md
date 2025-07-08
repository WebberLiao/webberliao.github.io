<link rel="stylesheet" type="text/css" href="styles.css">

# UBUS

```shell
# Get all command, path and methods
ubus -v list
```
```shell
# Get WAN interface config
ubus call network.interface status '{"interface":"wan"}'

# Get LAN interface config
ubus call network.interface status '{"interface":"lan"}'
```
```shell
# Get Systen information
ubus call system info

# Reboot the device
ubus call system reboot
```
