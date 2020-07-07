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
function run(router) {
  router.get('/vendor-owner/:username/:password', /*#__PURE__*/function () {
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
              return _controller["default"].queryByUsernamePassword(username, password);

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
  router.post('/vendor-owner/:key', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var key, username, password, vendorID, firstname, lastname, email, id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              key = req.params.key;
              username = req.body.username;
              password = req.body.password;
              vendorID = req.body.vendorID;
              firstname = req.body.firstname;
              lastname = req.body.lastname;
              email = req.body.lastname;
              _context2.next = 9;
              return _controller["default"].register(username, password, vendorID, firstname, lastname, email);

            case 9:
              id = _context2.sent;
              if (id === null) res.json(null);else res.json({
                id: id
              });

            case 11:
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
}

var _default = run;
exports["default"] = _default;