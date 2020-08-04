"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _dataAccessObejct = _interopRequireDefault(require("./data-access-obejct"));

var _controller = _interopRequireDefault(require("../vendor-owner/controller"));

var _default = {
  /**
   * @returns {Promise<Vendor[]>}
   */
  getAll: function getAll() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dataAccessObejct["default"].query(function (item) {
                return true;
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
   * @param {string} name 
   * @param {string} description 
   * @returns {Promise<string>}
   */
  create: function create(name, description) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var vendor;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              vendor = new _model["default"]("", name, description);
              _context2.next = 3;
              return _dataAccessObejct["default"].create(vendor);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
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
   * @param {string} id 
   * @param {string} name 
   * @param {string} description 
   * @returns {Promise<string>}
   */
  modify: function modify(username, password, id, name, description) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var vendorOwner, vendor;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _controller["default"].queryByUsernamePassword(username, password);

            case 2:
              vendorOwner = _context3.sent;

              if (!(vendorOwner === null)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", false);

            case 5:
              if (!(vendorOwner.vendorID === id)) {
                _context3.next = 9;
                break;
              }

              vendor = new _model["default"](id, name, description);

              _dataAccessObejct["default"].modify(vendor);

              return _context3.abrupt("return", true);

            case 9:
              return _context3.abrupt("return", false);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
exports["default"] = _default;