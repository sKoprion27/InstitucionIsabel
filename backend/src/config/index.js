
const config = {
  DEV: {
    databaseConfig: {
      user: 'postgres',
      host: '127.0.0.1',
      database: 'institucion_isabel',
      password: 'randybtr15',
      port: 5432
    },
    jwt_token: {
      privateKey: 'password'
    }
  }
}

export default config.DEV
