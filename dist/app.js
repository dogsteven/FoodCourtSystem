"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./router"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: true
}));
app.use(_express["default"]["static"]('static'));
app.use('/api', _router["default"]);

var server = _http["default"].createServer(app);

var io = _socket["default"].listen(server);

io.sockets.on('connection', function (socket) {
  var socketID = socket.id;
  socket.on('message', function (data) {
    io.sockets.connected[socketID].emit('message', {
      message: "Hello"
    });
  });
});
server.listen(process.env.PORT || 80);