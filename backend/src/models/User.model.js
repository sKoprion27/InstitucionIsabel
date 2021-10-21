import { db } from './../database/index'
export const User = {
  getAll: async () => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, U.creado as creado
      FROM usuarios U
      WHERE
      U.existe = true
      ORDER BY U.id
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
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico
      FROM usuarios U, roles R
      WHERE
      U.id = $1
      AND U.existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE USER NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE USER 🤯', error)
      return ['ERROR GET ONE USER 🤯', 400]
    }
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
  me: async (id) => {
    console.log(id, '😀😆')
    const QUERY = `
      SELECT *
      FROM roles_usuarios
    `
    try {
      const { rows, rowCount } = await db.query(QUERY)
      if (rowCount === 0) {
        return ['ERROR ME 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR ME🤯', error)
      return ['ERROR ME 🤯', 404]
    }
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
    INSERT INTO usuarios (nombre, apellido, "password", correo_electronico, id_role)
    VALUES ($1, $2, $3, $4, $5)
    `
    try {
      await db.query(INSERTION, [user.nombre, user.apellido, user.password, user.correo_electronico, user.id_role])
      return ['POST USER', 201]
    } catch (error) {
      console.log('ERROR POST USER 🤯', error)
      return ['ERROR POST USER 🤯', 400]
    }
  },
  putOne: async (user, id) => {
    const UPDATE = `
      UPDATE usuarios
      SET
      nombre = $2,
      apellido = $3,
      correo_electronico = $4,
      id_role = $5
      WHERE id = $1
      AND
      existe = true
    `
    const values = [id, user.nombre, user.apellido, user.correo_electronico, user.id_role]
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
      UPDATE usuarios
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE USER', 201]
    } catch (error) {
      console.log('ERROR DELETE USER 🤯', error)
      return ['ERROR DELETE USER 🤯', 400]
    }
  }
}
