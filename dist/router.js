"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _firebase = _interopRequireDefault(require("./firebase"));

var _model = _interopRequireDefault(require("./food-item/model"));

var _dataAccessObject = _interopRequireDefault(require("./food-item/data-access-object"));

var _model2 = _interopRequireDefault(require("./customer/model"));

var _dataAccessObject2 = _interopRequireDefault(require("./customer/data-access-object"));

var _controller = _interopRequireDefault(require("./order/controller"));

var router = _express["default"].Router();

/* database */
router.get('/test/database/:ref', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = res;
            _context.next = 3;
            return _firebase["default"].database().ref('/' + req.params.ref).once('value');

          case 3:
            _context.t1 = _context.sent.val();

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
/* end database */

/* food-item */

/**
 * get: /api/food-item
 * data trả về ở dạng: 
 * {
 *   {
 *     id
 *     vendorID,
 *     name,
 *     price,
 *     quantity
 *     categories,
 *     description,
 *     photo
 *   }[]
 * }
 */
router.get('/food-item', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = res;
            _context2.next = 3;
            return _dataAccessObject["default"].query();

          case 3:
            _context2.t1 = _context2.sent;

            _context2.t0.json.call(_context2.t0, _context2.t1);

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
/**
 * get: /api/food-item/:id
 * :id là id của food item muốn lấy thông tin
 * Nếu id là trùng khớp thì trả về
 * {
 *   vendorID,
 *   name,
 *   price,
 *   quantity
 *   categories,
 *   description,
 *   photo
 * }
 */

router.get('/food-item/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = res;
            _context3.next = 3;
            return _dataAccessObject["default"].queryByID(req.params.id);

          case 3:
            _context3.t1 = _context3.sent;

            _context3.t0.json.call(_context3.t0, _context3.t1);

          case 5:
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
/* end food-item */

/* vendor-owner */

/* end vendor-owner */

/* customer */

router.get('/customer/:username/:password', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var username, password;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = req.params.username;
            password = req.params.password;
            _context4.t0 = res;
            _context4.next = 5;
            return _dataAccessObject2["default"].queryByUsernamePassword(username, password);

          case 5:
            _context4.t1 = _context4.sent;

            _context4.t0.json.call(_context4.t0, _context4.t1);

          case 7:
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

            _context5.t0.json.call(_context5.t0, _context5.t1);

          case 11:
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
    var username, password, newPassword, newFirstname, newLastname, newEmail, customer;
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
            customer = new _model2["default"](username, newPassword, newFirstname, newLastname, newEmail);
            _context6.t0 = res;
            _context6.next = 10;
            return _dataAccessObject2["default"].modify(username, password, email);

          case 10:
            _context6.t1 = _context6.sent;
            _context6.t2 = {
              status: _context6.t1
            };

            _context6.t0.json.call(_context6.t0, _context6.t2);

          case 13:
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

/* order for customers */

router.post('/order-customer', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var customerID, vendorID, items, customer, id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            customerID = req.body.customerID;
            vendorID = req.body.vendorID;
            items = req.body.items;
            _context7.next = 5;
            return _dataAccessObject2["default"].queryByID(customerID);

          case 5:
            customer = _context7.sent;

            if (!(customer === null)) {
              _context7.next = 10;
              break;
            }

            res.json({
              error: "Wrong customerID!"
            });
            _context7.next = 14;
            break;

          case 10:
            _context7.next = 12;
            return _controller["default"].makeOrder(vendorID, customerID, items);

          case 12:
            id = _context7.sent;
            res.json({
              error: null,
              id: id
            });

          case 14:
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
/* end order for customers */

/* order for cooks */

/* end order for cooks */

/* categories */

router.get('/categories', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.t0 = res;
            _context8.next = 3;
            return _firebase["default"].database().ref('/FoodCourt/Categories').once('value');

          case 3:
            _context8.t1 = _context8.sent.val();

            _context8.t0.json.call(_context8.t0, _context8.t1);

          case 5:
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
/* end categories */

var _default = router;
exports["default"] = _default;