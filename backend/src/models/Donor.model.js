import { db } from '../database/index'
export const Donor = {
  getAll: async () => {
    const QUERY = `
      SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
      FROM donadores D, cfdis C, estados E
      WHERE D.id_cfdi = C.id 
      AND D.id_estado = E.id 
      AND D.existe = true
      ORDER BY D.id ASC
    `
    try {
      const { rows } = await db.query(QUERY)
      return [rows, 200]
    } catch (error) {
      console.log('ERROR GET ALL DONORS 🤯', error)
      return ['ERROR GET ALL DONORS 🤯', 400]
    }
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
      FROM donadores D, cfdis C, estados E
      WHERE D.id_cfdi = C.id 
      AND D.id_estado = E.id 
      AND D.id = $1 
      AND D.existe = true
    `
    try {
      const { rows, rowCount } = await db.query(QUERY, [id])
      if (rowCount === 0) {
        return ['ERROR GET ONE DONOR NOT FOUND 🤯', 404]
      } else {
        return [rows[0], 200]
      }
    } catch (error) {
      console.log('ERROR GET ONE DONOR 🤯', error)
      return ['ERROR GET ONE DONOR 🤯', 400]
    }
  },
  postOne: async (donor) => {
    const INSERTION = `
      INSERT INTO donadores(
        id_cfdi, id_estado, nombre_contacto, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true);
    `
    try {
      await db.query(INSERTION, [donor.id_cfdi, donor.id_estado, donor.nombre_contacto, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal])
      return ['POST DONOR', 201]
    } catch (error) {
      console.log('ERROR POST DONOR 🤯', error)
      return ['ERROR POST DONOR 🤯', 400]
    }
  }

  /* getAll: async () => {
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
    const query = await db.query(INSERTION, [donor.id_cfdi, donor.id_estado, donor.nombre_contacto, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal])
    console.log('QUERY 😀', query)
    return query
  } */

}
