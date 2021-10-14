import usersRouter from './users.routes'
import notesRouter from './notes.routes'
import authRouter from './auth.routes'
import donationsRouter from './donations.routes'
import donorsRouter from './donors.routes'
import cfdisRouter from './cfdis.routes'
import statesRouter from './states.routes'
import notFoundRouter from './notFound.routes'
import tipoDonacionesRouter from './tipo_donaciones.routes'
// import { auth } from '../lib/auth'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  // app.use(auth.verifyToken) // si se activa pide token
  app.use('/users', usersRouter)
  app.use('/donors', donorsRouter)
  app.use('/donations', donationsRouter)
  app.use('/tipoDonaciones', tipoDonacionesRouter) // cambiar a ingles, se ocupara otro ruteador en el front
  app.use('/notes', notesRouter)
  app.use('/cfdis', cfdisRouter)
  app.use('/states', statesRouter)
  app.use('/*', notFoundRouter)
}
