import { db } from '../database/index'
export const RolesPermissions = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM roles_permisos')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM roles_permisos WHERE id = $1', [id])
    return rows[0]
  },
  getOneByField: async (field = '', param = '') => {
    const { rows } = await db.query(`SELECT * FROM roles_permisos WHERE ${field} = $1`, [param])
    return rows[0]
  },
  postOne: async (rolePermission) => {
    const INSERTION = `
    INSERT INTO roles_permisos (id_permiso, id_role)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [rolePermission.id_permiso, rolePermission.id_role])
      return 'rolePermission created'
    } catch (error) {
      console.log('ERROR 🤪 POST rolePermission', error)
      return
    }
  }
}
