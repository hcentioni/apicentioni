import { Router } from  'express';
import {tecnicosGetCtrl} from '../controllers/tecnicos.controllers'

const router = Router()

//OBTENER TODOS LOS TECNICOS
router.get('/auth/tecnicos/search?', tecnicosGetCtrl )



export default router
