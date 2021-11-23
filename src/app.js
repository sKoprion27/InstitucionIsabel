import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { initRoutes } from './routes/index'
import { cloudinaryConfig } from './lib/cloudinary'
import path from 'path'
import config, { MODE } from './config'

const app = express()
const PORT = config.PORT || 4000
app.disable('etag')

// Middlewares de configuracion inicial

app.use(cors()) // Una configuracion de seguridad entre headers
app.use(json()) // Parsea lo que llega al servidor en formato json
app.use(cookieParser()) // Generar el rastero de las cookies
app.use(morgan('dev')) // Muestra en consola la url, tiempo y status solicitado
app.use('*', cloudinaryConfig)// Configuración global para uso de cloudinary

if (MODE === 'PRODUCTION') {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname, '../frontend/build')))
}

console.log(path.join(__dirname, '../frontend/build'))

app.get('/', (req, res) => {
  console.log('Esto es una prueba')
  res.json({ menssge: 'Bien 😀' })
})

initRoutes(app)// Inicializa todas las rutas de la APP

module.exports = { app, PORT }
