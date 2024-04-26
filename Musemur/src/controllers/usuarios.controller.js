import { pool } from "../db.js"

export const getUsuarios = async (req, res) => {
    const [result] = await pool.query("SELECT * from usuarios;")
    res.json(result)
}

export const postUsuarios = async (req, res) => {
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

export const putUsuarios = async (req, res) => {
    const { nom_usu, ape_usu, dni_usu, contraseña } = req.body
    const [rows] = await pool.query("UPDATE usuarios SET nom_usu = ?, ape_usu = ?, dni_usu = ?, contraseña = ? WHERE dni_usu = ?",
        [nom_usu, ape_usu, dni_usu, contraseña, dni_usu])
    res.send({
        nom_usu,
        ape_usu,
        dni_usu,
        contraseña,
    })
}

export const deleteUsuarios = async (req, res) => {
    const { dni_usu } = req.body
    const [rows] = await pool.query("DELETE FROM usuarios WHERE dni_usu = ?",
        [dni_usu])
    res.send({
        dni_usu
    })
}

export const loginUser = async (req, res) => {
    const { email_usu, contraseña } = req.body
    const [result] = await pool.query("SELECT * from usuarios WHERE email_usu = ? AND contraseña = ?",
        [email_usu, contraseña])
    res.json(result)
}
