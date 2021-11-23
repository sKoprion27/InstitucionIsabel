"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Donation = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Donation = {
  pagination: function pagination(limit, offset) {
    var QUERY = "\n      SELECT\n        D.id,\n        D.nombre,\n        D.monto,\n        D.esta_facturado as facturado,\n        P.razon_social as donador,\n        M.nombre metodo_pago,\n        T.nombre tipo_donacion\n      FROM\n        donaciones D,\n        donadores P,\n        metodos_pago M,\n        tipo_donaciones T\n      WHERE\n        D.id_donador = P.id\n        AND\n        D.id_metodo_pago = M.id\n        AND\n        D.id_tipo_donacion = T.id\n        AND\n        D.existe = true\n      ORDER BY D.id DESC\n      LIMIT\n        $1\n      OFFSET\n        $2\n    ";
    return _index.db.query(QUERY, [limit, offset]);
  },
  getAllByRange: function getAllByRange(startDate, endDate) {
    var QUERY = "\n      SELECT\n      D.id,\n      D.nombre,\n      D.monto,\n      D.esta_facturado as facturado,\n      P.razon_social as donador,\n      M.nombre metodo_pago,\n      T.nombre tipo_donacion\n      FROM\n      donaciones D,\n      donadores P,\n      metodos_pago M,\n      tipo_donaciones T\n      WHERE\n      D.id_donador = P.id\n      AND\n      D.id_metodo_pago = M.id\n      AND\n      D.id_tipo_donacion = T.id\n      AND\n      D.existe = true\n      AND\n      esta_facturado\n      BETWEEN\n      $1 AND $2\n      ORDER BY D.id DESC\n    ";
    return _index.db.query(QUERY, [startDate, endDate]);
  },
  getAll: function getAll() {
    var QUERY = "\n      SELECT\n      D.id,\n      D.nombre,\n      D.monto,\n      D.esta_facturado as facturado,\n      P.razon_social as donador,\n      M.nombre metodo_pago,\n      T.nombre tipo_donacion\n      FROM\n      donaciones D,\n      donadores P,\n      metodos_pago M,\n      tipo_donaciones T\n      WHERE\n      D.id_donador = P.id\n      AND\n      D.id_metodo_pago = M.id\n      AND\n      D.id_tipo_donacion = T.id\n      AND\n      D.existe = true\n      ORDER BY D.id DESC\n    ";
    return _index.db.query(QUERY);
  },
  getOne: function getOne(id) {
    var QUERY = "\n      SELECT\n      D.id,\n      D.nombre,\n      D.monto,\n      D.foto_donacion,\n      D.esta_facturado,\n      P.id as id_donador,\n      P.razon_social,\n      M.id as id_metodo_pago,\n      T.id as id_tipo_donacion\n      FROM\n      donaciones D,\n      donadores P,\n      metodos_pago M,\n      tipo_donaciones T\n      WHERE\n      D.id = $1\n      AND\n      D.id_donador = P.id\n      AND\n      D.id_metodo_pago = M.id\n      AND\n      D.id_tipo_donacion = T.id\n      AND\n      D.existe = true\n      ORDER BY D.id DESC\n    ";
    return _index.db.query(QUERY, [id]);
  },
  getBeneficiaries: function () {
    var _getBeneficiaries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id_donacion) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n    SELECT B.id\n    FROM donaciones_beneficiarios D, beneficiarios B\n    WHERE\n    D.id_donacion = $1\n    AND\n    D.id_beneficiario = B.id\n    ";
              return _context.abrupt("return", _index.db.query(QUERY, [id_donacion]));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getBeneficiaries(_x) {
      return _getBeneficiaries.apply(this, arguments);
    }

    return getBeneficiaries;
  }(),
  getCategories: function () {
    var _getCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id_donacion) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              QUERY = "\n    SELECT C.id\n    FROM donaciones_categorias D, categorias C\n    WHERE\n    D.id_donacion = $1\n    AND\n    D.id_categoria = C.id\n    ";
              return _context2.abrupt("return", _index.db.query(QUERY, [id_donacion]));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getCategories(_x2) {
      return _getCategories.apply(this, arguments);
    }

    return getCategories;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(donation) {
      var INSERTION, VALUES;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n    INSERT INTO donaciones(\n      id_donador,\n      id_metodo_pago,\n      id_tipo_donacion,\n      nombre,\n      monto,\n      foto_donacion,\n      esta_facturado\n      )\n    VALUES ($1, $2, $3, $4, $5, $6, $7)\n    RETURNING id;\n    ";
              VALUES = [donation.id_donador, donation.id_metodo_pago, donation.id_tipo_donacion, donation.nombre, donation.monto, donation.foto_donacion, donation.esta_facturado];
              return _context3.abrupt("return", _index.db.query(INSERTION, VALUES));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function postOne(_x3) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(donation, id) {
      var UPDATE, VALUES;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UPDATE = "\n      UPDATE donaciones\n      SET\n      id_donador = $2,\n      id_metodo_pago = $3,\n      id_tipo_donacion = $4,\n      nombre = $5,\n      monto = $6,\n      foto_donacion = $7,\n      esta_facturado = $8\n      WHERE\n      id = $1\n      AND\n      existe = true\n    ";
              VALUES = [id, donation.id_donador, donation.id_metodo_pago, donation.id_tipo_donacion, donation.nombre, donation.monto, donation.foto_donacion, donation.esta_facturado];
              return _context4.abrupt("return", _index.db.query(UPDATE, VALUES));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function putOne(_x4, _x5) {
      return _putOne.apply(this, arguments);
    }

    return putOne;
  }(),
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              DELETE = "\n      UPDATE donaciones\n      SET existe = false\n      WHERE id = $1\n    ";
              return _context5.abrupt("return", _index.db.query(DELETE, [id]));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteOne(_x6) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }(),
  updatePhoto: function () {
    var _updatePhoto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, value) {
      var UPDATE;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              UPDATE = "\n      UPDATE donaciones\n      SET foto_donacion = $2\n      WHERE id = $1\n    ";
              return _context6.abrupt("return", _index.db.query(UPDATE, [id, value]));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updatePhoto(_x7, _x8) {
      return _updatePhoto.apply(this, arguments);
    }

    return updatePhoto;
  }(),
  updateOneDonationInvoce: function updateOneDonationInvoce(id, value) {
    var UPDATE = "\n      UPDATE donaciones\n      SET esta_facturado = $2\n      WHERE id = $1\n    ";
    return _index.db.query(UPDATE, [id, value]);
  }
};
exports.Donation = Donation;