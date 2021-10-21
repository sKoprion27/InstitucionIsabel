import { Router } from 'express'
import { paymentMethodController } from './../controllers/paymentMethods.controller'

const router = Router()

router.get('/', paymentMethodController.getPaymentMethods)
router.get('/:id', paymentMethodController.getOnePaymentMethod)
router.post('/', paymentMethodController.postOnePaymentMethod)
router.put('/:id', paymentMethodController.updateOnePaymentMethod)
router.delete('/:id', paymentMethodController.deleteOnePaymentMethod)

export default router
