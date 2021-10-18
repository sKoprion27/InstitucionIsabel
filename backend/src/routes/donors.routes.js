import { Router } from 'express'
import { donorController } from './../controllers/donors.controller'

const router = Router()

router.get('/', donorController.getDonors)
router.get('/:id', donorController.getOneDonor)
router.post('/', donorController.postOneDonor)
// router.put('/:id', updateOneDonor)
// router.delete('/:id', deleteOneDonor)

export default router
