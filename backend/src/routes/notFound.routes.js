import { Router } from 'express'
import { response } from './../utils/response'

const router = Router()

router.get('/', (req, res) => {
  response(req, res, 'ERROR', 'NOT FOUND', 404)
})

export default router
