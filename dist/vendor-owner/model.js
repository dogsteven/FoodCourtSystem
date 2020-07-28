"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

<<<<<<< HEAD
var _default =
/**
 * @param {string} id
=======
var _express = _interopRequireDefault(require("express"));

var _default =
/**
>>>>>>> origin/backhoa
 * @param {string} username
 * @param {string} password
 * @param {string} vendorID
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 */
<<<<<<< HEAD
function _default(id, username, password, vendorID, firstname, lastname, email) {
  (0, _classCallCheck2["default"])(this, _default);
  this.id = id;
=======
function _default(username, password, vendorID, firstname, lastname, email) {
  (0, _classCallCheck2["default"])(this, _default);
>>>>>>> origin/backhoa
  this.username = username;
  this.password = password;
  this.vendorID = vendorID;
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
};

exports["default"] = _default;