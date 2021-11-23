"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _cfdis = require("./../controllers/cfdis.controller");

var router = (0, _express.Router)();
router.get('/', _cfdis.cfdiController.getCfdis);
router.get('/:id', _cfdis.cfdiController.getOneCfdi);
router.post('/', _cfdis.cfdiController.postOneCfdi);
router.put('/:id', _cfdis.cfdiController.updateOneCfdi);
router["delete"]('/:id', _cfdis.cfdiController.deleteOneCfdi);
var _default = router;
exports["default"] = _default;