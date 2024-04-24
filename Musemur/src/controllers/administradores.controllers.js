import {pool} from "../db.js"

export const getAdmin = async (req, res) => {
    const [result] = await pool.query("SELECT * from admin;")
    res.json(result[0])
}