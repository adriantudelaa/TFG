import { Router } from "express"
import {getAdmin} from "../controllers/administradores.controllers.js"

const router = Router()

router.get("/admin", getAdmin);

router.post("/admin", getAdmin);

router.put("/admin", getAdmin);

router.delete("/admin", getAdmin);

export default router