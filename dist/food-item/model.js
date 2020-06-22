"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _default =
/**
 * @param {string} id 
 * @param {string} vendorID 
 * @param {string} name 
 * @param {number} price 
 * @param {number} quantity 
 * @param {string[]} categories 
 * @param {string} description 
 * @param {string} photo 
 */
function _default(id, vendorID, name, price, quantity, categories, description, photo) {
  (0, _classCallCheck2["default"])(this, _default);
  this.id = id;
  this.vendorID = vendorID;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.categories = categories;
  this.description = description;
  this.photo = photo;
  this.rating = 0;
  this.ratingTimes = 0;
};

exports["default"] = _default;