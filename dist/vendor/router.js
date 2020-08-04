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
  router.get('/vendor', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res;
              _context.next = 3;
              return _controller["default"].getAll();

            case 3:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 5:
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
  router.post('/vendor', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var name, description;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              name = req.body.name;
              description = req.body.description;
              _context2.t0 = res;
              _context2.next = 5;
              return _controller["default"].create(name, description);

            case 5:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                id: _context2.t1
              };

              _context2.t0.json.call(_context2.t0, _context2.t2);

            case 8:
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
  router.put('/vendor/:username/:password', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var username, password, id, name, description;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              id = req.body.id;
              name = req.body.name;
              description = req.body.description;
              _context3.t0 = res;
              _context3.next = 8;
              return _controller["default"].modify(username, password, id, name, description);

            case 8:
              _context3.t1 = _context3.sent;
              _context3.t2 = {
                status: _context3.t1
              };

              _context3.t0.json.call(_context3.t0, _context3.t2);

            case 11:
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
}

var _default = run;
exports["default"] = _default;