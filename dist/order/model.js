"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

<<<<<<< HEAD
var _model = _interopRequireDefault(require("./cart-item/model"));

var _model2 = _interopRequireDefault(require("./order-item/model"));

var _default = /*#__PURE__*/function () {
  /**
   * @param {string} id 
   * @param {string} customerID 
   * @param {CartItem[]} cartItems 
   * @param {string} state
   */
  function _default(id, customerID, cartItems) {
    var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "unpaid";
    (0, _classCallCheck2["default"])(this, _default);
    this.id = id;
    this.customerID = customerID;
    this.cartItems = cartItems;
    this.state = state;
  }
  /**
   * @returns {OrderItem[]}
   */


  (0, _createClass2["default"])(_default, [{
    key: "makeOrderItems",
    value: function makeOrderItems() {
      var _this = this;

      var orderItems = [];
      this.cartItems.forEach(function (item) {
        var index = orderItems.findIndex(function (orderItem) {
          return orderItem.vendorID === item.vendorID;
        });
        if (index === -1) orderItems.push(new _model2["default"](_this.id, item.vendorID, [item]));else orderItems[index].cartItems.push(item);
      });
      return orderItems;
=======
var _model = _interopRequireDefault(require("./item/model"));

var _default = /*#__PURE__*/function () {
  /**
   * @param {string} id
   * @param {string} customerID 
   * @param {OrderItem[]} items
   */
  function _default(id, customerID, items) {
    (0, _classCallCheck2["default"])(this, _default);
    this.id = id;
    this.customerID = customerID;
    this.items = items;
  }

  (0, _createClass2["default"])(_default, [{
    key: "price",
    value: function price() {
      var total = 0;
      this.items.forEach(function (item) {
        total += item.price();
      });
      return total;
>>>>>>> origin/backhoa
    }
  }]);
  return _default;
}();

exports["default"] = _default;