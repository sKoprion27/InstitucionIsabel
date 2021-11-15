import { db } from './../database/index'
export const Note = {
  getAll: async () => {

  },
  getOne: async (id) => {

  },
  postOne: async (id_usuario) => {

  },
  putOne: async (role, id) => {

  },
  deleteOne: async (id_usuario) => {
    const DELETE = `
    DELETE FROM roles_usuarios
    WHERE
    = $1
    AND
    id_usuario = $2
    `
    return db.query(DELETE, [id_usuario])
  },
  deleteALlUserNotes: async (id_usuario) => {
    const DELETE = `
    DELETE FROM notas
    WHERE
    id_usuario = $1
    `
    return db.query(DELETE, [id_usuario])
  }
}
