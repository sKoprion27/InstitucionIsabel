import { Router } from 'express'
import { deleteOneRolePermission, getOneRolePermission, getRolePermission, postOneRolePermission, updateOneRolePermission } from './../controllers/roles.permissions.controller'
import { validateRolePermissionFields } from './../middlewares/roles.permissions.middleware';


const router = Router()

router.get('/', getRolePermission)
router.get('/:id', getOneRolePermission)
router.post('/', validateRolePermissionFields, postOneRolePermission)
router.put('/:id', validateRolePermissionFields, updateOneRolePermission)
router.delete('/:id', deleteOneRolePermission)

export default router
