"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
  router.post('/order', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var customerID, cartItems;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customerID = req.body.customerID;
              cartItems = req.body.cartItems;
              _context.t0 = res;
              _context.next = 5;
              return _controller["default"].makeNewOrder(customerID, cartItems);

            case 5:
              _context.t1 = _context.sent;
              _context.t2 = {
                id: _context.t1
              };

              _context.t0.json.call(_context.t0, _context.t2);

            case 8:
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
  router.get('/order/:id', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.t0 = res;
              _context2.next = 4;
              return _controller["default"].getOrderByID(id);

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
  router.get('/order/customer/:id', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.t0 = res;
              _context3.next = 4;
              return _controller["default"].getOrderbyCustomerID(id);

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
}
/**
 * @param {import('express').Router} router 
 */


function ManagerService(router) {
  router.get('/manager/order/paid/:id', function (req, res) {
    var id = req.params.id;

    var status = _controller["default"].pushOrderFromUnpaidToWaitingQueue(id);

    res.json({
      status: status
    });
  });
  router.get('/manager/order/cook/:vendorID', function (req, res) {
    var vendorID = req.params.vendorID;

    var status = _controller["default"].popOrderFromWaitingQueueToCookingQueue(vendorID);

    res.json({
      status: status
    });
  });
  router.get('/manager/order/complete/:vendorID/:id', function (req, res) {
    var vendorID = req.params.vendorID;
    var id = req.params.id;

    var status = _controller["default"].popOrderFromCookingQueue(vendorID, id);

    res.json({
      status: status
    });
  });
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