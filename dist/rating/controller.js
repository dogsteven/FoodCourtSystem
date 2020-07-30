"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

var _controller = _interopRequireDefault(require("../food-item/controller"));

var _default = {
  /**
   * @param {string} customerID 
   * @param {string} foodItemID 
   * @returns {Promise<Rating?>}
   */
  queryByCustomerIDAndFoodItemID: function queryByCustomerIDAndFoodItemID(customerID, foodItemID) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dataAccessObject["default"].queryFirst(function (rating) {
                return rating.customerID == customerID && rating.foodItemID == foodItemID;
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {string} customerID 
   * @param {string} foodItemID 
   * @param {number} ratingScore 
   * @returns {Promise<number?>}
   */
  createNewRating: function createNewRating(customerID, foodItemID, ratingScore) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var foodItem, isFoodItemExist, isRatingYet, rating, newRatingScore;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _controller["default"].UserService.getFoodByID(foodItemID);

            case 2:
              foodItem = _context2.sent;
              isFoodItemExist = foodItem !== null;

              if (!(isFoodItemExist === false)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", null);

            case 6:
              _context2.next = 8;
              return _dataAccessObject["default"].queryFirst(function (rating) {
                return rating.customerID === customerID && rating.foodItemID === foodItemID;
              });

            case 8:
              _context2.t0 = _context2.sent;
              isRatingYet = _context2.t0 !== null;

              if (!(isRatingYet === true)) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", null);

            case 12:
              rating = new _model["default"](0, foodItemID, customerID);

              _dataAccessObject["default"].create(rating);

              _context2.next = 16;
              return _controller["default"].UserService.newRating(foodItemID, ratingScore);

            case 16:
              newRatingScore = _context2.sent;
              return _context2.abrupt("return", newRatingScore);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
exports["default"] = _default;