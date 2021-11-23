"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleUser = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var RoleUser = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
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
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
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
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id_role, id_usuario) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n    INSERT INTO roles_usuarios (id_role,id_usuario)\n    VALUES ($1, $2)\n    ";
              return _context3.abrupt("return", _index.db.query(INSERTION, [id_role, id_usuario]));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function postOne(_x2, _x3) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(role, id) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
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
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id_role, id_usuario) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              DELETE = "\n    DELETE FROM roles_usuarios\n    WHERE\n    id_role = $1\n    AND\n    id_usuario = $2\n    ";
              return _context5.abrupt("return", _index.db.query(DELETE, [id_role, id_usuario]));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteOne(_x6, _x7) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }(),
  deleteALlUserRoles: function () {
    var _deleteALlUserRoles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id_usuario) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              DELETE = "\n    DELETE FROM roles_usuarios\n    WHERE\n    id_usuario = $1\n    ";
              return _context6.abrupt("return", _index.db.query(DELETE, [id_usuario]));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function deleteALlUserRoles(_x8) {
      return _deleteALlUserRoles.apply(this, arguments);
    }

    return deleteALlUserRoles;
  }()
};
exports.RoleUser = RoleUser;