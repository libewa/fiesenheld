var http = require('http');

http
  .createServer(function (req, res) {
    res.write("Trust me, I'm still alive.");
    res.end();
  })
  .listen(8080);