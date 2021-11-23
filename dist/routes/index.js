"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRoutes = void 0;

var _users = _interopRequireDefault(require("./users.routes"));

var _roles = _interopRequireDefault(require("./roles.routes"));

var _notes = _interopRequireDefault(require("./notes.routes"));

var _auth = _interopRequireDefault(require("./auth.routes"));

var _donations = _interopRequireDefault(require("./donations.routes"));

var _donors = _interopRequireDefault(require("./donors.routes"));

var _cfdis = _interopRequireDefault(require("./cfdis.routes"));

var _states = _interopRequireDefault(require("./states.routes"));

var _notFound = _interopRequireDefault(require("./notFound.routes"));

var _typesDonations = _interopRequireDefault(require("./typesDonations.routes"));

var _beneficiaries = _interopRequireDefault(require("./beneficiaries.routes"));

var _paymentMethods = _interopRequireDefault(require("./paymentMethods.routes"));

var _categories = _interopRequireDefault(require("./categories.routes"));

var _auth2 = require("../lib/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initRoutes = function initRoutes(app) {
  app.use('/auth', _auth["default"]);
  app.use(_auth2.auth.verifyToken); // si se activa pide token

  app.use('/users', _users["default"]);
  app.use('/roles', _roles["default"]);
  app.use('/donors', _donors["default"]);
  app.use('/donations', _donations["default"]);
  app.use('/beneficiaries', _beneficiaries["default"]);
  app.use('/categories', _categories["default"]);
  app.use('/types-donations', _typesDonations["default"]);
  app.use('/notes', _notes["default"]);
  app.use('/cfdis', _cfdis["default"]);
  app.use('/states', _states["default"]);
  app.use('/payment-methods', _paymentMethods["default"]);
  app.use('/*', _notFound["default"]);
};

exports.initRoutes = initRoutes;