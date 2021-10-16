import { Router } from 'express'
import { validateRoleFields } from '../middlewares/roles.permissions.middleware'
import { deleteOneRole, getOneRole, getRoles, postOneRole, updateOneRole } from './../controllers/roles.controller'


const router = Router()

router.get('/', getRoles)
router.get('/:id', getOneRole)
router.post('/', validateRoleFields, postOneRole)
router.put('/:id', updateOneRole)
router.delete('/:id', deleteOneRole)

export default router
