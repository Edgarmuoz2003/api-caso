import { Router } from "express";
import { 
    storeUser,
    getUsuario 

} from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/registrar', getUsuario);
router.post('/registrar', storeUser);

export default router
