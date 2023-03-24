import { Router } from  'express';
import {loginCtrl, loginOperadoresCtrl}from '../controllers/auth.controllers'

const router = Router()

router.post('/login', loginCtrl)

router.post('/operador/login', loginOperadoresCtrl)

export default router