import {pool} from "../db.js"

export const getReservas = async (req, res) => {
    const [result] = await pool.query("SELECT * from reservas;")
    res.json(result[0])
}