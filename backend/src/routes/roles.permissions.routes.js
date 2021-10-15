import { Router } from 'express'
import { deleteOneRolePermission, getOneRolePermission, getRolesPermissions, postOneRolePermission, updateOneRolePermission } from './../controllers/roles.permissions.controller'
// import { validatePermission } from './../middlewares/Permissions.middlewares'

const router = Router()

router.get('/', getRolesPermissions)
router.get('/:id', getOneRolePermission)
router.post('/', postOneRolePermission)
router.put('/:id', updateOneRolePermission)
router.delete('/:id', deleteOneRolePermission)

export default router
