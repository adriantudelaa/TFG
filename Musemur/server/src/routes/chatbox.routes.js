import { Router } from "express"
import {getChatbox} from "../controllers/chatbox.controllers.js"

const router = Router()

router.get("/chatbox", getChatbox);

//router.post("/chatbox", postChatbox);

//router.put("/chatbox", putChatbox);

//router.delete("/chatbox", deleteChatbox);

export default router