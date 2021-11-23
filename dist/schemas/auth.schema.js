"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginSchema = _joi["default"].object({
  correo_electronico: _joi["default"].string().email().required(),
  password: _joi["default"].string().min(8).required()
});

exports.loginSchema = loginSchema;