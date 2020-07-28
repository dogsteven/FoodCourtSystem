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

<<<<<<< HEAD
var mutableFields = ['password', 'email'];
var _default = {
  /** 
   * @param {(vendorOwner: VendorOwner) => boolean} filter 
   * @returns {Promise<VendorOwner?>}
   */
  queryFirst: function queryFirst(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var result, snapshot;
=======
var _default = {
  /**
   * @param {string} username 
   * @param {string} password 
   */
  query: function query(username, password) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var vendorID, snapshot;
>>>>>>> origin/backhoa
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
<<<<<<< HEAD
              result = null;
=======
              vendorID = null;
>>>>>>> origin/backhoa
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
<<<<<<< HEAD
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
=======
                var info = child.val();

                if (info.username === username && info.password == password) {
                  vendorID = info.vendorID;
>>>>>>> origin/backhoa
                  return true;
                }

                return false;
              });
<<<<<<< HEAD
              return _context.abrupt("return", result);
=======
              return _context.abrupt("return", vendorID);
>>>>>>> origin/backhoa

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

<<<<<<< HEAD
  /** 
   * @param {(vendorOwner: VendorOwner) => boolean} filter 
   * @returns {Promise<VendorOwner[]>}
   */
  query: function query(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var result, snapshot;
=======
  /**
   * @param {VendorOwner} info 
   */
  create: function create(info) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var unvalid, snapshot;
>>>>>>> origin/backhoa
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
<<<<<<< HEAD
              result = [];
=======
              unvalid = false;
>>>>>>> origin/backhoa
              _context2.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context2.sent;
              snapshot.forEach(function (child) {
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/backhoa
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

<<<<<<< HEAD
  /**
   * @param {VendorOwner} vendorOwner 
   * @returns {Promise<String>}
   */
  create: function create(vendorOwner) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var data, ref;
=======
  /** 
   * @param {string} username 
   * @param {string} password 
   * @param {VendorOwner} newInfo 
   */
  modify: function modify(username, password, newInfo) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var snapshot, valid;
>>>>>>> origin/backhoa
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
<<<<<<< HEAD
              data = _objectSpread({}, vendorOwner);
              if ('id' in data) delete data.id;
              ref = database.push();
              ref.set(data);
              _context3.next = 6;
              return ref;

            case 6:
              return _context3.abrupt("return", _context3.sent.key);

            case 7:
=======
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
>>>>>>> origin/backhoa
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
<<<<<<< HEAD
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
=======
>>>>>>> origin/backhoa
  }
};
exports["default"] = _default;