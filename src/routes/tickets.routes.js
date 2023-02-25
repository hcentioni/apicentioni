import { Router } from  'express';
import {getTicketsCtrl,addTicketCtrl} from '../controllers/tickets.controllers'

const router = Router()

//OBTENER TODOS LOS TICKETS
router.get('/auth/tickets/search?', getTicketsCtrl )

//AGREGO UN NUEVO TICKETS
router.post('/auth/tickets', addTicketCtrl)

export default router