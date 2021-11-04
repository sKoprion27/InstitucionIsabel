import { db } from '../database/'
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
      SELECT id, nombre, descripcion
      FROM categorias
      WHERE id = $1
      AND existe = true
    `
    return db.query(QUERY, [id])
  },
  postOne: async (category) => {
    const INSERTION = `
      INSERT INTO categorias(
        nombre_beneficiario, descripcion)
      VALUES ($1, $2);
    `
    return db
      .query(INSERTION,
        [
          category.nombre,
          category.descripcion
        ]
      )
  },
  putOne: async (category, id) => {
    const UPDATE = `
      UPDATE categorias
      SET nombre = $2,
      descripcion = $3
      WHERE id = $1
      AND existe = true
    `
    const values = [
      id,
      category.nombre,
      category.descripcion
    ]
    return db.query(UPDATE, values)
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE categorias
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
