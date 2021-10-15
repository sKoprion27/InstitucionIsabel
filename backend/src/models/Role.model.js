import { db } from '../database/index'
export const Role = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM roles')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM roles WHERE id = $1', [id])
    return rows[0]
  },
  getOneByField: async (field = '', param = '') => {
    const { rows } = await db.query(`SELECT * FROM roles WHERE ${field} = $1`, [param])
    return rows[0]
  },
  postOne: async (role) => {
    const INSERTION = `
    INSERT INTO roles (nombre_role)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [role.nombre])
      return 'role created'
    } catch (error) {
      console.log('ERROR 🤪 POST role', error)
      return
    }
  }
}
