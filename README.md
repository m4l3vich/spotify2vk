# Spotify2VK
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
ENG [RUS](README_RU.md "Русская версия")
## How to launch
You need a tool called _forever_, and you can install it using NPM:   
`npm install forever -g`   
Then go to the script's directory and execute this commands:   
```
npm install
forever start main.js <args>
```   

## How to use
You can't use script without args - you need to provide, at least, a VK access_token. You can get it [here](https://vkhost.github.io/)   
Full list of command-line args:   
```
--token <token>        VK access_token (required)
--prefix <prefix>      Status prefix (default: "Spotify |")
--replacer <replacer>  Text that will be set in status before closing the app
--current              Use current (before running app) status as replacer
```

## How to add to autostart
To add this script to autostart, open file named `sp2vk.cmd`:
```
forever start main.js --token <TOKEN> --current
```
Here you need to change `<TOKEN>` to your VK access_token. Then double-click on `add_to_startup.cmd`. Now the script will start automatically when Windows starts.
