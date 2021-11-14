require('dotenv').config()
export const globalConfig = {
  DEV: {
    databaseConfig: {
      user: 'postgres',
      host: '127.0.0.1',
      database: 'institucion_isabel',
      client_encoding: 'UTF8',
      password: process.env.DB_PASSWORD_DEV,
      port: 5432
    },
    cloudinay: {
      cloud_name: 'institucionisabel',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    },
    jwt_token: { privateKey: 'password' }
  }
}

export default globalConfig.DEV
