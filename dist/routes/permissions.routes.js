"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Permissions = require("./../controllers/Permissions.controller");

var _rolesPermissions = require("./../middlewares/roles.permissions.middleware");

var router = (0, _express.Router)();
router.get('/', _Permissions.getPermissions);
router.get('/:id', _Permissions.getOnePermission);
router.post('/', _rolesPermissions.validatePermissionFields, _Permissions.postOnePermission);
router.put('/:id', _rolesPermissions.validatePermissionFields, _Permissions.updateOnePermission);
router["delete"]('/:id', _Permissions.deleteOnePermission);
var _default = router;
exports["default"] = _default;