"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _response = require("./../utils/response");

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  (0, _response.response)(req, res, 'ERROR', '😥 NOT FOUND 😥', 404);
});
var _default = router;
exports["default"] = _default;