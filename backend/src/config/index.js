require('dotenv').config()
const config = {
  DEV: {
    databaseConfig: {
      user: 'postgres',
      host: '127.0.0.1',
      database: 'institucion_isabel',
      client_encoding: 'UTF8',
      password: process.env.DB_PASSWORD_DEV,
      port: 5432
    },
    jwt_token: { privateKey: 'password' }
  }
}

export default config.DEV
