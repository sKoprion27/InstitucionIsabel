"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePasswordUser = exports.validateUserFields = void 0;

var _response = require("./../utils/response");

var _validator = require("../lib/validator");

var _user = require("../schemas/user.schema");

var _excluded = ["id"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Middleware validator
var validateUserFields = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, id, body, _yield$validator$vali, err;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, body = _objectWithoutProperties(_req$body, _excluded);
            _context.next = 3;
            return _validator.validator.validateSchema(_user.userPostSchema, body);

          case 3:
            _yield$validator$vali = _context.sent;
            err = _yield$validator$vali.err;
            console.log(err);

            if (!err) {
              next();
            } else {
              (0, _response.response)(req, res, 'ERROR', err, 400);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateUserFields(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateUserFields = validateUserFields;

var validatePasswordUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _yield$validator$vali2, err;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('Validate password');
            _context2.next = 3;
            return _validator.validator.validateSchema(_user.userPasswordSchema, req.body);

          case 3:
            _yield$validator$vali2 = _context2.sent;
            err = _yield$validator$vali2.err;

            if (!err) {
              next();
            } else {
              (0, _response.response)(req, res, 'ERROR', err, 400);
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validatePasswordUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validatePasswordUser = validatePasswordUser;