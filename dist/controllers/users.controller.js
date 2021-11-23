"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _response = require("./../utils/response");

var _encrypt = require("./../lib/encrypt");

var _User = require("./../models/User.model");

var _RoleUser = require("../models/RoleUser");

var _utils = require("../utils");

var _Notes = require("../models/Notes.model");

var _excluded = ["roles"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userController = {
  // GET ALL
  getUsers: function () {
    var _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$User$getAll, _yield$User$getAll2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _User.User.getAll();

            case 2:
              _yield$User$getAll = _context.sent;
              _yield$User$getAll2 = _slicedToArray(_yield$User$getAll, 2);
              queryAnswer = _yield$User$getAll2[0];
              status = _yield$User$getAll2[1];
              (0, _response.response)(req, res, 'GET USERS', queryAnswer, status);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getUsers(_x, _x2) {
      return _getUsers.apply(this, arguments);
    }

    return getUsers;
  }(),
  // GET ONE
  getOneUser: function () {
    var _getOneUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$User$getOne, rows, rowCount, user, roles;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _User.User.getOne(id);

            case 4:
              _yield$User$getOne = _context2.sent;
              rows = _yield$User$getOne.rows;
              rowCount = _yield$User$getOne.rowCount;

              if (rowCount === 0) {
                console.log('User not exists');
                (0, _response.response)(req, res, 'GET ONE', null, 500);
              } else {
                user = {
                  nombre: rows[0].nombre,
                  apellido: rows[0].apellido,
                  correo_electronico: rows[0].correo_electronico
                };
                roles = rows.map(function (row) {
                  var role = {
                    id: row.id_role,
                    nombre: row.role
                  };
                  return role;
                });
                user = _objectSpread(_objectSpread({}, user), {}, {
                  roles: roles
                });
                (0, _response.response)(req, res, 'GET ONE', user, 200);
              }

              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0, 'error');
              (0, _response.response)(req, res, 'ERROR GET ONE USER', null, 500);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function getOneUser(_x3, _x4) {
      return _getOneUser.apply(this, arguments);
    }

    return getOneUser;
  }(),
  // POST ONE
  postOneUser: function () {
    var _postOneUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$body, password, roles, id, hash, user, _yield$User$postOne, rows, _iterator, _step, role;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, password = _req$body.password, roles = _req$body.roles, id = _req$body.id;
              hash = _encrypt.encrypt.createHash(password);
              user = _objectSpread(_objectSpread({}, req.body), {}, {
                password: hash
              });
              _context3.prev = 3;
              _context3.next = 6;
              return _User.User.postOne(_objectSpread({
                id: id
              }, user));

            case 6:
              _yield$User$postOne = _context3.sent;
              rows = _yield$User$postOne.rows;

              if (!(roles.length > 1)) {
                _context3.next = 28;
                break;
              }

              _iterator = _createForOfIteratorHelper(roles);
              _context3.prev = 10;

              _iterator.s();

            case 12:
              if ((_step = _iterator.n()).done) {
                _context3.next = 18;
                break;
              }

              role = _step.value;
              _context3.next = 16;
              return _RoleUser.RoleUser.postOne(role.id, rows[0].id);

            case 16:
              _context3.next = 12;
              break;

            case 18:
              _context3.next = 23;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](10);

              _iterator.e(_context3.t0);

            case 23:
              _context3.prev = 23;

              _iterator.f();

              return _context3.finish(23);

            case 26:
              _context3.next = 30;
              break;

            case 28:
              _context3.next = 30;
              return _RoleUser.RoleUser.postOne(roles[0].id, rows[0].id);

            case 30:
              (0, _response.response)(req, res, 'POST ONE USER', rows[0], 201);
              _context3.next = 37;
              break;

            case 33:
              _context3.prev = 33;
              _context3.t1 = _context3["catch"](3);
              console.log(_context3.t1);
              (0, _response.response)(req, res, 'ERROR POST ONE USER', null, 500);

            case 37:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 33], [10, 20, 23, 26]]);
    }));

    function postOneUser(_x5, _x6) {
      return _postOneUser.apply(this, arguments);
    }

    return postOneUser;
  }(),
  // UPDATE ONE
  updateOneUser: function () {
    var _updateOneUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var id, newRoles, _yield$User$getRoles, rows, rowCount, currentRoles, rolesDelete, _iterator2, _step2, role, roleUpdate, _iterator3, _step3, _role, index, _index, _req$body2, roles, user, putResponse;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              newRoles = req.body.roles;
              _context4.prev = 2;
              _context4.next = 5;
              return _User.User.getRoles(id);

            case 5:
              _yield$User$getRoles = _context4.sent;
              rows = _yield$User$getRoles.rows;
              rowCount = _yield$User$getRoles.rowCount;

              if (!(rowCount === 0)) {
                _context4.next = 13;
                break;
              }

              console.log('That user not exists');
              (0, _response.response)(req, res, 'ERROR PUT ONE USER', null, 500);
              _context4.next = 75;
              break;

            case 13:
              currentRoles = rows;

              if (!(currentRoles.length > newRoles.length)) {
                _context4.next = 37;
                break;
              }

              console.log('CURRENT ROLES THAN __ DELETE');
              rolesDelete = (0, _utils.arrayDiference)(currentRoles, newRoles, 'nombre');
              console.log('ROLES___DELETE', rolesDelete);
              _iterator2 = _createForOfIteratorHelper(rolesDelete);
              _context4.prev = 19;

              _iterator2.s();

            case 21:
              if ((_step2 = _iterator2.n()).done) {
                _context4.next = 27;
                break;
              }

              role = _step2.value;
              _context4.next = 25;
              return _RoleUser.RoleUser.deleteOne(role.id, id);

            case 25:
              _context4.next = 21;
              break;

            case 27:
              _context4.next = 32;
              break;

            case 29:
              _context4.prev = 29;
              _context4.t0 = _context4["catch"](19);

              _iterator2.e(_context4.t0);

            case 32:
              _context4.prev = 32;

              _iterator2.f();

              return _context4.finish(32);

            case 35:
              _context4.next = 75;
              break;

            case 37:
              if (!(newRoles.length > currentRoles.length)) {
                _context4.next = 61;
                break;
              }

              console.log('NEW ROLES THAN __ UPDATE');
              roleUpdate = (0, _utils.arrayDiference)(newRoles, currentRoles, 'nombre');
              console.log('ROLES___UPDATE', roleUpdate);
              _iterator3 = _createForOfIteratorHelper(roleUpdate);
              _context4.prev = 42;

              _iterator3.s();

            case 44:
              if ((_step3 = _iterator3.n()).done) {
                _context4.next = 51;
                break;
              }

              _role = _step3.value;
              console.log(_role.id, id);
              _context4.next = 49;
              return _RoleUser.RoleUser.postOne(_role.id, id);

            case 49:
              _context4.next = 44;
              break;

            case 51:
              _context4.next = 56;
              break;

            case 53:
              _context4.prev = 53;
              _context4.t1 = _context4["catch"](42);

              _iterator3.e(_context4.t1);

            case 56:
              _context4.prev = 56;

              _iterator3.f();

              return _context4.finish(56);

            case 59:
              _context4.next = 75;
              break;

            case 61:
              index = 0;

            case 62:
              if (!(index < currentRoles.length)) {
                _context4.next = 68;
                break;
              }

              _context4.next = 65;
              return _RoleUser.RoleUser.deleteOne(currentRoles[index].id, id);

            case 65:
              index++;
              _context4.next = 62;
              break;

            case 68:
              _index = 0;

            case 69:
              if (!(_index < newRoles.length)) {
                _context4.next = 75;
                break;
              }

              _context4.next = 72;
              return _RoleUser.RoleUser.postOne(newRoles[_index].id, id);

            case 72:
              _index++;
              _context4.next = 69;
              break;

            case 75:
              _req$body2 = req.body, roles = _req$body2.roles, user = _objectWithoutProperties(_req$body2, _excluded);
              _context4.next = 78;
              return _User.User.putOne(user, id);

            case 78:
              putResponse = _context4.sent;
              (0, _response.response)(req, res, 'UPDATE ONE USER', putResponse.rowCount, 201);
              _context4.next = 86;
              break;

            case 82:
              _context4.prev = 82;
              _context4.t2 = _context4["catch"](2);
              console.log(_context4.t2);
              (0, _response.response)(req, res, 'ERROR PUT ONE USER', null, 500);

            case 86:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 82], [19, 29, 32, 35], [42, 53, 56, 59]]);
    }));

    function updateOneUser(_x7, _x8) {
      return _updateOneUser.apply(this, arguments);
    }

    return updateOneUser;
  }(),
  // DELETE ONE
  deleteOneUser: function () {
    var _deleteOneUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _Notes.Note.deleteALlUserNotes(id);

            case 4:
              _context5.next = 6;
              return _RoleUser.RoleUser.deleteALlUserRoles(id);

            case 6:
              _context5.next = 8;
              return _User.User.deleteOne(id);

            case 8:
              user = _context5.sent;
              (0, _response.response)(req, res, 'DELETE ONE USER', user.rowCount, 201);
              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'DELETE ONE USER', null, 500);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }));

    function deleteOneUser(_x9, _x10) {
      return _deleteOneUser.apply(this, arguments);
    }

    return deleteOneUser;
  }(),
  // CHANGE PASSWORD
  changePasswordUser: function () {
    var _changePasswordUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var id, passwordHashed, _yield$User$putOneByF, _yield$User$putOneByF2, queryAnswer, status;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              passwordHashed = _encrypt.encrypt.createHash(req.body.password);
              console.log(passwordHashed);
              _context6.next = 5;
              return _User.User.putOneByField('password', passwordHashed, id);

            case 5:
              _yield$User$putOneByF = _context6.sent;
              _yield$User$putOneByF2 = _slicedToArray(_yield$User$putOneByF, 2);
              queryAnswer = _yield$User$putOneByF2[0];
              status = _yield$User$putOneByF2[1];
              (0, _response.response)(req, res, 'UPDATE ONE USER', queryAnswer, status);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function changePasswordUser(_x11, _x12) {
      return _changePasswordUser.apply(this, arguments);
    }

    return changePasswordUser;
  }()
}; // currentRoles [1,2,3,4]
// newRoles [1,2,3] 4 Delete
// newRoles [1,2,3,4,5]
// currentRoles [1,2,3] 4,5 Update

exports.userController = userController;