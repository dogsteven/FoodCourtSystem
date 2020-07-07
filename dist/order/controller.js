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

var _model = _interopRequireDefault(require("./cart-item/model"));

var _model2 = _interopRequireDefault(require("./order-item/model"));

var _model3 = _interopRequireDefault(require("./model"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

var _dataAccessObject2 = _interopRequireDefault(require("./order-item/data-access-object"));

var Controller = /*#__PURE__*/function () {
  function Controller() {
    (0, _classCallCheck2["default"])(this, Controller);
    this.unpaidQueue = [];
    this.waitingQueue = {};
    this.cookingQueue = {};
  }
  /**
   * @param {string} id 
   * @returns {Promise<Order?>}
   */


  (0, _createClass2["default"])(Controller, [{
    key: "getOrderByID",
    value: function () {
      var _getOrderByID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getOrderByID(_x) {
        return _getOrderByID.apply(this, arguments);
      }

      return getOrderByID;
    }()
    /**
     * @param {string} id 
     * @returns {Promise<Order[]>}
     */

  }, {
    key: "getOrderbyCustomerID",
    value: function () {
      var _getOrderbyCustomerID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dataAccessObject["default"].query(function (item) {
                  return item.customerID === id;
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getOrderbyCustomerID(_x2) {
        return _getOrderbyCustomerID.apply(this, arguments);
      }

      return getOrderbyCustomerID;
    }()
    /**
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     * @returns {Promise<string>}
     */

  }, {
    key: "makeNewOrder",
    value: function () {
      var _makeNewOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customerID, cartItems) {
        var order, id;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                order = new _model3["default"]("", customerID, cartItems);
                _context3.next = 3;
                return _dataAccessObject["default"].create(order);

              case 3:
                id = _context3.sent;
                order.id = id;
                this.unpaidQueue.push(order);
                return _context3.abrupt("return", id);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function makeNewOrder(_x3, _x4) {
        return _makeNewOrder.apply(this, arguments);
      }

      return makeNewOrder;
    }()
    /**
     * @param {string} id 
     * @returns {boolean}
     */

  }, {
    key: "pushOrderFromUnpaidToWaitingQueue",
    value: function pushOrderFromUnpaidToWaitingQueue(id) {
      var _this = this;

      var index = this.unpaidQueue.findIndex(function (order) {
        return order.id === id;
      });
      if (index === -1) return false;
      var info = this.unpaidQueue[index];

      _dataAccessObject["default"].modifyByField(info.id, 'state', 'paid');

      var order = new _model3["default"](info.id, info.customerID, info.cartItems, 'waiting');
      this.unpaidQueue.splice(index, 1);
      order.makeOrderItems().forEach(function (item) {
        var vendorID = item.vendorID;
        if (vendorID in _this.waitingQueue === false) _this.waitingQueue[vendorID] = [];

        _this.waitingQueue[vendorID].push(item);
      });
      return true;
    }
    /**
     * @param {string} vendorID
     * @returns {boolean}
     */

  }, {
    key: "popOrderFromWaitingQueueToCookingQueue",
    value: function popOrderFromWaitingQueueToCookingQueue(vendorID) {
      if (vendorID in this.waitingQueue === false) return false;
      var info = this.waitingQueue[vendorID][0];
      var orderItem = new _model2["default"](info.id, info.vendorID, info.cartItems);
      if (vendorID in this.cookingQueue === false) this.cookingQueue[vendorID] = [];
      this.cookingQueue[vendorID].push(orderItem);
      this.waitingQueue[vendorID].splice(0, 1);
      return true;
    }
    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */

  }, {
    key: "popOrderFromCookingQueue",
    value: function popOrderFromCookingQueue(vendorID, orderID) {
      if (vendorID in this.cookingQueue === false) return false;
      var index = this.cookingQueue[vendorID].findIndex(function (item) {
        return item.id === orderID;
      });
      if (index === -1) return false;
      var info = this.cookingQueue[vendorID][index];
      var orderItem = new _model2["default"](info.id, info.vendorID, info.cartItems);
      (0, _dataAccessObject2["default"])(vendorID).create(orderItem);
      this.cookingQueue[vendorID].splice(index, 1);
      return true;
    }
  }]);
  return Controller;
}();

var _default = new Controller();

exports["default"] = _default;