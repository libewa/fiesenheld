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

# Configuring
This is the `config.json` template:
```json
{
    "activity": "playing, listening, watching, custom or competing",
    "nowPlaying": "any string",
    "status": "online, idle, dnd or invisible",
    "afk": false
}
```

`CLIENT_ID` and `TOKEN` are now given via environment variables or Replit secrets.