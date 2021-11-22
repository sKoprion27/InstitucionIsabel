import { db } from './../database/index'
export const DonationCategory = {
  postOne: async (id_donacion, id_categoria) => {
    const INSERTION = `
    INSERT INTO donaciones_categorias (id_donacion,id_categoria)
    VALUES ($1, $2)
    `
    return db.query(INSERTION, [id_donacion, id_categoria])
  },
  deleteOne: async (id_donacion, id_categoria) => {
    const DELETE = `
    DELETE FROM donaciones_categorias
    WHERE
    id_donacion = $1
    AND
    id_categoria = $2
    `
    return db.query(DELETE, [id_donacion, id_categoria])
  }
}
