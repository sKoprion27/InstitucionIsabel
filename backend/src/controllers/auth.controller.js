/* eslint-disable camelcase */
import { response } from './../utils/response'
import { auth } from './../lib/auth'
import { User } from '../models/User.model'
import { encrypt } from './../lib/encrypt'

// const mockup = {
//   id: 100,
//   email: 'danielcu@isabel.com',
//   password: 'passwd'
// }
export const login = async (req, res) => {
  const { correo_electronico, password } = req.body

  const user = await User.getOneByField('correo_electronico', correo_electronico)
  if (!user) {
    response(req, res, 'LOGIN', 'invalid credentials', 400)
    return
  }

  if (!(correo_electronico === user.correo_electronico)) {
    response(req, res, 'LOGIN', 'invalid email', 400)
    return
  }
  const match = await encrypt.compareHashPassword(password, user.password)

  if (!match) {
    response(req, res, 'LOGIN', 'invalid password', 400)
    return
  }
  const token = auth.createToken({ payload: { id: user.id } })
  response(req, res, 'LOGIN', token, 200)
}
export const me = async (req, res) => {
  const { id } = req.body
  const userDB = await User.getOneByField('id', id)
  const { password, creado, existe, ...user } = userDB

  response(req, res, 'ME', user, 200)
}
