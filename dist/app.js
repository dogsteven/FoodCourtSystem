"use strict";

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./router"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"]["static"]('static'));
app.use((0, _cors["default"])());
app.use('/api', _router["default"]);
app.listen(process.env.PORT || 5000);