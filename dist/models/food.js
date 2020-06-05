"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Food =
/**
 * @param {number} vendorID 
 * @param {string} name 
 * @param {number} price 
* @param {string[]} categories
 * @param {string} description 
 * @param {string} picture 
 */
function Food(vendorID, name, price, categories, description, picture) {
  _classCallCheck(this, Food);

  this.vendorID = vendorID;
  this.name = name;
  this.price = price;
  this.categories = categories;
  this.description = description;
  this.picture = picture;
};

exports["default"] = Food;