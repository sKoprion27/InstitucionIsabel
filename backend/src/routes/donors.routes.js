import { Router } from 'express'
import { donorController } from './../controllers/donors.controller'

const router = Router()

router.get('/', donorController.getDonors)
router.get('/:id', donorController.getOneDonor)
router.post('/', donorController.postOneDonor)
router.put('/:id', donorController.updateOneDonor)
router.delete('/:id', donorController.deleteOneDonor)

export default router
