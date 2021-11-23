"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypesDonation = void 0;

var _index = require("../database/index");

var TypesDonation = {
  getAll: function getAll() {
    var QUERY = "\n      SELECT id, nombre, descripcion\n      FROM tipo_donaciones\n      WHERE existe = true\n      ORDER BY id DESC\n    ";
    return _index.db.query(QUERY);
  },
  getOne: function getOne(id) {
    var QUERY = "\n      SELECT id, nombre, descripcion\n      FROM tipo_donaciones\n      WHERE id = $1\n      AND existe = true\n    ";
    return _index.db.query(QUERY, [id]);
  },
  postOne: function postOne(type) {
    var INSERTION = "\n      INSERT INTO tipo_donaciones(nombre, descripcion)\n      VALUES ($1, $2)\n    ";
    return _index.db.query(INSERTION, [type.nombre, type.descripcion]);
  },
  putOne: function putOne(type, id) {
    var UPDATE = "\n      UPDATE tipo_donaciones\n      SET nombre = $2,\n      descripcion = $3\n      WHERE\n      id = $1\n      AND\n      existe = true\n    ";
    var values = [id, type.nombre, type.descripcion];
    return _index.db.query(UPDATE, values);
  },
  deleteOne: function deleteOne(id) {
    var DELETE = "\n      UPDATE tipo_donaciones\n      SET existe = false\n      WHERE id = $1\n    ";
    return _index.db.query(DELETE, [id]);
  }
};
exports.TypesDonation = TypesDonation;