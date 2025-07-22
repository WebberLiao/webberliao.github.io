
# Common
``` Makefile
# It is comment
# $@: Target
# $^: All Dependencies
# $<: The first Dependency
# $?: 

CC = gcc
RM = rm -rf
MAKE = make
```

# Variable
- The value of TOPDIR is:  
    > /home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk
	The make location
- The value of INCLUDE_DIR is:  
	> /home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/include
- The value of TARGET_CC is:  
	> arm-openwrt-linux-muslgnueabi-gcc
- The value of PKG_BUILD_DIR is:  
	> /home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/build_dir/target-arm/liteon-mqtt-api-1.0
- The value of TARGET_CFLAGS is:  
	> -Os -pipe -fno-caller-saves -fno-plt -fhonour-copts -mfloat-abi=hard -fmacro-prefix-map=/home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/build_dir/target-arm/liteon-mqtt-api-1.0=liteon-mqtt-api-1.0 -Wformat -Werror=format-security -DPIC -fpic -fstack-protector-strong -D_FORTIFY_SOURCE=2 -Wl,-z,now -Wl,-z,relro
- The value of TARGET_LDFLAGS is:  
	> -L/home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/staging_dir/toolchain-arm/usr/lib -L/home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/staging_dir/toolchain-arm/lib -DPIC -fpic -specs=/home/webber/XW1109/0625/qca-networking-2024-spf-12-5_qca_oem.git/qsdk/include/hardened-ld-pie.specs -znow -zrelro
- The value of INSTALL_DIR is:  
	> install -d -m0755
- The value of INSTALL_BIN is:  
	> install -m0755

# Package
``` Makefile
include $(TOPDIR)/rules.mk

PKG_NAME := my-package
PKG_VERSION := 1.0
PKG_RELEASE := 1

SRC := file_name.c
EXEC := file_name

# Define the package
define Package/$(PKG_NAME)
  SECTION := utils
  CATEGORY := Utilities
  TITLE := My Package
  DEPENDS:= +libiwinfo
endef

# Define the package description
define Package/$(PKG_NAME)/description
  There is the description.
endef

# Define the build dependencies
define Package/$(PKG_NAME)/build
  $(MAKE) -C $(PKG_BUILD_DIR) $(EXEC)
endef

# Define the compile rule
define Build/Compile
	$(MAKE) -C $(PKG_BUILD_DIR) $(EXEC)
endef

# Define the install rule
define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/$(EXEC) $(1)/usr/bin/
endef

# Define the clean rule
define Build/Clean
	$(RM) $(PKG_BUILD_DIR)/$(EXEC)
endef

# Specify the package
$(eval $(call BuildPackage,$(PKG_NAME)))
```