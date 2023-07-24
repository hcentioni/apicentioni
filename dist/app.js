"use strict";

var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _login = _interopRequireDefault(require("./routes/login.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _users = _interopRequireDefault(require("./routes/users.routes"));
var _tickets = _interopRequireDefault(require("./routes/tickets.routes"));
var _ticketsestados = _interopRequireDefault(require("./routes/ticketsestados.routes"));
var _ticketcategorias = _interopRequireDefault(require("./routes/ticketcategorias.routes"));
var _ticketdetalle = _interopRequireDefault(require("./routes/ticketdetalle.routes"));
var _upload = _interopRequireDefault(require("./routes/upload.routes"));
var _save = _interopRequireDefault(require("./routes/save.routes"));
var _cliente = _interopRequireDefault(require("./routes/cliente.routes"));
var _register = _interopRequireDefault(require("./routes/register.routes"));
var _sendpush = _interopRequireDefault(require("./routes/sendpush.routes"));
var _pushtokens = _interopRequireDefault(require("./routes/pushtokens.routes"));
var _ordenTaller = _interopRequireDefault(require("./routes/ordenTaller.routes"));
var _tecnicos = _interopRequireDefault(require("./routes/tecnicos.routes"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//IMPORTO LAS RUTAS

var PORT = _config["default"].port || 3001;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])(''));
app.use((0, _morgan["default"])('dev'));
app.use(_login["default"], _auth["default"], _tickets["default"], _users["default"], _ticketsestados["default"], _ticketcategorias["default"], _ticketdetalle["default"], _upload["default"], _save["default"], _cliente["default"], _register["default"], _sendpush["default"], _pushtokens["default"], _ordenTaller["default"], _tecnicos["default"]);
app.use(_express["default"]["static"]('./public'));
app.listen(PORT, function () {
  return console.log("Servidor listo en el puerto: ".concat(PORT));
});