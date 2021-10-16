import { db } from '../database/index'
export const RolePermission = {
  getRoleAllPermissions: async (idRole) => {
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
      const { rows, rowCount } = await db.query(QUERY, [idRole])
      if (rowCount === 0) {
        return ['ERROR GET ONE Role Permission 🤯', 404]
      } else {
        return [rows, 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE Role Permission 🤯', error)
      return ['ERROR GET ONE Role Permission 🤯', 400]
    }
  },
  getOneRoleOnePermission: async (idRole, idPermiso) => {
    const QUERY = `
      SELECT RP.id, nombre_permiso as permiso
      FROM roles_permisos RP, roles R, permisos P
      WHERE
      RP.id_role = R.id
      AND
      RP.id_permiso = P.id
      AND
      R.id = $1
      AND
      P.id = $2
      AND
      RP.existe = true
      AND
      R.existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [idRole, idPermiso])
      if (rowCount === 0) {
        return ['ERROR GET ONE Role One Permission 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE Role Permission 🤯', error)
      return ['ERROR GET ONE Role Permission 🤯', 400]
    }
  },
  postOne: async (role) => {
    const INSERTION = `
    INSERT INTO roles_permisos (nombre_role)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [role.nombre_role])
      return ['POST Role', 201]
    } catch (error) {
      console.log('ERROR POST Role Permission 🤯', error)
      return ['ERROR POST Role Permission 🤯', 400]
    }
  },
  putOne: async (role, id) => {
    const UPDATE = `
      UPDATE roles_permisos
      SET
      nombre_role = $2
      WHERE id = $1
    `
    const values = [id, role.nombre_role]
    try {
      const [, status] = await Role.getOne(id)
      if (status === 400) {
        return ['ERROR UPDATE Role Permission 🤯', 400]
      }
      await db.query(UPDATE, values)
      return ['UPDATE Role', 201]
    } catch (error) {
      console.log('ERROR UPDATE Role Permission 🤯', error)
      return ['ERROR UPDATE Role  Permission🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE roles_permisos
      SET existe = false
      WHERE id = $1;
    `
    try {
      await db.query(DELETE, [id])
      return ['DELETE Role', 201]
    } catch (error) {
      console.log('ERROR DELETE Role Permission 🤯', error)
      return ['ERROR DELETE Role Permission 🤯', 400]
    }
  }
}
