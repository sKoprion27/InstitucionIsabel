import { response } from './../utils/response'
import { encrypt } from './../lib/encrypt'
import { User } from './../models/User.model'

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
    response(req, res, 'GET ONE USER', queryAnswer, status)
  },

  // POST ONE

  postOneUser: async (req, res) => {
    const passwordHashed = encrypt.createHash(req.body.password)
    const user = {
      ...req.body,
      password: passwordHashed
    }
    console.log(user)
    const [queryAnswer, status] = await User.postOne(user)
    response(req, res, 'POST ONE USER', queryAnswer, status)
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
