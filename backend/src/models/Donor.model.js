import { db } from '../database/index'
export const Donor = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM donadores')
    return rows
  },
  getOne: async (id) => {
    const { rows } = await db.query('SELECT * FROM donadores WHERE id = $1', [id])
    return rows[0]
  },
  postOne: async (user) => {
    const INSERTION = `INSERT INTO usuarios (id_cfdi, id_estado, nombre_contacto, telefono, razon_social, rfc, 
                        correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal)
    VALUES ($1, $2, $3, $4, $5)`
    const query = await db.query(INSERTION, [user.id_cfdi, user.id_estado, user.nombre_contacto, user.telefono, user.razon_social, user.rfc, user.correo_electronico, user.codigo_postal, user.domicilio_fiscal, user.regimen_fiscal])
    console.log('QUERY 😀', query)
    return query
  }

}
