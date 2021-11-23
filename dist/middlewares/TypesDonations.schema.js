"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTypeDonations = void 0;

var _response = require("./../utils/response");

var _validator = require("../lib/validator");

var _TypesDonations = require("../schemas/TypesDonations.schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Middleware validator
var validateTypeDonations = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _yield$validator$vali, err;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _validator.validator.validateSchema(_TypesDonations.TypeDonationsSchema, req.body);

          case 2:
            _yield$validator$vali = _context.sent;
            err = _yield$validator$vali.err;

            if (!err) {
              next();
            } else {
              (0, _response.response)(req, res, 'ERROR', err, 400);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateTypeDonations(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateTypeDonations = validateTypeDonations;