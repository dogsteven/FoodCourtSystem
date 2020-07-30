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
 * @param {number} rating
 * @param {number} ratingTimes
 */
function _default(id, vendorID, name, price, quantity, categories, description, photo) {
  var rating = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
  var ratingTimes = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
  (0, _classCallCheck2["default"])(this, _default);
  this.id = id;
  this.vendorID = vendorID;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.categories = categories;
  this.description = description;
  this.photo = photo;
  this.rating = rating;
  this.ratingTimes = ratingTimes;
};

exports["default"] = _default;