"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Role = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Role = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY, _yield$db$query, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre_role\n      FROM roles\n      WHERE existe = true\n    ";
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
              console.log('ERROR GET ALL Role 🤯', _context.t0);
              return _context.abrupt("return", ['ERROR GET ALL Role 🤯', 400]);

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
      var QUERY, _yield$db$query2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre_role\n      FROM roles\n      WHERE id = $1\n      AND\n      existe = true\n    ";
              _context2.prev = 1;
              _context2.next = 4;
              return _index.db.query(QUERY, [id]);

            case 4:
              _yield$db$query2 = _context2.sent;
              rows = _yield$db$query2.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", ['ERROR GET ONE Role 🤯', 404]);

            case 10:
              return _context2.abrupt("return", [rows[0], 200]);

            case 11:
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              console.log('ERROR GET ONE Role 🤯', _context2.t0);
              return _context2.abrupt("return", ['ERROR GET ONE Role 🤯', 400]);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));

    function getOne(_x) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(role) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n    INSERT INTO roles (nombre_role)\n    VALUES ($1)\n    ";
              _context3.prev = 1;
              _context3.next = 4;
              return _index.db.query(INSERTION, [role.nombre_role]);

            case 4:
              return _context3.abrupt("return", ['POST Role', 201]);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              console.log('ERROR POST Role 🤯', _context3.t0);
              return _context3.abrupt("return", ['ERROR POST Role 🤯', 400]);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 7]]);
    }));

    function postOne(_x2) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(role, id) {
      var UPDATE, values;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UPDATE = "\n      UPDATE roles\n      SET\n      nombre_role = $2\n      WHERE id = $1\n      AND\n      existe = true\n    ";
              values = [id, role.nombre_role];
              _context4.prev = 2;
              _context4.next = 5;
              return _index.db.query(UPDATE, values);

            case 5:
              return _context4.abrupt("return", ['UPDATE Role', 201]);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](2);
              console.log('ERROR UPDATE Role 🤯', _context4.t0);
              return _context4.abrupt("return", ['ERROR UPDATE Role 🤯', 400]);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 8]]);
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
              DELETE = "\n      UPDATE roles\n      SET existe = false\n      WHERE id = $1;\n    ";
              _context5.prev = 1;
              _context5.next = 4;
              return _index.db.query(DELETE, [id]);

            case 4:
              return _context5.abrupt("return", ['DELETE Role', 201]);

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](1);
              console.log('ERROR DELETE Role 🤯', _context5.t0);
              return _context5.abrupt("return", ['ERROR DELETE Role 🤯', 400]);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 7]]);
    }));

    function deleteOne(_x5) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.Role = Role;