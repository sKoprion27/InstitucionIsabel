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
