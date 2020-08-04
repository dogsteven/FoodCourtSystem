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

var _default = {
  /**
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<VendorOwner?>}
   */
  queryByUsernamePassword: function queryByUsernamePassword(username, password) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dataAccessObject["default"].queryFirst(function (vendorOwner) {
                return vendorOwner.username === username && vendorOwner.password === password;
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
   * @returns {Promise<VendorOwner[]>}
   */
  queryByAll: function queryByAll() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _dataAccessObject["default"].query(function (vo) {
                return true;
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
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
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {string} email 
   * @param {string} vendorID 
   */
  create: function create(username, password, firstname, lastname, email, vendorID) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var isExist, vendorOwner;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _dataAccessObject["default"].queryFirst(function (vo) {
                return vo.username === username;
              });

            case 2:
              _context3.t0 = _context3.sent;
              isExist = _context3.t0 !== null;

              if (!isExist) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", null);

            case 6:
              vendorOwner = new _model["default"]("", username, password, vendorID, firstname, lastname, email);
              _context3.next = 9;
              return _dataAccessObject["default"].create(vendorOwner);

            case 9:
              return _context3.abrupt("return", _context3.sent);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  remove: function remove(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var isExist;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _dataAccessObject["default"].queryFirst(function (vo) {
                return vo.id === id;
              });

            case 2:
              _context4.t0 = _context4.sent;
              isExist = _context4.t0 !== null;

              if (!isExist) {
                _context4.next = 7;
                break;
              }

              _dataAccessObject["default"].remove(id);

              return _context4.abrupt("return", true);

            case 7:
              return _context4.abrupt("return", false);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;