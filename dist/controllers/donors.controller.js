"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donorController = void 0;

var _response = require("./../utils/response");

var _Donor = require("./../models/Donor.model");

var _State = require("../models/State.model");

var _Cfdi = require("../models/Cfdi.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var donorController = {
  getDonors: function () {
    var _getDonors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$query, limit, offset, _yield$Donor$getAll, rowCount, _yield$Donor$paginati, rows, _yield$Donor$getAll2, _rows, _rowCount;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$query = req.query, limit = _req$query.limit, offset = _req$query.offset;

              if (!(limit && offset)) {
                _context.next = 14;
                break;
              }

              _context.next = 5;
              return _Donor.Donor.getAll();

            case 5:
              _yield$Donor$getAll = _context.sent;
              rowCount = _yield$Donor$getAll.rowCount;
              _context.next = 9;
              return _Donor.Donor.pagination(limit, offset);

            case 9:
              _yield$Donor$paginati = _context.sent;
              rows = _yield$Donor$paginati.rows;
              (0, _response.response)(req, res, 'GET DONORS', {
                donors: rows,
                total: rowCount
              }, 200);
              _context.next = 20;
              break;

            case 14:
              _context.next = 16;
              return _Donor.Donor.getAll();

            case 16:
              _yield$Donor$getAll2 = _context.sent;
              _rows = _yield$Donor$getAll2.rows;
              _rowCount = _yield$Donor$getAll2.rowCount;
              (0, _response.response)(req, res, 'GET DONORS', {
                donors: _rows,
                total: _rowCount
              }, 200);

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET DONORS', null, 500);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 22]]);
    }));

    function getDonors(_x, _x2) {
      return _getDonors.apply(this, arguments);
    }

    return getDonors;
  }(),
  getOneDonor: function () {
    var _getOneDonor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, donor, states, cfdis, getDonor;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _Donor.Donor.getOne(id);

            case 4:
              donor = _context2.sent;
              _context2.next = 7;
              return _State.State.getAll();

            case 7:
              states = _context2.sent;
              _context2.next = 10;
              return _Cfdi.Cfdi.getAll();

            case 10:
              cfdis = _context2.sent;

              if (!(donor.rowCount === 0)) {
                _context2.next = 14;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET ONE DONOR 🐹', null, 500);
              return _context2.abrupt("return");

            case 14:
              // {}
              getDonor = {
                donor: _objectSpread({}, donor.rows[0]),
                // {}
                estados: states.rows,
                // []
                cfdis: cfdis.rows // []

              };
              (0, _response.response)(req, res, 'GET ONE DONOR', getDonor, 200);
              _context2.next = 22;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET ONE DONOR 👻', null, 500);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 18]]);
    }));

    function getOneDonor(_x3, _x4) {
      return _getOneDonor.apply(this, arguments);
    }

    return getOneDonor;
  }(),
  postOneDonor: function () {
    var _postOneDonor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var donor, donorResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              donor = req.body.donor;
              console.log(req.body, ' soy el donor');
              _context3.next = 5;
              return _Donor.Donor.postOne(donor);

            case 5:
              donorResponse = _context3.sent;

              if (!(donorResponse.rowCount === 0)) {
                _context3.next = 9;
                break;
              }

              (0, _response.response)(req, res, 'ERROR POST ONE DONOR', null, 500);
              return _context3.abrupt("return");

            case 9:
              (0, _response.response)(req, res, 'POST ONE DONATION', donorResponse.rowCount, 201);
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0, '🤡');
              (0, _response.response)(req, res, 'ERROR POST ONE DONOR', null, 500);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }));

    function postOneDonor(_x5, _x6) {
      return _postOneDonor.apply(this, arguments);
    }

    return postOneDonor;
  }(),
  updateOneDonor: function () {
    var _updateOneDonor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var donor, id, _yield$Donor$putOne, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              donor = req.body;
              id = req.params.id;
              _context4.next = 5;
              return _Donor.Donor.putOne(donor, id);

            case 5:
              _yield$Donor$putOne = _context4.sent;
              rows = _yield$Donor$putOne.rows;
              rowCount = _yield$Donor$putOne.rowCount;
              console.log(rows);
              (0, _response.response)(req, res, 'UPDATE ONE DONOR', rowCount, 201);
              _context4.next = 16;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0, ':grinning:');
              (0, _response.response)(req, res, 'UPDATE ONE DONOR', null, 500);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 12]]);
    }));

    function updateOneDonor(_x7, _x8) {
      return _updateOneDonor.apply(this, arguments);
    }

    return updateOneDonor;
  }(),
  deleteOneDonor: function () {
    var _deleteOneDonor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$Donor$deleteOn, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _Donor.Donor.deleteOne(id);

            case 4:
              _yield$Donor$deleteOn = _context5.sent;
              rowCount = _yield$Donor$deleteOn.rowCount;

              if (!(rowCount === 0)) {
                _context5.next = 9;
                break;
              }

              (0, _response.response)(req, res, 'ERROR DELETE ONE DONOR', null, 500);
              return _context5.abrupt("return");

            case 9:
              (0, _response.response)(req, res, 'DELETE ONE DONOR', rowCount, 201);
              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE DONOR', null, 500);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }));

    function deleteOneDonor(_x9, _x10) {
      return _deleteOneDonor.apply(this, arguments);
    }

    return deleteOneDonor;
  }()
};
exports.donorController = donorController;