import { db } from './../database/index'
export const State = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM estados')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM estados WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (state) => {
    const INSERTION = `INSERT INTO estados (nombre)
    VALUES ($1)`
    const query = await db.query(INSERTION, [state.nombre])
    console.log('QUERY 😀', query)
    return query
  }

}
