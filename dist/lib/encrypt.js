"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

var saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var encrypt = {
  createHash: function createHash(data) {
    var hash = bcrypt.hashSync(data, salt);
    return hash;
  },
  compareHashPassword: function () {
    var _compareHashPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password, hash) {
      var match;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return bcrypt.compareSync(password, hash);

            case 2:
              match = _context.sent;
              console.log('MATCH PASWORD', match);

              if (!match) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", true);

            case 8:
              return _context.abrupt("return", false);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function compareHashPassword(_x, _x2) {
      return _compareHashPassword.apply(this, arguments);
    }

    return compareHashPassword;
  }()
};
exports.encrypt = encrypt;