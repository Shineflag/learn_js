var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.bind(function () {
  socket.setBroadcast(true);
});

var message = new Buffer("Hi");
let ip = '255.255.255.255'
// let ip = '192.168.0.188'
socket.send(message, 0, message.length, 41234, ip, function(err, bytes) {
  socket.close();
});