import { Router } from  'express';
import {getTicketsCtrl,addTicketCtrl,takeTicketCtrl,cambiarEstadoTicketCtrl,ticketCerrarCtrl,
    addComentarioTicketCtrl,comentariosGetCtrl,cancelarTicketCtrl,finalizarTicketCtrl
,contadorTicketGetCtrl} from '../controllers/tickets.controllers'

const router = Router()

//OBTENER TODOS LOS TICKETS
router.get('/auth/tickets/search?', getTicketsCtrl )

//AGREGO UN NUEVO TICKETS
router.post('/auth/tickets', addTicketCtrl)

//TOMAR UN TICKET
router.post('/auth/tickets/take', takeTicketCtrl)

//UPDATE ESTADO Y PRIORIDAD TICKET
router.put('/auth/tickets/estado', cambiarEstadoTicketCtrl)

//CERRAR UN TICKET
router.put('/auth/tickets/closed/', ticketCerrarCtrl)

//COMENTAR UN TICKET
router.post('/auth/tickets/comentario/', addComentarioTicketCtrl)

//OBTENER TODOS LOS COMENTARIOS DEL TICKETS
router.get('/auth/tickets/comentarios/:id', comentariosGetCtrl )

//CANELAR UN TICKET
router.post('/auth/tickets/cancelar/', cancelarTicketCtrl)

//CERRAR UN TICKET
router.post('/auth/tickets/finalizar/', finalizarTicketCtrl)

//OBTENER LOS CONTADORES DEL TICKETS
router.get('/auth/tickets/contadores', contadorTicketGetCtrl )

export default router