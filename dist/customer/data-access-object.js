"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebaseAdmin["default"].database().ref(_configuration["default"].database.customer);

var mutableFiels = ['password', 'email', 'firstname', 'lastname', 'registrationTokens'];
var _default = {
  /**
   * @param {(customer: Customer) => boolean} filter
   * @returns {Promise<Customer?>}
   */
  queryFirst: function queryFirst(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var result, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof filter !== 'function')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", null);

            case 2:
              result = null;
              _context.next = 5;
              return database.once('value');

            case 5:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var _child$val = child.val(),
                    username = _child$val.username,
                    password = _child$val.password,
                    firstname = _child$val.firstname,
                    lastname = _child$val.lastname,
                    email = _child$val.email,
                    registrationTokens = _child$val.registrationTokens;

                var customer = new _model["default"](child.key, username, password, firstname, lastname, email, registrationTokens !== null && registrationTokens !== void 0 ? registrationTokens : []);

                if (filter(customer) === true) {
                  result = customer;
                  return true;
                }

                return false;
              });
              return _context.abrupt("return", result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {(customer: Customer) => boolean} filter
   * @returns {Promise<Customer[]>}
   */
  query: function query(filter) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof filter !== 'function')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", null);

            case 2:
              result = [];
              snapshot.forEach(function (child) {
                var _child$val2 = child.val(),
                    username = _child$val2.username,
                    password = _child$val2.password,
                    firstname = _child$val2.firstname,
                    lastname = _child$val2.lastname,
                    email = _child$val2.email,
                    registrationTokens = _child$val2.registrationTokens;

                var customer = new _model["default"](child.key, username, password, firstname, lastname, email, registrationTokens !== null && registrationTokens !== void 0 ? registrationTokens : []);
                if (filter(customer) === true) result.push(customer);
              });
              return _context2.abrupt("return", result);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * @param {Customer} customer 
   * @returns {Promise<string?>}
   */
  create: function create(customer) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var ref, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              ref = database.push();
              data = _objectSpread({}, customer);
              if ('id' in data) delete data.id;
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
   * @param {Customer} customer 
   * @returns {void}
   */
  modify: function modify(customer) {
    var data = _objectSpread({}, customer);

    if ('id' in data) delete data.id;
    database.child(customer.id).set(data);
  },

  /**
   * @param {string} id 
   * @param {string} field 
   * @param {any} value 
   */
  modifyByField: function modifyByField(id, field, value) {
    if (mutableFiels.includes(field)) database.child(id).child(field).set(value);
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