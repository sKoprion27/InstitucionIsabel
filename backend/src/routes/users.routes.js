import { Router } from 'express'
import { deleteOneUser, getOneUser, getUsers, postOneUser, updateOneUser } from './../controllers/users.controller'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getOneUser)
router.post('/', postOneUser)
router.put('/:id', updateOneUser)
router.delete('/:id', deleteOneUser)

export default router
