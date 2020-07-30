"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

var _firebase = _interopRequireDefault(require("../firebase"));

/**
 * @param {import('express').Router} router 
 */
function run(router) {
  router.get('/vendor-owner/vendor/:vendorID', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var vendorID;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              vendorID = req.params.vendorID;
              _context.t0 = res;
              _context.next = 4;
              return _controller["default"].queryByAll();

            case 4:
              _context.t1 = _context.sent.filter(function (vo) {
                return vo.vendorID === vendorID;
              }).map(function (vo) {
                return {
                  id: vo.id,
                  username: vo.username,
                  firstname: vo.firstname,
                  lastname: vo.lastname,
                  email: vo.email
                };
              });

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
  router.get('/vendor-owner/:username/:password', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var username, password;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context2.t0 = res;
              _context2.next = 5;
              return _controller["default"].queryByUsernamePassword(username, password);

            case 5:
              _context2.t1 = _context2.sent;

              _context2.t0.json.call(_context2.t0, _context2.t1);

            case 7:
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
  router.post('/vendor-owner/vendor/:vendorID/', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var vendorID, _req$body, username, password, firstname, lastname, email, id;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              vendorID = req.params.vendorID;
              _req$body = req.body, username = _req$body.username, password = _req$body.password, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email;
              _context3.next = 4;
              return _controller["default"].create(username, password, firstname, lastname, email, vendorID);

            case 4:
              id = _context3.sent;
              if (id === null) res.json({
                error: 'Vendor Owner with username ' + username + ' is exist!',
                id: null
              });else res.json({
                error: null,
                id: id
              });

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
  router["delete"]('/vendor-owner/:id', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var id;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _context4.t0 = res;
              _context4.next = 4;
              return _controller["default"].remove(id);

            case 4:
              _context4.t1 = _context4.sent;
              _context4.t2 = {
                status: _context4.t1
              };

              _context4.t0.json.call(_context4.t0, _context4.t2);

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
  router.get('/vendor-owner/notification/test/:id', function (req, res) {
    console.log(req.params.id);
    var registrationToken = 'cmqHAiTLoT9s_amyIo7EEh:APA91bEwOwBnJcA_aDOhsoQmHSTax0XQv7NjVi5NtarobbEGDhgJ3O0QTq4GLV9M4BrNSoWWj7MekM55TnbbwDF_hNRmXcTPEnZEmCGo5F7DyKTNkd7NpS65ACBvWzbIFnT5o8e71o0s';
    var message = {
      notification: {
        title: 'Vui lòng đến quầy để lấy thức ăn',
        body: 'Nhớ mang theo hóa đơn nhé!',
        imageUrl: 'https://product.hstatic.net/1000335596/product/img_0163_8dd37ca37c8b447080b3591e540dd99c_2a902d303dac43c0aef9d212828c0b8d.jpg'
      },
      token: registrationToken
    };

    _firebase["default"].messaging().send(message).then(function (response) {
      console.log('Successfully sent message:', response);
    })["catch"](function (error) {
      console.log('Error sending message:', error);
    });

    res.json({
      'alo': 'wtf'
    });
  });
}

var _default = run;
exports["default"] = _default;