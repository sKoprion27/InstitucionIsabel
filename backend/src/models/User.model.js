import { db } from './../database/index'
export const User = {
  postOneUser: async (user) => {
    const INSERTION = `INSERT INTO usuarios (nombre, apellido, "password", correo_electronico, id_role)
    VALUES ($1, $2, $3, $4, $5)`
    const query = await db.query(INSERTION, [user.nombre, user.apellido, user.password, user.correo_electronico, user.id_role])
    console.log('QUERY 😀', query)
    return query
  }

}
