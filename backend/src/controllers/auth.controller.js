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
export const authController = {
  login: async (req, res) => {
    const { correo_electronico, password } = req.body

    const [queryAnswer, status] = await User.getOneByField('correo_electronico', correo_electronico)
    if (!queryAnswer) {
      response(req, res, 'LOGIN', 'invalid credentials', status)
      return
    }

    if (!(correo_electronico === queryAnswer.correo_electronico)) {
      response(req, res, 'LOGIN', 'invalid email', 500)
      return
    }
    console.log(queryAnswer)
    const match = await encrypt.compareHashPassword(password, queryAnswer.password)

    if (!match) {
      response(req, res, 'LOGIN', 'invalid password', 500)
      return
    }
    const token = auth.createToken({ payload: { id: queryAnswer.id } })
    response(req, res, 'LOGIN', token, 200)
  },
  me: async (req, res) => {
    const { id } = req.body
    const [queryAnswer, status] = await User.getOneByField('id', id)
    const { password, creado, existe, ...user } = queryAnswer

    response(req, res, 'ME', user, status)
  }
}
