"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonationCategory = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DonationCategory = {
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id_donacion, id_categoria) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              INSERTION = "\n    INSERT INTO donaciones_categorias (id_donacion,id_categoria)\n    VALUES ($1, $2)\n    ";
              return _context.abrupt("return", _index.db.query(INSERTION, [id_donacion, id_categoria]));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function postOne(_x, _x2) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id_donacion, id_categoria) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              DELETE = "\n    DELETE FROM donaciones_categorias\n    WHERE\n    id_donacion = $1\n    AND\n    id_categoria = $2\n    ";
              return _context2.abrupt("return", _index.db.query(DELETE, [id_donacion, id_categoria]));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function deleteOne(_x3, _x4) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.DonationCategory = DonationCategory;