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
      if (rowCount === 0) {
        console.log('Empty')
        response(req, res, 'GET ONE', null, 500)
      } else if (rowCount === 1) {
        const user = {
          nombre: rows[0].nombre,
          apellido: rows[0].apellido,
          correo_electronico: rows[0].correo_electronico,
          roles: [{
            id: rows[0].id_role,
            nombre: rows[0].role
          }]
        }
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
      response(req, res, 'ERROR GET ONE USER', null, 500)
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
    try {
      const { rows } = await User.postOne({ id, ...user })
      if (roles.length > 1) {
        for (const role of roles) {
          await RoleUser.postOne(role.id, rows[0].id)
        }
      } else {
        await RoleUser.postOne(roles[0].id, rows[0].id)
      }
      response(req, res, 'POST ONE USER', rows[0], 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE USER', null, 500)
    }
  },

  // UPDATE ONE
  updateOneUser: async (req, res) => {
    const { id } = req.params
    const newRoles = req.body.roles

    try {
      const { rows, rowCount } = await User.getOne(id)
      if (rowCount === 0) {
        if (newRoles.length > 1) {
          for (const role of newRoles) {
            await RoleUser.postOne(role.id, id)
          }
        } else {
          await RoleUser.postOne(newRoles[0].id, id)
        }
      } else {
        const currentRoles = rows.map(row => {
          const role = {
            id: row.id_role,
            nombre: row.role
          }
          return role
        })

        if (currentRoles.length > newRoles.length) {
          console.log('CURRENT ROLES THAN __ DELETE')
          const rolesDelete = rolesDifference(currentRoles, newRoles, 'nombre')
          for (const role of rolesDelete) {
            await RoleUser.deleteOne(role.id, id)
          }
        } else if (newRoles.length > currentRoles.length) {
          console.log('NEW ROLES THAN __ UPDATE')
          const roleUpdate = rolesDifference(newRoles, currentRoles, 'nombre')
          console.log(roleUpdate)
          for (const role of roleUpdate) {
            console.log(role.id, id)
            await RoleUser.postOne(role.id, id)
          }
        } else {
          console.log('NO DIFF')
        }
      }
      const { roles, ...user } = req.body
      const putResponse = await User.putOne(user, id)
      response(req, res, 'UPDATE ONE USER', putResponse.rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR PUT ONE USER', null, 500)
    }
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

// currentRoles [1,2,3,4]
// newRoles [1,2,3] 4 Delete

// newRoles [1,2,3,4,5]
// currentRoles [1,2,3] 4,5 Update
function rolesDifference(array1, array2, compareField) {
  return array1.filter(function (current) {
    return array2.filter(function (current_b) {
      return current_b[compareField] === current[compareField]
    }).length === 0
  })
}
