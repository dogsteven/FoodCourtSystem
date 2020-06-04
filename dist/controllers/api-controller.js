"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _food = _interopRequireDefault(require("../models/food"));

var _foodController = _interopRequireDefault(require("./food-controller"));

var _configuratedFirebase = _interopRequireDefault(require("../configurated-firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      res.json(_foodController["default"].query());
    },
    create: function create(req, res) {
      var vendorID = req.body.vendorID;
      var name = req.body.name;
      var price = req.body.price;
      var description = req.body.description;
      var picture = req.body.picture;
      var newItem = new _food["default"](vendorID, name, price, description, picture);
      res.json({
        key: _foodController["default"].create(newItem)
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