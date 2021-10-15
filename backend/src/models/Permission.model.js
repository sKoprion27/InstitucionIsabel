import { db } from '../database/index'
export const Permission = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM permisos')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM permisos WHERE id = $1', [id])
    return rows[0]
  },
  getOneByField: async (field = '', param = '') => {
    const { rows } = await db.query(`SELECT * FROM permisos WHERE ${field} = $1`, [param])
    return rows[0]
  },
  postOne: async (permission) => {
    const INSERTION = `
    INSERT INTO permisos (nombre_permiso)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [permission.nombre])
      return 'permission created'
    } catch (error) {
      console.log('ERROR 🤪 POST permission', error)
      return
    }
  }
}
