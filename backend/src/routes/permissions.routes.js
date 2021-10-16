import { Router } from 'express'
import { validatePermissionFields } from '../middlewares/permission.middleware'
import { deleteOnePermission, getOnePermission, getPermissions, postOnePermission, updateOnePermission } from './../controllers/Permissions.controller'
const router = Router()

router.get('/', getPermissions)
router.get('/:id', getOnePermission)
router.post('/', validatePermissionFields, postOnePermission)
router.put('/:id', validatePermissionFields, updateOnePermission)
router.delete('/:id', deleteOnePermission)

export default router
