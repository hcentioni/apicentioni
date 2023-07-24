"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tickets_estados = require("../controllers/tickets_estados.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS USUARIOS
router.get('/auth/tickets/estados', _tickets_estados.getTicketEstadosCtrl);
var _default = router;
exports["default"] = _default;