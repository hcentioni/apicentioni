"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ticket_detalle = require("../controllers/ticket_detalle.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS TICKETS
router.get('/auth/tickets/detalle/:id', _ticket_detalle.getTicketDetalleCtrl);

//AGREGO UN DETALLE
router.post('/auth/tickets/detalle/', _ticket_detalle.addDetalleCtrl);
var _default = router;
exports["default"] = _default;