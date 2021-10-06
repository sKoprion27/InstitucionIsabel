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
  postOne: async (donor) => {
    const INSERTION = `INSERT INTO donadores (id_cfdi, id_estado, nombre_contacto, telefono, razon_social, rfc, 
                        correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal)
    VALUES ($1, $2, $3, $4, $5)`
    const query = await db.query(INSERTION, [donor.id_cfdi, donor.id_estado, donor.nombre_contacto, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal])
    console.log('QUERY 😀', query)
    return query
  }

}
