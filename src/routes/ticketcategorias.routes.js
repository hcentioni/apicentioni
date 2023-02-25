import { Router } from  'express';
import {getTicketCategoriasCtrl} from '../controllers/ticket_categorias.controllers' 
const router = Router()


//OBTENER TODOS LOS USUARIOS
router.get('/auth/ticket/categorias', getTicketCategoriasCtrl )


export default router