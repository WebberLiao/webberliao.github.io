<link rel="stylesheet" type="text/css" href="../../styles.css">

# Basic
Docker would use the same kernel and hardware to execute the containers.
Virtual machine would own their kernel and hardware.

## Install Docker
``` Shell
# Update Advanced Package Tool
sudo apt update
# Install preconfigurations
sudo apt install \
    apt-transport-https ca-certificates curl \
    gnupg software-properties-common lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update Advanced Package Tool again
sudo apt update
# Install Docker dependency
sudo apt install docker-ce docker-ce-cli containerd.io \
docker-buildx-plugin docker-compose-plugin

## Check Docker version and status
sudo docker version
systemctl status docker
sudo systemctl start docker # Execute the Docker
sudo systemctl enable docker # Executing Docker automatically when turn on
```
