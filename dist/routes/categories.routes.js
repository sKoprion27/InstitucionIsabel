"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _categories = require("./../controllers/categories.controller");

var router = (0, _express.Router)();
router.get('/', _categories.categoryController.getAll);
router.get('/:id', _categories.categoryController.getOne);
router.post('/', _categories.categoryController.postOne);
router.put('/:id', _categories.categoryController.updateOne);
router["delete"]('/:id', _categories.categoryController.deleteOne);
var _default = router;
exports["default"] = _default;