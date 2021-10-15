import { Router } from 'express'
import { deleteOneRole, getOneRole, getRoles, postOneRole, updateOneRole } from './../controllers/roles.controller'
// import { validateRole } from './../middlewares/Roles.middlewares'

const router = Router()

router.get('/', getRoles)
router.get('/:id', getOneRole)
router.post('/', postOneRole)
router.put('/:id', updateOneRole)
router.delete('/:id', deleteOneRole)

export default router
