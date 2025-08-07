<link rel="stylesheet" type="text/css" href="styles.css">

# whc
WHC (Wireless Home Controller)
WHC is a package designed for managing and optimizing wireless networks, particularly in home environments.
It focuses on enhancing the performance and reliability of Wi-Fi connections.
This package is particularly useful for users looking to enhance their home network's performance and manage multiple access points effectively.
- Daisy Chain Configuration
    WHC supports daisy chaining of devices, allowing multiple access points to work together efficiently.
- Best Uplink Selection
    It automatically selects the best uplink for devices, optimizing the overall network performance.
- SON (Self-Organizing Network)
    WHC can help in creating a self-organizing network that adapts to changes in the environment, improving connectivity and reducing interference.


# hyfi
Hy-Fi (High-Fidelity Wireless)
Hy-Fi is another package in OpenWrt that aims to improve wireless performance, particularly in high-density environments.
It focuses on providing high-fidelity connections for various applications.
This package is ideal for users who require robust wireless performance, especially in environments with many connected devices.
- Optimized Throughput
    Hy-Fi is designed to maximize throughput, ensuring that devices can communicate effectively without bottlenecks.
- Advanced Configuration Options
    It offers various settings that allow users to fine-tune their wireless networks according to specific needs.
- Support for Multiple Standards
    Hy-Fi can work with various wireless standards, making it versatile for different types of devices and applications.

# Audio packages
- mpd (Music Player Daemon)
- ffmpeg (for audio decoding)
- libopus (for Opus audio support)
- alsa-utils (for ALSA audio management)

## Using MPD
``` Shell 
# Start executing MPD
/etc/init.d/mpd start

# mpc (Music Player Client) for mpd or ffplay for ffmpeg to play your audio files.
mpc add /path/to/your/file.wav
mpc play
```

## Using FFmpeg
``` Shell 
# Executing FFmpeg
ffplay /path/to/your/audiofile.opus
```

## Using MPD
``` Shell 
# Start executing MPD
/etc/init.d/mpd start

# mpc (Music Player Client) for mpd or ffplay for ffmpeg to play your audio files.
mpc add /path/to/your/file.wav
mpc play
```
