import { response } from './../utils/response'
import config from './../config/index'
const jwt = require('jsonwebtoken')

// Config file
const { privateKey } = config.jwt_token

// Intern use functions
const isValidToken = ({ token }) => {
  try {
    const decodedToken = jwt.verify(token, privateKey)
    return decodedToken
  } catch (error) {
    return false
  }
}
// Export auth functions
export const auth = {
  createToken: (payload = {}) => {
    const token = jwt.sign(payload, privateKey, { expiresIn: '1d' })
    return token
  },
  verifyToken: (req, res, next) => {
    const { headers, body } = req
    const { authorization = undefined } = headers

    if (!authorization) {
      response(req, res, 'ERROR', 'token error', 400)
      return
    }

    const headerToken = authorization.split(' ')[1]

    const decodedToken = isValidToken({ token: headerToken })

    if (!decodedToken) {
      response(req, res, 'ERROR', 'invalid token', 400)
      return
    }
    const { payload } = decodedToken

    // We add the id in body for the other middleware functions
    body.id = payload.id

    // Next middleware
    next()
  }
}
