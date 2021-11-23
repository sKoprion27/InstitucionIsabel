"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.globalConfig = void 0;

require('dotenv').config();

var globalConfig = {
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
    jwt_token: {
      privateKey: 'password'
    }
  },
  PRODUCTION: {
    databaseConfig: {
      ssl: {
        rejectUnauthorized: false
      },
      connectionString: process.env.DATABASE_URL
    },
    cloudinay: {
      cloud_name: 'institucionisabel',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    },
    jwt_token: {
      privateKey: process.env.JWT_KEY
    }
  }
};
exports.globalConfig = globalConfig;
var MODE = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEV';
var _default = globalConfig[MODE];
exports["default"] = _default;