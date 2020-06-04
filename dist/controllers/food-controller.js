"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _food = _interopRequireDefault(require("../models/food"));

var _configuratedFirebase = _interopRequireDefault(require("../configurated-firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FoodController = /*#__PURE__*/function () {
  function FoodController() {
    var _this = this;

    _classCallCheck(this, FoodController);

    this.foods = {};

    _configuratedFirebase["default"].database().ref('/Food').once('value').then(function (snapshot) {
      snapshot.forEach(function (child) {
        _this.foods[child.key] = child.val();
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
      var ref = _configuratedFirebase["default"].database().ref('/Food').push();

      ref.set(newItem);
      this.foods[ref.key] = newItem;
      return ref.key;
    }
    /**
     * @param {string} id
     * @param {Food} item 
     */

  }, {
    key: "modify",
    value: function modify(id, item) {
      if (id in this.foods === false) return true;

      _configuratedFirebase["default"].database().ref('/Food').child(id).set(item);

      this.foods[id] = item;
      return true;
    }
    /**
     * @param {string} id 
     */

  }, {
    key: "remove",
    value: function remove(id) {
      if (id in this.foods === false) return false;

      _configuratedFirebase["default"].database().ref('/Food').child(id).remove();

      delete this.foods[id];
      return true;
    }
  }]);

  return FoodController;
}();

var _default = new FoodController();

exports["default"] = _default;