"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = void 0;

var _index = require("./../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var State = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre\n      FROM estados\n      WHERE existe = true\n      ORDER BY id ASC\n    ";
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
      var QUERY, _yield$db$query, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              QUERY = "\n      SELECT id, nombre\n      FROM estados\n      WHERE id = $1 \n      AND existe = true\n    ";
              _context2.prev = 1;
              _context2.next = 4;
              return _index.db.query(QUERY, [id]);

            case 4:
              _yield$db$query = _context2.sent;
              rows = _yield$db$query.rows;
              rowCount = _yield$db$query.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", ['ERROR GET ONE STATE NOT FOUND 🤯', 404]);

            case 11:
              return _context2.abrupt("return", [rows[0], 200]);

            case 12:
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              console.log('ERROR GET ONE STATE 🤯', _context2.t0);
              return _context2.abrupt("return", ['ERROR GET ONE STATE 🤯', 400]);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 14]]);
    }));

    function getOne(_x) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(state) {
      var INSERTION;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              INSERTION = "\n      INSERT INTO estados(nombre)\n      VALUES ($1)\n    ";
              _context3.prev = 1;
              _context3.next = 4;
              return _index.db.query(INSERTION, [state.nombre]);

            case 4:
              return _context3.abrupt("return", ['POST STATE', 201]);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              console.log('ERROR POST STATE 🤯', _context3.t0);
              return _context3.abrupt("return", ['ERROR POST STATE 🤯', 400]);

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
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(state, id) {
      var UPDATE, values, _yield$db$query2, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UPDATE = "\n      UPDATE estados\n      SET nombre = $2\n      WHERE id = $1 \n      AND existe = true\n    ";
              values = [id, state.nombre];
              _context4.prev = 2;
              _context4.next = 5;
              return _index.db.query(UPDATE, values);

            case 5:
              _yield$db$query2 = _context4.sent;
              rowCount = _yield$db$query2.rowCount;

              if (!(rowCount === 0)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", ['ERROR UPDATE NOT FOUND', 404]);

            case 9:
              return _context4.abrupt("return", ['UPDATE ONE STATE', 201]);

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](2);
              console.log('ERROR UPDATE STATE 🤯', _context4.t0);
              return _context4.abrupt("return", ['ERROR UPDATE STATE 🤯', 400]);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 12]]);
    }));

    function putOne(_x3, _x4) {
      return _putOne.apply(this, arguments);
    }

    return putOne;
  }(),
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var DELETE, _yield$db$query3, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              DELETE = "\n      UPDATE estados\n      SET existe = false\n      WHERE id = $1\n    ";
              _context5.prev = 1;
              _context5.next = 4;
              return _index.db.query(DELETE, [id]);

            case 4:
              _yield$db$query3 = _context5.sent;
              rowCount = _yield$db$query3.rowCount;

              if (!(rowCount === 0)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", ['ERROR DELETE NOT FOUND', 404]);

            case 8:
              return _context5.abrupt("return", ['DELETE ONE STATE', 201]);

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              console.log('ERROR DELETE STATE 🤯', _context5.t0);
              return _context5.abrupt("return", ['ERROR DELETE STATE 🤯', 400]);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 11]]);
    }));

    function deleteOne(_x5) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.State = State;