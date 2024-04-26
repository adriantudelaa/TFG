import { Router } from "express"
import {getAdmin} from "../controllers/administradores.controllers.js"

const router = Router()

router.get("/admin", getAdmin);

router.post("/admin", postAdmin);

router.put("/admin", putAdmin);

router.delete("/admin", deleteAdmin);

export default router