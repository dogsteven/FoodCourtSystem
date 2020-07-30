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

var _query$query$create$m;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebase["default"].database().ref(_configuration["default"].database["food-item"]);

var _default = (_query$query$create$m = {
  query: function query() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var foods, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              foods = {};
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var _info$categories;

                var info = child.val();
                var food = new _model["default"](child.key, info.vendorID, info.name, info.price, info.quantity, (_info$categories = info.categories) !== null && _info$categories !== void 0 ? _info$categories : [], info.description, info.photo, info.rating, info.ratingTimes);

                if (filter(food) === true) {
                  result = food;
                  return true;
                }
              });
              return _context.abrupt("return", foods);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
}, (0, _defineProperty2["default"])(_query$query$create$m, "query", function query(filter) {
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
              var _info$categories2;

              var info = child.val();
              var food = new _model["default"](child.key, info.vendorID, info.name, info.price, info.quantity, (_info$categories2 = info.categories) !== null && _info$categories2 !== void 0 ? _info$categories2 : [], info.description, info.photo, info.rating, info.ratingTimes);
              if (filter(food) === true) result.push(food);
            });
            return _context2.abrupt("return", result);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))();
}), (0, _defineProperty2["default"])(_query$query$create$m, "create", function create(item) {
  var data = _objectSpread({}, item);

  if ('id' in data) delete data.id;
  var ref = database.push();
  ref.set(data);
  return ref.key;
}), (0, _defineProperty2["default"])(_query$query$create$m, "modify", function modify(item) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var valid, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return database.child(item.id).once('value');

          case 2:
            valid = _context3.sent.exists();

            if (valid === true) {
              data = _objectSpread({}, item);
              if ('id' in data) delete data.id;
              database.child(item.id).set(data);
            }

            return _context3.abrupt("return", valid);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))();
}), (0, _defineProperty2["default"])(_query$query$create$m, "remove", function remove(id) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var valid;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return database.child(id).once('value');

          case 2:
            valid = _context4.sent.exists();
            if (valid === true) database.child(id).remove();
            return _context4.abrupt("return", valid);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }))();
}), _query$query$create$m);

exports["default"] = _default;