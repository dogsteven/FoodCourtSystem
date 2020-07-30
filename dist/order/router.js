"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

var _model = _interopRequireDefault(require("./cart-item/model"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
  router.get('/order/:id', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var orderID;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              orderID = req.params.id;
              _context.t0 = res;
              _context.next = 4;
              return _controller["default"].queryByID(orderID);

            case 4:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 6:
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
  router.get('/order/customer/:id', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var customerID;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              customerID = req.params.id;
              _context2.t0 = res;
              _context2.next = 4;
              return _controller["default"].queryByCustomerID(customerID);

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
  router.get('/order/taked/customer/:id', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var customerID;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              customerID = req.params.id;
              _context3.t0 = res;
              _context3.next = 4;
              return _controller["default"].queryTakedOrderByCustomerID(customerID);

            case 4:
              _context3.t1 = _context3.sent;

              _context3.t0.json.call(_context3.t0, _context3.t1);

            case 6:
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
  router.post('/order', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var customerID, cartItems;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              customerID = req.body.customerID;
              cartItems = req.body.cartItems.map(function (item) {
                return new _model["default"](item.foodID, item.quantity);
              });
              _context4.t0 = res;
              _context4.next = 5;
              return _controller["default"].makeOrder(customerID, cartItems);

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
}
/**
 * @param {import('express').Router} router 
 */


function ManagerService(router) {
  router.get('/manager/unpaidorder/:vendorID', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var vendorID;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              vendorID = req.params.vendorID;
              _context5.t0 = res;
              _context5.next = 4;
              return _dataAccessObject["default"].query(function (item) {
                return item.state === 'unpaid';
              });

            case 4:
              _context5.t1 = _context5.sent;

              _context5.t0.json.call(_context5.t0, _context5.t1);

            case 6:
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
  router.get('/manager/order/paid/:id', function (req, res) {
    var orderID = req.params.id;

    var status = _controller["default"].pushToWaitingQueue(orderID);

    res.json({
      status: status
    });
  });
  router.get('/manager/order/paid/:id', function (req, res) {
    var orderID = req.params.id;

    var status = _controller["default"].pushToWaitingQueue(orderID);

    res.json({
      status: status
    });
  });
  router.get('/manager/order/cook/:vendorID', function (req, res) {
    var vendorID = req.params.vendorID;

    var status = _controller["default"].popFirstOrderFromWaitingQueueToCookingQueue(vendorID);

    res.json({
      status: status
    });
  });
  router.get('/manager/order/complete/:vendorID/:id', /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var vendorID, orderID, status;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              vendorID = req.params.vendorID;
              orderID = req.params.id;
              status = _controller["default"].completeCooking(vendorID, orderID);
              res.json({
                status: status
              });

            case 4:
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
  router.get('/manager/order/take/:vendorID/:id', /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var vendorID, orderID, status;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              vendorID = req.params.vendorID;
              orderID = req.params.id;
              status = _controller["default"].popOrderFromCompletedList(vendorID, orderID);
              res.json({
                status: status
              });

            case 4:
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
  router.get('/manager/order/take/:vendorID/:id', /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var vendorID, orderID, status;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              vendorID = req.params.vendorID;
              orderID = req.params.id;
              status = _controller["default"].popOrderFromCompletedList(vendorID, orderID);
              res.json({
                status: status
              });

            case 4:
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