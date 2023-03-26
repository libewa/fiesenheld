# fiesenheld
private discord bot

## Installing and Running
```sh
npm install
vim config.json # for syntax below
# if you forgot: ESC, then :wq to exit vim ;-P
node refreshCommands.js
node index.js
```

# `config.json`
```json
{
    "token": "YOUR_TOKEN",
    "clientId": "CLIENT_ID",
    "nowPlaying": "any string",
    "status": "online, idle, dnd or invisible"
}
```