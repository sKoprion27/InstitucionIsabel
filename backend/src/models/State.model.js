import { db } from './../database/index'
export const State = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre
      FROM estados
      WHERE existe = true
      ORDER BY id ASC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre
      FROM estados
      WHERE id = $1 
      AND existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE STATE NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE STATE 🤯', error)
      return ['ERROR GET ONE STATE 🤯', 400]
    }
  },
  postOne: async (state) => {
    const INSERTION = `
      INSERT INTO estados(nombre)
      VALUES ($1)
    `
    try {
      await db.query(INSERTION, [state.nombre])
      return ['POST STATE', 201]
    } catch (error) {
      console.log('ERROR POST STATE 🤯', error)
      return ['ERROR POST STATE 🤯', 400]
    }
  },
  putOne: async (state, id) => {
    const UPDATE = `
      UPDATE estados
      SET nombre = $2
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, state.nombre]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE STATE', 201]
    } catch (error) {
      console.log('ERROR UPDATE STATE 🤯', error)
      return ['ERROR UPDATE STATE 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE estados
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE STATE', 201]
    } catch (error) {
      console.log('ERROR DELETE STATE 🤯', error)
      return ['ERROR DELETE STATE 🤯', 400]
    }
  }

}
