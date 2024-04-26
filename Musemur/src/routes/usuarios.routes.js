import { Router } from "express"
import {getUsuarios} from "../controllers/usuarios.controller.js"
import {postUsuarios} from "../controllers/usuarios.controller.js"
import {putUsuarios} from "../controllers/usuarios.controller.js"
import {deleteUsuarios} from "../controllers/usuarios.controller.js"
import {loginUser} from "../controllers/usuarios.controller.js"

const router = Router()

router.get("/usuarios", getUsuarios);

router.post("/usuarios", postUsuarios);

router.put("/usuarios", putUsuarios);

router.delete("/usuarios", deleteUsuarios);

router.post('/login', loginUser);

export default router