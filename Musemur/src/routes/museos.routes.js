import { Router } from "express"
import {getMuseosCity, getMuseos, getMuseo, postMuseos} from "../controllers/museos.controllers.js"

const router = Router()

router.get("/museosCity" , getMuseosCity);

router.get("/museosName", getMuseo);

router.get("/museos", getMuseos);

router.post("/museos", postMuseos);

//router.put("/museos", putMuseos);

//router.delete("/museos", deleteMuseos);

export default router