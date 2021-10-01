import usersRouter from './users.routes'

export const initRoutes = (app) => {
  app.use('/users', usersRouter)
  app.use('/donations', usersRouter)
  app.use('/donors', usersRouter)
}
