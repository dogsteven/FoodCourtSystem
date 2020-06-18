"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
    }
  }]);
  return _default;
}();

exports["default"] = _default;