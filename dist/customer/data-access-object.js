"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _configuration = _interopRequireDefault(require("../configuration"));

var _model = _interopRequireDefault(require("./model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var database = _firebaseAdmin["default"].database().ref(_configuration["default"].database.customer);

var _default = {
  /**
   * @param {string} username 
   * @param {string} password 
   */
  queryByUsernamePassword: function queryByUsernamePassword(username, password) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var info, snapshot;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              info = null;
              _context.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context.sent;
              snapshot.forEach(function (child) {
                var data = _objectSpread({}, child.val());

                if (data.username === username && data.password === password) {
                  delete data.password;
                  info = {
                    id: child.key,
                    info: data
                  };
                }

                return info !== null;
              });
              return _context.abrupt("return", info);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * @param {string} id 
   */
  queryByID: function queryByID(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var data, info;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return database.child(id).once('value');

            case 2:
              data = _context2.sent;
              info = data.val();
              if ('password' in info) delete info.password;
              return _context2.abrupt("return", {
                id: data.key,
                info: info
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * @param {Customer} customer 
   * @returns {Promise<string?>}
   */

  /**
   * @param {Notification} StringContent
   * @returns {void}
   */
  // async send(notification)
  // {
  //     var fcmKey = "AAAA8k14vzQ:APA91bGnrw4WYwDgzpichuR9l0KE2aq1DbMFx_m3O-mzysiDh6vSHt0ylbnyDJDM6YGAgWYfu7PB4E_1Ak8VgISOwPsFQwheyB1E0-UeDgXzEg_4d2IxorQMagY_xGfZYdalGNsJ6I2Y"
  //     var http = new HttpClient();
  //     http.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "key=" + fcmKey);
  //     http.DefaultRequestHeaders.TryAddWithoutValidation("content-length", notification.Length.ToString());
  //     var content = new StringContent(notification, System.Text.Encoding.UTF8, "application/json");
  //     var response = await http.PostAsync("https://fcm.googleapis.com/fcm/send", content);
  // },

  /**
   * @param {Customer} customer 
   * @returns {void}
   */
  create: function create(customer) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var unvalid, snapshot, data, ref;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              unvalid = false;
              _context3.next = 3;
              return database.once('value');

            case 3:
              snapshot = _context3.sent;
              snapshot.forEach(function (child) {
                if (child.val().username === customer.username) unvalid = true;
                return unvalid;
              });

              if (!(unvalid === false)) {
                _context3.next = 13;
                break;
              }

              data = _objectSpread({}, customer);
              if ('id' in data) delete data.id;
              _context3.next = 10;
              return database.push();

            case 10:
              ref = _context3.sent;
              ref.set(data);
              return _context3.abrupt("return", ref.key);

            case 13:
              return _context3.abrupt("return", null);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * @param {Customer} customer 
   */
  modify: function modify(customer) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var data, valid;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = _objectSpread({}, customer);
              if ('id' in data) delete data.id;
              _context4.next = 4;
              return database.child(customer.id).once('value');

            case 4:
              valid = _context4.sent.exists();
              if (valid === true) database.child(customer.id).set(data);
              return _context4.abrupt("return", valid);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },

  /**
   * @param {string} id 
   * @param {string} field 
   * @param {any} value 
   */
  modifyByField: function modifyByField(id, field, value) {
    if (mutableFiels.includes(field)) database.child(id).child(field).set(value);
  },

  /**
   * @param {string} id 
   * @returns {void}
   */
  remove: function remove(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var valid;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return database.child(id).once('value');

            case 2:
              valid = _context5.sent.exists();
              if (valid === true) database.child(id).remove();
              return _context5.abrupt("return", valid);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
exports["default"] = _default;