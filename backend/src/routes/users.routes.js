import { Router } from 'express'
import {
  changePasswordUser,
  deleteOneUser,
  getOneUser,
  getUsers,
  postOneUser,
  updateOneUser
} from './../controllers/users.controller'
import { validatePasswordUser, validateUserFields } from './../middlewares/users.middlewares'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getOneUser)
router.post('/', validateUserFields, postOneUser)
router.put('/:id', updateOneUser)
router.put('/password/:id', validatePasswordUser, changePasswordUser)
router.delete('/:id', deleteOneUser)

export default router
