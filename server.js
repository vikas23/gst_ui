var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(__dirname + '/dist'));

app.get("*", function (res, resp) {
  resp.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
});

app.listen("4000", () => {
  console.log('Server running at port 4000');
});

