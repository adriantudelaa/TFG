import { pool } from "../db.js"

export const getUsuarios = async (req, res) => {
    const [result] = await pool.query("SELECT * from usuarios;")
    res.json(result)
}

export const postUsuariosBasico = async (req, res) => {
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