"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
  /**
   * Check if customer has username = :username and password = :password exists
   * 
   */
  router.get('/customer/:username/:password', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var username, password;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context.t0 = res;
              _context.next = 5;
              return _controller["default"].UserService.queryByUsernamePassword(username, password);

            case 5:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.post('/customer', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var username, password, firstname, lastname, email, id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              username = req.body.username;
              password = req.body.password;
              firstname = req.body.firstname;
              lastname = req.body.lastname;
              email = req.body.email;
              _context2.next = 7;
              return _controller["default"].UserService.register(username, password, firstname, lastname, email);

            case 7:
              id = _context2.sent;
              if (id === null) res.json(null);else res.json({
                id: id
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.put('/customer/:username/:password', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var username, password, newPassword, newFirstname, newLastname, newEmail;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              newPassword = req.body.password;
              newFirstname = req.body.firstname;
              newLastname = req.body.lastname;
              newEmail = req.body.email;
              _context3.t0 = res;
              _context3.next = 9;
              return _controller["default"].UserService.changeProfile(username, password, newPassword, newFirstname, newLastname, newEmail);

            case 9:
              _context3.t1 = _context3.sent;
              _context3.t2 = {
                status: _context3.t1
              };

              _context3.t0.json.call(_context3.t0, _context3.t2);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  router["delete"]('/customer/:username/:password', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var username, password;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context4.t0 = res;
              _context4.next = 5;
              return _controller["default"].UserService.removeAccount(username, password);

            case 5:
              _context4.t1 = _context4.sent;
              _context4.t2 = {
                status: _context4.t1
              };

              _context4.t0.json.call(_context4.t0, _context4.t2);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
}
/**
 * @param {import('express').Router} router 
 */


function ManagerService(router) {
  router.post('/customer/:id/newRegistrationToken/:token', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, token;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              token = req.params.token;
              _context5.t0 = res;
              _context5.next = 5;
              return _controller["default"].UserService.addNewRegistrationToken(id, token);

            case 5:
              _context5.t1 = _context5.sent;
              _context5.t2 = {
                status: _context5.t1
              };

              _context5.t0.json.call(_context5.t0, _context5.t2);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
}
/**
 * @param {import('express').Router} router 
 */


function run(router) {
  UserService(router);
  ManagerService(router);
}

var _default = run;
exports["default"] = _default;