import { db } from '../database/index'
export const Beneficiary = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM beneficiarios')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM beneficiarios WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (beneficiary) => {
    const INSERTION = `INSERT INTO beneficiarios (nombre_beneficiario,descripcion)
    VALUES ($1, $2)`
    const query = await db.query(INSERTION, [beneficiary.nombre_beneficiario, beneficiary.descripcion])
    console.log('QUERY Beneficiary <3 😀', query)
    return query
  }

}
