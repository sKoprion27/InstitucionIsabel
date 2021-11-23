"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = require("./../controllers/users.controller");

var _users2 = require("./../middlewares/users.middlewares");

var router = (0, _express.Router)();
router.get('/', _users.userController.getUsers);
router.get('/:id', _users.userController.getOneUser);
router.post('/', _users2.validateUserFields, _users.userController.postOneUser);
router.put('/:id', _users.userController.updateOneUser);
router.put('/:id/password', _users2.validatePasswordUser, _users.userController.changePasswordUser);
router["delete"]('/:id', _users.userController.deleteOneUser);
var _default = router;
exports["default"] = _default;