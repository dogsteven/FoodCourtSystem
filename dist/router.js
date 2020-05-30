"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _apiController = _interopRequireDefault(require("./controllers/api-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/food', _apiController["default"].Food.query);
var _default = router;
exports["default"] = _default;