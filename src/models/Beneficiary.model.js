import { db } from '../database/index'
export const Beneficiary = {
  getAll: async () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM beneficiarios
      WHERE existe = true
      ORDER BY id DESC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre, descripcion, archivo
      FROM beneficiarios
      WHERE id = $1
      AND existe = true
    `
    return db.query(QUERY, [id])
  },
  postOne: async (beneficiary) => {
    const INSERTION = `
      INSERT INTO beneficiarios
      (nombre, descripcion, archivo)
      VALUES ($1, $2, $3);
    `
    return db
      .query(INSERTION,
        [
          beneficiary.nombre,
          beneficiary.descripcion,
          beneficiary.archivo
        ])
  },
  putOne: async (beneficiary, id) => {
    const UPDATE = `
      UPDATE beneficiarios
      SET
      nombre = $2,
      descripcion = $3,
      archivo = $4
      WHERE id = $1
      AND existe = true
    `
    const values = [
      id,
      beneficiary.nombre,
      beneficiary.descripcion,
      beneficiary.archivo
    ]
    return db.query(UPDATE, values)
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE beneficiarios
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
