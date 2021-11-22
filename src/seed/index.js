import config from './../config/index'
import { QUERY } from './data.db'
const { Client } = require('pg')

const { databaseConfig } = config

const client = new Client(databaseConfig)

client.connect()

client.query(QUERY, (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})
