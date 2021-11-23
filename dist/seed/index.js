"use strict";

var _index = _interopRequireDefault(require("./../config/index"));

var _data = require("./data.db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('pg'),
    Client = _require.Client;

var databaseConfig = _index["default"].databaseConfig;
var client = new Client(databaseConfig);
client.connect();
client.query(_data.QUERY, function (err, res) {
  if (err) throw err;
  console.log(res);
  client.end();
});