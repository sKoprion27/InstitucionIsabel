"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryController = void 0;

var _response = require("./../utils/response");

var _Category = require("./../models/Category.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var categoryController = {
  // GET ALL
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$Category$getAl, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Category.Category.getAll();

            case 3:
              _yield$Category$getAl = _context.sent;
              rows = _yield$Category$getAl.rows;
              (0, _response.response)(req, res, 'GET CATEGORIES', rows, 201);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET CATEGORIES', null, 500);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getAll(_x, _x2) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  // GET ONE
  getOne: function () {
    var _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$Category$getOn, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _Category.Category.getOne(id);

            case 4:
              _yield$Category$getOn = _context2.sent;
              rows = _yield$Category$getOn.rows;
              rowCount = _yield$Category$getOn.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET ONE Category', null, 500);
              return _context2.abrupt("return");

            case 10:
              (0, _response.response)(req, res, 'GET ONE Category', rows[0], 200);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET ONE Category', null, 500);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 13]]);
    }));

    function getOne(_x3, _x4) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  // POST ONE
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var category, _yield$Category$postO, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              category = _objectSpread({}, req.body);
              _context3.next = 4;
              return _Category.Category.postOne(category);

            case 4:
              _yield$Category$postO = _context3.sent;
              rowCount = _yield$Category$postO.rowCount;
              (0, _response.response)(req, res, 'POST ONE Category', rowCount, 201);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              (0, _response.response)(req, res, 'ERROR POST ONE Category', null, 500);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function postOne(_x5, _x6) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  // UPDATE ONE
  updateOne: function () {
    var _updateOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var category, id, _yield$Category$putOn, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              category = req.body;
              id = req.params.id;
              _context4.next = 5;
              return _Category.Category.putOne(category, id);

            case 5:
              _yield$Category$putOn = _context4.sent;
              rowCount = _yield$Category$putOn.rowCount;
              (0, _response.response)(req, res, 'UPDATE ONE Category', rowCount, 201);
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE Category', null, 500);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 10]]);
    }));

    function updateOne(_x7, _x8) {
      return _updateOne.apply(this, arguments);
    }

    return updateOne;
  }(),
  // DELETE ONE
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$Category$delet, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _Category.Category.deleteOne(id);

            case 4:
              _yield$Category$delet = _context5.sent;
              rowCount = _yield$Category$delet.rowCount;
              (0, _response.response)(req, res, 'DELETE ONE BENIFICIARY', rowCount, 201);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE BENIFICIARY', null, 500);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    function deleteOne(_x9, _x10) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.categoryController = categoryController;