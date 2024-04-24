import { Router } from "express"
import {getUsuarios} from "../controllers/usuarios.controller.js"

const router = Router()

router.get("/usuarios", getUsuarios);

router.post("/usuarios", getUsuarios);

router.put("/usuarios", getUsuarios);

router.delete("/usuarios", getUsuarios);

export default router