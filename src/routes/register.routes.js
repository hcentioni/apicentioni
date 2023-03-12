import { Router } from  'express';
import { addUserCtrl,existUserCtrl } from '../controllers/register.controllers' 

const router = Router()



//VERIFICO SI EXISTE EL LOGIN
router.get('/register/exist/:id', existUserCtrl )

//AGREGO UN NUEVO USUARIO
router.post('/register/', addUserCtrl)



export default router