import { db } from '../database/index'

export const TypesDonations = {
  getAll: async () => {
    const QUERY = `
      SELECT * FROM tipo_donaciones
    `
    const { rows } = await db.query(QUERY)
    return rows
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT * FROM tipo_donaciones WHERE id = $1
    `
    const { rows } = await db.query(QUERY, [id])
    return rows[0]
  },
  postOne: async (typeDonations) => {
    console.log('LLEO AQUI')
    const INSERTION = `INSERT INTO tipo_donaciones (nombre , descripcion)
    VALUES ($1, $2)`
    const query = await db.query(INSERTION, [typeDonations.nombre, typeDonations.descripcion])
    console.log('QUERY typeDonations <3 😀', query)
    return query
  }
}
