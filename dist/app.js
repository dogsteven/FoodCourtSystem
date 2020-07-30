"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./router"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _expressFileupload["default"])());
app.use((0, _cors["default"])({
  origin: true
}));
app.use(_express["default"]["static"]('public'));
app.use('/api', _router["default"]);

var server = _http["default"].createServer(app);

server.listen(process.env.PORT || 80);