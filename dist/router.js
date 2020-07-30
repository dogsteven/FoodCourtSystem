"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./food-item/router"));

var _router2 = _interopRequireDefault(require("./customer/router"));

var _router3 = _interopRequireDefault(require("./order/router"));

var _router4 = _interopRequireDefault(require("./vendor-owner/router"));

var _categories = _interopRequireDefault(require("./categories"));

var _router5 = _interopRequireDefault(require("./image-item/router"));

var _router6 = _interopRequireDefault(require("./vendor/router"));

var _router7 = _interopRequireDefault(require("./rating/router"));

var _model = _interopRequireDefault(require("./vendor-owner/model"));

var _dataAccessObject = _interopRequireDefault(require("./vendor-owner/data-access-object"));

var _model2 = _interopRequireDefault(require("./customer/model"));

var _dataAccessObject2 = _interopRequireDefault(require("./customer/data-access-object"));

var _controller = _interopRequireDefault(require("./food-item/controller"));

var _dataAccessObject3 = _interopRequireDefault(require("./order/data-access-object"));

var _controller2 = _interopRequireDefault(require("./order/controller"));

var router = _express["default"].Router();

router.get('/', function (req, res) {
  res.end('hello');
});
(0, _router["default"])(router);
(0, _router2["default"])(router);
(0, _router3["default"])(router);
(0, _router4["default"])(router);
(0, _router5["default"])(router);
(0, _router6["default"])(router);
(0, _router7["default"])(router);

_categories["default"].Router(router);

router.get('/categories', function (req, res) {
  var item = new FoodItem("", vendorID, name, price, quantity, categories, description, photo);
  var id = FoodItemDataAccessObject.create(item);
  res.json({
    key: id
  });
});
router.put('/food-item/:id', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, vendorID, name, price, quantity, categories, description, photo, item, status;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            vendorID = req.body.vendorID;
            name = req.body.name;
            price = req.body.price;
            quantity = req.body.quantity;
            categories = req.body.categories;
            description = req.body.description;
            photo = req.body.photo;
            item = new FoodItem(id, vendorID, name, price, quantity, categories, description, photo);
            _context.next = 11;
            return FoodItemDataAccessObject.modify(item);

          case 11:
            status = _context.sent;
            res.json({
              status: status
            });

          case 13:
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
router["delete"]('/food-item/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, status;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return FoodItemDataAccessObject.remove(id);

          case 3:
            status = _context2.sent;
            res.json({
              status: status
            });

          case 5:
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
/* end food-item */

/* vendor-owner */

router.get('/customer/:username/:password', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var username, password;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            username = req.params.username;
            password = req.params.password;
            _context3.t0 = res;
            _context3.next = 5;
            return _dataAccessObject2["default"].queryByUsernamePassword(username, password);

          case 5:
            _context3.t1 = _context3.sent;

            _context3.t0.json.call(_context3.t0, _context3.t1);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/customer/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.t0 = res;
            _context4.next = 4;
            return _dataAccessObject2["default"].queryByID(id);

          case 4:
            _context4.t1 = _context4.sent;

            _context4.t0.json.call(_context4.t0, _context4.t1);

          case 6:
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
router.post('/customer', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var username, password, firstname, lastname, email, customer;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = req.body.username;
            password = req.body.password;
            firstname = req.body.firstname;
            lastname = req.body.lastname;
            email = req.body.email;
            customer = new _model2["default"]("", username, password, firstname, lastname, email);
            _context5.t0 = res;
            _context5.next = 9;
            return _dataAccessObject2["default"].create(customer);

          case 9:
            _context5.t1 = _context5.sent;
            _context5.t2 = {
              id: _context5.t1
            };

            _context5.t0.json.call(_context5.t0, _context5.t2);

          case 12:
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
router.put('/customer/:username/:password', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var username, password, newPassword, newFirstname, newLastname, newEmail, info, customer;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            username = req.params.username;
            password = req.params.password;
            newPassword = req.body.password;
            newFirstname = req.body.firstname;
            newLastname = req.body.lastname;
            newEmail = req.body.email;
            _context6.next = 8;
            return _dataAccessObject2["default"].queryByUsernamePassword(username, password);

          case 8:
            info = _context6.sent;

            if (info !== null) {
              customer = new _model2["default"](info.id, username, newPassword, newFirstname, newLastname, newEmail);

              _dataAccessObject2["default"].modify(customer);

              res.json({
                statis: true
              });
            } else {
              res.json({
                status: false
              });
            }

          case 10:
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
/* end customer */

/** start manager */

router.get('/manager/food-item/:vendorID', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var vendorID;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            vendorID = req.params.vendorID;
            _context7.t0 = res;
            _context7.next = 4;
            return _controller["default"].ManagerService.getFoodsByVendorID(vendorID);

          case 4:
            _context7.t1 = _context7.sent;

            _context7.t0.json.call(_context7.t0, _context7.t1);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/manager/unpaidorder/:vendorID', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var vendorID;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            vendorID = req.params.vendorID;
            _context8.t0 = res;
            _context8.next = 4;
            return _dataAccessObject3["default"].query(function (item) {
              return true;
            });

          case 4:
            _context8.t1 = _context8.sent;

            _context8.t0.json.call(_context8.t0, _context8.t1);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.get('/manager/order/paid/:id', function (req, res) {
  var orderID = req.params.id;

  var status = _controller2["default"].pushToWaitingQueue(orderID);

  res.json({
    status: status
  });
});
router.get('/manager/order/cook/:vendorID', function (req, res) {
  var vendorID = req.params.vendorID;

  var status = _controller2["default"].popFirstOrderFromWaitingQueueToCookingQueue(vendorID);

  res.json({
    status: status
  });
});
router.get('/manager/order/complete/:vendorID/:id', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var vendorID, orderID, status;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            vendorID = req.params.vendorID;
            orderID = req.params.id;
            status = _controller2["default"].completeCooking(vendorID, orderID);
            res.json({
              status: status
            });

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.get('/manager/order/take/:vendorID/:id', /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var vendorID, orderID, status;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            vendorID = req.params.vendorID;
            orderID = req.params.id;
            status = _controller2["default"].popOrderFromCompletedList(vendorID, orderID);
            res.json({
              status: status
            });

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
/** end man */

var _default = router;
exports["default"] = _default;