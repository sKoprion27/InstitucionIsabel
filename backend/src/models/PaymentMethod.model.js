import { db } from '../database/index'
export const PaymentMethod = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM metodos_pago
      WHERE existe = true
      ORDER BY id ASC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL PAYMENT METHODS 🤯', error)
      return ['ERROR GET ALL PAYMENT METHODS 🤯', 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM metodos_pago
      WHERE id = $1 
      AND existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE PAYMENT METHOD NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE PAYMENT METHOD 🤯', error)
      return ['ERROR GET ONE PAYMENT METHOD 🤯', 400]
    }
  },
  postOne: async (paymentMethod) => {
    const INSERTION = `
      INSERT INTO metodos_pago(
        nombre, descripcion)
      VALUES ($1, $2);
    `
    try {
      await db.query(INSERTION, [paymentMethod.nombre, paymentMethod.descripcion])
      return ['POST PAYMENT METHOD', 201]
    } catch (error) {
      console.log('ERROR POST PAYMENT METHOD 🤯', error)
      return ['ERROR POST PAYMENT METHOD 🤯', 400]
    }
  },
  putOne: async (paymentMethod, id) => {
    const UPDATE = `
      UPDATE metodos_pago
      SET nombre = $2,
      descripcion = $3
      WHERE id = $1 
      AND existe = true
    `
    const values = [id, paymentMethod.nombre, paymentMethod.descripcion]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE PAYMENT METHOD', 201]
    } catch (error) {
      console.log('ERROR UPDATE PAYMENT METHOD 🤯', error)
      return ['ERROR UPDATE PAYMENT METHOD 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE metodos_pago
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE PAYMENT METHOD', 201]
    } catch (error) {
      console.log('ERROR DELETE PAYMENT METHOD 🤯', error)
      return ['ERROR DELETE PAYMENT METHOD 🤯', 400]
    }
  }
}
