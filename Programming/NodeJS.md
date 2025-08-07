# Node
## Reinstall
``` Shell
# Clean Up the Package Cache
sudo apt clean
sudo apt autoclean

# Remove the Problematic Package
sudo dpkg --remove --force-remove-reinstreq nodejs

# Fix Broken Packages
sudo apt --fix-broken install

# Remove Node.js Completely
sudo apt remove --purge nodejs
sudo apt autoremove

# Install 
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## NPM
``` Shell
# Install 
npm install {Package_Name}

# Install specific version
# E.g. react router dom v5
npm install react-router-dom@5

# Check the package
npm list {Package_Name}

# execute
npm start
```

### Packages
``` Shell
react
react-dom
react-scripts
react-router-dom
```


