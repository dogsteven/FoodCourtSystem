"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _dataAccessObject = _interopRequireDefault(require("./data-access-object"));

var _categories = _interopRequireDefault(require("../categories"));

var _default = {
  UserService: {
    /**
     * @returns { Promise<FoodItem[]> }
     */
    getAllFoods: function getAllFoods() {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dataAccessObject["default"].query(function (item) {
                  return true;
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * @param {string} id 
     * @returns {Promise<FoodItem?>}
     */
    getFoodByID: function getFoodByID(id) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * @param {string} id 
     * @param {number} point 
     * @returns {Promise<boolean>}
     */
    rating: function rating(id, point) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var foodItem, ratingTimes, oldRating, newRating;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(typeof point !== 'number')) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", false);

              case 2:
                if (!(0 > point || 5 < point)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", false);

              case 4:
                _context3.next = 6;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 6:
                foodItem = _context3.sent;

                if (!(foodItem !== null)) {
                  _context3.next = 15;
                  break;
                }

                ratingTimes = foodItem.ratingTimes;
                oldRating = foodItem.rating;
                newRating = (oldRating * ratingTimes + point) / (ratingTimes + 1);
                foodItem.rating = newRating;
                foodItem.ratingTimes += 1;

                _dataAccessObject["default"].modify(foodItem);

                return _context3.abrupt("return", true);

              case 15:
                return _context3.abrupt("return", false);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * @param {string} id 
     * @param {number} rating 
     * @returns {Promose<number>}
     */
    newRating: function newRating(id, rating) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var foodItem, n;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _dataAccessObject["default"].queryFirst(function (f) {
                  return f.id === id;
                });

              case 2:
                foodItem = _context4.sent;

                if (!(foodItem === null)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", null);

              case 5:
                n = foodItem.ratingTimes;
                foodItem.rating = (foodItem.rating * n + Number(rating)) / (n + 1);
                foodItem.ratingTimes = n + 1;

                _dataAccessObject["default"].modify(foodItem);

                return _context4.abrupt("return", foodItem.rating);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  },
  ManagerService: {
    /**
     * @param {string} vendorID 
     * @returns {Promise<FoodItem[]>}
     */
    getFoodsByVendorID: function getFoodsByVendorID(vendorID) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _dataAccessObject["default"].query(function (item) {
                  return item.vendorID === vendorID;
                });

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },

    /**
     * @param {string} vendorID 
     * @param {string} name 
     * @param {number} price 
     * @param {number} quantity 
     * @param {string[]} categories 
     * @param {string} description 
     * @param {string} photo 
     * @returns {Promise<string>}
     */
    addNewFood: function addNewFood(vendorID, name, price, quantity, categories, description, photo) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var foodItem;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                foodItem = new _model["default"]("", vendorID, name, price, quantity, categories, description, photo);

                _categories["default"].query().then(function (existingCategories) {
                  categories.forEach(function (category) {
                    if (existingCategories.includes(category) === false) _categories["default"].addNewCategories(category);
                  });
                });

                _context6.next = 4;
                return _dataAccessObject["default"].create(foodItem);

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },

    /**
     * @param {string} vendorID
     * @param {string} id 
     * @param {string} newName 
     * @param {number} newPrice 
     * @param {string[]} newCategories 
     * @param {string} newDescription 
     * @param {string} newPhoto 
     * @returns {Promise<boolean>}
     */
    changeFoodItemInformation: function changeFoodItemInformation(vendorID, id, newName, newPrice, newCategories, newDescription, newPhoto) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var foodItem;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 2:
                foodItem = _context7.sent;

                if (!(foodItem !== null)) {
                  _context7.next = 14;
                  break;
                }

                if (!(foodItem.vendorID === vendorID)) {
                  _context7.next = 13;
                  break;
                }

                _categories["default"].query().then(function (existingCategories) {
                  newCategories.forEach(function (category) {
                    if (existingCategories.includes(category) === false) _categories["default"].addNewCategories(category);
                  });
                });

                foodItem.name = newName;
                foodItem.price = newPrice;
                foodItem.categories = newCategories;
                foodItem.description = newDescription;
                foodItem.photo = newPhoto;

                _dataAccessObject["default"].modify(foodItem);

                return _context7.abrupt("return", true);

              case 13:
                return _context7.abrupt("return", false);

              case 14:
                return _context7.abrupt("return", false);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },

    /**
     * @param {string} vendorID
     * @param {string} id
     * @returns {Promise<boolean>} 
     */
    removeFood: function removeFood(vendorID, id) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var foodItem;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 2:
                foodItem = _context8.sent;

                if (!(foodItem !== null)) {
                  _context8.next = 8;
                  break;
                }

                if (!(foodItem.vendorID === vendorID)) {
                  _context8.next = 7;
                  break;
                }

                _dataAccessObject["default"].remove(id);

                return _context8.abrupt("return", true);

              case 7:
                return _context8.abrupt("return", false);

              case 8:
                return _context8.abrupt("return", false);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },

    /**
     * @param {string} vendorID
     * @param {string} id 
     * @param {number} amount 
     * @returns {Promise<boolean?>}
     */
    increaseQuantity: function increaseQuantity(vendorID, id, amount) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var foodItem;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(typeof amount !== 'number')) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", false);

              case 2:
                if (!(amount <= 0)) {
                  _context9.next = 4;
                  break;
                }

                return _context9.abrupt("return", false);

              case 4:
                _context9.next = 6;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 6:
                foodItem = _context9.sent;

                if (!(foodItem !== null)) {
                  _context9.next = 12;
                  break;
                }

                if (!(foodItem.vendorID !== vendorID)) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("return", false);

              case 10:
                _dataAccessObject["default"].modifyByField(id, 'quantity', foodItem.quantity + amount);

                return _context9.abrupt("return", true);

              case 12:
                return _context9.abrupt("return", false);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },

    /**
     * @param {string} id 
     * @param {number} amount 
     * @returns {Promise<boolean?>}
     */
    decreaseQuantity: function decreaseQuantity(id, amount) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var foodItem;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(typeof amount !== 'number')) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", false);

              case 2:
                if (!(amount <= 0)) {
                  _context10.next = 4;
                  break;
                }

                return _context10.abrupt("return", false);

              case 4:
                _context10.next = 6;
                return _dataAccessObject["default"].queryFirst(function (item) {
                  return item.id === id;
                });

              case 6:
                foodItem = _context10.sent;

                if (!(foodItem !== null)) {
                  _context10.next = 12;
                  break;
                }

                if (!(foodItem.quantity < amount)) {
                  _context10.next = 10;
                  break;
                }

                return _context10.abrupt("return", false);

              case 10:
                _dataAccessObject["default"].modifyByField(id, 'quantity', foodItem.quantity - amount);

                return _context10.abrupt("return", true);

              case 12:
                return _context10.abrupt("return", false);

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    }
  }
};
exports["default"] = _default;