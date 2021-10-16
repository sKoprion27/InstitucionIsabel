import { db } from './../database/index'
export const Role = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre_role
      FROM roles
      WHERE existe = true
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL Role 🤯', error)
      return ["ERROR GET ALL Role 🤯", 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre_role
      FROM roles
      WHERE id = $1 AND existe = true
    `
    try {
      const { rows } = await db.query(QUERY, [id])
      if (!rows[0]) {
        return ["ERROR GET ONE Role 🤯", 404]
      }
      else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE Role 🤯', error)
      return ["ERROR GET ONE Role 🤯", 400]
    }
  },
  postOne: async (role) => {
    const INSERTION = `
    INSERT INTO roles (nombre_role)
    VALUES ($1)
    `
    try {
      await db.query(INSERTION, [role.nombre_role])
      return ['POST Role', 201]
    } catch (error) {
      console.log('ERROR POST Role 🤯', error)
      return ["ERROR POST Role 🤯", 400]
    }
  },
  putOne: async (role, id) => {
    const UPDATE = `
      UPDATE roles
      SET
      nombre_role = $2
      WHERE id = $1
    `
    const values = [id, role.nombre_role]
    try {
      const [, status] = await Role.getOne(id)
      if (status === 400) {
        return ["ERROR UPDATE Role 🤯", 400]
      }
      await db.query(UPDATE, values)
      return ['UPDATE Role', 201]
    } catch (error) {
      console.log('ERROR UPDATE Role 🤯', error)
      return ["ERROR UPDATE Role 🤯", 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE roles
      SET existe = false
      WHERE id = $1;
    `
    try {
      await db.query(DELETE, [id])
      return ['DELETE Role', 201]
    } catch (error) {
      console.log('ERROR DELETE Role 🤯', error)
      return ["ERROR DELETE Role 🤯", 400]
    }
  },
}
