import { db } from '../database/index'

export const TipoDonaciones = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM tipo_donaciones')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM tipo_donaciones WHERE id = $1', [id])
    return rows[0]
  }
}
