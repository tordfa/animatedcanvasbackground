var express = require('express');
var app = express();
const path = require("path");

app.use(express.static(path.join("/home/pi/Projects/animatedcanvasbackground")))
app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(6000,'192.168.10.140', function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})