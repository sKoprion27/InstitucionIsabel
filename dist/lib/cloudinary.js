"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicId = exports.cloudinaryAdmin = exports.cloudinaryUploader = exports.cloudinaryConfig = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cloudinary = require('cloudinary').v2;

var cloudinaryConfig = function cloudinaryConfig(req, res, next) {
  cloudinary.config(_config["default"].cloudinay);
  next();
};

exports.cloudinaryConfig = cloudinaryConfig;
var cloudinaryUploader = cloudinary.uploader;
exports.cloudinaryUploader = cloudinaryUploader;
var cloudinaryAdmin = cloudinary.api;
exports.cloudinaryAdmin = cloudinaryAdmin;

var getPublicId = function getPublicId(url) {
  var arr = url.split('/');
  var path = "".concat(arr[arr.length - 2], "/").concat(arr[arr.length - 1].split('.')[0]);
  return path;
};

exports.getPublicId = getPublicId;