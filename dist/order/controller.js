"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _firebase = _interopRequireDefault(require("../firebase"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./cart-item/model"));

var _model2 = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebase["default"].database().ref(_configuration["default"].database.order);

var Controller = /*#__PURE__*/function () {
  function Controller() {
    (0, _classCallCheck2["default"])(this, Controller);
    this.waitingQueue = {};
    this.cookingQueue = {};
  }
  /**
   * @param {string} vendorID 
   * @param {string} customerID 
   * @param {CartItem[]} items 
   */


  (0, _createClass2["default"])(Controller, [{
    key: "makeOrder",
    value: function () {
      var _makeOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(vendorID, customerID, items) {
        var ref, id, order;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref = database.child(vendorID).push();
                ref.set({
                  customerID: customerID,
                  items: items
                });
                _context.next = 4;
                return ref;

              case 4:
                id = _context.sent.key;
                order = new _model2["default"](id, customerID, items);
                if (vendorID in this.waitingQueue === false) this.waitingQueue[vendorID] = [];
                this.waitingQueue[vendorID].push(order);
                return _context.abrupt("return", id);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeOrder(_x, _x2, _x3) {
        return _makeOrder.apply(this, arguments);
      }

      return makeOrder;
    }()
  }, {
    key: "pushOrderFromWaitingQueueToCookingQueue",
    value: function pushOrderFromWaitingQueueToCookingQueue(vendorID) {
      if (vendorID in this.waitingQueue === false) return null;
      if (this.waitingQueue[vendorID].legnth === 0) return null;

      var order = _objectSpread({}, this.waitingQueue[vendorID][0]);

      this.waitingQueue[vendorID].splice(0, 1);
      if (vendorID in this.cookingQueue === false) this.cookingQueue[vendorID] = [];
      this.cookingQueue[vendorID].push(order);
      return order;
    }
  }, {
    key: "popCompleteOrderFromCookingQueue",
    value: function popCompleteOrderFromCookingQueue(vendorID, orderID) {
      if (vendorID in this.cookingQueue === false) return null;
      var index = this.cookingQueue[vendorID].findIndex(function (order) {
        return order.id === orderID;
      });
      if (index === -1) return null;

      var order = _objectSpread({}, this.cookingQueue[vendorID][index]);

      this.cookingQueue[vendorID].splice(index, 1);
      return order;
    }
  }]);
  return Controller;
}();

var _default = new Controller();

exports["default"] = _default;