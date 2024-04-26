import { Router } from "express"
import {
getUsuarios,
postUsuarios,
putUsuarios,
deleteUsuarios,
loginUser,
requestPasswordReset,
resetPassword
} from "../controllers/usuarios.controller.js";

const router = Router()

router.get("/usuarios", getUsuarios);

router.post("/usuarios", postUsuarios);

router.put("/usuarios", putUsuarios);

router.delete("/usuarios", deleteUsuarios);

router.post('/login', loginUser);

router.post('/request-password-reset', requestPasswordReset);

router.post('/reset-password', resetPassword);
export default router