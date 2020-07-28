"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dataAccessObject = _interopRequireDefault(require("../../food-item/data-access-object"));

var _default = /*#__PURE__*/function () {
  /**
   * @param {string} itemID 
   * @param {number} quantity 
   */
  function _default(itemID, quantity) {
    (0, _classCallCheck2["default"])(this, _default);
    this.itemID = itemID;
    this.quantity = quantity;
  }
  /**
   * @returns {number}
   */


  (0, _createClass2["default"])(_default, [{
    key: "price",
    value: function price() {
      var item = _dataAccessObject["default"].queryByID(id);

      if (item === null) return 0;
      return item.price * this.quantity;
    }
  }]);
  return _default;
}();

exports["default"] = _default;