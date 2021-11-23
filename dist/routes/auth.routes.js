"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("./../controllers/auth.controller");

var _auth2 = require("./../middlewares/auth.middleware");

var _auth3 = require("./../lib/auth");

var router = (0, _express.Router)();
router.post('/login/', _auth2.validateLoginFields, _auth.authController.login);
router.post('/me/', _auth3.auth.verifyToken, _auth.authController.me);
var _default = router;
exports["default"] = _default;