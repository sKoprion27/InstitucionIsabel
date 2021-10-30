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

    const [queryAnswer, status] = await User.getOnePassword(correo_electronico)

    if (!queryAnswer) {
      response(req, res, 'Credenciales inválidas', null, status)
      return
    }

    if (!(correo_electronico === queryAnswer.correo_electronico)) {
      response(req, res, 'Correo o contraseña incorrectas', null, 500)
      return
    }
    const match = await encrypt.compareHashPassword(password, queryAnswer.password)
    console.log('MATCH Login', correo_electronico, match)

    if (!match) {
      response(req, res, 'Correo o contraseña incorrectas', null, 500)
      return
    }
    const token = auth.createToken({ payload: { id: queryAnswer.id } })
    console.log(queryAnswer.id)
    response(req, res, 'Success', token, 200)
  },
  me: async (req, res) => {
    try {
      // usuarios
      const user = await User.me(req.body.id)

      const roles = await User.getRoles(req.body.id)// roles_usuarios

      let result = {
        ...user.rows[0],
        roles: roles.rows,
        permissions: new Set()
      }

      // roles_permisos
      if (result.roles.length === 1) {
        const permissions = await User.getPermissions(roles.rows[0].id)
        result = {
          ...result,
          permissions: [...permissions.rows]
        }
      } else {
        for (const role of result.roles) {
          const permissions = await User.getPermissions(role.id)
          result = {
            ...result,
            permissions: [...permissions.rows, ...result.permissions]
          }
        }
      }

      result = {
        ...result,
        permissions:
          Array.from(new Set(result.permissions
            .map(JSON.stringify)))
            .map(JSON.parse)
      }

      response(req, res, 'ME1', result, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ME1', 'Error', 500)
    }
  },
  me1: async (req, res) => {
    console.log(req.params.id)
    try {
      // usuarios
      const user = await User.me(req.params.id)

      const roles = await User.getRoles(req.params.id)// roles_usuarios

      let result = {
        ...user.rows[0],
        roles: roles.rows,
        permissions: new Set()
      }

      // roles_permisos
      if (result.roles.length === 1) {
        const permissions = await User.getPermissions(roles.rows[0].id)
        result = {
          ...result,
          permissions: [...permissions.rows]
        }
      } else {
        for (const role of result.roles) {
          const permissions = await User.getPermissions(role.id)
          result = {
            ...result,
            permissions: [...permissions.rows, ...result.permissions]
          }
        }
      }

      result = {
        ...result,
        permissions:
          Array.from(new Set(result.permissions
            .map(JSON.stringify)))
            .map(JSON.parse)
      }

      response(req, res, 'ME1', result, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ME1', 'Error', 500)
    }
  }
}
