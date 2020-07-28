"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _model = _interopRequireDefault(require("../cart-item/model"));

var _default =
/**
 * @param {string} id
 * @param {string} vendorID 
 * @param {CartItem[]} cartItems 
 */
function _default(id, vendorID, cartItems) {
  (0, _classCallCheck2["default"])(this, _default);
  this.id = id;
  this.vendorID = vendorID;
  this.cartItems = cartItems;
};

exports["default"] = _default;