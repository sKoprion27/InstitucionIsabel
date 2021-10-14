import { Router } from 'express'
import { getTipoDonaciones, getOneTipoDonaciones } from './../controllers/tipo_donaciones.controller'

const router = Router()

router.get('/', getTipoDonaciones)
router.get('/:id', getOneTipoDonaciones)

export default router
