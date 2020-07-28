"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _controller = _interopRequireDefault(require("./controller"));

var _controller2 = _interopRequireDefault(require("../vendor-owner/controller"));

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
  router.get('/food-item', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res;
              _context.next = 3;
              return _controller["default"].UserService.getAllFoods();

            case 3:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}
/**
 * @param {import('express').Router} router 
 */


function ManagerService(router) {
  router.get('/manager/food-item/:vendorID', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var vendorID;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              vendorID = req.params.vendorID;
              _context2.t0 = res;
              _context2.next = 4;
              return _controller["default"].ManagerService.getFoodsByVendorID(vendorID);

            case 4:
              _context2.t1 = _context2.sent;

              _context2.t0.json.call(_context2.t0, _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.post('/manager/food-item/:username/:password', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var username, password, vendorOwner, name, price, quantity, categories, description, photo, id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context3.next = 4;
              return _controller2["default"].queryByUsernamePassword(username, password);

            case 4:
              vendorOwner = _context3.sent;

              if (!(vendorOwner !== null)) {
                _context3.next = 18;
                break;
              }

              name = req.body.name;
              price = Number(req.body.price);
              quantity = Number(req.body.quantity);
              categories = req.body.categories;
              description = req.body.description;
              photo = req.body.photo;
              _context3.next = 14;
              return _controller["default"].ManagerService.addNewFood(vendorOwner.vendorID, name, price, quantity, categories, description, photo);

            case 14:
              id = _context3.sent;
              res.json({
                status: true,
                id: id
              });
              _context3.next = 19;
              break;

            case 18:
              res.json({
                status: false
              });

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()), router.put('/manager/food-item/:username/:password/:id', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var username, password, vendorOwner, id, name, price, categories, description, photo, status;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context4.next = 4;
              return _controller2["default"].queryByUsernamePassword(username, password);

            case 4:
              vendorOwner = _context4.sent;

              if (!(vendorOwner !== null)) {
                _context4.next = 18;
                break;
              }

              id = req.params.id;
              name = req.body.name;
              price = Number(req.body.price);
              categories = req.body.categories;
              description = req.body.description;
              photo = req.body.photo;
              _context4.next = 14;
              return _controller["default"].ManagerService.changeFoodItemInformation(vendorOwner.vendorID, id, name, price, categories, description, photo);

            case 14:
              status = _context4.sent;
              res.json({
                status: status
              });
              _context4.next = 19;
              break;

            case 18:
              res.json({
                status: false
              });

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  router.put('/manager/food-item/:username/:password/:id/increaseQuantity/:amount', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var username, password, vendorOwner, id, amount, status;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context5.next = 4;
              return _controller2["default"].queryByUsernamePassword(username, password);

            case 4:
              vendorOwner = _context5.sent;

              if (!(vendorOwner !== null)) {
                _context5.next = 14;
                break;
              }

              id = req.params.id;
              amount = Number(req.params.amount);
              _context5.next = 10;
              return _controller["default"].ManagerService.increaseQuantity(vendorOwner.vendorID, id, amount);

            case 10:
              status = _context5.sent;
              res.json({
                status: status
              });
              _context5.next = 15;
              break;

            case 14:
              res.json({
                status: false
              });

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  router["delete"]('/manager/food-item/:username/:password/:id', /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var username, password, vendorOwner, id;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context6.next = 4;
              return _controller2["default"].queryByUsernamePassword(username, password);

            case 4:
              vendorOwner = _context6.sent;

              if (!(vendorOwner !== null)) {
                _context6.next = 15;
                break;
              }

              id = req.params.id;
              _context6.t0 = res;
              _context6.next = 10;
              return _controller["default"].ManagerService.removeFood(vendorOwner.vendorID, id);

            case 10:
              _context6.t1 = _context6.sent;
              _context6.t2 = {
                status: _context6.t1
              };

              _context6.t0.json.call(_context6.t0, _context6.t2);

              _context6.next = 16;
              break;

            case 15:
              res.json({
                status: false
              });

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
}
/**
 * @param {import('express').Router} router 
 */


function run(router) {
  UserService(router);
  ManagerService(router);
}

var _default = run;
exports["default"] = _default;