"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _donors = require("./../controllers/donors.controller");

var router = (0, _express.Router)();
router.get('/', _donors.donorController.getDonors);
router.get('/:id', _donors.donorController.getOneDonor);
router.post('/', _donors.donorController.postOneDonor);
router.put('/:id', _donors.donorController.updateOneDonor);
router["delete"]('/:id', _donors.donorController.deleteOneDonor);
var _default = router;
exports["default"] = _default;