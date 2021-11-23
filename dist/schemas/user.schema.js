"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userPasswordSchema = exports.userPostSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userPostSchema = _joi["default"].object({
  nombre: _joi["default"].string().min(2).max(30).required(),
  apellido: _joi["default"].string().min(2).max(30).required(),
  password: _joi["default"].string().min(8).required(),
  correo_electronico: _joi["default"].string().email().required(),
  roles: _joi["default"].array().required()
});

exports.userPostSchema = userPostSchema;

var userPasswordSchema = _joi["default"].object({
  password: _joi["default"].string().min(8).required()
});

exports.userPasswordSchema = userPasswordSchema;