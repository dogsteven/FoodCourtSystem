"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _webPush = _interopRequireDefault(require("web-push"));

var publicKey = "BDtTHhaONeawAm3AAoUsMUnqxKA8YedNTbZp46YAxBDxycX3wdfqlsslB-n6ZQJn0OxYwBnPtJLXBi8BRuKVq24";
var privateKey = "EIeyLw2uFzeBS9Qh2l2aRRYf2t1yypNfrnIKFtvu20A";

_webPush["default"].setVapidDetails("mailto:caigicungduoc23@gmail.com", publicKey, privateKey);

var _default = _webPush["default"];
exports["default"] = _default;