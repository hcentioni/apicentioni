"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ticket_categorias = require("../controllers/ticket_categorias.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS USUARIOS
router.get('/auth/ticket/categorias', _ticket_categorias.getTicketCategoriasCtrl);
var _default = router;
exports["default"] = _default;