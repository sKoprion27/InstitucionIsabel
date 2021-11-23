"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typesDonationController = void 0;

var _response = require("../utils/response");

var _TypesDonations = require("../models/TypesDonations.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var typesDonationController = {
  // GET ALL
  getTypesDonations: function () {
    var _getTypesDonations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$TypesDonation$, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _TypesDonations.TypesDonation.getAll();

            case 3:
              _yield$TypesDonation$ = _context.sent;
              rows = _yield$TypesDonation$.rows;
              (0, _response.response)(req, res, 'GET DONATION TYPES', rows, 200);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET DONATION TYPES', null, 500);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getTypesDonations(_x, _x2) {
      return _getTypesDonations.apply(this, arguments);
    }

    return getTypesDonations;
  }(),
  // GET ONE
  getOneTypesDonation: function () {
    var _getOneTypesDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$TypesDonation$2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _TypesDonations.TypesDonation.getOne(id);

            case 4:
              _yield$TypesDonation$2 = _context2.sent;
              rows = _yield$TypesDonation$2.rows;
              rowCount = _yield$TypesDonation$2.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET ONE DONATION TYPE', null, 500);
              return _context2.abrupt("return");

            case 10:
              (0, _response.response)(req, res, 'GET ONE DONATION TYPE', rows[0], 200);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET ONE DONATION TYPE', null, 500);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 13]]);
    }));

    function getOneTypesDonation(_x3, _x4) {
      return _getOneTypesDonation.apply(this, arguments);
    }

    return getOneTypesDonation;
  }(),
  // POST ONE
  postOneTypesDonation: function () {
    var _postOneTypesDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var type, _yield$TypesDonation$3, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              type = _objectSpread({}, req.body);
              console.log(type);
              _context3.next = 5;
              return _TypesDonations.TypesDonation.postOne(type);

            case 5:
              _yield$TypesDonation$3 = _context3.sent;
              rowCount = _yield$TypesDonation$3.rowCount;
              (0, _response.response)(req, res, 'POST ONE DONATION', rowCount, 201);
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              (0, _response.response)(req, res, 'ERROR POST ONE DONATION', null, 500);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    function postOneTypesDonation(_x5, _x6) {
      return _postOneTypesDonation.apply(this, arguments);
    }

    return postOneTypesDonation;
  }(),
  // UPDATE ONE
  updateOneTypesDonation: function () {
    var _updateOneTypesDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var type, id, _yield$TypesDonation$4, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              type = req.body;
              console.log(type, 'TYPE');
              id = req.params.id;
              _context4.next = 6;
              return _TypesDonations.TypesDonation.putOne(type, id);

            case 6:
              _yield$TypesDonation$4 = _context4.sent;
              rowCount = _yield$TypesDonation$4.rowCount;
              (0, _response.response)(req, res, 'UPDATE ONE DONATION TYPE', rowCount, 201);
              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE DONATION TYPE', null, 500);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }));

    function updateOneTypesDonation(_x7, _x8) {
      return _updateOneTypesDonation.apply(this, arguments);
    }

    return updateOneTypesDonation;
  }(),
  // DELETE ONE
  deleteOneTypesDonation: function () {
    var _deleteOneTypesDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$TypesDonation$5, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _TypesDonations.TypesDonation.deleteOne(id);

            case 4:
              _yield$TypesDonation$5 = _context5.sent;
              rowCount = _yield$TypesDonation$5.rowCount;
              (0, _response.response)(req, res, 'DELETE ONE DONATION TYPE', rowCount, 201);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE DONATION TYPE', null, 500);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    function deleteOneTypesDonation(_x9, _x10) {
      return _deleteOneTypesDonation.apply(this, arguments);
    }

    return deleteOneTypesDonation;
  }()
};
exports.typesDonationController = typesDonationController;