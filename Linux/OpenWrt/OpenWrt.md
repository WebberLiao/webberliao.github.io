<link rel="stylesheet" type="text/css" href="../../styles.css">

# Commands
``` Shell
# In source code to check the using OpenWrt version
cat feeds.conf.default

```

# Packages
## Audio


# Other
## reboot
- Location: qca/src/linux-Version/kernel/reboot.c

## firstboot
- Location: package/base-files/files/sbin/firstboot
- Content: /sbin/jffs2reset $@
- Sub-process: jffs2reset.c main()

## sysupgrade
- location: kernel/reboot.c

# Useful Links
- **[Creating packages]("https://openwrt.org/docs/guide-developer/packages")**

