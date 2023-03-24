import { Router } from  'express';
import {getTicketDetalleCtrl, addDetalleCtrl} from '../controllers/ticket_detalle.controllers'

const router = Router()

//OBTENER TODOS LOS TICKETS
router.get('/auth/tickets/detalle/:id', getTicketDetalleCtrl)

//AGREGO UN DETALLE
router.post('/auth/tickets/detalle/', addDetalleCtrl)


export default router