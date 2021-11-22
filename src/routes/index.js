import usersRouter from './users.routes'
import rolesRouter from './roles.routes'
import notesRouter from './notes.routes'
import authRouter from './auth.routes'
import donationsRouter from './donations.routes'
import donorsRouter from './donors.routes'
import cfdisRouter from './cfdis.routes'
import statesRouter from './states.routes'
import notFoundRouter from './notFound.routes'
import typesDonationsRouter from './typesDonations.routes'
import beneficiariesRouter from './beneficiaries.routes'
import paymentMethodsRouter from './paymentMethods.routes'
import categoriesRouter from './categories.routes'
import { auth } from '../lib/auth'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
  app.use(auth.verifyToken) // si se activa pide token
  app.use('/roles', rolesRouter)
  app.use('/donors', donorsRouter)
  app.use('/donations', donationsRouter)
  app.use('/beneficiaries', beneficiariesRouter)
  app.use('/categories', categoriesRouter)
  app.use('/types-donations', typesDonationsRouter)
  app.use('/notes', notesRouter)
  app.use('/cfdis', cfdisRouter)
  app.use('/states', statesRouter)
  app.use('/payment-methods', paymentMethodsRouter)
  app.use('/*', notFoundRouter)
}
