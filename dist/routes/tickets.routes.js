"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tickets = require("../controllers/tickets.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS TICKETS
router.get('/auth/tickets/search?', _tickets.getTicketsCtrl);

//AGREGO UN NUEVO TICKETS
router.post('/auth/tickets', _tickets.addTicketCtrl);

//TOMAR UN TICKET
router.post('/auth/tickets/take', _tickets.takeTicketCtrl);

//UPDATE ESTADO Y PRIORIDAD TICKET
router.put('/auth/tickets/estado', _tickets.cambiarEstadoTicketCtrl);

//CERRAR UN TICKET
router.put('/auth/tickets/closed/', _tickets.ticketCerrarCtrl);

//COMENTAR UN TICKET
router.post('/auth/tickets/comentario/', _tickets.addComentarioTicketCtrl);

//OBTENER TODOS LOS COMENTARIOS DEL TICKETS
router.get('/auth/tickets/comentarios/:id', _tickets.comentariosGetCtrl);

//CANELAR UN TICKET
router.post('/auth/tickets/cancelar/', _tickets.cancelarTicketCtrl);

//CERRAR UN TICKET
router.post('/auth/tickets/finalizar/', _tickets.finalizarTicketCtrl);

//OBTENER LOS CONTADORES DEL TICKETS
router.get('/auth/tickets/contadores', _tickets.contadorTicketGetCtrl);
var _default = router;
exports["default"] = _default;