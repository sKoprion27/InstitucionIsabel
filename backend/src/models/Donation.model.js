import { db } from './../database/index'
export const Donation = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM donaciones')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM donaciones WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (donation) => {
    const INSERTION = `INSERT INTO donaciones (id_donador , id_metodo_pago, id_tipo_donacion, nombre, monto, foto_donacion)
    VALUES ($1, $2, $3, $4, $5, $6)`
    const query = await db.query(INSERTION, [donation.id_donador, donation.id_metodo_pago, donation.id_tipo_donacion, donation.nombre, donation.monto, donation.foto_donacion])
    console.log('QUERY Donation <3 😀', query)
    return query
  }

}
