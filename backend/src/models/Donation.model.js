import { db } from './../database/index'
export const Donation = {
  getAllByRange: (startDate, endDate) => {
    const QUERY = `
      SELECT
      D.id,
      D.nombre,
      D.monto,
      D.foto_donacion,
      D.esta_facturado as facturado,
      P.razon_social as donador,
      M.nombre metodo_pago,
      T.nombre tipo_donacion
      FROM
      donaciones D,
      donadores P,
      metodos_pago M,
      tipo_donaciones T
      WHERE
      D.id_donador = P.id
      AND
      D.id_metodo_pago = M.id
      AND
      D.id_tipo_donacion = T.id
      AND
      D.existe = true
      AND
      esta_facturado
      BETWEEN $1 AND $2
      ORDER BY D.id DESC
    `
    console.log(startDate, endDate)
    return db.query(QUERY, [startDate, endDate])
  },
  getAll: () => {
    const QUERY = `
      SELECT
      D.id,
      D.nombre,
      D.monto,
      D.foto_donacion,
      D.esta_facturado as facturado,
      P.razon_social as donador,
      M.nombre metodo_pago,
      T.nombre tipo_donacion
      FROM
      donaciones D,
      donadores P,
      metodos_pago M,
      tipo_donaciones T
      WHERE
      D.id_donador = P.id
      AND
      D.id_metodo_pago = M.id
      AND
      D.id_tipo_donacion = T.id
      AND
      D.existe = true
      ORDER BY D.id DESC
    `
    return db.query(QUERY)
  },
  getOne: (id) => {
    const QUERY = `
      SELECT
      D.id,
      D.nombre,
      D.monto,
      D.foto_donacion,
      D.esta_facturado,
      P.id as id_donador,
      P.razon_social,
      M.id as id_metodo_pago,
      T.id as id_tipo_donacion
      FROM
      donaciones D,
      donadores P,
      metodos_pago M,
      tipo_donaciones T
      WHERE
      D.id = $1
      AND
      D.id_donador = P.id
      AND
      D.id_metodo_pago = M.id
      AND
      D.id_tipo_donacion = T.id
      AND
      D.existe = true
      ORDER BY D.id DESC
    `
    return db.query(QUERY, [id])
  },
  getBeneficiaries: async (id_donacion) => {
    const QUERY = `
    SELECT B.id
    FROM donaciones_beneficiarios D, beneficiarios B
    WHERE
    D.id_donacion = $1
    AND
    D.id_beneficiario = B.id
    `
    return db.query(QUERY, [id_donacion])
  },
  getCategories: async (id_donacion) => {
    const QUERY = `
    SELECT C.id
    FROM donaciones_categorias D, categorias C
    WHERE
    D.id_donacion = $1
    AND
    D.id_categoria = C.id
    `
    return db.query(QUERY, [id_donacion])
  },
  postOne: async (donation) => {
    const INSERTION = `
    INSERT INTO donaciones(
      id_donador,
      id_metodo_pago,
      id_tipo_donacion,
      nombre,
      monto,
      foto_donacion,
      esta_facturado
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `
    const VALUES = [
      donation.id_donador,
      donation.id_metodo_pago,
      donation.id_tipo_donacion,
      donation.nombre,
      donation.monto,
      donation.foto_donacion,
      donation.esta_facturado
    ]
    return db.query(INSERTION, VALUES)
  },
  putOne: async (donation, id) => {
    const UPDATE = `
      UPDATE donaciones
      SET
      id_donador = $2,
      id_metodo_pago = $3,
      id_tipo_donacion = $4,
      nombre = $5,
      monto = $6,
      foto_donacion = $7,
      esta_facturado = $8
      WHERE
      id = $1
      AND
      existe = true
    `
    const VALUES = [
      id,
      donation.id_donador,
      donation.id_metodo_pago,
      donation.id_tipo_donacion,
      donation.nombre,
      donation.monto,
      donation.foto_donacion,
      donation.esta_facturado
    ]
    return db.query(UPDATE, VALUES)
  },
  deleteOne: async (id) => {
    const DELETE = `
      UPDATE donaciones
      SET existe = false
      WHERE id = $1
    `
    return db.query(DELETE, [id])
  },
  updatePhoto: async (id, value) => {
    const UPDATE = `
      UPDATE donaciones
      SET foto_donacion = $2
      WHERE id = $1
    `
    return db.query(UPDATE, [id, value])
  },
  updateOneDonationInvoce: (id, value) => {
    const UPDATE = `
      UPDATE donaciones
      SET esta_facturado = $2
      WHERE id = $1
    `
    return db.query(UPDATE, [id, value])
  }
}
