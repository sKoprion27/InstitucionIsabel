import { response } from './../utils/response'
import { encrypt } from './../lib/encrypt'
import { User } from './../models/User.model'
import { RoleUser } from '../models/RoleUser'

export const userController = {

  // GET ALL
  getUsers: async (req, res) => {
    const [queryAnswer, status] = await User.getAll()
    response(req, res, 'GET USERS', queryAnswer, status)
  },

  // GET ONE
  getOneUser: async (req, res) => {
    const { id } = req.params

    try {
      const { rows, rowCount } = await User.getOne(id)
      if (rowCount === 1) {
        console.log(rows)
        const user = {
          nombre: rows[0].nombre,
          apellido: rows[0].apellido,
          correo_electronico: rows[0].correo_electronico,
          roles: [{
            id: rows[0].id_role,
            nombre: rows[0].role
          }]
        }
        console.log(user)
        response(req, res, 'GET ONE', user, 200)
      } else {
        let user = {
          nombre: rows[0].nombre,
          apellido: rows[0].apellido,
          correo_electronico: rows[0].correo_electronico
        }
        const roles = rows.map(row => {
          const role = {
            id: row.id_role,
            nombre: row.role
          }
          return role
        })
        user = {
          ...user,
          roles: roles
        }
        response(req, res, 'GET ONE', user, 200)
      }
    } catch (error) {
      console.log(error, 'error')
      response(req, res, null, null, 500)
    }
  },

  // POST ONE

  postOneUser: async (req, res) => {
    const { password, roles, id } = req.body
    const hash = encrypt.createHash(password)
    const user = {
      ...req.body,
      password: hash
    }
    const { rows } = await User.postOne({ id, ...user })
    console.log(rows)
    if (roles.length > 1) {
      for (const role of roles) {
        console.log(role)
        const [queryAnswer, status] = await RoleUser.postOne(role.id, rows[0].id)
        console.log(queryAnswer, status)
      }
    } else {
      const [queryAnswer, status] = await RoleUser.postOne(roles[0].id, rows[0].id)
      console.log(queryAnswer, status)
    }
    response(req, res, 'POST ONE USER', rows[0], 201)
  },

  // UPDATE ONE
  updateOneUser: async (req, res) => {
    const user = req.body
    const id = req.params.id
    const [queryAnswer, status] = await User.putOne(user, id)
    response(req, res, 'UPDATE ONE USER', queryAnswer, status)
  },

  // DELETE ONE
  deleteOneUser: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await User.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  },

  // CHANGE PASSWORD
  changePasswordUser: async (req, res) => {
    const { id } = req.params
    const passwordHashed = encrypt.createHash(req.body.password)
    console.log(passwordHashed)
    const [queryAnswer, status] = await User.putOneByField('password', passwordHashed, id)
    response(req, res, 'UPDATE ONE USER', queryAnswer, status)
  }

}
