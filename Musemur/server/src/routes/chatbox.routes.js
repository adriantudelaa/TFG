import { Router } from "express"
import {getChatboxQues} from "../controllers/chatbox.controllers.js"

const router = Router()

router.get("/chatbox", getChatboxQues);

//router.post("/chatbox", postChatbox);

//router.put("/chatbox", putChatbox);

//router.delete("/chatbox", deleteChatbox);

export default router