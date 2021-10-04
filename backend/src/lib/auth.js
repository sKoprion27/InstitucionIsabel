import { response } from './../utils/response'
import config from './../config/index'
const jwt = require('jsonwebtoken')

// 0.- Create a root user
// 1.- Register user
// 2.- Login -> validate mail -> validate password -> give token
// 3.- Access to protected routes

// Config file
const { privateKey } = config.jwt_token

// Functions
export const createToken = (payload = {}) => {
  const token = jwt.sign(payload, privateKey, { expiresIn: '1d' })
  return token
}

const isValidToken = ({ token }) => {
  try {
    const decodedToken = jwt.verify(token, privateKey)
    return decodedToken
  } catch (error) {
    return false
  }
}

// Middleware
export const verifyToken = (req, res, next) => {
  const { headers, body } = req
  const { authorization = undefined } = headers

  if (!authorization) {
    response(req, res, 'token error', 400)
    return
  }

  const headerToken = authorization.split(' ')[1]

  const decodedToken = isValidToken({ token: headerToken })

  if (!decodedToken) {
    response(req, res, 'invalid token', 400)
    return
  }
  const { payload } = decodedToken
  // We add the id in body for the other middleware functions
  body.id = payload.id
  // Next middleware
  next()
}
