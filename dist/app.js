"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _index = require("./routes/index");

var _cloudinary = require("./lib/cloudinary");

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireWildcard(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
var PORT = _config["default"].PORT;
app.disable('etag'); // Middlewares de configuracion inicial

app.use((0, _cors["default"])()); // Una configuracion de seguridad entre headers

app.use((0, _express.json)()); // Parsea lo que llega al servidor en formato json

app.use((0, _cookieParser["default"])()); // Generar el rastero de las cookies

app.use((0, _morgan["default"])('dev')); // Muestra en consola la url, tiempo y status solicitado

app.use('*', _cloudinary.cloudinaryConfig); // Configuración global para uso de cloudinary

if (_config.MODE === 'PRODUCTION') {
  // server static content
  // npm run build
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../frontend/build')));
}

console.log(_path["default"].join(__dirname, '../frontend/build'));
app.get('/', function (req, res) {
  console.log('Esto es una prueba');
  res.json({
    menssge: 'Bien 😀'
  });
});
(0, _index.initRoutes)(app); // Inicializa todas las rutas de la APP

module.exports = {
  app: app,
  PORT: PORT
};