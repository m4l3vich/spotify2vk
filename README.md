# Spotify2VK
ENG [RUS](README_RU.md "Русская версия")
## How to launch
You need a tool called _forever_, and you can install it using NPM:   
`npm install forever -g`   
Then go to the script's directory and execute this command:   
`forever start main.js <args>`   

## How to use
You can't use script without args - you need to provide, at least, a VK access_token. You can get it [here](https://vkhost.github.io/)   
Full list of command-line args:   
```
--token <token>        VK access_token (required)
--prefix <prefix>      Status prefix (default: "Spotify |")
--replacer <replacer>  Text that will be set in status before closing the app
--current              Use current (before running app) status as replacer
```
