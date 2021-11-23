"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beneficiary = void 0;

var _index = require("../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Beneficiary = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre, descripcion\n      FROM beneficiarios\n      WHERE existe = true\n      ORDER BY id DESC\n    ";
              return _context.abrupt("return", _index.db.query(QUERY));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAll() {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  getOne: function () {
    var _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre, descripcion, archivo\n      FROM beneficiarios\n      WHERE id = $1\n      AND existe = true\n    ";
              return _context2.abrupt("return", _index.db.query(QUERY, [id]));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getOne(_x) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(beneficiary) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n      INSERT INTO beneficiarios\n      (nombre, descripcion, archivo)\n      VALUES ($1, $2, $3);\n    ";
              return _context3.abrupt("return", _index.db.query(INSERTION, [beneficiary.nombre, beneficiary.descripcion, beneficiary.archivo]));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function postOne(_x2) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(beneficiary, id) {
      var UPDATE, values;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UPDATE = "\n      UPDATE beneficiarios\n      SET\n      nombre = $2,\n      descripcion = $3,\n      archivo = $4\n      WHERE id = $1\n      AND existe = true\n    ";
              values = [id, beneficiary.nombre, beneficiary.descripcion, beneficiary.archivo];
              return _context4.abrupt("return", _index.db.query(UPDATE, values));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function putOne(_x3, _x4) {
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
              DELETE = "\n      UPDATE beneficiarios\n      SET existe = false\n      WHERE id = $1\n    ";
              return _context5.abrupt("return", _index.db.query(DELETE, [id]));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteOne(_x5) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.Beneficiary = Beneficiary;