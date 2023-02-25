import { Router } from  'express';
import {getTicketEstadosCtrl} from '../controllers/tickets_estados.controllers' 
const router = Router()


//OBTENER TODOS LOS USUARIOS
router.get('/auth/tickets/estados', getTicketEstadosCtrl )


export default router