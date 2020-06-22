"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _model = _interopRequireDefault(require("./order-item/model"));

var _model2 = _interopRequireDefault(require("./cart-item/model"));

var _default = /*#__PURE__*/function () {
  /**
   * 
   * @param {string} id 
   * @param {string} customerID 
   * @param {CartItem[]} cartItems 
   */
  function _default(id, customerID, cartItems) {
    (0, _classCallCheck2["default"])(this, _default);
    this.id = id;
    this.customerID = customerID;
    this.cartItems = cartItems;
  }

  (0, _createClass2["default"])(_default, [{
    key: "makeOrderItems",
    value: function makeOrderItems() {
      var _this = this;

      var orderItems = [];
      this.cartItems.forEach(function (item) {
        var index = orderItems.findIndex(function (orderItem) {
          return orderItem.vendorID === item.vendorID;
        });

        if (index === -1) {
          var orderItem = new _model["default"](_this.id, item.vendorID, [item]);
          orderItems.push(orderItem);
        } else orderItems[index].cartItems.push(item);
      });
      return orderItems;
    }
  }]);
  return _default;
}();

exports["default"] = _default;