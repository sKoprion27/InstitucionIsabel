"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateController = void 0;

var _response = require("./../utils/response");

var _State = require("./../models/State.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var stateController = {
  // GET ALL
  getStates: function () {
    var _getStates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$State$getAll, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _State.State.getAll();

            case 3:
              _yield$State$getAll = _context.sent;
              rows = _yield$State$getAll.rows;
              (0, _response.response)(req, res, 'GET STATES', rows, 200);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET STATES', null, 500);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getStates(_x, _x2) {
      return _getStates.apply(this, arguments);
    }

    return getStates;
  }(),
  // GET ONE
  getOneState: function () {
    var _getOneState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$State$getOne, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _State.State.getOne(id);

            case 4:
              _yield$State$getOne = _context2.sent;
              rows = _yield$State$getOne.rows;
              rowCount = _yield$State$getOne.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET STATE', null, 500);
              return _context2.abrupt("return");

            case 10:
              (0, _response.response)(req, res, 'GET STATE', rows[0], 200);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET STATE', null, 500);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));

    function getOneState(_x3, _x4) {
      return _getOneState.apply(this, arguments);
    }

    return getOneState;
  }(),
  postOneState: function () {
    var _postOneState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var state, _yield$State$postOne, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              state = _objectSpread({}, req.body);
              _context3.next = 4;
              return _State.State.postOne(state);

            case 4:
              _yield$State$postOne = _context3.sent;
              rowCount = _yield$State$postOne.rowCount;
              (0, _response.response)(req, res, 'POST ONE STATE', rowCount, 201);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              (0, _response.response)(req, res, 'ERROR POST ONE STATE', null, 500);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function postOneState(_x5, _x6) {
      return _postOneState.apply(this, arguments);
    }

    return postOneState;
  }(),
  // UPDATE ONE
  updateOneState: function () {
    var _updateOneState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var state, id, _yield$State$putOne, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              state = req.body;
              id = req.params.id;
              _context4.next = 5;
              return _State.State.putOne(state, id);

            case 5:
              _yield$State$putOne = _context4.sent;
              rowCount = _yield$State$putOne.rowCount;
              (0, _response.response)(req, res, 'UPDATE ONE STATE', rowCount, 201);
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE STATE', null, 500);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 10]]);
    }));

    function updateOneState(_x7, _x8) {
      return _updateOneState.apply(this, arguments);
    }

    return updateOneState;
  }(),
  // DELETE ONE
  deleteOneState: function () {
    var _deleteOneState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, _yield$State$deleteOn, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _State.State.deleteOne(id);

            case 4:
              _yield$State$deleteOn = _context5.sent;
              rowCount = _yield$State$deleteOn.rowCount;
              (0, _response.response)(req, res, 'DELETE ONE STATE', rowCount, 201);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE STATE', null, 500);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    function deleteOneState(_x9, _x10) {
      return _deleteOneState.apply(this, arguments);
    }

    return deleteOneState;
  }()
};
exports.stateController = stateController;