"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeDonationsSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TypeDonationsSchema = _joi["default"].object({
  nombre: _joi["default"].string().min(2).max(30).required(),
  descripcion: _joi["default"].string().min(2).max(30).required()
});

exports.TypeDonationsSchema = TypeDonationsSchema;