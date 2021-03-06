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

var _controller = _interopRequireDefault(require("../../food-item/controller"));

var CartItem = /*#__PURE__*/function () {
  /**
   * 
   * @param {string} foodID 
   * @param {number} quantity
   */
  function CartItem(foodID, quantity) {
    (0, _classCallCheck2["default"])(this, CartItem);
    this.foodID = foodID;
    this.quantity = Number(quantity);
  }
  /**
   * @returns {Promise<string?>}
   */


  (0, _createClass2["default"])(CartItem, [{
    key: "vendorID",
    value: function () {
      var _vendorID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _controller["default"].UserService.getFoodByID(this.foodID);

              case 2:
                return _context.abrupt("return", _context.sent.vendorID);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function vendorID() {
        return _vendorID.apply(this, arguments);
      }

      return vendorID;
    }()
  }]);
  return CartItem;
}();

exports["default"] = CartItem;