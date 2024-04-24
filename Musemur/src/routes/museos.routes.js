import { Router } from "express"
import {getMuseos} from "../controllers/museos.controllers.js"

const router = Router()

router.get("/museos", getMuseos);

router.post("/museos", getMuseos);

router.put("/museos", getMuseos);

router.delete("/museos", getMuseos);

export default router