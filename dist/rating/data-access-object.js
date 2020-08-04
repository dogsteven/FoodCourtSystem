"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _firebase = _interopRequireDefault(require("../firebase"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebase["default"].database().ref(_configuration["default"].database.rating);

var _default = {
  /**
   * @param {(rating: Rating) => boolean} filter 
   * @returns {Promise<Rating[]>}
   */
  query: function query(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var snapshot, result, index;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return database.once('value');

            case 2:
              snapshot = _context.sent;
              result = [];
              index = 0;
              snapshot.forEach(function (child) {
                var _child$val = child.val(),
                    foodItemID = _child$val.foodItemID,
                    customerID = _child$val.customerID;

                var rating = new _model["default"](index, foodItemID, customerID);
                if (filter(rating) == true) result.push(rating);
                index += 1;
              });
              return _context.abrupt("return", result);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {(rating: Rating) => boolean} filter 
   * @returns {Promise<Rating?>}
   */
  queryFirst: function queryFirst(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var snapshot, result, index;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return database.once('value');

            case 2:
              snapshot = _context2.sent;
              result = null;
              index = 0;
              snapshot.forEach(function (child) {
                var _child$val2 = child.val(),
                    foodItemID = _child$val2.foodItemID,
                    customerID = _child$val2.customerID;

                var rating = new _model["default"](index, foodItemID, customerID);

                if (filter(rating) === true) {
                  result = rating;
                  return true;
                }

                index += 1;
                return false;
              });
              return _context2.abrupt("return", result);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * @param {Rating} rating 
   * @returns {Promise<Number>}
   */
  create: function create(rating) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _snapshot$val;

      var data, snapshot, index;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = _objectSpread({}, rating);
              delete data.index;
              _context3.next = 4;
              return database.once('value');

            case 4:
              snapshot = _context3.sent;
              index = ((_snapshot$val = snapshot.val()) !== null && _snapshot$val !== void 0 ? _snapshot$val : []).length;
              database.child(index).set(data);
              return _context3.abrupt("return", index);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * @param {Rating} rating 
   */
  modify: function modify(rating) {
    var index = rating.index;

    var data = _objectSpread({}, rating);

    delete data.index;
    database.child(index).set(data);
  },

  /**
   * @param {string} index 
   */
  remove: function remove(index) {
    database.child(index).remove();
  }
};
exports["default"] = _default;