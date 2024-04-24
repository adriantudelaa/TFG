import { pool } from "../db.js"

export const getChatbox = async (req, res) => {
    const [result] = await pool.query("SELECT * from chatbox;")
    res.json(result[0])
}