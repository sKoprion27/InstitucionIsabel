import { db } from '../database/index'
export const RolePermission = {
  getRoleAllPermissions: async (id_role) => {
    const QUERY = `
      SELECT RP.id, nombre_permiso as permiso
      FROM roles_permisos RP, roles R, permisos P
      WHERE
      RP.id_permiso = P.id
      AND
      RP.id_role = R.id
      AND
      R.id = $1
      AND
      RP.existe = true
      AND
      R.existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id_role])
      if (rowCount === 0) {
        return ['ERROR GET ONE Role Permission 🤯', 404]
      } else {
        return [rows, 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE Role Permission 🤯', error)
      return ['ERROR GET ONE Role Permission 🤯', 400]
    }
  }
}
