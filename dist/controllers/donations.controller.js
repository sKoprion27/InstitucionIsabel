"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donationController = void 0;

var _response = require("./../utils/response");

var _Donation = require("./../models/Donation.model");

var _PaymentMethod = require("../models/PaymentMethod.model");

var _TypesDonations = require("../models/TypesDonations.model");

var _Donor = require("../models/Donor.model");

var _Beneficiary = require("../models/Beneficiary.model");

var _Category = require("../models/Category.model");

var _DonationBeneficiary = require("../models/DonationBeneficiary");

var _utils = require("../utils");

var _DonationCategory = require("../models/DonationCategory");

var _cloudinary = require("../lib/cloudinary");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var donationController = {
  // GET ALL
  getDonations: function () {
    var _getDonations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$query, startDate, endDate, limit, offset, _yield$Donation$getAl, rows, rowCount, _yield$Donation$getAl2, _rowCount, _yield$Donation$pagin, _rows, _yield$Donation$getAl3, _rows2, _rowCount2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$query = req.query, startDate = _req$query.startDate, endDate = _req$query.endDate, limit = _req$query.limit, offset = _req$query.offset;

              if (!(startDate && endDate)) {
                _context.next = 11;
                break;
              }

              _context.next = 5;
              return _Donation.Donation.getAllByRange(startDate, endDate);

            case 5:
              _yield$Donation$getAl = _context.sent;
              rows = _yield$Donation$getAl.rows;
              rowCount = _yield$Donation$getAl.rowCount;
              (0, _response.response)(req, res, 'GET DONATIONS', {
                donations: rows,
                total: rowCount
              }, 200);
              _context.next = 29;
              break;

            case 11:
              if (!(limit && offset)) {
                _context.next = 23;
                break;
              }

              _context.next = 14;
              return _Donation.Donation.getAll();

            case 14:
              _yield$Donation$getAl2 = _context.sent;
              _rowCount = _yield$Donation$getAl2.rowCount;
              _context.next = 18;
              return _Donation.Donation.pagination(limit, offset);

            case 18:
              _yield$Donation$pagin = _context.sent;
              _rows = _yield$Donation$pagin.rows;
              (0, _response.response)(req, res, 'GET DONATIONS', {
                donations: _rows,
                total: _rowCount
              }, 200);
              _context.next = 29;
              break;

            case 23:
              _context.next = 25;
              return _Donation.Donation.getAll();

            case 25:
              _yield$Donation$getAl3 = _context.sent;
              _rows2 = _yield$Donation$getAl3.rows;
              _rowCount2 = _yield$Donation$getAl3.rowCount;
              (0, _response.response)(req, res, 'GET DONATIONS', {
                donations: _rows2,
                total: _rowCount2
              }, 200);

            case 29:
              _context.next = 35;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response.response)(req, res, 'ERROR GET DONATIONS', null, 500);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 31]]);
    }));

    function getDonations(_x, _x2) {
      return _getDonations.apply(this, arguments);
    }

    return getDonations;
  }(),
  // GET ONE
  getOneDonation: function () {
    var _getOneDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, donation, donationCategories, donationBeneficiaries, paymentMethods, typesDonations, donors, beneficiaries, categories, getDonation;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _Donation.Donation.getOne(id);

            case 4:
              donation = _context2.sent;
              _context2.next = 7;
              return _Donation.Donation.getCategories(id);

            case 7:
              donationCategories = _context2.sent;
              _context2.next = 10;
              return _Donation.Donation.getBeneficiaries(id);

            case 10:
              donationBeneficiaries = _context2.sent;
              _context2.next = 13;
              return _PaymentMethod.PaymentMethod.getAll();

            case 13:
              paymentMethods = _context2.sent;
              _context2.next = 16;
              return _TypesDonations.TypesDonation.getAll();

            case 16:
              typesDonations = _context2.sent;
              _context2.next = 19;
              return _Donor.Donor.getAll();

            case 19:
              donors = _context2.sent;
              _context2.next = 22;
              return _Beneficiary.Beneficiary.getAll();

            case 22:
              beneficiaries = _context2.sent;
              _context2.next = 25;
              return _Category.Category.getAll();

            case 25:
              categories = _context2.sent;

              if (!(donation.rowCount === 0)) {
                _context2.next = 29;
                break;
              }

              (0, _response.response)(req, res, 'ERROR GET ONE DONATION', null, 500);
              return _context2.abrupt("return");

            case 29:
              // {}
              getDonation = {
                donation: _objectSpread(_objectSpread({}, donation.rows[0]), {}, {
                  categorias: donationCategories.rows,
                  beneficiarios: donationBeneficiaries.rows
                }),
                // {}
                metodos_pago: paymentMethods.rows,
                // []
                tipos_donacion: typesDonations.rows,
                // []
                donadores: donors.rows,
                categorias: categories.rows,
                beneficiarios: beneficiaries.rows
              };
              (0, _response.response)(req, res, 'GET ONE DONATION', getDonation, 200);
              _context2.next = 37;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              (0, _response.response)(req, res, 'ERROR GET ONE DONATION', null, 500);

            case 37:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 33]]);
    }));

    function getOneDonation(_x3, _x4) {
      return _getOneDonation.apply(this, arguments);
    }

    return getOneDonation;
  }(),
  // POST ONE
  postOneDonation: function () {
    var _postOneDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var donation, donationResponse, donationCreated, categories, _iterator, _step, category, categoryResponse, beneficiaries, _iterator2, _step2, beneficiary, beneficiaryResponse;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              donation = req.body.donation;
              _context3.next = 4;
              return _Donation.Donation.postOne(donation);

            case 4:
              donationResponse = _context3.sent;
              donationCreated = donationResponse.rows[0];

              if (!(donationResponse.rowCount === 0)) {
                _context3.next = 9;
                break;
              }

              (0, _response.response)(req, res, 'ERROR POST ONE DONATION', null, 500);
              return _context3.abrupt("return");

            case 9:
              categories = donation.categories;
              _iterator = _createForOfIteratorHelper(categories);
              _context3.prev = 11;

              _iterator.s();

            case 13:
              if ((_step = _iterator.n()).done) {
                _context3.next = 23;
                break;
              }

              category = _step.value;
              _context3.next = 17;
              return _DonationCategory.DonationCategory.postOne(donationCreated.id, category.id);

            case 17:
              categoryResponse = _context3.sent;

              if (!(categoryResponse.rowCount === 0)) {
                _context3.next = 21;
                break;
              }

              (0, _response.response)(req, res, 'ERROR POST ONE DONATION', null, 500);
              return _context3.abrupt("return");

            case 21:
              _context3.next = 13;
              break;

            case 23:
              _context3.next = 28;
              break;

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](11);

              _iterator.e(_context3.t0);

            case 28:
              _context3.prev = 28;

              _iterator.f();

              return _context3.finish(28);

            case 31:
              beneficiaries = donation.beneficiaries;
              _iterator2 = _createForOfIteratorHelper(beneficiaries);
              _context3.prev = 33;

              _iterator2.s();

            case 35:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 45;
                break;
              }

              beneficiary = _step2.value;
              _context3.next = 39;
              return _DonationBeneficiary.DonationBeneficiary.postOne(donationCreated.id, beneficiary.id);

            case 39:
              beneficiaryResponse = _context3.sent;

              if (!(beneficiaryResponse.rowCount === 0)) {
                _context3.next = 43;
                break;
              }

              (0, _response.response)(req, res, 'ERROR POST ONE DONATION', null, 500);
              return _context3.abrupt("return");

            case 43:
              _context3.next = 35;
              break;

            case 45:
              _context3.next = 50;
              break;

            case 47:
              _context3.prev = 47;
              _context3.t1 = _context3["catch"](33);

              _iterator2.e(_context3.t1);

            case 50:
              _context3.prev = 50;

              _iterator2.f();

              return _context3.finish(50);

            case 53:
              (0, _response.response)(req, res, 'POST ONE DONATION', donationResponse.rowCount, 201);
              _context3.next = 60;
              break;

            case 56:
              _context3.prev = 56;
              _context3.t2 = _context3["catch"](0);
              console.log(_context3.t2, '🤡');
              (0, _response.response)(req, res, 'ERROR POST ONE DONATION', null, 500);

            case 60:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 56], [11, 25, 28, 31], [33, 47, 50, 53]]);
    }));

    function postOneDonation(_x5, _x6) {
      return _postOneDonation.apply(this, arguments);
    }

    return postOneDonation;
  }(),
  // UPDATE ONE
  updateOneDonation: function () {
    var _updateOneDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var id, donation, donationInsert, categories, donationCategories, categoriesDelete, _iterator3, _step3, category, categoriesUpdate, _iterator4, _step4, _category, index, _index, beneficiaries, donationBeneficiaries, beneficiaryDelete, _iterator5, _step5, beneficiary, beneficiariesUpdate, _iterator6, _step6, _beneficiary, _index2, _index3;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              // New data
              console.log('CONTROLLER PUT');
              id = req.params.id;
              donation = req.body.donation; // Insert data donation

              _context4.next = 6;
              return _Donation.Donation.putOne(donation, id);

            case 6:
              donationInsert = _context4.sent;

              if (!(donationInsert.rowCount === 0)) {
                _context4.next = 11;
                break;
              }

              console.log('ERR');
              (0, _response.response)(req, res, 'ERROR UPDATE ONE DONATION', null, 500);
              return _context4.abrupt("return");

            case 11:
              // Compare data categories
              categories = donation.categories; // Current data

              _context4.next = 14;
              return _Donation.Donation.getCategories(id);

            case 14:
              donationCategories = _context4.sent;

              if (!(donationCategories.rows.length > categories.length)) {
                _context4.next = 37;
                break;
              }

              console.log('CURRENT CATEGORIES THAN __ DELETE');
              categoriesDelete = (0, _utils.arrayDiference)(donationCategories.rows, categories, 'id'); // console.log('categoriesDelete', categoriesDelete)

              _iterator3 = _createForOfIteratorHelper(categoriesDelete);
              _context4.prev = 19;

              _iterator3.s();

            case 21:
              if ((_step3 = _iterator3.n()).done) {
                _context4.next = 27;
                break;
              }

              category = _step3.value;
              _context4.next = 25;
              return _DonationCategory.DonationCategory.deleteOne(id, category.id);

            case 25:
              _context4.next = 21;
              break;

            case 27:
              _context4.next = 32;
              break;

            case 29:
              _context4.prev = 29;
              _context4.t0 = _context4["catch"](19);

              _iterator3.e(_context4.t0);

            case 32:
              _context4.prev = 32;

              _iterator3.f();

              return _context4.finish(32);

            case 35:
              _context4.next = 73;
              break;

            case 37:
              if (!(categories.length > donationCategories.rows.length)) {
                _context4.next = 58;
                break;
              }

              // console.log('NEW CATEGORIES THAN __ UPDATE')
              categoriesUpdate = (0, _utils.arrayDiference)(categories, donationCategories.rows, 'id'); // console.log('categoriesUpdate', categoriesUpdate)

              _iterator4 = _createForOfIteratorHelper(categoriesUpdate);
              _context4.prev = 40;

              _iterator4.s();

            case 42:
              if ((_step4 = _iterator4.n()).done) {
                _context4.next = 48;
                break;
              }

              _category = _step4.value;
              _context4.next = 46;
              return _DonationCategory.DonationCategory.postOne(id, _category.id);

            case 46:
              _context4.next = 42;
              break;

            case 48:
              _context4.next = 53;
              break;

            case 50:
              _context4.prev = 50;
              _context4.t1 = _context4["catch"](40);

              _iterator4.e(_context4.t1);

            case 53:
              _context4.prev = 53;

              _iterator4.f();

              return _context4.finish(53);

            case 56:
              _context4.next = 73;
              break;

            case 58:
              console.log('NO DIFF CATEGORIES');
              index = 0;

            case 60:
              if (!(index < donationCategories.rows.length)) {
                _context4.next = 66;
                break;
              }

              _context4.next = 63;
              return _DonationCategory.DonationCategory.deleteOne(id, donationCategories.rows[index].id);

            case 63:
              index++;
              _context4.next = 60;
              break;

            case 66:
              _index = 0;

            case 67:
              if (!(_index < categories.length)) {
                _context4.next = 73;
                break;
              }

              _context4.next = 70;
              return _DonationCategory.DonationCategory.postOne(id, categories[_index].id);

            case 70:
              _index++;
              _context4.next = 67;
              break;

            case 73:
              // Compare data beneficiaries
              beneficiaries = donation.beneficiaries;
              _context4.next = 76;
              return _Donation.Donation.getBeneficiaries(id);

            case 76:
              donationBeneficiaries = _context4.sent;

              if (!(donationBeneficiaries.rows.length > beneficiaries.length)) {
                _context4.next = 99;
                break;
              }

              console.log('CURRENT beneficiaries THAN __ DELETE');
              beneficiaryDelete = (0, _utils.arrayDiference)(donationBeneficiaries.rows, beneficiaries, 'id');
              _iterator5 = _createForOfIteratorHelper(beneficiaryDelete);
              _context4.prev = 81;

              _iterator5.s();

            case 83:
              if ((_step5 = _iterator5.n()).done) {
                _context4.next = 89;
                break;
              }

              beneficiary = _step5.value;
              _context4.next = 87;
              return _DonationBeneficiary.DonationBeneficiary.deleteOne(id, beneficiary.id);

            case 87:
              _context4.next = 83;
              break;

            case 89:
              _context4.next = 94;
              break;

            case 91:
              _context4.prev = 91;
              _context4.t2 = _context4["catch"](81);

              _iterator5.e(_context4.t2);

            case 94:
              _context4.prev = 94;

              _iterator5.f();

              return _context4.finish(94);

            case 97:
              _context4.next = 137;
              break;

            case 99:
              if (!(beneficiaries.length > donationBeneficiaries.rows.length)) {
                _context4.next = 122;
                break;
              }

              console.log('NEW beneficiaries THAN __ UPDATE');
              beneficiariesUpdate = (0, _utils.arrayDiference)(beneficiaries, donationBeneficiaries.rows, 'id');
              console.log(beneficiariesUpdate);
              _iterator6 = _createForOfIteratorHelper(beneficiariesUpdate);
              _context4.prev = 104;

              _iterator6.s();

            case 106:
              if ((_step6 = _iterator6.n()).done) {
                _context4.next = 112;
                break;
              }

              _beneficiary = _step6.value;
              _context4.next = 110;
              return _DonationBeneficiary.DonationBeneficiary.postOne(id, _beneficiary.id);

            case 110:
              _context4.next = 106;
              break;

            case 112:
              _context4.next = 117;
              break;

            case 114:
              _context4.prev = 114;
              _context4.t3 = _context4["catch"](104);

              _iterator6.e(_context4.t3);

            case 117:
              _context4.prev = 117;

              _iterator6.f();

              return _context4.finish(117);

            case 120:
              _context4.next = 137;
              break;

            case 122:
              console.log('NO DIFF beneficiaries');
              _index2 = 0;

            case 124:
              if (!(_index2 < donationBeneficiaries.rows.length)) {
                _context4.next = 130;
                break;
              }

              _context4.next = 127;
              return _DonationBeneficiary.DonationBeneficiary.deleteOne(id, donationBeneficiaries.rows[_index2].id);

            case 127:
              _index2++;
              _context4.next = 124;
              break;

            case 130:
              _index3 = 0;

            case 131:
              if (!(_index3 < beneficiaries.length)) {
                _context4.next = 137;
                break;
              }

              _context4.next = 134;
              return _DonationBeneficiary.DonationBeneficiary.postOne(id, beneficiaries[_index3].id);

            case 134:
              _index3++;
              _context4.next = 131;
              break;

            case 137:
              (0, _response.response)(req, res, 'UPDATE ONE DONATION', '', 201);
              _context4.next = 144;
              break;

            case 140:
              _context4.prev = 140;
              _context4.t4 = _context4["catch"](0);
              console.log(_context4.t4);
              (0, _response.response)(req, res, 'ERROR UPDATE ONE DONATION', null, 500);

            case 144:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 140], [19, 29, 32, 35], [40, 50, 53, 56], [81, 91, 94, 97], [104, 114, 117, 120]]);
    }));

    function updateOneDonation(_x7, _x8) {
      return _updateOneDonation.apply(this, arguments);
    }

    return updateOneDonation;
  }(),
  updateOneDonationInvoce: function () {
    var _updateOneDonationInvoce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var esta_facturado, id, _yield$Donation$updat, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              esta_facturado = req.body.esta_facturado;
              console.log(esta_facturado, 'UP INVOICE');
              id = req.params.id;
              _context5.next = 6;
              return _Donation.Donation.updateOneDonationInvoce(id, esta_facturado);

            case 6:
              _yield$Donation$updat = _context5.sent;
              rowCount = _yield$Donation$updat.rowCount;

              if (!(rowCount === 0)) {
                _context5.next = 11;
                break;
              }

              (0, _response.response)(req, res, 'ERROR INVOICE ONE DONATION', null, 500);
              return _context5.abrupt("return");

            case 11:
              (0, _response.response)(req, res, 'SUCCESS INVOICE ONE DONATION', rowCount, 201);
              _context5.next = 18;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              (0, _response.response)(req, res, 'ERROR INVOICE ONE DONATION', null, 500);

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 14]]);
    }));

    function updateOneDonationInvoce(_x9, _x10) {
      return _updateOneDonationInvoce.apply(this, arguments);
    }

    return updateOneDonationInvoce;
  }(),
  // DELETE ONE
  deleteOneDonation: function () {
    var _deleteOneDonation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var id, _yield$Donation$delet, rowCount;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              _context6.next = 4;
              return _Donation.Donation.deleteOne(id);

            case 4:
              _yield$Donation$delet = _context6.sent;
              rowCount = _yield$Donation$delet.rowCount;

              if (!(rowCount === 0)) {
                _context6.next = 9;
                break;
              }

              (0, _response.response)(req, res, 'ERROR DELETE ONE DONATION', null, 500);
              return _context6.abrupt("return");

            case 9:
              (0, _response.response)(req, res, 'DELETE ONE DONATION', rowCount, 201);
              _context6.next = 16;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE DONATION', null, 500);

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 12]]);
    }));

    function deleteOneDonation(_x11, _x12) {
      return _deleteOneDonation.apply(this, arguments);
    }

    return deleteOneDonation;
  }(),
  // DELETE PHOTO DONATION
  deletePhotos: function () {
    var _deletePhotos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var id, _yield$Donation$getOn, rows, urlImageDelete, publicId, _yield$Donation$updat2, rowCount;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              console.log('DELETE PHOTO');
              _context7.prev = 1;
              id = req.params.id;
              _context7.next = 5;
              return _Donation.Donation.getOne(id);

            case 5:
              _yield$Donation$getOn = _context7.sent;
              rows = _yield$Donation$getOn.rows;
              urlImageDelete = rows[0].foto_donacion;

              if (!urlImageDelete) {
                _context7.next = 12;
                break;
              }

              publicId = (0, _cloudinary.getPublicId)(urlImageDelete);
              _context7.next = 12;
              return _cloudinary.cloudinaryAdmin.delete_resources(publicId);

            case 12:
              _context7.next = 14;
              return _Donation.Donation.updatePhoto(id, null);

            case 14:
              _yield$Donation$updat2 = _context7.sent;
              rowCount = _yield$Donation$updat2.rowCount;

              if (!(rowCount === 1)) {
                _context7.next = 19;
                break;
              }

              (0, _response.response)(req, res, 'DELETE PHOTO DONATION', rowCount, 201);
              return _context7.abrupt("return");

            case 19:
              (0, _response.response)(req, res, 'ERROR DELETE PHOTO', null, 500);
              _context7.next = 26;
              break;

            case 22:
              _context7.prev = 22;
              _context7.t0 = _context7["catch"](1);
              console.log(_context7.t0);
              (0, _response.response)(req, res, 'ERROR DELETE ONE DONATION', null, 500);

            case 26:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 22]]);
    }));

    function deletePhotos(_x13, _x14) {
      return _deletePhotos.apply(this, arguments);
    }

    return deletePhotos;
  }()
};
exports.donationController = donationController;