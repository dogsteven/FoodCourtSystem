"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _default =
/**
 * @param {string} id
 * @param {string} username 
 * @param {string} password 
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {string} email 
 */
function _default(id, username, password, firstname, lastname, email) {
  (0, _classCallCheck2["default"])(this, _default);
  this.id = id;
  this.username = username;
  this.password = password;
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
  this.registrationTokens = [];
};

exports["default"] = _default;