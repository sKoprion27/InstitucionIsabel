"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cfdiController = void 0;

var _response = require("./../utils/response");

var _Cfdi = require("./../models/Cfdi.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cfdiController = {
  // GET ALL
  getCfdis: function () {
    var _getCfdis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$Cfdi$getAll, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Cfdi.Cfdi.getAll();

            case 3:
              _yield$Cfdi$getAll = _context.sent;
              rows = _yield$Cfdi$getAll.rows;
              (0, _response.response)(req, res, 'GET CFDIs', rows, 200);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET CFDIs', null, 500);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getCfdis(_x, _x2) {
      return _getCfdis.apply(this, arguments);
    }

    return getCfdis;
  }(),
  // GET ONE
  getOneCfdi: function () {
    var _getOneCfdi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$Cfdi$getOne, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _Cfdi.Cfdi.getOne(id);

            case 4:
              _yield$Cfdi$getOne = _context2.sent;
              rows = _yield$Cfdi$getOne.rows;
              rowCount = _yield$Cfdi$getOne.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET CFDI', null, 500);
              return _context2.abrupt("return");

            case 10:
              (0, _response.response)(req, res, 'GET CFDI', rows[0], 200);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET CFDI', null, 500);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));

    function getOneCfdi(_x3, _x4) {
      return _getOneCfdi.apply(this, arguments);
    }

    return getOneCfdi;
  }(),
  // POST ONE
  postOneCfdi: function () {
    var _postOneCfdi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var cfdi, _yield$Cfdi$postOne, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              cfdi = _objectSpread({}, req.body);
              _context3.next = 4;
              return _Cfdi.Cfdi.postOne(cfdi);

            case 4:
              _yield$Cfdi$postOne = _context3.sent;
              rowCount = _yield$Cfdi$postOne.rowCount;
              (0, _response.response)(req, res, 'POST ONE CFDI', rowCount, 201);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              (0, _response.response)(req, res, 'ERROR POST ONE CFDI', null, 500);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function postOneCfdi(_x5, _x6) {
      return _postOneCfdi.apply(this, arguments);
    }

    return postOneCfdi;
  }(),
  // UPDATE ONE
  updateOneCfdi: function () {
    var _updateOneCfdi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var cfdi, id, _yield$Cfdi$putOne, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              cfdi = req.body;
              id = req.params.id;
              _context4.next = 5;
              return _Cfdi.Cfdi.putOne(cfdi, id);

            case 5:
              _yield$Cfdi$putOne = _context4.sent;
              rowCount = _yield$Cfdi$putOne.rowCount;
              (0, _response.response)(req, res, 'UPDATE ONE CFDI', rowCount, 201);
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE CFDI', null, 500);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 10]]);
    }));

    function updateOneCfdi(_x7, _x8) {
      return _updateOneCfdi.apply(this, arguments);
    }

    return updateOneCfdi;
  }(),
  // DELETE ONE
  deleteOneCfdi: function () {
    var _deleteOneCfdi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$Cfdi$deleteOne, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _Cfdi.Cfdi.deleteOne(id);

            case 4:
              _yield$Cfdi$deleteOne = _context5.sent;
              rowCount = _yield$Cfdi$deleteOne.rowCount;
              (0, _response.response)(req, res, 'DELETE ONE CFDI', rowCount, 201);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE CFDI', null, 500);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    function deleteOneCfdi(_x9, _x10) {
      return _deleteOneCfdi.apply(this, arguments);
    }

    return deleteOneCfdi;
  }()
};
exports.cfdiController = cfdiController;