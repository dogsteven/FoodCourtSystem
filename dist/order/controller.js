"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _model = _interopRequireDefault(require("./cart-item/model"));

var _model2 = _interopRequireDefault(require("./order-item/model"));

var _model3 = _interopRequireDefault(require("./model"));

var _dataAccessObject = _interopRequireDefault(require("./order-item/data-access-object"));

var _dataAccessObject2 = _interopRequireDefault(require("./data-access-object"));

var _controller = _interopRequireDefault(require("../food-item/controller"));

var _controller2 = _interopRequireDefault(require("../customer/controller"));

var Controller = /*#__PURE__*/function () {
  function Controller() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Controller);
    this.unpaidOrders = [];
    this.waitingQueue = {};
    this.cookingQueue = {};
    this.completedList = {};

    _dataAccessObject2["default"].query(function (o) {
      return o.state === 'unpaid';
    }).then(function (orders) {
      for (var i in orders) {
        _this.unpaidOrders.push(orders[i]);
      }
    });
  }
  /**
   * @param {string} vendorID 
   * @returns {Order[]}
   */


  (0, _createClass2["default"])(Controller, [{
    key: "getWaitingQueue",
    value: function getWaitingQueue(vendorID) {
      if (vendorID in this.waitingQueue === false) this.waitingQueue[vendorID] = [];
      return this.waitingQueue[vendorID];
    }
    /**
     * @param {string} vendorID 
     * @returns {Order[]}
     */

  }, {
    key: "getCookingQueue",
    value: function getCookingQueue(vendorID) {
      if (vendorID in this.cookingQueue === false) this.cookingQueue[vendorID] = [];
      return this.cookingQueue[vendorID];
    }
    /**
     * @param {string} vendorID 
     * @returns {Order[]}
     */

  }, {
    key: "getCompletedList",
    value: function getCompletedList(vendorID) {
      if (vendorID in this.completedList === false) this.completedList[vendorID] = [];
      return this.completedList[vendorID];
    }
    /**
     * @param {string} orderID 
     * @returns {Promise<{ error: string, info: { orderItem: OrderItem, state: string }[]>} 
     */

  }, {
    key: "queryByID",
    value: function () {
      var _queryByID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(orderID) {
        var _this2 = this;

        var order, orderItems, info, _loop, i, _ret;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dataAccessObject2["default"].queryFirst(function (item) {
                  return item.id === orderID;
                });

              case 2:
                order = _context.sent;

                if (!(order === null)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  error: 'Order with id ' + orderID + ' is not exist!',
                  info: null
                });

              case 5:
                _context.next = 7;
                return order.makeOrderItems();

              case 7:
                orderItems = _context.sent;

                if (!(order.state === 'unpaid')) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  error: null,
                  info: orderItems.map(function (orderItem) {
                    return {
                      orderItem: orderItem,
                      state: 'unpaid'
                    };
                  })
                });

              case 10:
                info = [];

                _loop = function _loop(i) {
                  var vendorID = orderItems[i].vendorID;

                  if (vendorID in _this2.waitingQueue) {
                    var index = _this2.waitingQueue[vendorID].findIndex(function (item) {
                      return item.id === orderItems[i].id;
                    });

                    if (index !== -1) {
                      info.push({
                        orderItem: orderItems[i],
                        state: 'waiting'
                      });
                      return "continue";
                    }
                  }

                  if (vendorID in _this2.cookingQueue) {
                    var _index = _this2.cookingQueue[vendorID].findIndex(function (item) {
                      return item.id === orderItems[i].id;
                    });

                    if (_index !== -1) {
                      info.push({
                        orderItem: orderItems[i],
                        state: 'cooking'
                      });
                      return "continue";
                    }
                  }

                  if (vendorID in _this2.completedList) {
                    var _index2 = _this2.completedList[vendorID].findIndex(function (item) {
                      return item.id === orderItems[i].id;
                    });

                    if (_index2 !== -1) {
                      info.push({
                        orderItem: orderItems[i],
                        state: 'completed'
                      });
                      return "continue";
                    }
                  }

                  info.push({
                    orderItem: orderItems[i],
                    state: 'taked'
                  });
                };

                _context.t0 = _regenerator["default"].keys(orderItems);

              case 13:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 20;
                  break;
                }

                i = _context.t1.value;
                _ret = _loop(i);

                if (!(_ret === "continue")) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("continue", 13);

              case 18:
                _context.next = 13;
                break;

              case 20:
                return _context.abrupt("return", {
                  error: null,
                  info: info
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function queryByID(_x) {
        return _queryByID.apply(this, arguments);
      }

      return queryByID;
    }()
    /**
     * @param {string} customerID 
     * @returns {Promise<{ error: string?, body: { id: string, info: { orderItem: OrderItem, state: string }[] }[] }>}
     */

  }, {
    key: "queryByCustomerID",
    value: function () {
      var _queryByCustomerID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(customerID) {
        var order, orderIDs, result, i, _yield$this$queryByID, _info;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dataAccessObject2["default"].query(function (o) {
                  return o.customerID === customerID;
                });

              case 2:
                order = _context2.sent;

                if (!(order === null)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  error: 'Customer with id ' + customerID + ' is not exist!',
                  body: []
                });

              case 5:
                orderIDs = order.map(function (o) {
                  return o.id;
                });
                result = [];
                _context2.t0 = _regenerator["default"].keys(orderIDs);

              case 8:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 17;
                  break;
                }

                i = _context2.t1.value;
                _context2.next = 12;
                return this.queryByID(orderIDs[i]);

              case 12:
                _yield$this$queryByID = _context2.sent;
                _info = _yield$this$queryByID.info;
                if (_info.findIndex(function (orderItem) {
                  return orderItem.state === 'taked';
                }) === -1) result.push({
                  id: orderIDs[i],
                  info: _info
                });
                _context2.next = 8;
                break;

              case 17:
                return _context2.abrupt("return", {
                  error: null,
                  body: result
                });

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function queryByCustomerID(_x2) {
        return _queryByCustomerID.apply(this, arguments);
      }

      return queryByCustomerID;
    }()
    /**
     * @param {string} customerID 
     * @returns {Promise<{ error: string?, body: { id: string, info: { orderItem: OrderItem, state: string }[] }[] }>}
     */

  }, {
    key: "queryTakedOrderByCustomerID",
    value: function () {
      var _queryTakedOrderByCustomerID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customerID) {
        var order, orderIDs, result, i, _yield$this$queryByID2, _info2;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _dataAccessObject2["default"].query(function (o) {
                  return o.customerID === customerID;
                });

              case 2:
                order = _context3.sent;

                if (!(order === null)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", {
                  error: 'Customer with id ' + customerID + ' is not exist!',
                  body: []
                });

              case 5:
                orderIDs = order.map(function (o) {
                  return o.id;
                });
                result = [];
                _context3.t0 = _regenerator["default"].keys(orderIDs);

              case 8:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 17;
                  break;
                }

                i = _context3.t1.value;
                _context3.next = 12;
                return this.queryByID(orderIDs[i]);

              case 12:
                _yield$this$queryByID2 = _context3.sent;
                _info2 = _yield$this$queryByID2.info;
                if (_info2.findIndex(function (orderItem) {
                  return orderItem.state === 'taked';
                }) >= 0) result.push({
                  id: orderIDs[i],
                  info: _info2
                });
                _context3.next = 8;
                break;

              case 17:
                return _context3.abrupt("return", {
                  error: null,
                  body: result
                });

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function queryTakedOrderByCustomerID(_x3) {
        return _queryTakedOrderByCustomerID.apply(this, arguments);
      }

      return queryTakedOrderByCustomerID;
    }()
    /**
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     * @returns {Promise<{ id: string?, error: string?, errorItems: string[] }>}
     */

  }, {
    key: "makeOrder",
    value: function () {
      var _makeOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(customerID, cartItems) {
        var isExist, errorItems, i, foodItem, isEnough, order, _i, id;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(cartItems.length === 0)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", {
                  id: null,
                  error: "Empty cart list!",
                  errorItems: []
                });

              case 2:
                _context4.next = 4;
                return _controller2["default"].ManagerService.queryByID(customerID);

              case 4:
                _context4.t0 = _context4.sent;
                isExist = _context4.t0 !== null;

                if (!(isExist === false)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", {
                  id: null,
                  error: 'Customer with id ' + customerID + ' is not exist!',
                  errorItems: []
                });

              case 8:
                errorItems = [];
                _context4.t1 = _regenerator["default"].keys(cartItems);

              case 10:
                if ((_context4.t2 = _context4.t1()).done) {
                  _context4.next = 21;
                  break;
                }

                i = _context4.t2.value;
                _context4.next = 14;
                return _controller["default"].UserService.getFoodByID(cartItems[i].foodID);

              case 14:
                foodItem = _context4.sent;

                if (!(foodItem === null)) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", {
                  id: null,
                  error: 'Unvalid food item\'s ID',
                  errorItems: []
                });

              case 17:
                isEnough = foodItem.quantity >= cartItems[i].quantity;
                if (isEnough === false) errorItems.push(cartItems[i].foodID);
                _context4.next = 10;
                break;

              case 21:
                if (!(errorItems.length > 0)) {
                  _context4.next = 23;
                  break;
                }

                return _context4.abrupt("return", {
                  id: null,
                  error: 'Out of stock!',
                  errorItems: errorItems
                });

              case 23:
                order = new _model3["default"]("", customerID, cartItems);

                for (_i in cartItems) {
                  _controller["default"].ManagerService.decreaseQuantity(cartItems[_i].foodID, cartItems[_i].quantity);
                }

                _context4.next = 27;
                return _dataAccessObject2["default"].create(order);

              case 27:
                id = _context4.sent;
                order.id = id;
                this.unpaidOrders.push(order);
                return _context4.abrupt("return", {
                  id: id,
                  error: null,
                  errorItems: []
                });

              case 31:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function makeOrder(_x4, _x5) {
        return _makeOrder.apply(this, arguments);
      }

      return makeOrder;
    }()
    /**
     * @param {string} id
     * @returns {boolean} 
     */

  }, {
    key: "pushToWaitingQueue",
    value: function pushToWaitingQueue(orderID) {
      var _this3 = this;

      var index = this.unpaidOrders.findIndex(function (order) {
        return order.id === orderID;
      });
      if (index === -1) return false;

      _dataAccessObject2["default"].modifyByField(orderID, 'state', 'paid');

      var order = this.unpaidOrders.splice(index, 1)[0];
      order.makeOrderItems().then(function (orderItems) {
        for (var i in orderItems) {
          var vendorID = orderItems[i].vendorID;
          if (vendorID in _this3.waitingQueue === false) _this3.waitingQueue[vendorID] = [];

          _this3.waitingQueue[vendorID].push(orderItems[i]);
        }
      });
      return true;
    }
    /**
     * @param {string} vendorID 
     * @returns {boolean}
     */

  }, {
    key: "popFirstOrderFromWaitingQueueToCookingQueue",
    value: function popFirstOrderFromWaitingQueueToCookingQueue(vendorID) {
      if (vendorID in this.waitingQueue === false) return false;
      if (this.waitingQueue[vendorID].length === 0) return false;
      if (vendorID in this.cookingQueue === false) this.cookingQueue[vendorID] = [];
      var orderItem = this.waitingQueue[vendorID].splice(0, 1)[0];
      this.cookingQueue[vendorID].push(orderItem);
      return true;
    }
    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */

  }, {
    key: "completeCooking",
    value: function completeCooking(vendorID, orderID) {
      if (vendorID in this.cookingQueue === false) return false;
      var index = this.cookingQueue[vendorID].findIndex(function (orderItem) {
        return orderItem.id === orderID;
      });
      if (index === -1) return false;
      if (vendorID in this.completedList === false) this.completedList[vendorID] = [];
      var orderItem = this.cookingQueue[vendorID].splice(index, 1)[0];
      this.completedList[vendorID].push(orderItem); // Push notification here 
      //
      //
      //

      return true;
    }
    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */

  }, {
    key: "popOrderFromCompletedList",
    value: function popOrderFromCompletedList(vendorID, orderID) {
      if (vendorID in this.completedList === false) return false;
      var index = this.completedList[vendorID].findIndex(function (orderItem) {
        return orderItem.id === orderID;
      });
      if (index === -1) return false;
      var orderItem = this.completedList[vendorID].splice(index, 1)[0];
      (0, _dataAccessObject["default"])(vendorID).create(orderItem);
      return true;
    }
  }]);
  return Controller;
}();

var _default = new Controller();

exports["default"] = _default;