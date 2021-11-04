import { db } from '../database/index'
export const PaymentMethod = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM metodos_pago
      WHERE existe = true
      ORDER BY id DESC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM metodos_pago
      WHERE id = $1
      AND existe = true
    `
    return db.query(QUERY, [id])
  },
  postOne: async (paymentMethod) => {
    const INSERTION = `
      INSERT INTO metodos_pago(
        nombre, descripcion)
      VALUES ($1, $2);
    `
    return db.query(INSERTION,
      [
        paymentMethod.nombre,
        paymentMethod.descripcion
      ])
  },
  putOne: async (paymentMethod, id) => {
    const UPDATE = `
      UPDATE metodos_pago
      SET nombre = $2,
      descripcion = $3
      WHERE id = $1
      AND existe = true
    `
    const values = [
      id,
      paymentMethod.nombre,
      paymentMethod.descripcion
    ]
    return db.query(UPDATE, values)
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE metodos_pago
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
