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

var mutableFields = ['password', 'email'];
var _default = {
  /** 
   * @param {(vendorOwner: VendorOwner) => boolean} filter 
   * @returns {Promise<VendorOwner?>}
   */
  queryFirst: function queryFirst(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var result, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = null;
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var _child$val = child.val(),
                    username = _child$val.username,
                    password = _child$val.password,
                    firstname = _child$val.firstname,
                    lastname = _child$val.lastname,
                    email = _child$val.email,
                    vendorID = _child$val.vendorID;

                var vendorOwner = new _model["default"](child.key, username, password, vendorID, firstname, lastname, email);

                if (filter(vendorOwner) === true) {
                  result = vendorOwner;
                  return true;
                }

                return false;
              });
              return _context.abrupt("return", result);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /** 
   * @param {(vendorOwner: VendorOwner) => boolean} filter 
   * @returns {Promise<VendorOwner[]>}
   */
  query: function query(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var result, snapshot;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = [];
              _context2.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context2.sent;
              snapshot.forEach(function (child) {
                var _child$val2 = child.val(),
                    username = _child$val2.username,
                    password = _child$val2.password,
                    firstname = _child$val2.firstname,
                    lastname = _child$val2.lastname,
                    email = _child$val2.email,
                    vendorID = _child$val2.vendorID;

                var vendorOwner = new _model["default"](child.key, username, password, vendorID, firstname, lastname, email);
                if (filter(vendorOwner) === true) result.push(vendorOwner);
              });
              return _context2.abrupt("return", result);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * @param {VendorOwner} vendorOwner 
   * @returns {Promise<String>}
   */
  create: function create(vendorOwner) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var data, ref;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = _objectSpread({}, vendorOwner);
              if ('id' in data) delete data.id;
              ref = database.push();
              ref.set(data);
              _context3.next = 6;
              return ref;

            case 6:
              return _context3.abrupt("return", _context3.sent.key);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * @param {VendorOwner} vendorOwner 
   * @returns {void}
   */
  modify: function modify(vendorOwner) {
    var data = _objectSpread({}, vendorOwner);

    if ('id' in data) delete data.id;
    database.child(vendorOwner.id).set(data);
  },

  /**
   * @param {string} id 
   * @param {string} field 
   * @param {any} value 
   * @returns {void}
   */
  modifyByField: function modifyByField(id, field, value) {
    if (mutableFields.includes(field)) database.child(id).set(value);
  },

  /**
   * @param {string} id 
   * @returns {void}
   */
  remove: function remove(id) {
    database.child(id).remove();
  }
};
exports["default"] = _default;