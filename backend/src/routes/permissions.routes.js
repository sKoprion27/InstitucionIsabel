import { Router } from 'express'
import { deleteOnePermission, getOnePermission, getPermissions, postOnePermission, updateOnePermission } from './../controllers/Permissions.controller'
import { validatePermissionFields } from './../middlewares/roles.permissions.middleware';
const router = Router()

router.get('/', getPermissions)
router.get('/:id', getOnePermission)
router.post('/', validatePermissionFields, postOnePermission)
router.put('/:id', validatePermissionFields, updateOnePermission)
router.delete('/:id', deleteOnePermission)

export default router
