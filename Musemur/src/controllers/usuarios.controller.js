import {pool} from "../db.js"

export const getUsuarios = async (req, res) => {
    const [result] = await pool.query("SELECT * from usuarios;")
    res.json(result[0])
}