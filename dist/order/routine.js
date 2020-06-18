"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _firebase = _interopRequireDefault(require("../firebase"));

var _model = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OrderRoutine = /*#__PURE__*/function () {
  function OrderRoutine() {
    (0, _classCallCheck2["default"])(this, OrderRoutine);
    this.waitingQueue = {};
    this.cookingOrders = {};
  }
  /**
   * @param {string} vendorID
   * @param {Order} order 
   */


  (0, _createClass2["default"])(OrderRoutine, [{
    key: "pushNewOrderToWaitingQueue",
    value: function pushNewOrderToWaitingQueue(vendorID, order) {
      if (vendorID in this.waitingQueue === false) this.waitingQueue[vendorID] = [];
      this.waitingQueue[vendorID].push(order);
    }
  }, {
    key: "popOrderFromWaitingQueueToCookingOrdersAndCooksIt",
    value: function popOrderFromWaitingQueueToCookingOrdersAndCooksIt(vendorID) {
      if (vendorID in this.cookingOrders === false) this.cookingOrders[vendorID] = {};
      if (this.waitingQueue[vendorID].length === 0) return;

      var order = _objectSpread({}, this.waitingQueue[vendorID][0]);

      var id = order.id;
      delete order.id;
      this.waitingQueue[vendorID].splice(0, 1);
      this.cookingOrders[vendorID][id] = order;
    }
  }]);
  return OrderRoutine;
}();

var _default = new OrderRoutine();

exports["default"] = _default;