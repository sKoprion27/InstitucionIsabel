import usersRouter from './users.routes'
import notesRouter from './notes.routes'
import authRouter from './auth.routes'
// import { verifyToken } from '../lib/auth'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  // app.use(verifyToken) si se activa pide token
  app.use('/users', usersRouter)
  app.use('/donations', usersRouter)
  app.use('/donors', usersRouter)
  app.use('/notes', notesRouter)
}
