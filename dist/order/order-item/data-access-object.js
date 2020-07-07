"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../cart-item/model"));

var _model2 = _interopRequireDefault(require("./model"));

var _configuration = _interopRequireDefault(require("../../configuration"));

var _firebase = _interopRequireDefault(require("../../firebase"));

var DB = _firebase["default"].database().ref(_configuration["default"].database["order-item"]);

var mutableFields = [];
/** 
 * @param {string} vendorID 
 */

function task(vendorID) {
  var database = DB.child(vendorID);
  return {
    /**
     * @param {(orderItem: OrderItem) => boolean} filter 
     * @returns {Promise<OrderItem?>}
     */
    queryFirst: function queryFirst(filter) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var snapshot, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return database.once('value');

              case 2:
                snapshot = _context.sent;
                result = null;
                snapshot.forEach(function (child) {
                  var _child$val = child.val(),
                      vendorID = _child$val.vendorID,
                      cartItems = _child$val.cartItems;

                  var orderItem = new _model2["default"](child.key, vendorID, cartItems);

                  if (filter(orderItem) === true) {
                    result = orderItem;
                    return true;
                  }

                  return false;
                });
                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * @param {(orderItem: OrderItem) => boolean} filter 
     * @returns {Promise<OrderItem[]>}
     */
    query: function query(filter) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var snapshot, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return database.once('value');

              case 2:
                snapshot = _context2.sent;
                result = [];
                snapshot.forEach(function (child) {
                  var _child$val2 = child.val(),
                      vendorID = _child$val2.vendorID,
                      cartItems = _child$val2.cartItems;

                  var orderItem = new _model2["default"](child.key, vendorID, cartItems);
                  if (filter(orderItem) === true) result.push(orderItem);
                });
                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * @param {OrderItem} orderItem 
     * @returns {Promsie<string>}
     */
    create: function create(orderItem) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var data, ref;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = {
                  id: orderItem.id,
                  cartItems: orderItem.cartItems.map(function (item) {
                    return {
                      foodItemID: item.foodItemID,
                      quantity: item.quantity
                    };
                  })
                };
                ref = database.push();
                ref.set(data);
                _context3.next = 5;
                return ref;

              case 5:
                return _context3.abrupt("return", _context3.sent.key);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * @param {OrderItem} orderItem 
     * @returns {void}
     */
    modify: function modify(orderItem) {
      var data = {
        id: orderItem.id,
        cartItems: orderItem.cartItems.map(function (item) {
          return {
            foodItemID: item.foodItemID,
            quantity: item.quantity
          };
        })
      };
      database.child(orderItem.id).set(data);
    },

    /**
     * @param {string} id 
     * @param {string} field 
     * @param {any} value 
     * @returns {void}
     */
    modifyByField: function modifyByField(id, field, value) {
      if (mutableFields.includes(field) === true) database.child(id).child(field).set(value);
    },

    /**
     * @param {string} id 
     * @returns {void}
     */
    remove: function remove(id) {
      database.child(id).remove();
    }
  };
}

var _default = task;
exports["default"] = _default;