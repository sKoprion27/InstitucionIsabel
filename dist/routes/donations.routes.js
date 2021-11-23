"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = require("../lib/multer");

var _donations = require("../middlewares/donations.middleware");

var _donations2 = require("./../controllers/donations.controller");

var router = (0, _express.Router)();
router.get('/?', _donations2.donationController.getDonations);
router.get('/:id', _donations2.donationController.getOneDonation);
router.post('/', _multer.multerUploadImage, _donations.donationMiddleware.addImageBody, _donations2.donationController.postOneDonation);
router.put('/:id', _multer.multerUploadImage, _donations.donationMiddleware.addImageBody, _donations2.donationController.updateOneDonation);
router.put('/:id/invoices', _donations2.donationController.updateOneDonationInvoce);
router["delete"]('/:id', _donations2.donationController.deleteOneDonation);
router["delete"]('/:id/photos', _donations2.donationController.deletePhotos);
var _default = router;
exports["default"] = _default;