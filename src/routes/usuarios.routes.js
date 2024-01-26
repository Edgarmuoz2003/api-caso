import { Router } from "express";
import { 
    storeUser,
    authUser

} from '../controllers/usuarios.controller.js'

const router = Router()

router.post('/registrar', storeUser);
router.post('/autenticar', authUser);

export default router
