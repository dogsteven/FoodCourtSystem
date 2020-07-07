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
   * @param {string} username 
   * @param {string} password 
   * @param {string} vendorID 
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {string} email 
   * @returns {Promise<string?>}
   */
  register: function register(username, password, vendorID, firstname, lastname, email) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var vendorOwner, isExist;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              vendorOwner = new _model["default"]("", username, password, vendorID, firstname, lastname, email);
              _context2.next = 3;
              return _dataAccessObject["default"].queryFirst(function (vo) {
                return vo.username === username;
              });

            case 3:
              _context2.t0 = _context2.sent;
              isExist = _context2.t0 !== null;

              if (!(isExist === true)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", null);

            case 7:
              _context2.next = 9;
              return _dataAccessObject["default"].create(vendorOwner);

            case 9:
              return _context2.abrupt("return", _context2.sent);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
exports["default"] = _default;