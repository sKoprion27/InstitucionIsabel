import { db } from './../database/index'
export const User = {
  getAll: async () => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, R.nombre_role Rol
      FROM usuarios U, roles R
      WHERE U.id_role = R.id
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL USER 🤯', error)
      return ["ERROR GET ALL USER 🤯", 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, R.nombre_role Rol
      FROM usuarios U, roles R
      WHERE U.id_role = R.id AND U.id = $1 AND U.existe = true
    `
    try {
      const { rows } = await db.query(QUERY, [id])
      if (!rows[0]) {
        return ["ERROR GET ONE USER 🤯", 404]
      }
      else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE USER 🤯', error)
      return ["ERROR GET ONE USER 🤯", 400]
    }
  },
  getOneByField: async (field = '', param = 0) => {
    const QUERY = `
      SELECT U.id, nombre, apellido, correo_electronico, "password", R.nombre_role Rol
      FROM usuarios U, roles R
      WHERE
      U.${field} = $1
      AND
      U.id_role = R.id
      AND
      U.existe = true
    `
    try {
      const { rows } = await db.query(QUERY, [param])
      if (!rows[0]) {
        return ["ERROR GET BY FIELD 🤯", 404]
      }
      else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET BY FIELD 🤯', error)
      return ["ERROR GET BY FIELD 🤯", 404]
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
      return ["ERROR POST USER 🤯", 400]
    }
  },
  putOne: async (user, id) => {
    const UPDATE = `
      UPDATE usuarios
      SET
      nombre = $2,
      apellido = $3,
      "password" = $4,
      correo_electronico = $5,
      id_role = $6
      WHERE id = $1
    `
    const values = [id, user.nombre, user.apellido, user.password, user.correo_electronico, user.id_role]
    try {
      const [, status] = await User.getOne(id)
      if (status === 400) {
        return ["ERROR UPDATE USER 🤯", 400]
      }
      await db.query(UPDATE, values)
      return ['UPDATE USER', 201]
    } catch (error) {
      console.log('ERROR UPDATE USER 🤯', error)
      return ["ERROR UPDATE USER 🤯", 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE usuarios
      SET existe = false
      WHERE id = $1
    `
    try {
      await db.query(DELETE, [id])
      return ['DELETE USER', 201]
    } catch (error) {
      console.log('ERROR DELETE USER 🤯', error)
      return ["ERROR DELETE USER 🤯", 400]
    }
  },
}
