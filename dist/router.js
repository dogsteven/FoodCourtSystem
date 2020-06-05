"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _apiController = _interopRequireDefault(require("./controllers/api-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.route('/test/database/:ref').get(_apiController["default"].Firebase.query);
router.route('/food').get(_apiController["default"].Food.query).post(_apiController["default"].Food.create).put(_apiController["default"].Food.modify);
router["delete"]('/food/:id', _apiController["default"].Food.remove);
router.route('/vendor-owner/:username/:password').get(_apiController["default"].VendorOwner.query);
router.route('/vendor-owner').post(_apiController["default"].VendorOwner.create);
var _default = router;
exports["default"] = _default;