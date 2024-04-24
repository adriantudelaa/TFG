import { pool } from "../db.js";

export const getMuseos = async (req, res) => {
    const [result] = await pool.query("SELECT * from museos;")
    res.json(result[0])
}