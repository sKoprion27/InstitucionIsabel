import { db } from '../database/index'
export const Beneficiary = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre_beneficiario, descripcion
      FROM beneficiarios
      WHERE existe = true
      ORDER BY id ASC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL BENEFICIARIES 🤯', error)
      return ['ERROR GET ALL BENEFICIARIES 🤯', 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre_beneficiario, descripcion
      FROM beneficiarios
      WHERE id = $1 
      AND existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE DONATION NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE BENEFICIARY 🤯', error)
      return ['ERROR GET ONE BENEFICIARY 🤯', 400]
    }
  },
  postOne: async (beneficiary) => {
    const INSERTION = `
      INSERT INTO beneficiarios(
        nombre_beneficiario, descripcion)
      VALUES ($1, $2);
    `
    try {
      await db.query(INSERTION, [beneficiary.nombre_beneficiario, beneficiary.descripcion])
      return ['POST DONATION', 201]
    } catch (error) {
      console.log('ERROR POST BENEFICIARY 🤯', error)
      return ['ERROR POST BENEFICIARY 🤯', 400]
    }
  },
  putOne: async (beneficiary, id) => {
    const UPDATE = `
      UPDATE beneficiarios
      SET nombre_beneficiario = $2,
      descripcion = $3
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, beneficiary.nombre_beneficiario, beneficiary.descripcion]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE BENEFICIARY', 201]
    } catch (error) {
      console.log('ERROR UPDATE BENEFICIARY 🤯', error)
      return ['ERROR UPDATE BENEFICIARY 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE beneficiarios
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE DONATION', 201]
    } catch (error) {
      console.log('ERROR DELETE BENEFICIARY 🤯', error)
      return ['ERROR DELETE BENEFICIARY 🤯', 400]
    }
  }
}
