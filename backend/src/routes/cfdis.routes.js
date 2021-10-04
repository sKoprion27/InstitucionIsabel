import { Router } from 'express'
import { getCFDI, getOneCFDI, postOneCFDI, updateOneCFDI, deleteOneCFDI } from './../controllers/cfdis.controller'

const router = Router()

router.get('/', getCFDI)
router.get('/:id', getOneCFDI)
router.post('/', postOneCFDI)
router.put('/:id', updateOneCFDI)
router.delete('/:id', deleteOneCFDI)

export default router
