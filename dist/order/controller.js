"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _firebase = _interopRequireDefault(require("../firebase"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./order-item/model"));

var _model2 = _interopRequireDefault(require("./cart-item/model"));

var _model3 = _interopRequireDefault(require("./model"));

var database = _firebase["default"].database().ref(_configuration["default"].database.order);

var Controller = /*#__PURE__*/function () {
  function Controller() {
    (0, _classCallCheck2["default"])(this, Controller);
    this.waitingQueue = {};
    this.cookingQueue = {};
  }
  /**
   * 
   * @param {string} customerID 
   * @param {CartItem[]} cartItems 
   */


  (0, _createClass2["default"])(Controller, [{
    key: "makeOrder",
    value: function () {
      var _makeOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(customerID, cartItems) {
        var ref, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return database.push();

              case 2:
                ref = _context.sent;
                id = ref.key;
                ref.set({
                  customerID: customerID,
                  cartItems: cartItems
                });
                return _context.abrupt("return", new _model3["default"](id, customerID, cartItems));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function makeOrder(_x, _x2) {
        return _makeOrder.apply(this, arguments);
      }

      return makeOrder;
    }()
    /**
     * 
     * @param {Order} order 
     */

  }, {
    key: "pushOrderToWaitingQueue",
    value: function pushOrderToWaitingQueue(order) {
      var _this = this;

      var orderItems = order.makeOrderItems();
      orderItems.forEach(function (orderItem) {
        var vendorID = orderItem.vendorID;
        if (vendorID in _this.waitingQueue === false) _this.waitingQueue[vendorID] = [];

        _this.waitingQueue[vendorID].push(orderItem);
      });
    }
  }]);
  return Controller;
}();

var _default = new Controller();

exports["default"] = _default;