import { db } from './../database/index'
export const User = {
  getAll: async () => {
    const QUERY = `
      SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
      FROM usuarios U, roles R
      WHERE U.id_role = R.id
    `
    const { rows } = await db.query(QUERY)
    return rows
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
      FROM usuarios U, roles R
      WHERE U.id_role = R.id AND U.id = $1;
    `
    const { rows } = await db.query(QUERY, [id])
    return rows[0]
  },
  getOneByField: async (field = '', param = '') => {
    const { rows } = await db.query(`SELECT * FROM usuarios WHERE ${field} = $1`, [param])
    return rows[0]
  },
  postOne: async (user) => {
    const INSERTION = `
    INSERT INTO usuarios (nombre, apellido, "password", correo_electronico, id_role)
    VALUES ($1, $2, $3, $4, $5)
    `
    try {
      await db.query(INSERTION, [user.nombre, user.apellido, user.password, user.correo_electronico, user.id_role])
      return 'user created'
    } catch (error) {
      console.log('ERROR 🤪 POST USER', error)
      return
    }
  }
}
