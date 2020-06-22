"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebaseAdmin["default"].database().ref(_configuration["default"].database.customer);

var _default = {
  /**
   * 
   * @param {string} username 
   * @param {string} password 
   */
  queryByUsernamePassword: function queryByUsernamePassword(username, password) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var customer, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customer = null;
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var info = child.val();

                if (info.username === username && info.password === password) {
                  customer = _objectSpread({
                    id: child.key
                  }, info);
                  if ('registrationTokens' in customer === false) customer.registrationTokens = [];
                  return true;
                }

                return false;
              });
              return _context.abrupt("return", customer);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * 
   * @param {string} id 
   */
  queryByID: function queryByID(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var customer;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return database.child(id).once('value');

            case 2:
              customer = _context2.sent.val();
              if (customer !== null && 'registrationTokens' in customer === false) customer.registrationTokens = [];
              return _context2.abrupt("return", customer);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * 
   * @param {Customer} customer 
   */
  create: function create(customer) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return database.once('value');

            case 2:
              _context3.t0 = _context3.sent;
              id = null(_context3.t0).forEach(function (child) {
                if (child.val().username === customer.username) {
                  id = child.key;
                  return true;
                }

                return false;
              });
              return _context3.abrupt("return", id);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * 
   * @param {Customer} customer 
   */
  modify: function modify(username, password, customer) {
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var info, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.queryByUsernamePassword(username, password);

            case 2:
              info = _context4.sent;

              if (!(info === null)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", false);

            case 5:
              info.password = customer.password;
              info.firstname = customer.firstname;
              info.lastname = customer.lastname;
              info.email = customer.last;
              data = _objectSpread({}, info);
              delete data.id;
              database.child(info.id).set(data);
              return _context4.abrupt("return", true);

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },

  /**
   * 
   * @param {string} id 
   * @param {string} token 
   */
  setToken: function setToken(id, token) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var ref, registrationTokensRef, registrationTokens;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              ref = database.child(id);
              _context5.next = 3;
              return ref.once('value');

            case 3:
              _context5.t0 = _context5.sent.exists();

              if (!(_context5.t0 === false)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", false);

            case 6:
              registrationTokensRef = ref.child('registrationTokens');
              _context5.next = 9;
              return registrationTokensRef.once('value');

            case 9:
              registrationTokens = _context5.sent.val();
              registrationTokens.push(token);
              registrationTokensRef.set(registrationTokens);
              return _context5.abrupt("return", true);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },

  /**
   * 
   * @param {string} id 
   */
  remove: function remove(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var ref;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ref = database.child(id);
              _context6.next = 3;
              return ref.once('value');

            case 3:
              _context6.t0 = _context6.sent.exists();

              if (!(_context6.t0 === true)) {
                _context6.next = 7;
                break;
              }

              ref.remove();
              return _context6.abrupt("return", true);

            case 7:
              return _context6.abrupt("return", false);

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
exports["default"] = _default;