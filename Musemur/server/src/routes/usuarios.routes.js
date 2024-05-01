import { Router } from "express"
import {
seeUsers,
createUser,
updateUserData,
updateUserPswrd,
deleteUser,
loginUser
} from "../controllers/usuarios.controller.js";

const router = Router()

router.get("/usuarios", seeUsers);

router.post("/usuarios", createUser);

router.put("/usuariosData", updateUserData);

router.put("/usuariosPswrd", updateUserPswrd);

router.delete("/usuarios", deleteUser);

router.post('/login', loginUser);
export default router