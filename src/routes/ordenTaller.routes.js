import { Router } from  'express';
import { ordenTallerGetCtrl } from '../controllers/ordenTaller.controllers';

const router = Router()

//OBTENER UNA ORDEN
router.get('/ordentaller/:id', ordenTallerGetCtrl )



export default router