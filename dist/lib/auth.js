"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _response = require("./../utils/response");

var _index = _interopRequireDefault(require("./../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require('jsonwebtoken'); // Config file


var privateKey = _index["default"].jwt_token.privateKey; // Validate a token

var isValidToken = function isValidToken(_ref) {
  var token = _ref.token;

  try {
    var decodedToken = jwt.verify(token, privateKey);
    return decodedToken;
  } catch (error) {
    return false;
  }
}; // Export auth functions


var auth = {
  createToken: function createToken() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var token = jwt.sign(payload, privateKey, {
      expiresIn: '1d'
    });
    return token;
  },
  verifyToken: function verifyToken(req, res, next) {
    var headers = req.headers,
        body = req.body;
    var _headers$authorizatio = headers.authorization,
        authorization = _headers$authorizatio === void 0 ? undefined : _headers$authorizatio;

    if (!authorization) {
      (0, _response.response)(req, res, 'ERROR', 'token error', 401);
      return;
    }

    var headerToken = authorization.split(' ')[1];
    var decodedToken = isValidToken({
      token: headerToken
    });

    if (!decodedToken) {
      (0, _response.response)(req, res, 'ERROR', 'invalid token', 401);
      return;
    }

    var payload = decodedToken.payload; // We add the id in body for the other middleware functions

    body.id = payload.id; // Next middleware

    next();
  }
};
exports.auth = auth;