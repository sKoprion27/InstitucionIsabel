import { db } from './../database/index'
export const Cfdi = {
  getAll: async () => {
    const QUERY = `
      SELECT id, clave, descripcion
      FROM cfdis
      WHERE existe = true
      ORDER BY id ASC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL CFDIS 🤯', error)
      return ['ERROR GET ALL CFDIS 🤯', 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, clave, descripcion
      FROM cfdis
      WHERE id = $1 AND existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE CFDI NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE CFDI 🤯', error)
      return ['ERROR GET ONE CDFI 🤯', 400]
    }
  },
  postOne: async (cfdi) => {
    const INSERTION = `
    INSERT INTO cfdis(clave, descripcion)
    VALUES ($1, $2)
    `
    try {
      await db.query(INSERTION, [cfdi.clave, cfdi.descripcion])
      return ['POST CFDI', 201]
    } catch (error) {
      console.log('ERROR POST CFDI 🤯', error)
      return ['ERROR POST CFDI 🤯', 400]
    }
  },
  putOne: async (cfdi, id) => {
    const UPDATE = `
      UPDATE cfdis
      SET 
      clave = $2, 
      descripcion = $3
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, cfdi.clave, cfdi.descripcion]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE CFDI', 201]
    } catch (error) {
      console.log('ERROR UPDATE CFDI 🤯', error)
      return ['ERROR UPDATE CFDI 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE cfdis
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE CFDI', 201]
    } catch (error) {
      console.log('ERROR DELETE CFDI 🤯', error)
      return ['ERROR DELETE CFDI 🤯', 400]
    }
  }
}
