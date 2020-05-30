"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Food =
/**
 * @param {string} id 
 * @param {number} vendorID 
 * @param {string} name 
 * @param {number} price 
 * @param {string} description 
 * @param {string} picture 
 */
function Food(id, vendorID, name, price, description, picture) {
  _classCallCheck(this, Food);

  this.id = id;
  this.data = {
    vendorID: vendorID,
    name: name,
    price: price,
    description: description,
    picture: picture
  };
};

exports["default"] = Food;