"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _default =
/** 
 * @param {string} vendorID
 * @param {string} foodItemID 
 * @param {number} quantity 
 */
function _default(vendorID, foodItemID, quantity) {
  (0, _classCallCheck2["default"])(this, _default);
  this.vendorID = vendorID;
  this.foodItemID = foodItemID;
  this.quantity = quantity;
};

exports["default"] = _default;