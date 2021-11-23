"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _typesDonations = require("../controllers/typesDonations.controller");

var router = (0, _express.Router)();
router.get('/', _typesDonations.typesDonationController.getTypesDonations);
router.get('/:id', _typesDonations.typesDonationController.getOneTypesDonation);
router.post('/', _typesDonations.typesDonationController.postOneTypesDonation);
router.put('/:id', _typesDonations.typesDonationController.updateOneTypesDonation);
router["delete"]('/:id', _typesDonations.typesDonationController.deleteOneTypesDonation);
var _default = router;
exports["default"] = _default;