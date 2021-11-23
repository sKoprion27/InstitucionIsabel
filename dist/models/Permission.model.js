"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Permission = void 0;

var _index = require("./../database/index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Permission = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY, _yield$db$query, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre_permiso\n      FROM permisos\n      WHERE existe = true\n    ";
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
              console.log('ERROR GET ALL Permission 🤯', _context.t0);
              return _context.abrupt("return", ["ERROR GET ALL Permission 🤯", 400]);

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
              QUERY = "\n      SELECT id, nombre_permiso\n      FROM permisos\n      WHERE id = $1 AND existe = true\n    ";
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

              return _context2.abrupt("return", ["ERROR GET ONE Permission 🤯", 404]);

            case 10:
              return _context2.abrupt("return", [rows[0], 200]);

            case 11:
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              console.log('ERROR GET ONE Permission 🤯', _context2.t0);
              return _context2.abrupt("return", ["ERROR GET ONE Permission 🤯", 400]);

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
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(permission) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n    INSERT INTO permisos (nombre_permiso)\n    VALUES ($1)\n    ";
              _context3.prev = 1;
              _context3.next = 4;
              return _index.db.query(INSERTION, [permission.nombre_permiso]);

            case 4:
              return _context3.abrupt("return", ['POST Permission', 201]);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              console.log('ERROR POST Permission 🤯', _context3.t0);
              return _context3.abrupt("return", ["ERROR POST Permission 🤯", 400]);

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
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(permission, id) {
      var UPDATE, values, _yield$Permission$get, _yield$Permission$get2, status;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UPDATE = "\n      UPDATE usuarios\n      SET\n      nombre_permiso = $2\n      WHERE id = $1\n    ";
              values = [id, permission.nombre_permiso];
              _context4.prev = 2;
              _context4.next = 5;
              return Permission.getOne(id);

            case 5:
              _yield$Permission$get = _context4.sent;
              _yield$Permission$get2 = _slicedToArray(_yield$Permission$get, 2);
              status = _yield$Permission$get2[1];

              if (!(status === 400)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", ["ERROR UPDATE Permission 🤯", 400]);

            case 10:
              _context4.next = 12;
              return _index.db.query(UPDATE, values);

            case 12:
              return _context4.abrupt("return", ['UPDATE Permission', 201]);

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](2);
              console.log('ERROR UPDATE Permission 🤯', _context4.t0);
              return _context4.abrupt("return", ["ERROR UPDATE Permission 🤯", 400]);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 15]]);
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
              DELETE = "\n      UPDATE permisos\n      SET existe = false\n      WHERE id = $1;\n    ";
              _context5.prev = 1;
              _context5.next = 4;
              return _index.db.query(DELETE, [id]);

            case 4:
              return _context5.abrupt("return", ['DELETE Permission', 201]);

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](1);
              console.log('ERROR DELETE Permission 🤯', _context5.t0);
              return _context5.abrupt("return", ["ERROR DELETE Permission 🤯", 400]);

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
exports.Permission = Permission;