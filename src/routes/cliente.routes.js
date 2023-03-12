import { Router } from  'express';
import { clienteExisteCtrl } from '../controllers/cliente.controlllers';

const router = Router()

//OBTENER TODOS LOS USUARIOS
router.get('/cliente/existe/search?', clienteExisteCtrl )



export default router