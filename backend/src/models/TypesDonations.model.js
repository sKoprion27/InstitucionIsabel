import { db } from '../database/index'

export const TypesDonation = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM tipo_donaciones
      WHERE existe = true
      ORDER BY id ASC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL DONATION TYPES 🤯', error)
      return ['ERROR GET ALL DONATION TYPES 🤯', 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM tipo_donaciones
      WHERE id = $1 
      AND existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE DONATION TYPE NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE DONATION TYPE 🤯', error)
      return ['ERROR GET ONE DONATION TYPE 🤯', 400]
    }
  },
  postOne: async (type) => {
    const INSERTION = `
      INSERT INTO tipo_donaciones(nombre, descripcion)
      VALUES ($1, $2)
    `
    try {
      await db.query(INSERTION, [type.nombre, type.descripcion])
      return ['POST DONATION TYPE', 201]
    } catch (error) {
      console.log('ERROR POST DONATION TYPE 🤯', error)
      return ['ERROR POST DONATION TYPE 🤯', 400]
    }
  },
  putOne: async (type, id) => {
    const UPDATE = `
      UPDATE tipo_donaciones
      SET nombre = $2, 
      descripcion = $3
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, type.nombre, type.descripcion]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE DONATION TYPE', 201]
    } catch (error) {
      console.log('ERROR UPDATE DONATION TYPE 🤯', error)
      return ['ERROR UPDATE DONATION TYPE 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE tipo_donaciones
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE DONATION TYPE', 201]
    } catch (error) {
      console.log('ERROR DELETE DONATION TYPE 🤯', error)
      return ['ERROR DELETE DONATION TYPE 🤯', 400]
    }
  }
}
