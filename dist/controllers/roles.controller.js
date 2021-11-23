"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rolesController = void 0;

var _response = require("./../utils/response");

var _Role = require("../models/Role.model");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rolesController = {
  // GET ALL
  getRoles: function () {
    var _getRoles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$Role$getAll, _yield$Role$getAll2, roles, status;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Role.Role.getAll();

            case 2:
              _yield$Role$getAll = _context.sent;
              _yield$Role$getAll2 = _slicedToArray(_yield$Role$getAll, 2);
              roles = _yield$Role$getAll2[0];
              status = _yield$Role$getAll2[1];
              (0, _response.response)(req, res, 'GET Roles', roles, status);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getRoles(_x, _x2) {
      return _getRoles.apply(this, arguments);
    }

    return getRoles;
  }(),
  // GET ONE
  getOneRole: function () {
    var _getOneRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$Role$getOne, _yield$Role$getOne2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.next = 3;
              return _Role.Role.getOne(id);

            case 3:
              _yield$Role$getOne = _context2.sent;
              _yield$Role$getOne2 = _slicedToArray(_yield$Role$getOne, 2);
              queryAnswer = _yield$Role$getOne2[0];
              status = _yield$Role$getOne2[1];
              (0, _response.response)(req, res, 'GET ONE Role', queryAnswer, status);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getOneRole(_x3, _x4) {
      return _getOneRole.apply(this, arguments);
    }

    return getOneRole;
  }(),
  // POST ONE
  postOneRole: function () {
    var _postOneRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var role, _yield$Role$postOne, _yield$Role$postOne2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              role = req.body;
              _context3.next = 3;
              return _Role.Role.postOne(role);

            case 3:
              _yield$Role$postOne = _context3.sent;
              _yield$Role$postOne2 = _slicedToArray(_yield$Role$postOne, 2);
              queryAnswer = _yield$Role$postOne2[0];
              status = _yield$Role$postOne2[1];
              (0, _response.response)(req, res, 'POST ONE Role', queryAnswer, status);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function postOneRole(_x5, _x6) {
      return _postOneRole.apply(this, arguments);
    }

    return postOneRole;
  }(),
  // UPDATE ONE
  updateOneRole: function () {
    var _updateOneRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var id, role, _yield$Role$putOne, _yield$Role$putOne2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              role = req.body;
              _context4.next = 4;
              return _Role.Role.putOne(role, id);

            case 4:
              _yield$Role$putOne = _context4.sent;
              _yield$Role$putOne2 = _slicedToArray(_yield$Role$putOne, 2);
              queryAnswer = _yield$Role$putOne2[0];
              status = _yield$Role$putOne2[1];
              (0, _response.response)(req, res, 'PUT ONE Role', queryAnswer, status);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function updateOneRole(_x7, _x8) {
      return _updateOneRole.apply(this, arguments);
    }

    return updateOneRole;
  }(),
  // DELETE ONE
  deleteOneRole: function () {
    var _deleteOneRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$Role$deleteOne, _yield$Role$deleteOne2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.next = 3;
              return _Role.Role.deleteOne(id);

            case 3:
              _yield$Role$deleteOne = _context5.sent;
              _yield$Role$deleteOne2 = _slicedToArray(_yield$Role$deleteOne, 2);
              queryAnswer = _yield$Role$deleteOne2[0];
              status = _yield$Role$deleteOne2[1];
              (0, _response.response)(req, res, 'DELETE ONE Role', queryAnswer, status);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteOneRole(_x9, _x10) {
      return _deleteOneRole.apply(this, arguments);
    }

    return deleteOneRole;
  }()
};
exports.rolesController = rolesController;