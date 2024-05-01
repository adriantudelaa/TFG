import { Router } from "express"
import {getAdmin, createAdmin, deleteAdmin} from "../controllers/administradores.controllers.js"

const router = Router()

router.get("/admin", getAdmin);

router.post("/admin", createAdmin);

//router.put("/admin", putAdmin);

router.delete("/admin", deleteAdmin);

export default router