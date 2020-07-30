"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebase = _interopRequireDefault(require("./firebase"));

var _configuration = _interopRequireDefault(require("./configuration"));

var _controller = _interopRequireDefault(require("./food-item/controller"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebase["default"].database().ref(_configuration["default"].database.categories);

var Controller = {
  /**
   * @returns {Promise<string[]>}
   */
  query: function query() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var result, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = [];
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                result.push(child.val());
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
   * @param {string} category 
   * @returns {Promise<boolean>}
   */
  addNewCategories: function addNewCategories(category) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var valid, counter, snapshot;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              valid = true;
              counter = 0;
              _context2.next = 4;
              return database.once('value');

            case 4:
              snapshot = _context2.sent;
              snapshot.forEach(function (child) {
                if (child.val() === category) {
                  valid = false;
                  return true;
                }

                counter += 1;
                return false;
              });
              if (valid) database.child(counter).set(category);
              return _context2.abrupt("return", valid);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
/**
 * 
 * @param {import('express').Router} router 
 */

function run(router) {
  router.get('/categories', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = res;
              _context3.next = 3;
              return Controller.query();

            case 3:
              _context3.t1 = _context3.sent;

              _context3.t0.json.call(_context3.t0, _context3.t1);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}

var _default = _objectSpread({
  /**
   * @param {import('express').Router} router 
   */
  Router: function Router(router) {
    run(router);
  }
}, Controller);

exports["default"] = _default;