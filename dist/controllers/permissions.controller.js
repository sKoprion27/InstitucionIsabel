"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOnePermission = exports.updateOnePermission = exports.postOnePermission = exports.getOnePermission = exports.getPermissions = void 0;

var _response = require("./../utils/response");

var _Permission = require("../models/Permission.model");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// GET ALL
var getPermissions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _yield$Permission$get, _yield$Permission$get2, queryAnswer, status;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Permission.Permission.getAll();

          case 2:
            _yield$Permission$get = _context.sent;
            _yield$Permission$get2 = _slicedToArray(_yield$Permission$get, 2);
            queryAnswer = _yield$Permission$get2[0];
            status = _yield$Permission$get2[1];
            (0, _response.response)(req, res, 'GET Permission', queryAnswer, status);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPermissions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // GET ONE


exports.getPermissions = getPermissions;

var getOnePermission = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, _yield$Permission$get3, _yield$Permission$get4, queryAnswer, status;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _Permission.Permission.getOne(id);

          case 3:
            _yield$Permission$get3 = _context2.sent;
            _yield$Permission$get4 = _slicedToArray(_yield$Permission$get3, 2);
            queryAnswer = _yield$Permission$get4[0];
            status = _yield$Permission$get4[1];
            (0, _response.response)(req, res, 'GET ONE Permission', queryAnswer, status);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOnePermission(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // POST ONE


exports.getOnePermission = getOnePermission;

var postOnePermission = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var permission, _yield$Permission$pos, _yield$Permission$pos2, queryAnswer, status;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            permission = req.body;
            _context3.next = 3;
            return _Permission.Permission.postOne(permission);

          case 3:
            _yield$Permission$pos = _context3.sent;
            _yield$Permission$pos2 = _slicedToArray(_yield$Permission$pos, 2);
            queryAnswer = _yield$Permission$pos2[0];
            status = _yield$Permission$pos2[1];
            (0, _response.response)(req, res, 'POST ONE Permission', queryAnswer, status);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postOnePermission(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // UPDATE ONE


exports.postOnePermission = postOnePermission;

var updateOnePermission = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _yield$Permission$put, _yield$Permission$put2, queryAnswer, status;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _Permission.Permission.putOne(req.body, id);

          case 3:
            _yield$Permission$put = _context4.sent;
            _yield$Permission$put2 = _slicedToArray(_yield$Permission$put, 2);
            queryAnswer = _yield$Permission$put2[0];
            status = _yield$Permission$put2[1];
            (0, _response.response)(req, res, 'PUT ONE Permission', queryAnswer, status);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateOnePermission(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // DELETE ONE


exports.updateOnePermission = updateOnePermission;

var deleteOnePermission = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _yield$Permission$del, _yield$Permission$del2, queryAnswer, status;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _Permission.Permission.deleteOne(id);

          case 3:
            _yield$Permission$del = _context5.sent;
            _yield$Permission$del2 = _slicedToArray(_yield$Permission$del, 2);
            queryAnswer = _yield$Permission$del2[0];
            status = _yield$Permission$del2[1];
            (0, _response.response)(req, res, 'DELETE ONE Permission', queryAnswer, status);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteOnePermission(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteOnePermission = deleteOnePermission;