"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePermission = void 0;

var _index = require("../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var RolePermission = {
  getRoleAllPermissions: function () {
    var _getRoleAllPermissions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id_role) {
      var QUERY, _yield$db$query, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT RP.id, nombre_permiso as permiso\n      FROM roles_permisos RP, roles R, permisos P\n      WHERE\n      RP.id_permiso = P.id\n      AND\n      RP.id_role = R.id\n      AND\n      R.id = $1\n      AND\n      RP.existe = true\n      AND\n      R.existe = true\n    ";
              _context.prev = 1;
              _context.next = 4;
              return _index.db.query(QUERY, [id_role]);

            case 4:
              _yield$db$query = _context.sent;
              rows = _yield$db$query.rows;
              rowCount = _yield$db$query.rowCount;

              if (!(rowCount === 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", ['ERROR GET ONE Role Permission 🤯', 404]);

            case 11:
              return _context.abrupt("return", [rows, 200]);

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              console.log('ERROR GET ONE Role Permission 🤯', _context.t0);
              return _context.abrupt("return", ['ERROR GET ONE Role Permission 🤯', 400]);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    }));

    function getRoleAllPermissions(_x) {
      return _getRoleAllPermissions.apply(this, arguments);
    }

    return getRoleAllPermissions;
  }()
};
exports.RolePermission = RolePermission;