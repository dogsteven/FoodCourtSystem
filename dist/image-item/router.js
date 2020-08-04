"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _controller = _interopRequireDefault(require("./controller"));

var _controller2 = _interopRequireDefault(require("../vendor-owner/controller"));

/**
 * @param {import('express').Router} router 
 */
function run(router) {
  router.get('/image-item/vendorID/:id', function (req, res) {
    var vendorID = req.params.id;

    _controller["default"].queryImageByVendorID(vendorID).then(function (images) {
      return images.map(function (item) {
        return item.id;
      });
    }).then(function (ids) {
      res.json(ids);
    });
  });
  router.get('/image-item/:id', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var id, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.params.id;
              _context.next = 3;
              return _controller["default"].getImageDataByID(id);

            case 3:
              data = _context.sent;
              if (data === null) res.json({
                error: 'Image with id ' + id + ' is not exist!'
              });else res.end(data);

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
  router.post('/image-item/:username/:password', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var username, password, vendorOwner;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              username = req.params.username;
              password = req.params.password;
              _context2.next = 4;
              return _controller2["default"].queryByUsernamePassword(username, password);

            case 4:
              vendorOwner = _context2.sent;

              if (!(vendorOwner === null)) {
                _context2.next = 9;
                break;
              }

              res.json({
                error: 'Wrong username or password!',
                id: null
              });
              _context2.next = 19;
              break;

            case 9:
              if (!(req.files === null)) {
                _context2.next = 13;
                break;
              }

              res.json({
                error: 'Empty file!',
                id: null
              });
              _context2.next = 19;
              break;

            case 13:
              _context2.t0 = res;
              _context2.next = 16;
              return _controller["default"].uploadNewImage(vendorOwner.vendorID, req.files.file.name, req.files.file.data);

            case 16:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                error: null,
                id: _context2.t1
              };

              _context2.t0.json.call(_context2.t0, _context2.t2);

            case 19:
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
  router["delete"]('/image-item/:id/:username/:password', function (req, res) {
    var username = req.params.username;
    var password = req.params.password;
    var id = req.params.id;

    _controller2["default"].queryByUsernamePassword(username, password).then(function (vo) {
      if (vo === null) res.json({
        error: 'Username or password is incorrect!',
        status: false
      });else _controller["default"].removeImageItem(vo.vendorID, id).then(function (response) {
        res.json(response);
      });
    });
  });
}

var _default = run;
exports["default"] = _default;