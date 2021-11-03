import { db } from '../database/index'
export const Category = {
  getAll: () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM categorias
      WHERE existe = true
      ORDER BY id ASC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT id, nombre_beneficiario, descripcion
      FROM beneficiarios
      WHERE id = $1
      AND existe = true
    `
    return db.query(QUERY, [id])
  },
  postOne: async (beneficiary) => {
    const INSERTION = `
      INSERT INTO beneficiarios(
        nombre_beneficiario, descripcion)
      VALUES ($1, $2);
    `
    return db
      .query(INSERTION,
        [
          beneficiary.nombre_beneficiario,
          beneficiary.descripcion
        ]
      )
  },
  putOne: async (beneficiary, id) => {
    const UPDATE = `
      UPDATE beneficiarios
      SET nombre_beneficiario = $2,
      descripcion = $3
      WHERE id = $1
      AND existe = true
    `
    const values = [
      id,
      beneficiary.nombre_beneficiario,
      beneficiary.descripcion
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
