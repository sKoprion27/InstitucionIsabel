import { Router } from 'express'
import { login } from './../controllers/auth.controller'
import { validateLoginFields } from './../middlewares/auth.middleware'

const router = Router()

router.post('/login/', validateLoginFields, login)

export default router
