import { Router } from 'express'
import { deleteOnePermission, getOnePermission, getPermissions, postOnePermission, updateOnePermission } from './../controllers/Permissions.controller'
// import { validatePermission } from './../middlewares/Permissions.middlewares'

const router = Router()

router.get('/', getPermissions)
router.get('/:id', getOnePermission)
router.post('/', postOnePermission)
router.put('/:id', updateOnePermission)
router.delete('/:id', deleteOnePermission)

export default router
