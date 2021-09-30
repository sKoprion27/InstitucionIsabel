import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const PORT = 4000 || process.env.PORT

app.use(json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bien 😀')
})

module.exports = { app, PORT }
