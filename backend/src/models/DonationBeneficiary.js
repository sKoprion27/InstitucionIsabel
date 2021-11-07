import { db } from './../database/index'
export const DonationBeneficiary = {
  postOne: async (id_donacion, id_beneficiario) => {
    const INSERTION = `
    INSERT INTO donaciones_beneficiarios (id_donacion,id_beneficiario)
    VALUES ($1, $2)
    `
    return db.query(INSERTION, [id_donacion, id_beneficiario])
  },
  deleteOne: async (id_donacion, id_beneficiario) => {
    const DELETE = `
    DELETE FROM donaciones_beneficiarios
    WHERE
    id_donacion = $1
    AND
    id_beneficiario = $2
    `
    return db.query(DELETE, [id_donacion, id_beneficiario])
  }
}
