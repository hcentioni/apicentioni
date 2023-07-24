import { Router } from  'express';
import { ordenTallerGetCtrl,ordenTallerConsultaWebGetCtrl } from '../controllers/ordenTaller.controllers';

const router = Router()

//OBTENER UNA ORDEN
router.get('/ordentaller/:id', ordenTallerGetCtrl )

//consulta post web
router.post('/ordentaller/web/', ordenTallerConsultaWebGetCtrl )

export default router