import { Router } from 'express'
import { authController } from './../controllers/auth.controller'
import { validateLoginFields } from './../middlewares/auth.middleware'
import { auth } from './../lib/auth'

const router = Router()

router.post('/login/', validateLoginFields, authController.login)
router.post('/me/', auth.verifyToken, authController.me)
router.get('/me1/:id', authController.me1)

export default router
