"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _roles = require("./../controllers/roles.controller");

// import { rpController } from './../controllers/roles.permissions.controller'
var router = (0, _express.Router)(); // Roles

router.get('/', _roles.rolesController.getRoles);
router.get('/:id', _roles.rolesController.getOneRole);
router.post('/', _roles.rolesController.postOneRole);
router.put('/:id', _roles.rolesController.updateOneRole);
router["delete"]('/:id', _roles.rolesController.deleteOneRole); // Permissions
// router.get('/:idRole/permissions',
//   rpController.getOneRoleAllPermissions
// )
// router.get('/:idRole/permissions/:idPermission',
//   rpController.getOneRoleOnePermission
// )
// router.post('/permissions',
//   rpController.postRoleOnePermission
// )
// router.put('/:idRole/permissions/:idPermission',
//   rpController.updateRoleOnePermission
// )
// router.delete('/:idRole/permissions/:idPermission',
//   rpController.deleteRoleOnePermission
// )

var _default = router;
exports["default"] = _default;