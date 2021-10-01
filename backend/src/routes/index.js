import usersRouter from './users.routes'
import notesRouter from './notes.routes'

export const initRoutes = (app) => {
  app.use('/users', usersRouter)
  app.use('/donations', usersRouter)
  app.use('/donors', usersRouter)
  app.use('/notes', notesRouter)
}
