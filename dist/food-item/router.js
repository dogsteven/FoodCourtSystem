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
  router.get('/food-item', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res;
              _context.next = 3;
              return _controller["default"].UserService.getAllFoods();

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
}
/**
 * @param {import('express').Router} router 
 */


function ManagerService(router) {
  router.get('/manager/food-item/:vendorID', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var vendorID;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              vendorID = req.params.vendorID;
              _context2.t0 = res;
              _context2.next = 4;
              return _controller["default"].ManagerService.getFoodsByVendorID(vendorID);

            case 4:
              _context2.t1 = _context2.sent;

              _context2.t0.json.call(_context2.t0, _context2.t1);

            case 6:
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
/**
 * @param {import('express').Router} router 
 */


function run(router) {
  UserService(router);
  ManagerService(router);
}

var _default = run;
exports["default"] = _default;