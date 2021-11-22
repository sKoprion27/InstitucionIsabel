import { db } from './../database/index'
export const Permission = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre_permiso
      FROM permisos
      WHERE existe = true
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL Permission 🤯', error)
      return ["ERROR GET ALL Permission 🤯", 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre_permiso
      FROM permisos
      WHERE id = $1 AND existe = true
    `
    try {
      const { rows } = await db.query(QUERY, [id])
      if (!rows[0]) {
        return ["ERROR GET ONE Permission 🤯", 404]
      }
      else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE Permission 🤯', error)
      return ["ERROR GET ONE Permission 🤯", 400]
    }
  },
  postOne: async (permission) => {
    const INSERTION = `
    INSERT INTO permisos (nombre_permiso)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [permission.nombre_permiso])
      return ['POST Permission', 201]
    } catch (error) {
      console.log('ERROR POST Permission 🤯', error)
      return ["ERROR POST Permission 🤯", 400]
    }
  },
  putOne: async (permission, id) => {
    const UPDATE = `
      UPDATE usuarios
      SET
      nombre_permiso = $2
      WHERE id = $1
    `
    const values = [id, permission.nombre_permiso]
    try {
      const [, status] = await Permission.getOne(id)
      if (status === 400) {
        return ["ERROR UPDATE Permission 🤯", 400]
      }
      await db.query(UPDATE, values)
      return ['UPDATE Permission', 201]
    } catch (error) {
      console.log('ERROR UPDATE Permission 🤯', error)
      return ["ERROR UPDATE Permission 🤯", 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE permisos
      SET existe = false
      WHERE id = $1;
    `
    try {
      await db.query(DELETE, [id])
      return ['DELETE Permission', 201]
    } catch (error) {
      console.log('ERROR DELETE Permission 🤯', error)
      return ["ERROR DELETE Permission 🤯", 400]
    }
  },
}
