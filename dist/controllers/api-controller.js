"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _food = _interopRequireDefault(require("../models/food"));

var _foodController = _interopRequireDefault(require("./food-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Food: {
    query: function query(req, res) {
      res.json(_foodController["default"].query());
    },
    create: function create(req, res) {
      var vendorID = req.body.vendorID;
      var name = req.body.name;
      var price = req.body.price;
      var description = req.body.description;
      var picture = req.body.picture;
      var newItem = new _food["default"](vendorID, name, price, description, picture);

      _foodController["default"].create(newItem);

      res.json({
        status: 'ok'
      });
    },
    modify: function modify(req, res) {
      var id = req.body.id;
      var vendorID = req.body.vendorID;
      var name = req.body.name;
      var price = req.body.price;
      var description = req.body.description;
      var picture = req.body.picture;
      var item = new _food["default"](vendorID, name, price, description, picture);

      var status = _foodController["default"].modify(id, item);

      res.json({
        status: status === true ? 'ok' : 'failed'
      });
    },
    remove: function remove(req, res) {
      var id = req.body.id;

      var status = _foodController["default"].remove(id);

      res.json({
        status: status === true ? 'ok' : 'failed'
      });
    }
  }
};
exports["default"] = _default;