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

var _express = require("express");

var _default = {
  Firebase: {
    query: function query(req, res) {
      var ref = req.params.ref;
      if (ref === undefined) res.json({
        status: 'failed'
      });

      _configuratedFirebase["default"].database().ref('/' + ref).once('value', function (snapshot) {
        res.json(snapshot.val());
      });
    }
  },
  Food: {
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
      var vendorID = req.body.vendorID;
      var name = req.body.name;
      var price = req.body.price;
      var quantity = req.body.quantity;
      var categories = req.body.categories;
      var description = req.body.description;
      var photo = req.body.photo;
      var item = new _foodItem["default"]("", vendorID, name, price, quantity, categories, description, photo);

      var id = _foodItemDataAccessObject["default"].create(item);

      res.json({
        id: id
      });
    },
    modify: function modify(req, res) {
      var id = req.body.id;
      var vendorID = req.body.vendorID;
      var name = req.body.name;
      var price = req.body.price;
      var quantity = req.body.quantity;
      var categories = req.body.categories;
      var description = req.body.description;
      var photo = req.body.photo;
      var item = new _foodItem["default"](id, vendorID, name, price, quantity, categories, description, photo);

      var status = _foodItemDataAccessObject["default"].modify(item);

      res.json({
        status: status
      });
    },
    remove: function remove(req, res) {
      var id = req.params.id;

      var status = _foodItemDataAccessObject["default"].remove(id);

      res.json({
        status: status
      });
    }
  }
};
exports["default"] = _default;