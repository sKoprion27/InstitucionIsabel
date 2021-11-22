import { Router } from 'express'
import { cfdiController } from './../controllers/cfdis.controller'

const router = Router()

router.get('/', cfdiController.getCfdis)
router.get('/:id', cfdiController.getOneCfdi)
router.post('/', cfdiController.postOneCfdi)
router.put('/:id', cfdiController.updateOneCfdi)
router.delete('/:id', cfdiController.deleteOneCfdi)

export default router
