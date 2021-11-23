"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _index = _interopRequireDefault(require("./../config/index"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { response } from './../utils/response'
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
      // response(req, res, 'Token error', null, 500)
      res.sendFile(_path["default"].join(__dirname, '../../frontend/build/index.html'));
      return;
    }

    var headerToken = authorization.split(' ')[1];
    var decodedToken = isValidToken({
      token: headerToken
    });

    if (!decodedToken) {
      // response(req, res, 'Invalid token', null, 500)
      res.sendFile(_path["default"].join(__dirname, '../../frontend/build/index.html'));
      return;
    }

    var payload = decodedToken.payload; // We add the id in body for the other middleware functions

    body.id = payload.id; // Next middleware

    next();
  }
};
exports.auth = auth;