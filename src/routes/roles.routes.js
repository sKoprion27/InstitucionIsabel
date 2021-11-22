import { Router } from 'express'
import { rolesController } from './../controllers/roles.controller'
// import { rpController } from './../controllers/roles.permissions.controller'

const router = Router()

// Roles
router.get('/', rolesController.getRoles)
router.get('/:id', rolesController.getOneRole)
router.post('/', rolesController.postOneRole)
router.put('/:id', rolesController.updateOneRole)
router.delete('/:id', rolesController.deleteOneRole)

// Permissions
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

export default router
