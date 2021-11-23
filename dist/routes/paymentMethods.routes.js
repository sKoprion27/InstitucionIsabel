"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _paymentMethods = require("./../controllers/paymentMethods.controller");

var router = (0, _express.Router)();
router.get('/', _paymentMethods.paymentMethodController.getPaymentMethods);
router.get('/:id', _paymentMethods.paymentMethodController.getOnePaymentMethod);
router.post('/', _paymentMethods.paymentMethodController.postOnePaymentMethod);
router.put('/:id', _paymentMethods.paymentMethodController.updateOnePaymentMethod);
router["delete"]('/:id', _paymentMethods.paymentMethodController.deleteOnePaymentMethod);
var _default = router;
exports["default"] = _default;