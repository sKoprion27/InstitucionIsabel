import { Router } from 'express'
import { userController } from './../controllers/users.controller'
import {
  validatePasswordUser,
  validateUserFields
} from './../middlewares/users.middlewares'

const router = Router()

router.get('/',
  userController.getUsers
)
router.get('/:id',
  userController.getOneUser
)
router.post('/',
  validateUserFields,
  userController.postOneUser
)
router.put('/:id',
  userController.updateOneUser
)
router.put('/:id/password',
  validatePasswordUser,
  userController.changePasswordUser
)
router.delete('/:id',
  userController.deleteOneUser
)

export default router
