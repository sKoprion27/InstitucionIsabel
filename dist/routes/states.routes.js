"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _states = require("./../controllers/states.controller");

var router = (0, _express.Router)();
router.get('/', _states.stateController.getStates);
router.get('/:id', _states.stateController.getOneState);
router.post('/', _states.stateController.postOneState);
router.put('/:id', _states.stateController.updateOneState);
router["delete"]('/:id', _states.stateController.deleteOneState);
var _default = router;
exports["default"] = _default;