"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = _interopRequireDefault(require("../firebase"));

var _configuration = _interopRequireDefault(require("../configuration.json"));

var _model = _interopRequireDefault(require("./model"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

var database = _firebase["default"].database().ref(_configuration["default"].database["food-item"]);

var _default = {
  /**
   * @param {string} id 
   * @param {number} count 
   */
};
exports["default"] = _default;