import { db } from '../database/index'
export const Donor = {
  getAll: async () => {
    const QUERY = `
      SELECT
      D.id, telefono,
      razon_social,
      D.nombre,
      rfc, correo_electronico,
      codigo_postal,
      domicilio_fiscal,
      regimen_fiscal,
      E.nombre Estado,
      C.clave Clave_CFDI,
      C.descripcion Descripcion_CFDI
      FROM
      donadores D,
      cfdis C,
      estados E
      WHERE
      D.id_cfdi = C.id
      AND
      D.id_estado = E.id
      AND
      D.existe = true
      ORDER BY D.id ASC
    `
    return db.query(QUERY)
  },
  getOne: async (id) => {
    const QUERY = `
      SELECT D.id, 
      telefono, 
      razon_social, 
      D.nombre nombre, 
      rfc, 
      correo_electronico, 
      codigo_postal, 
      domicilio_fiscal, 
      regimen_fiscal, 
      E.nombre estado, 
      C.clave Clave_CFDI, 
      C.descripcion Descripcion_CFDI,
      D.id_estado as id_estado,
      D.id_cfdi as id_cfdi
      FROM donadores D, cfdis C, estados E
      WHERE D.id_cfdi = C.id 
      AND D.id_estado = E.id 
      AND D.id = $1 
      AND D.existe = true
    `
    return db.query(QUERY, [id])
  },
  getStates: async (id_donador) => {
    const QUERY = `
    SELECT E.id
    FROM donadores D, estados E
    WHERE D.id_estado = E.id 
    AND D.id = $1;
    `
    return db.query(QUERY, [id_donador])
  },
  getCfdis: async (id_donador) => {
    const QUERY = `
    SELECT C.id
    FROM donadores D, cfdis C
    WHERE D.id_cfdi= C.id 
    AND D.id = $1;
    `
    return db.query(QUERY, [id_donador])
  },
  postOne: async (donor) => {
    const INSERTION = `
      INSERT INTO donadores(
        id_cfdi, 
        id_estado, 
        nombre, 
        telefono, 
        razon_social, 
        rfc, 
        correo_electronico, 
        codigo_postal, 
        domicilio_fiscal, 
        regimen_fiscal
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `
    const VALUES = [
      donor.id_cfdi,
      donor.id_estado,
      donor.nombre,
      donor.telefono,
      donor.razon_social,
      donor.rfc,
      donor.correo_electronico,
      donor.codigo_postal,
      donor.domicilio_fiscal,
      donor.regimen_fiscal
    ]
    return db.query(INSERTION, VALUES)
  },
  putOne: async (donor, id) => {
    const UPDATE = `
      UPDATE donadores
      SET telefono = $2, 
      razon_social = $3, 
      nombre = $4, 
      rfc = $5, 
      correo_electronico = $6,
      codigo_postal = $7,
      domicilio_fiscal = $8, 
      regimen_fiscal = $9,
      id_estado = $10, 
      id_cfdi = $11
      WHERE id = $1 and existe = true
    `
    const VALUES = [
      id,
      donor.telefono,
      donor.razon_social,
      donor.nombre,
      donor.rfc,
      donor.correo_electronico,
      donor.codigo_postal,
      donor.domicilio_fiscal,
      donor.regimen_fiscal,
      donor.id_estado,
      donor.id_cfdi
    ]
    return db.query(UPDATE, VALUES)
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE donadores
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  }
}
