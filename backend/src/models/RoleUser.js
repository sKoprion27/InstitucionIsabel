import { db } from './../database/index'
export const RoleUser = {
  getAll: async () => {

  },
  getOne: async (id) => {

  },
  postOne: async (id_role, id_usuario) => {
    const INSERTION = `
    INSERT INTO roles_usuarios (id_role,id_usuario)
    VALUES ($1, $2)
    `
    try {
      await db.query(INSERTION, [id_role, id_usuario])
      return ['POST Role_User', 201]
    } catch (error) {
      console.log('ERROR POST Role 🤯', error)
      return ['ERROR POST Role 🤯', 400]
    }
  },
  putOne: async (role, id) => {

  },
  deleteOne: async (id) => {

  }
}
