import { Router } from 'express'
import { login, me } from './../controllers/auth.controller'
import { validateLoginFields } from './../middlewares/auth.middleware'
import { auth } from './../lib/auth'

const router = Router()

router.post('/login/', validateLoginFields, login)
router.post('/me/', auth.verifyToken, me)

export default router
