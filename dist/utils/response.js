"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.response = void 0;

var response = function response(req, res) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var statusCode = arguments.length > 4 ? arguments[4] : undefined;
  console.log(statusCode);
  res.status(statusCode).json({
    message: msg,
    response: data
  });
  return;
};

exports.response = response;