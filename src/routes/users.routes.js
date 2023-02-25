import { Router } from  'express';
import { addUserCtrl, getUsersCtrl, editUserCtrl,deleteUserCtrl,existUserCtrl } from '../controllers/users.controllers' 
const router = Router()

//OBTENER TODOS LOS USUARIOS
router.get('/auth/users/search?', getUsersCtrl )

//VERIFICO SI EXISTE EL LOGIN
router.get('/auth/users/exist/:id', existUserCtrl )

//AGREGO UN NUEVO USUARIO
router.post('/auth/users', addUserCtrl)

//EDITO UN USUARIO
router.put('/auth/users/:id', editUserCtrl)

//ELIMINO UN USUARIO
router.delete('/auth/users/:id', deleteUserCtrl)

export default router