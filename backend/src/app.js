import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { initRoutes } from './routes/index'

const app = express()
const PORT = 4000 || process.env.PORT

// Middlewares de configuracion inicial
app.use(json()) // Parsea lo que llega al servidor en formato json
app.use(cookieParser()) // Generar el rastero de las cookies
app.use(morgan('dev')) // Muestra en consola la url, tiempo y status solicitado
app.use(cors()) // Una configuracion de seguridad entre headers

app.get('/', (req, res) => {
  console.log('Esto es una prueba')
  res.json({ menssge: 'Bien 😀' })
})
// Inicializa todas las rutas
initRoutes(app)

module.exports = { app, PORT }
