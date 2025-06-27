<link rel="stylesheet" type="text/css" href="styles.css">

# Create a new Dockerfile

## Content of the Dockerfile
``` Shell
# Using Ubuntu 20.04
FROM ubuntu:20.04

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
RUN apt-get install -y binutils build-essential bzip2 curl device-tree-compiler \
flex g++ gawk gcc gettext git git-lfs libc6-dev libfdt-dev \
libncurses5-dev libsqlite3-dev libssl-dev libxml-parser-perl \
ocaml ocaml-findlib ocaml-nox patch pkg-config python3-distutils \
repo sharutils subversion u-boot-tools unzip wget zlib1g-dev

# Clean the cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
```

## Build the image
``` Shell
# Format: docker build -t <Image Name>:<Tag> <Location>
# Default Tag is "latest"
docker build -t ubuntu-20.04:1.0 .
```

## Save the image
``` Shell
# Save to be the .tar file
# Format: docker build -t <Image File.tar> <Image Name>:<Tag>
docker save -o webber-20.04.tar u20.04:1.0
```