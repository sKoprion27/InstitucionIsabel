"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beneficiaryController = void 0;

var _response = require("./../utils/response");

var _Beneficiary = require("./../models/Beneficiary.model");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var beneficiaryController = {
  // GET ALL
  getBeneficiaries: function () {
    var _getBeneficiaries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _yield$Beneficiary$ge, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Beneficiary.Beneficiary.getAll();

            case 3:
              _yield$Beneficiary$ge = _context.sent;
              rows = _yield$Beneficiary$ge.rows;
              (0, _response.response)(req, res, 'GET BENEFICIARIES', rows, 200);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET BENEFICIARIES', null, 500);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getBeneficiaries(_x, _x2) {
      return _getBeneficiaries.apply(this, arguments);
    }

    return getBeneficiaries;
  }(),
  // GET ONE
  getOneBeneficiary: function () {
    var _getOneBeneficiary = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, _yield$Beneficiary$ge2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _Beneficiary.Beneficiary.getOne(id);

            case 4:
              _yield$Beneficiary$ge2 = _context2.sent;
              rows = _yield$Beneficiary$ge2.rows;
              rowCount = _yield$Beneficiary$ge2.rowCount;

              if (!(rowCount === 0)) {
                _context2.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET BENEFICIARIES', null, 500);
              return _context2.abrupt("return");

            case 10:
              (0, _response.response)(req, res, 'GET BENEFICIARIES', rows[0], 200);
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET BENEFICIARIES', null, 500);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));

    function getOneBeneficiary(_x3, _x4) {
      return _getOneBeneficiary.apply(this, arguments);
    }

    return getOneBeneficiary;
  }(),
  getFile: function () {
    var _getFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var id, _yield$Beneficiary$ge3, rows, fileName, filePath;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return _Beneficiary.Beneficiary.getOne(id);

            case 4:
              _yield$Beneficiary$ge3 = _context3.sent;
              rows = _yield$Beneficiary$ge3.rows;
              // File
              fileName = rows[0].archivo;
              filePath = _path["default"].join(__dirname, '/../../uploads/', fileName); // console.log(exist)

              if (_fs["default"].existsSync(filePath)) {
                res.contentType("application/".concat(_path["default"].extname(fileName).split('.')[1]));
                console.log("application/".concat(_path["default"].extname(fileName).split('.')[1]));
                res.status(201).download(filePath, fileName);
              } else {
                (0, _response.response)(req, res, 'ERROR GET FILE', null, 500);
              }

              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0, 'get file');
              (0, _response.response)(req, res, 'ERROR GET FILE', null, 500);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 11]]);
    }));

    function getFile(_x5, _x6) {
      return _getFile.apply(this, arguments);
    }

    return getFile;
  }(),
  // POST ONE
  postOneBeneficiary: function () {
    var _postOneBeneficiary = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var beneficiary, postBeneficiary, _yield$Beneficiary$po, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              beneficiary = JSON.parse(req.body.beneficiary);
              postBeneficiary = _objectSpread(_objectSpread({}, beneficiary), {}, {
                archivo: req.file ? "".concat(req.file.filename) : null
              });
              console.log(postBeneficiary, 'POST');
              _context4.next = 6;
              return _Beneficiary.Beneficiary.postOne(postBeneficiary);

            case 6:
              _yield$Beneficiary$po = _context4.sent;
              rowCount = _yield$Beneficiary$po.rowCount;
              (0, _response.response)(req, res, 'POST ONE BENEFICIARY', rowCount, 201);
              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              (0, _response.response)(req, res, 'ERROR POST ONE BENEFICIARY', null, 500);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }));

    function postOneBeneficiary(_x7, _x8) {
      return _postOneBeneficiary.apply(this, arguments);
    }

    return postOneBeneficiary;
  }(),
  // UPDATE ONE
  updateOneBeneficiary: function () {
    var _updateOneBeneficiary = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var id, beneficiary, currentFile, filePath, postBeneficiary, _yield$Beneficiary$pu, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              beneficiary = JSON.parse(req.body.beneficiary);
              _context5.next = 5;
              return _Beneficiary.Beneficiary.getOne(id);

            case 5:
              currentFile = _context5.sent;
              filePath = _path["default"].join(__dirname, '/../../uploads/', currentFile.rows[0].archivo ? currentFile.rows[0].archivo : 'NULL');
              console.log(req.file);
              postBeneficiary = _objectSpread(_objectSpread({}, beneficiary), {}, {
                archivo: req.file ? req.file.filename : currentFile.rows[0].archivo
              });
              _context5.next = 11;
              return _Beneficiary.Beneficiary.putOne(postBeneficiary, id);

            case 11:
              _yield$Beneficiary$pu = _context5.sent;
              rowCount = _yield$Beneficiary$pu.rowCount;

              if (!(rowCount === 0)) {
                _context5.next = 16;
                break;
              }

              (0, _response.response)(req, res, 'UPDATE ONE BENEFICIARY', null, 500);
              return _context5.abrupt("return");

            case 16:
              if (_fs["default"].existsSync(filePath)) {
                _fs["default"].unlinkSync(filePath);
              }

              (0, _response.response)(req, res, 'UPDATE ONE BENEFICIARY', rowCount, 201);
              _context5.next = 24;
              break;

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE BENEFICIARY', null, 500);

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 20]]);
    }));

    function updateOneBeneficiary(_x9, _x10) {
      return _updateOneBeneficiary.apply(this, arguments);
    }

    return updateOneBeneficiary;
  }(),
  // DELETE ONE
  deleteOneBeneficiary: function () {
    var _deleteOneBeneficiary = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var id, _yield$Beneficiary$de, rowCount;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              _context6.next = 4;
              return _Beneficiary.Beneficiary.deleteOne(id);

            case 4:
              _yield$Beneficiary$de = _context6.sent;
              rowCount = _yield$Beneficiary$de.rowCount;
              (0, _response.response)(req, res, 'DELETE ONE BENIFICIARY', rowCount, 201);
              _context6.next = 13;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE BENIFICIARY', null, 500);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }));

    function deleteOneBeneficiary(_x11, _x12) {
      return _deleteOneBeneficiary.apply(this, arguments);
    }

    return deleteOneBeneficiary;
  }()
};
exports.beneficiaryController = beneficiaryController;