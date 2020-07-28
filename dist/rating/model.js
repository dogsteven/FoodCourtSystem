"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _default =
/**
 * @param {number} index
 * @param {string} foodItemID 
 * @param {string} customerID 
 */
function _default(index, foodItemID, customerID) {
  (0, _classCallCheck2["default"])(this, _default);
  this.index = Number(index);
  this.foodItemID = foodItemID;
  this.customerID = customerID;
};

exports["default"] = _default;