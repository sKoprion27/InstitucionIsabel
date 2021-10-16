import { Router } from 'express'
import { deleteOneUser, getOneUser, getUsers, postOneUser, updateOneUser } from './../controllers/users.controller'
import { validateUserFields } from './../middlewares/users.middlewares'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getOneUser)
router.post('/', validateUserFields, postOneUser)
router.put('/:id', validateUserFields, updateOneUser)
router.delete('/:id', deleteOneUser)

export default router
