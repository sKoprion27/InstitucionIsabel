import { Router } from 'express'
import { getDonor, getOneDonor, postOneDonor, updateOneDonor, deleteOneDonor } from './../controllers/donors.controller'

const router = Router()

router.get('/', getDonor)
router.get('/:id', getOneDonor)
router.post('/', postOneDonor)
router.put('/:id', updateOneDonor)
router.delete('/:id', deleteOneDonor)

export default router
