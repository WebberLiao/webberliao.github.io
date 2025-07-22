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

## date
Show current datetime
``` Shell
date "+%Y-%m-%d %H:%M:%S"
```