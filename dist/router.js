"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _router = _interopRequireDefault(require("./food-item/router"));

var _router2 = _interopRequireDefault(require("./customer/router"));

var _router3 = _interopRequireDefault(require("./order/router"));

var _router4 = _interopRequireDefault(require("./vendor-owner/router"));

var _categories = _interopRequireDefault(require("./categories"));

var _router5 = _interopRequireDefault(require("./image-item/router"));

var _router6 = _interopRequireDefault(require("./vendor/router"));

var _router7 = _interopRequireDefault(require("./rating/router"));

var router = (0, _express.Router)();
(0, _router["default"])(router);
(0, _router2["default"])(router);
(0, _router3["default"])(router);
(0, _router4["default"])(router);
(0, _router5["default"])(router);
(0, _router6["default"])(router);
(0, _router7["default"])(router);

_categories["default"].Router(router);

router.get('/categories', function (req, res) {
  res.json({});
});
var _default = router;
exports["default"] = _default;