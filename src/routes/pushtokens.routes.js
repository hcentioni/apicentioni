import { Router } from  'express';
import { addTokenCtrl, getTokensCtrl } from '../controllers/pushtokens.controllers' 

const router = Router();


//GUARDO UN TOKEN PUSH
router.post('/auth/token', addTokenCtrl)

//NOTIFICACION NUEVO TICKET
router.get('/auth/token/newticket/search?', getTokensCtrl )

export default router