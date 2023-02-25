import { Router } from  'express';
import { checkJwt } from '../middleware/session';
import fs from 'fs';

const router = Router()

//middleware
router.use('/auth', checkJwt)




export default router