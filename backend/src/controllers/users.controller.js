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
    const [queryAnswer, status] = await User.getOne(id)
    response(req, res, 'GET ONE USER', {
      ...queryAnswer,
      roles: [{ nombre: 'TESORERO', id: 1 }, { nombre: 'ADMIN', id: 4 }]
    }, status)
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
