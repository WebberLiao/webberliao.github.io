<link rel="stylesheet" type="text/css" href="../styles.css">

# Applications
## awk
It is a versatile and powerful tool for text processing and data manipulation.
``` Shell
# It is a built-in application
# It uses whitespace (spaces or tabs) by default.

# Basic
# Format: awk '{ print $1, $2, ... }' <File>
awk '{ print $1, $2 }' file.txt

# Using comma as the field separator
# Format: awk -F<symbol> '{ print $1, $2, ... }' <File>
awk -F, '{ print $1, $2 }' june.csv

# Print with the condition
# Format: awk '{ if () print $1, $2, ... }' <File>
awk '{ if ($3 > 50) print $1, $3 }' july.csv

# Print with the specific pattern
# Format: awk '/pattern/ { print $1, $2, ... }' <File>
awk '/###/ { print $1, $3 }' notes.md

# Formatting the output
# Format: awk '{ print "...", $1, $2, ... }' <File>
awk '{ printf "Name: %-10s Age: %d\n", $1, $2 }' customers.txt
```

## pdftk
It uses for combining the multiple pdf files.
``` Shell
# Install
sudo apt install -y pdftk

pdftk <file_1>.pdf <file_2>.pdf output <file_new>.pdf
```

## youtube-dl
It uses for downloading the music from Youtube.
``` Shell
# Install
sudo apt install -y youtube-dl

youtube-dl -x --audio-format mp3 <YouTube-URL>
```

# Basic Commands
## date
Show current datetime
``` Shell
date "+%Y-%m-%d %H:%M:%S"
```

## exec
``` Shell
# It would execute the command after exec
# 1 is meaning stdout
# 2 is meaning strerr
# /dev/console is represents the system console. Writing to /dev/console sends output directly to the console.
exec 1>/dev/console 2>/dev/console
```

## tar
``` Shell
# -C <To/Specific/Location>
tar -xvf Archive -C /home/user/new/location/
```

## find
``` Shell
# find <search_location> [-type f/l/d] [-name "<pattern>"] [-exec <behavior>] [-sort r]
# Delete all .sh file in current repository
# [-type f/l/d] : Filter the type of file (f:file, l: link, d:directory)
# [-name "<pattern>"] : Filter by name
# [-exec <behavior>] : if existed then Execute the command.
# [-sort r] : Reverse sort
# [-ls] : List more information
find . -type f -name "*.sh" -exec rm {} \;
```

# Busybox
``` Shell
# It is used to initialize and detect a Serial Flash (SF) device connected to the system.
sf probe

# It sets an environment variable named imgaddr to the hexadecimal address 0x44000000.
imgaddr=0x44000000

# This command tells U-Boot to read and execute the script located at the specified address in memory.
source $imgaddr:script

# crc32 : This is the command used to calculate the CRC32 checksum.
# address : The starting memory address from which the CRC32 calculation will begin.
# $filesize : This is a variable that represents the size of the data (in bytes)
crc32 0x44000000 $filesize

```
