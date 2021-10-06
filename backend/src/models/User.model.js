import { db } from './../database/index'
export const User = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM usuarios')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM usuarios WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (user) => {
    const INSERTION = `
    INSERT INTO usuarios (nombre, apellido, "password", correo_electronico, id_role)
    VALUES ($1, $2, $3, $4, $5)
    `
    const query = await db.query(INSERTION, [user.nombre, user.apellido, user.password, user.correo_electronico, user.id_role])
    console.log('QUERY 😀', query)
    return query
  }
}
