import { Router } from 'express'
import { categoryController } from './../controllers/categories.controller'

const router = Router()

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.post('/', categoryController.postOne)
router.put('/:id', categoryController.updateOne)
router.delete('/:id', categoryController.deleteOne)

export default router
