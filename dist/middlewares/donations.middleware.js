"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donationMiddleware = void 0;

var _cloudinary = require("../lib/cloudinary");

var _multer = require("../lib/multer");

var _Donation = require("../models/Donation.model");

var _response3 = require("../utils/response");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var donationMiddleware = {
  addImageBody: function () {
    var _addImageBody = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var id, donation, image, _response, url_donacion, donationWithImage, _yield$Donation$getOn, rows, urlImageDelete, publicId, _response2, _yield$Donation$getOn2, _rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = req.params.id;
              donation = JSON.parse(req.body.donation);
              console.log(req.file);

              if (!req.file) {
                _context.next = 27;
                break;
              }

              image = (0, _multer.dataUri)(req);
              _context.next = 8;
              return _cloudinary.cloudinaryUploader.upload(image, {
                folder: 'donations'
              });

            case 8:
              _response = _context.sent;
              console.log(_response);
              url_donacion = _response.secure_url;
              donationWithImage = _objectSpread(_objectSpread({}, donation), {}, {
                foto_donacion: url_donacion
              });
              req.body.donation = donationWithImage;

              if (!id) {
                _context.next = 25;
                break;
              }

              _context.next = 16;
              return _Donation.Donation.getOne(id);

            case 16:
              _yield$Donation$getOn = _context.sent;
              rows = _yield$Donation$getOn.rows;
              urlImageDelete = rows[0].foto_donacion;

              if (!urlImageDelete) {
                _context.next = 25;
                break;
              }

              publicId = (0, _cloudinary.getPublicId)(urlImageDelete);
              _context.next = 23;
              return _cloudinary.cloudinaryAdmin.delete_resources(publicId);

            case 23:
              _response2 = _context.sent;
              console.log(_response2);

            case 25:
              _context.next = 32;
              break;

            case 27:
              _context.next = 29;
              return _Donation.Donation.getOne(id);

            case 29:
              _yield$Donation$getOn2 = _context.sent;
              _rows = _yield$Donation$getOn2.rows;
              req.body.donation = _objectSpread(_objectSpread({}, _rows[0]), donation);

            case 32:
              next();
              _context.next = 39;
              break;

            case 35:
              _context.prev = 35;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              (0, _response3.response)(req, res, 'Error post donation', null, 500);

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 35]]);
    }));

    function addImageBody(_x, _x2, _x3) {
      return _addImageBody.apply(this, arguments);
    }

    return addImageBody;
  }()
};
exports.donationMiddleware = donationMiddleware;