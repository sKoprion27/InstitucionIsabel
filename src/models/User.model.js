import { db } from './../database/index'
export const User = {
  getAll: async () => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, U.creado as creado
      FROM usuarios U
      WHERE
      U.existe = true
      ORDER BY U.id DESC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL USER 🤯', error)
      return ['ERROR GET ALL USER 🤯', 400]
    }
  },
  getOne: async (id) => {
    console.log(id, '😀')
    const QUERY = `
      SELECT U.nombre, U.apellido, U.correo_electronico, R.nombre_role as role, R.id as id_role
      FROM usuarios U, roles_usuarios RU, roles R
      WHERE
      RU.id_usuario = $1
      AND
      RU.id_usuario = U.id
      AND
      RU.id_role = R.id
      AND
      U.existe = true
    `
    return db.query(QUERY, [id])
  },
  getOnePassword: async (correo_electronico) => {
    const QUERY = `
      SELECT id, "password", correo_electronico
      FROM usuarios
      WHERE
      "correo_electronico" = $1
      AND
      existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [correo_electronico])
      if (rowCount === 0) {
        return ['ERROR GET BY FIELD 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET BY FIELD 🤯', error)
      return ['ERROR GET BY FIELD 🤯', 404]
    }
  },
  me: async (id_usuario) => {
    const QUERY = `
      SELECT id, nombre, apellido, correo_electronico
      FROM usuarios
      WHERE
      id = $1
    `
    return db.query(QUERY, [id_usuario])
  },
  getRoles: async (id_usuario) => {
    const QUERY = `
      SELECT R.id, R.nombre_role as nombre
      FROM roles_usuarios RU, roles R
      WHERE
      id_role = R.id
      AND
      id_usuario = $1
    `
    return db.query(QUERY, [id_usuario])
  },
  getPermissions: async (id_role) => {
    const QUERY = `
      SELECT P.id, P.nombre_permiso as nombre
      FROM roles_permisos RP, permisos P
      WHERE
      id_permiso = P.id
      AND
      id_role = $1
    `
    return db.query(QUERY, [id_role])
  },
  getOneByField: async (field = '', param) => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, "password"
      FROM usuarios U, roles R
      WHERE
      U.${field} = $1
      AND
      U.existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [param])
      if (rowCount === 0) {
        return ['ERROR GET BY FIELD 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET BY FIELD 🤯', error)
      return ['ERROR GET BY FIELD 🤯', 404]
    }
  },
  postOne: async (user) => {
    const INSERTION = `
    INSERT INTO usuarios (nombre, apellido, "password", correo_electronico)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `
    return db.query(
      INSERTION,
      [user.nombre, user.apellido, user.password, user.correo_electronico]
    )
  },
  putOne: async (user, id) => {
    const UPDATE = `
      UPDATE usuarios
      SET
      nombre = $2,
      apellido = $3,
      correo_electronico = $4
      WHERE id = $1
      AND
      existe = true
    `
    const values = [id, user.nombre, user.apellido, user.correo_electronico]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE USER', 201]
    } catch (error) {
      console.log('ERROR UPDATE USER 🤯', error)
      return ['ERROR UPDATE USER 🤯', 400]
    }
  },
  putOneByField: async (field, data, id) => {
    console.log(field, data, id, '😆')
    const UPDATE = `
      UPDATE usuarios
      SET
      ${field} = $2
      WHERE
      id = $1
      AND
      existe = true
    `
    try {
      const { rowCount } = await db.query(UPDATE, [id, data])
      if (rowCount === 0) {
        return ['ERROR PUT USER BY FIELD 🤯', 404]
      } else {
        return ['PUT USER BY FIELD', 201]
      }
    } catch (error) {
      console.log('ERROR GET BY FIELD 🤯', error)
      return ['ERROR GET BY FIELD 🤯', 404]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      DELETE FROM
      usuarios
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
