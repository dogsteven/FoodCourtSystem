"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("./controllers/api"));

var router = (0, _express.Router)();
router.route('/test/database/:ref').get(_api["default"].Firebase.query);
router.route('/food').get(_api["default"].Food.query).post(_api["default"].Food.create).put(_api["default"].Food.modify);
router.get('/food/:id', _api["default"].Food.queryByID);
router["delete"]('/food/:id', _api["default"].Food.remove);
var _default = router;
exports["default"] = _default;