import {pool} from "../db.js"

export const getReservas = async (req, res) => {
    const [result] = await pool.query("SELECT * from reservas;")
    res.json(result[0])
}

export const postReservas = async (req, res) => {
    const { nom_usu, ape_usu, dni_usu, contraseña } = req.body
    const [rows] = await pool.query("INSERT INTO usuarios (nom_usu, ape_usu, dni_usu, contraseña) VALUES (?, ?, ?, ?)",
        [nom_usu, ape_usu, dni_usu, contraseña])
    res.send({
        nom_usu,
        ape_usu,
        dni_usu,
        contraseña,
    })
}