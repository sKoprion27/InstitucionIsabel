import { db } from '../database/index'

export const TypesDonation = {
  getAll: () => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM tipo_donaciones
      WHERE existe = true
      ORDER BY id DESC
    `
    return db.query(QUERY)
  },
  getOne: (id) => {
    const QUERY = `
      SELECT id, nombre, descripcion
      FROM tipo_donaciones
      WHERE id = $1
      AND existe = true
    `
    return db.query(QUERY, [id])
  },
  postOne: (type) => {
    const INSERTION = `
      INSERT INTO tipo_donaciones(nombre, descripcion)
      VALUES ($1, $2)
    `
    return db.query(INSERTION, [type.nombre, type.descripcion])
  },
  putOne: (type, id) => {
    const UPDATE = `
      UPDATE tipo_donaciones
      SET nombre = $2,
      descripcion = $3
      WHERE
      id = $1
      AND
      existe = true
    `
    const values = [
      id,
      type.nombre,
      type.descripcion
    ]
    return db.query(UPDATE, values)
  },
  deleteOne: (id) => {
    const DELETE = `
      UPDATE tipo_donaciones
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
