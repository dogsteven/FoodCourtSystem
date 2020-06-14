"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _foodItem = _interopRequireDefault(require("../models/food-item"));

var _foodItemDataAccessObject = _interopRequireDefault(require("./food-item-data-access-object"));

var _configuratedFirebase = _interopRequireDefault(require("../configurated-firebase"));

var _module = {};
_module.Firebase = {
  query: function query(req, res) {
    var ref = req.params.ref;
    if (ref === undefined) res.json({
      status: 'failed'
    });

    _configuratedFirebase["default"].database().ref('/' + ref).once('value', function (snapshot) {
      res.json(snapshot.val());
    });
  }
};
_module.Food = {
  query: function query(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res;
              _context.next = 3;
              return _foodItemDataAccessObject["default"].query();

            case 3:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  queryByID: function queryByID(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.t0 = res;
              _context2.next = 4;
              return _foodItemDataAccessObject["default"].queryByID(id);

            case 4:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                item: _context2.t1
              };

              _context2.t0.json.call(_context2.t0, _context2.t2);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  create: function create(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var vendorID, name, price, quantity, categories, description, photo, item, id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              vendorID = req.body.vendorID;
              name = req.body.name;
              price = req.body.price;
              quantity = req.body.quantity;
              categories = req.body.categories;
              description = req.body.description;
              photo = req.body.photo;
              item = new _foodItem["default"]("", vendorID, name, price, quantity, categories, description, photo);
              _context3.next = 10;
              return _foodItemDataAccessObject["default"].create(item);

            case 10:
              id = _context3.sent;
              res.json({
                key: id
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  modify: function modify(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var id, vendorID, name, price, quantity, categories, description, photo, item, status;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.body.id;
              vendorID = req.body.vendorID;
              name = req.body.name;
              price = req.body.price;
              quantity = req.body.quantity;
              categories = req.body.categories;
              description = req.body.description;
              photo = req.body.photo;
              item = new _foodItem["default"](id, vendorID, name, price, quantity, categories, description, photo);
              _context4.next = 11;
              return _foodItemDataAccessObject["default"].modify(item);

            case 11:
              status = _context4.sent;
              res.json({
                status: status
              });

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  remove: function remove(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var id, status;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.next = 3;
              return _foodItemDataAccessObject["default"].remove(id);

            case 3:
              status = _context5.sent;
              res.json({
                status: status
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
var _default = _module;
exports["default"] = _default;