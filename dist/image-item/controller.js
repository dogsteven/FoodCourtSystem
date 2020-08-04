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

var _fs = _interopRequireDefault(require("fs"));

var _default = {
  /**
   * @param {string} vendorID 
   * @returns {Promise<ImageItem[]>}
   */
  queryImageByVendorID: function queryImageByVendorID(vendorID) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dataAccessObject["default"].query(function (item) {
                return item.vendorID === vendorID;
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
  getImageDataByID: function getImageDataByID(id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var imageItem;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _dataAccessObject["default"].queryFirst(function (image) {
                return image.id === id;
              });

            case 2:
              imageItem = _context2.sent;

              if (!(imageItem === null)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", null);

            case 5:
              return _context2.abrupt("return", _fs["default"].readFileSync('./static/images/' + imageItem.id + imageItem.name));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * @param {string} vendorID 
   * @param {string} name 
   * @param {string} extension 
   * @param {any} data 
   * @returns {Promise<string>}
   */
  uploadNewImage: function uploadNewImage(vendorID, name, data) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var imageItem, id, realFileName;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              imageItem = new _model["default"]("", vendorID, name);
              _context3.next = 3;
              return _dataAccessObject["default"].create(imageItem);

            case 3:
              id = _context3.sent;
              realFileName = id + name;

              _fs["default"].writeFile('static/images/' + realFileName, data, function (error) {
                if (error !== null) console.log(error);
              });

              return _context3.abrupt("return", id);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * @param {string} id 
   * @returns {Promise<{ error: string?, status: boolean? }>}
   */
  removeImageItem: function removeImageItem(vendorID, id) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var imageItem, filePath;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _dataAccessObject["default"].queryFirst(function (image) {
                return image.id === id;
              });

            case 2:
              imageItem = _context4.sent;

              if (!(imageItem === null)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", {
                error: 'Image with id ' + id + ' is not exist!',
                status: false
              });

            case 5:
              if (!(imageItem.vendorID !== vendorID)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", {
                error: 'Unvalid image item!',
                status: false
              });

            case 7:
              filePath = './static/images/' + imageItem.id + imageItem.name;

              _dataAccessObject["default"].remove(id);

              _fs["default"].unlink(filePath, function (error) {
                if (error) console.log(error);
              });

              return _context4.abrupt("return", {
                error: null,
                status: true
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;