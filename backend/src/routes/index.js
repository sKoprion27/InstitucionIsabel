import usersRouter from './users.routes'
import notesRouter from './notes.routes'
import donationsRouter from './donations.routes'

export const initRoutes = (app) => {
  app.use('/users', usersRouter)
  app.use('/donations', donationsRouter)
  app.use('/donors', usersRouter)
  app.use('/notes', notesRouter)
}
