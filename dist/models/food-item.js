"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var FoodItem =
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
function FoodItem(id, vendorID, name, price, quantity, categories, description, photo) {
  (0, _classCallCheck2["default"])(this, FoodItem);
  this.id = id;
  this.vendorID = vendorID;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.categories = categories;
  this.description = description;
  this.photo = photo;
};

exports["default"] = FoodItem;