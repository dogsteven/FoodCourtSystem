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

var _model = _interopRequireDefault(require("./item/model"));

var _default = /*#__PURE__*/function () {
  /**
   * @param {string} id
   * @param {string} customerID 
   * @param {OrderItem[]} items
   */
  function _default(id, customerID, items) {
    var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'unpaid';
    (0, _classCallCheck2["default"])(this, _default);
    this.id = id;
    this.customerID = customerID;
    this.cartItems = items;
    this.state = state;
  }

  (0, _createClass2["default"])(_default, [{
    key: "makeOrderItems",
    value: function () {
      var _makeOrderItems = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;

        var result, _loop, i;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                result = [];
                _loop = /*#__PURE__*/_regenerator["default"].mark(function _callee(i) {
                  var vendorID, index;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this.cartItems[i].vendorID();

                        case 2:
                          vendorID = _context.sent;
                          index = result.findIndex(function (item) {
                            return item.vendorID === vendorID;
                          });
                          if (index === -1) result.push(new _model["default"](_this.id, vendorID, [_this.cartItems[i]]));else result[index].cartItems.push(_this.cartItems[i]);

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                });
                _context2.t0 = _regenerator["default"].keys(this.cartItems);

              case 3:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 8;
                  break;
                }

                i = _context2.t1.value;
                return _context2.delegateYield(_loop(i), "t2", 6);

              case 6:
                _context2.next = 3;
                break;

              case 8:
                return _context2.abrupt("return", result);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function makeOrderItems() {
        return _makeOrderItems.apply(this, arguments);
      }

      return makeOrderItems;
    }()
  }]);
  return _default;
}();

exports["default"] = _default;