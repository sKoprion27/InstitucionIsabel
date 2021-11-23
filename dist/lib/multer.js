"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUri = exports.multerUploadFile = exports.multerUploadImage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DatauriParser = require('datauri/parser');

var memoryStorage = _multer["default"].memoryStorage();

var multerUploadImage = (0, _multer["default"])({
  storage: memoryStorage
}).single('foto_donacion');
/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */

exports.multerUploadImage = multerUploadImage;

var dataUri = function dataUri(req) {
  var parser = new DatauriParser();
  return parser.format(_path["default"].extname(req.file.originalname).toString(), req.file.buffer).content;
};

exports.dataUri = dataUri;

var diskStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.originalname, "_").concat(Date.now()) + _path["default"].extname(file.originalname));
  }
});

var multerUploadFile = (0, _multer["default"])({
  storage: diskStorage
});
exports.multerUploadFile = multerUploadFile;