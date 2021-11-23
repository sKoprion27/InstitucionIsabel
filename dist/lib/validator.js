"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validator = {
  validateSchema: function () {
    var _validateSchema = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schema, data) {
      var user, errors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return schema.validateAsync(data, {
                abortEarly: false,
                errors: {
                  wrap: {
                    label: false
                  },
                  stack: true
                },
                externals: false
              });

            case 3:
              user = _context.sent;
              return _context.abrupt("return", {
                user: user,
                err: null
              });

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              errors = _context.t0.details.map(function (err) {
                return {
                  type: err.message
                };
              });
              return _context.abrupt("return", {
                user: null,
                err: errors
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function validateSchema(_x, _x2) {
      return _validateSchema.apply(this, arguments);
    }

    return validateSchema;
  }()
};
exports.validator = validator;