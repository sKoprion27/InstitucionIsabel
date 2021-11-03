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
    return db.query(INSERTION, [id_role, id_usuario])
  },
  putOne: async (role, id) => {

  },
  deleteOne: async (id_role, id_usuario) => {
    const DELETE = `
    DELETE FROM roles_usuarios
    WHERE
    id_role = $1
    AND
    id_usuario = $2
    `
    return db.query(DELETE, [id_role, id_usuario])
  }
}
