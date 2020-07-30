"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebase = _interopRequireDefault(require("../firebase"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebase["default"].database().ref(_configuration["default"].database["vendor-owner"]);

var _default = {
  /**
   * @param {string} username 
   * @param {string} password 
   */
  query: function query(username, password) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var vendorID, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              vendorID = null;
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var info = child.val();

                if (info.username === username && info.password == password) {
                  vendorID = info.vendorID;
                  return true;
                }

                return false;
              });
              return _context.abrupt("return", vendorID);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {VendorOwner} info 
   */
  create: function create(info) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var unvalid, snapshot;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              unvalid = false;
              _context2.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context2.sent;
              snapshot.forEach(function (child) {
                var data = child.val();
                if (data.username === info.username) unvalid = true;
                return unvalid;
              });

              if (!(unvalid === false)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 8;
              return database.push();

            case 8:
              _context2.sent.set(info);

            case 9:
              return _context2.abrupt("return", !unvalid);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /** 
   * @param {string} username 
   * @param {string} password 
   * @param {VendorOwner} newInfo 
   */
  modify: function modify(username, password, newInfo) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var snapshot, valid;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return database.once('value');

            case 2:
              snapshot = _context3.sent;
              valid = false;
              snapshot.forEach(function (child) {
                var info = child.val();

                if (info.username === username && info.password == password) {
                  valid = true;

                  var data = _objectSpread({}, newInfo);

                  data.username = username;
                  data.vendorID = info.vendorID;
                  database.child(child.key).set(data);
                }

                return valid;
              });
              return _context3.abrupt("return", valid);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
exports["default"] = _default;