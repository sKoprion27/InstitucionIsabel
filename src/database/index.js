import config from './../config/index'
const { Pool } = require('pg')

const { databaseConfig } = config

const pool = new Pool(databaseConfig)

export const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
