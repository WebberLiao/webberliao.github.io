
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
  > The current make location (./)
- The value of INCLUDE_DIR is:  
  > The current make location (./include)
- The value of TARGET_CC is:  
  > arm-openwrt-linux-muslgnueabi-gcc
- The value of PKG_BUILD_DIR is:  
  > The location to store the package be built. (./build_dir/target-arm/package-name)
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