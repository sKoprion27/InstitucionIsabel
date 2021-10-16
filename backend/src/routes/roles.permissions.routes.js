import { Router } from 'express'
import { rpController } from './../controllers/roles.permissions.controller'
import { validateRolePermissionFields } from './../middlewares/roles.permissions.middleware'

const router = Router()

router.get('/roles/:id/permissions', rpController.getOneRoleAllPermissions)
router.get('/roles/:id/permissions/:id', rpController.getRoleOnePermission)
router.post('/roles/permissions', validateRolePermissionFields, rpController.postRoleOnePermission)
router.put('/roles/:id/permissions/:id', validateRolePermissionFields, rpController.updateRoleOnePermission)
router.delete('/roles/:id/permissions/:id', rpController.deleteRoleOnePermission)

export default router
