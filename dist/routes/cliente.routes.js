"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cliente = require("../controllers/cliente.controlllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS USUARIOS
router.get('/cliente/existe/search?', _cliente.clienteExisteCtrl);
var _default = router;
exports["default"] = _default;