<link rel="stylesheet" type="text/css" href="../../styles.css">

# Create a new Dockerfile

## Content of the Dockerfile
``` Shell
# Using Ubuntu 20.04
FROM ubuntu:22.04

# Update APT
RUN apt-get update

# Default Setting
RUN apt-get install -y tzdata
ENV TZ=Asia/Taipei

# Reinstall Make
# RUN apt-get purge -y make
COPY make_4.1-9.1ubuntu1_amd64.deb /tmp/
RUN apt-get install -y /tmp/make_4.1-9.1ubuntu1_amd64.deb

# Install Dependency Packages
RUN apt-get install -y binutils build-essential bzip2 curl device-tree-compiler
RUN apt-get install -y flex g++ gawk gcc gettext git git-lfs libc6-dev libfdt-dev
RUN apt-get install -y libncurses5-dev libsqlite3-dev libssl-dev libxml-parser-perl
RUN apt-get install -y ocaml ocaml-findlib ocaml-nox patch pkg-config python3-distutils
RUN apt-get install -y repo sharutils subversion u-boot-tools unzip wget zlib1g-dev

# Clean the cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Using default Python
RUN ln -sf  /usr/bin/python /usr/local/bin/python
RUN ln -sf  /usr/bin/python3 /usr/local/bin/python3
```

## Build the image
``` Shell
# Format: docker build -t <Image Name>:<Tag> <Location>
# Default Tag is "latest"
docker build -t ubuntu-22.04:1.0 .
```

## Save the image
``` Shell
# Save to be the .tar file
# Format: docker build -t <Image File.tar> <Image Name>:<Tag>
docker save -o webber-22.04.tar u22.04:1.0
```