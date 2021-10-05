import { Router } from 'express'
import { deleteOneUser, getOneUser, getUsers, postOneUser, updateOneUser } from './../controllers/users.controller'
import { validateUser } from './../middlewares/users.middlewares'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getOneUser)
router.post('/', validateUser, postOneUser)
router.put('/:id', updateOneUser)
router.delete('/:id', deleteOneUser)

export default router
