"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _index = _interopRequireDefault(require("./../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('pg'),
    Pool = _require.Pool;

var databaseConfig = _index["default"].databaseConfig;
var pool = new Pool(databaseConfig);
var db = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};
exports.db = db;