"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY, _yield$db$query, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT U.id, nombre, apellido, correo_electronico, U.creado as creado\n      FROM usuarios U\n      WHERE\n      U.existe = true\n      ORDER BY U.id DESC\n    ";
              _context.prev = 1;
              _context.next = 4;
              return _index.db.query(QUERY);

            case 4:
              _yield$db$query = _context.sent;
              rows = _yield$db$query.rows;
              return _context.abrupt("return", [rows, 200]);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.log('ERROR GET ALL USER 🤯', _context.t0);
              return _context.abrupt("return", ['ERROR GET ALL USER 🤯', 400]);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
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
              console.log(id, '😀');
              QUERY = "\n      SELECT U.nombre, U.apellido, U.correo_electronico, R.nombre_role as role, R.id as id_role\n      FROM usuarios U, roles_usuarios RU, roles R\n      WHERE\n      RU.id_usuario = $1\n      AND\n      RU.id_usuario = U.id\n      AND\n      RU.id_role = R.id\n      AND\n      U.existe = true\n    ";
              return _context2.abrupt("return", _index.db.query(QUERY, [id]));

            case 3:
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
  getOnePassword: function () {
    var _getOnePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(correo_electronico) {
      var QUERY, _yield$db$query2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              QUERY = "\n      SELECT id, \"password\", correo_electronico\n      FROM usuarios\n      WHERE\n      \"correo_electronico\" = $1\n      AND\n      existe = true\n    ";
              _context3.prev = 1;
              _context3.next = 4;
              return _index.db.query(QUERY, [correo_electronico]);

            case 4:
              _yield$db$query2 = _context3.sent;
              rows = _yield$db$query2.rows;
              rowCount = _yield$db$query2.rowCount;

              if (!(rowCount === 0)) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", ['ERROR GET BY FIELD 🤯', 404]);

            case 11:
              return _context3.abrupt("return", [rows[0], 200]);

            case 12:
              _context3.next = 18;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](1);
              console.log('ERROR GET BY FIELD 🤯', _context3.t0);
              return _context3.abrupt("return", ['ERROR GET BY FIELD 🤯', 404]);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 14]]);
    }));

    function getOnePassword(_x2) {
      return _getOnePassword.apply(this, arguments);
    }

    return getOnePassword;
  }(),
  me: function () {
    var _me = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id_usuario) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre, apellido, correo_electronico\n      FROM usuarios\n      WHERE\n      id = $1\n    ";
              return _context4.abrupt("return", _index.db.query(QUERY, [id_usuario]));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function me(_x3) {
      return _me.apply(this, arguments);
    }

    return me;
  }(),
  getRoles: function () {
    var _getRoles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id_usuario) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              QUERY = "\n      SELECT R.id, R.nombre_role as nombre\n      FROM roles_usuarios RU, roles R\n      WHERE\n      id_role = R.id\n      AND\n      id_usuario = $1\n    ";
              return _context5.abrupt("return", _index.db.query(QUERY, [id_usuario]));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getRoles(_x4) {
      return _getRoles.apply(this, arguments);
    }

    return getRoles;
  }(),
  getPermissions: function () {
    var _getPermissions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id_role) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              QUERY = "\n      SELECT P.id, P.nombre_permiso as nombre\n      FROM roles_permisos RP, permisos P\n      WHERE\n      id_permiso = P.id\n      AND\n      id_role = $1\n    ";
              return _context6.abrupt("return", _index.db.query(QUERY, [id_role]));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function getPermissions(_x5) {
      return _getPermissions.apply(this, arguments);
    }

    return getPermissions;
  }(),
  getOneByField: function () {
    var _getOneByField = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var field,
          param,
          QUERY,
          _yield$db$query3,
          rows,
          rowCount,
          _args7 = arguments;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              field = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : '';
              param = _args7.length > 1 ? _args7[1] : undefined;
              QUERY = "\n      SELECT U.id, nombre, apellido, correo_electronico, \"password\"\n      FROM usuarios U, roles R\n      WHERE\n      U.".concat(field, " = $1\n      AND\n      U.existe = true\n    ");
              _context7.prev = 3;
              _context7.next = 6;
              return _index.db.query(QUERY, [param]);

            case 6:
              _yield$db$query3 = _context7.sent;
              rows = _yield$db$query3.rows;
              rowCount = _yield$db$query3.rowCount;

              if (!(rowCount === 0)) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", ['ERROR GET BY FIELD 🤯', 404]);

            case 13:
              return _context7.abrupt("return", [rows[0], 200]);

            case 14:
              _context7.next = 20;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](3);
              console.log('ERROR GET BY FIELD 🤯', _context7.t0);
              return _context7.abrupt("return", ['ERROR GET BY FIELD 🤯', 404]);

            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[3, 16]]);
    }));

    function getOneByField() {
      return _getOneByField.apply(this, arguments);
    }

    return getOneByField;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              INSERTION = "\n    INSERT INTO usuarios (nombre, apellido, \"password\", correo_electronico)\n    VALUES ($1, $2, $3, $4)\n    RETURNING id;\n    ";
              return _context8.abrupt("return", _index.db.query(INSERTION, [user.nombre, user.apellido, user.password, user.correo_electronico]));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function postOne(_x6) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(user, id) {
      var UPDATE, values, _yield$db$query4, rowCount;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              UPDATE = "\n      UPDATE usuarios\n      SET\n      nombre = $2,\n      apellido = $3,\n      correo_electronico = $4\n      WHERE id = $1\n      AND\n      existe = true\n    ";
              values = [id, user.nombre, user.apellido, user.correo_electronico];
              _context9.prev = 2;
              _context9.next = 5;
              return _index.db.query(UPDATE, values);

            case 5:
              _yield$db$query4 = _context9.sent;
              rowCount = _yield$db$query4.rowCount;

              if (!(rowCount === 0)) {
                _context9.next = 9;
                break;
              }

              return _context9.abrupt("return", ['ERROR  UPDATE NOT FOUND', 404]);

            case 9:
              return _context9.abrupt("return", ['UPDATE ONE USER', 201]);

            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](2);
              console.log('ERROR UPDATE USER 🤯', _context9.t0);
              return _context9.abrupt("return", ['ERROR UPDATE USER 🤯', 400]);

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[2, 12]]);
    }));

    function putOne(_x7, _x8) {
      return _putOne.apply(this, arguments);
    }

    return putOne;
  }(),
  changePassword: function () {
    var _changePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(id, password) {
      var UPDATE;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              console.log(password, id, '😆');
              UPDATE = "\n      UPDATE usuarios\n      SET\n      password = $2\n      WHERE\n      id = $1\n      AND\n      existe = true\n    ";
              return _context10.abrupt("return", _index.db.query(UPDATE, [id, password]));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function changePassword(_x9, _x10) {
      return _changePassword.apply(this, arguments);
    }

    return changePassword;
  }(),
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              DELETE = "\n      DELETE FROM\n      usuarios\n      WHERE id = $1\n    ";
              return _context11.abrupt("return", _index.db.query(DELETE, [id]));

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    function deleteOne(_x11) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.User = User;