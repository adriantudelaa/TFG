import { Router } from "express"
import {getMuseos} from "../controllers/museos.controllers.js"

const router = Router()

router.get("/museos", getMuseos);

router.post("/museos", postMuseos);

router.put("/museos", putMuseos);

router.delete("/museos", deleteMuseos);

export default router