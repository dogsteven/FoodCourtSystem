"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

/** 
 * @param {import('express').Router} router 
 */
function run(router) {
  router.get('/rating/:customerID/:foodItemID', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var customerID, foodItemID;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customerID = req.params.customerID;
              foodItemID = req.params.foodItemID;
              _context.t0 = res;
              _context.next = 5;
              return _controller["default"].queryByCustomerIDAndFoodItemID(customerID, foodItemID);

            case 5:
              _context.t1 = _context.sent;
              _context.t2 = _context.t1 !== null;
              _context.t3 = {
                exist: _context.t2
              };

              _context.t0.json.call(_context.t0, _context.t3);

            case 9:
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
  router.post('/rating/:customerID/:foodItemID/:ratingScore', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var customerID, foodItemID, ratingScore;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              customerID = req.params.customerID;
              foodItemID = req.params.foodItemID;
              ratingScore = Number(req.params.ratingScore);
              _context2.t0 = res;
              _context2.next = 6;
              return _controller["default"].createNewRating(customerID, foodItemID, ratingScore);

            case 6:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                newRatingScore: _context2.t1
              };

              _context2.t0.json.call(_context2.t0, _context2.t2);

            case 9:
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
}

var _default = run;
exports["default"] = _default;