import { db } from '../database/index'
export const Donor = {
  getAll: async () => {
    const QUERY = `
      SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
      FROM donadores D, cfdis C, estados E
      WHERE D.id_cfdi = C.id 
      AND D.id_estado = E.id 
      AND D.existe = true
      ORDER BY D.id ASC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre estado, C.clave Clave_CFDI, C.descripcion Descripcion_CFDI
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `
    try {
      await db.query(INSERTION, [donor.id_cfdi, donor.id_estado, donor.nombre_contacto, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal])
      return ['POST DONOR', 201]
    } catch (error) {
      console.log('ERROR POST DONOR 🤯', error)
      return ['ERROR POST DONOR 🤯', 400]
    }
  },
  putOne: async (donor, id) => {
    const UPDATE = `
      UPDATE donadores
      SET id_cfdi = $2, 
      id_estado = $3, 
      nombre_contacto = $4, 
      telefono = $5, 
      razon_social = $6, 
      rfc = $7, 
      correo_electronico = $8, 
      codigo_postal = $9, 
      domicilio_fiscal = $10, 
      regimen_fiscal = $11
      WHERE id = $1 and existe = true
    `
    const values = [id, donor.id_cfdi, donor.id_estado, donor.nombre_contacto, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal]
    try {
      const { rowCount } = await db.query(UPDATE, values)

      if (rowCount === 0) {
        return ['ERROR  UPDATE NOT FOUND', 404]
      }
      return ['UPDATE ONE DONOR', 201]
    } catch (error) {
      console.log('ERROR UPDATE DONOR 🤯', error)
      return ['ERROR UPDATE DONOR 🤯', 400]
    }
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE donadores
      SET existe = false
      WHERE id = $1
    `
    try {
      const { rowCount } = await db.query(DELETE, [id])

      if (rowCount === 0) {
        return ['ERROR DELETE NOT FOUND', 404]
      }
      return ['DELETE ONE DONOR', 201]
    } catch (error) {
      console.log('ERROR DELETE DONOR 🤯', error)
      return ['ERROR DELETE DONOR 🤯', 400]
    }
  }
}
