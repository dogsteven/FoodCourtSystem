"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _model = _interopRequireDefault(require("./order-item/model"));

var _model2 = _interopRequireDefault(require("./cart-item/model"));

var _default =
/** 
 * @param {CartItem[]} cartItems 
 */
function _default(cartItems) {
  (0, _classCallCheck2["default"])(this, _default);

  for (var cart in cartItems) {}
};

exports["default"] = _default;