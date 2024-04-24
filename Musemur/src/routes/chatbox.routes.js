import { Router } from "express"
import {getChatbox} from "../controllers/chatbox.controllers.js"

const router = Router()

router.get("/chatbox", getChatbox);

router.post("/chatbox", getChatbox);

router.put("/chatbox", getChatbox);

router.delete("/chatbox", getChatbox);

export default router