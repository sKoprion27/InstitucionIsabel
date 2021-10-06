import { db } from './../database/index'
export const Cfdi = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM cfdis')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM cfdis WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (cfdi) => {
    const INSERTION = `INSERT INTO cfdis (clave, descripcion)
    VALUES ($1, $2)`
    const query = await db.query(INSERTION, [cfdi.clave, cfdi.descripcion])
    console.log('QUERY 😀', query)
    return query
  }

}
