"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = require("../lib/multer");

var _beneficiaries = require("./../controllers/beneficiaries.controller");

var router = (0, _express.Router)();
router.get('/', _beneficiaries.beneficiaryController.getBeneficiaries);
router.get('/:id', _beneficiaries.beneficiaryController.getOneBeneficiary);
router.get('/:id/files', _beneficiaries.beneficiaryController.getFile);
router.post('/', _multer.multerUploadFile.single('archivo'), _beneficiaries.beneficiaryController.postOneBeneficiary);
router.put('/:id', _multer.multerUploadFile.single('archivo'), _beneficiaries.beneficiaryController.updateOneBeneficiary);
router["delete"]('/:id', _beneficiaries.beneficiaryController.deleteOneBeneficiary);
var _default = router;
exports["default"] = _default;