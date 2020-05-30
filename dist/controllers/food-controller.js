"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _food = _interopRequireDefault(require("../models/food"));

var _configuredFirebase = _interopRequireDefault(require("../configured-firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FoodController = /*#__PURE__*/function () {
  function FoodController() {
    var _this = this;

    _classCallCheck(this, FoodController);

    this.foods = [];

    _configuredFirebase["default"].database().ref('/Food').once('value').then(function (snapshot) {
      snapshot.forEach(function (child) {
        _this.foods.push(new _food["default"](child.key, child.vendorID, child.name, child.price, child.description, child.picture));
      });
    });
  }

  _createClass(FoodController, [{
    key: "query",
    value: function query() {
      return this.foods;
    }
    /**
     * @param {Food} newItem 
     */

  }, {
    key: "create",
    value: function create(newItem) {
      var ref = _configuredFirebase["default"].database().ref('/Food').push();

      newItem.id = ref.key;
      ref.set(newItem.data);
      this.foods.push(newItem);
    }
    /**
     * @param {Food} item 
     */

  }, {
    key: "modify",
    value: function modify(item) {
      var id = item.id;
      var index = this.foods.findIndex(function (food) {
        return id === food.id;
      });
      if (index === -1) return false;

      _configuredFirebase["default"].database().ref('/Food').child(id).set(item.data);

      this.foods[index] = item;
      return true;
    }
    /**
     * @param {string} id 
     */

  }, {
    key: "remove",
    value: function remove(id) {
      var index = this.foods.findIndex(function (food) {
        return id === food.id;
      });
      if (index === -1) return false;

      _configuredFirebase["default"].database().ref('/Food').child(id).remove();

      this.foods.splice(index, 1);
      return true;
    }
  }]);

  return FoodController;
}();

var _default = new FoodController();

exports["default"] = _default;