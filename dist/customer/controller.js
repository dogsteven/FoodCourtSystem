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
  UserService: {
    /**
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<Customer?>}
     */
    queryByUsernamePassword: function queryByUsernamePassword(username, password) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dataAccessObject["default"].queryFirst(function (customer) {
                  return customer.username === username && customer.password === password;
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
     * @param {Customer} newCustomer 
     * @returns {Promise<string?>}
     */
    register: function register(username, password, firstname, lastname, email) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var customer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dataAccessObject["default"].queryFirst(function (customer) {
                  return customer.username === username;
                });

              case 2:
                _context2.t0 = _context2.sent;

                if (!(_context2.t0 !== null)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", null);

              case 5:
                customer = new _model["default"]("", username, password, firstname, lastname, email);
                _context2.next = 8;
                return _dataAccessObject["default"].create(customer);

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
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
     * @param {string} newPassword 
     * @param {string} newFirstname 
     * @param {string} newLastname 
     * @param {string} newEmail 
     * @returns {Promise<boolean>}
     */
    changeProfile: function changeProfile(username, password, newPassword, newFirstname, newLastname, newEmail) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var customer;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _dataAccessObject["default"].queryFirst(function (customer) {
                  return customer.username === username && customer.password === password;
                });

              case 2:
                customer = _context3.sent;

                if (!(customer === null)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", false);

              case 5:
                customer.password = newPassword;
                customer.firstname = newFirstname;
                customer.lastname = newLastname;
                customer.email = newEmail;

                _dataAccessObject["default"].modify(customer);

                return _context3.abrupt("return", true);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * @param {string} username 
     * @param {string} password 
     * @param {Promise<boolean>}
     */
    removeAccount: function removeAccount(username, password) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var customer;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _dataAccessObject["default"].queryFirst(function (customer) {
                  return customer.username === username && customer.password === password;
                });

              case 2:
                customer = _context4.sent;

                if (!(customer === null)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", false);

              case 5:
                _dataAccessObject["default"].remove(customer.id);

                return _context4.abrupt("return", true);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },

    /**
     * @param {string} token 
     * @returns {Promise<boolean>}
     */
    addNewRegistrationToken: function addNewRegistrationToken(id, token) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var customer, newTokens;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _dataAccessObject["default"].queryFirst(function (customer) {
                  return customer.id === id;
                });

              case 2:
                customer = _context5.sent;

                if (!(customer === null)) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", false);

              case 5:
                newTokens = customer.registrationTokens + [token];

                _dataAccessObject["default"].modifyByField(id, 'registrationTokens', newTokens);

                return _context5.abrupt("return", true);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  },
  ManagerService: {}
};
exports["default"] = _default;