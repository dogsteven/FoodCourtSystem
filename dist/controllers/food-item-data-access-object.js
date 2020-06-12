"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _foodItem = _interopRequireDefault(require("../models/food-item"));

var _configuratedFirebase = _interopRequireDefault(require("../configurated-firebase"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FoodItemDAO = /*#__PURE__*/function () {
  function FoodItemDAO() {
    (0, _classCallCheck2["default"])(this, FoodItemDAO);
  }

  (0, _createClass2["default"])(FoodItemDAO, [{
    key: "query",
    value: function () {
      var _query = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var snapshot;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _configuratedFirebase["default"].database().ref('/Food').once('value');

              case 2:
                snapshot = _context.sent;
                return _context.abrupt("return", snapshot.val());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function query() {
        return _query.apply(this, arguments);
      }

      return query;
    }()
    /**
     * @param {string} id 
     */

  }, {
    key: "queryByID",
    value: function () {
      var _queryByID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var item, snapshot;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = null;
                _context2.next = 3;
                return _configuratedFirebase["default"].database().ref('/Food').once('value');

              case 3:
                snapshot = _context2.sent;
                snapshot.forEach(function (child) {
                  if (child.key === id) {
                    item = _objectSpread({}, child.val());
                    return true;
                  }

                  return false;
                });
                return _context2.abrupt("return", item);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function queryByID(_x) {
        return _queryByID.apply(this, arguments);
      }

      return queryByID;
    }()
    /**
     * @param {FoodItem} item 
     */

  }, {
    key: "create",
    value: function create(item) {
      var ref = _configuratedFirebase["default"].database().ref('/Food').push();

      item.id = ref.key;
      this.foods.push(item);

      var data = _objectSpread({}, item);

      delete data.id;
      ref.set(data);
      return ref.key;
    }
    /**
     * @param {FoodItem} item 
     */

  }, {
    key: "modify",
    value: function modify(item) {
      var index = this.foods.findIndex(function (val) {
        return val.id === item.id;
      });

      if (index >= 0) {
        this.foods[index] = item;

        var data = _objectSpread({}, item);

        delete data.id;

        _configuratedFirebase["default"].database().ref('/Food').child(item.id).set(data);

        return true;
      }

      return false;
    }
    /**
     * @param {string} id 
     */

  }, {
    key: "remove",
    value: function remove(id) {
      var index = this.foods.findIndex(function (val) {
        return val.id === id;
      });

      if (index >= 0) {
        this.foods.splice(index, 1);

        _configuratedFirebase["default"].database().ref('/Food').child(id).remove();

        return true;
      }

      return false;
    }
  }]);
  return FoodItemDAO;
}();

var _default = new FoodItemDAO();

exports["default"] = _default;