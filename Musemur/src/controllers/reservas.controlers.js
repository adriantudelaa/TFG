import { pool } from "../db.js"

export const getReservas = async (req, res) => {
    const [result] = await pool.query("SELECT * from reservas;")
    res.json(result[0])
}

export const getReservasByUser = async (req, res) => {
    const { id_user } = req.body;
    const [result] = await pool.query("SELECT * from reservas where id_user = ?;", { id_user })
    res.json(result[0])
}

export const postReservas = async (req, res) => {
    const { reserva_museum, reserva_name, reserva_date, reserva_hour, reserva_people } = req.body
    const [rows] = await pool.query("INSERT INTO reservas (reserva_museum, reserva_name, reserva_date, reserva_hour, reserva_people) VALUES (?, ?, ?, ?, ?)",
        [reserva_museum, reserva_name, reserva_date, reserva_hour, reserva_people])
    res.send({
        nom_usu,
        ape_usu,
        dni_usu,
        contraseña,
    })
}

export const putReservas = async (req, res) => {
    const { reserva_museum, reserva_name, reserva_date, reserva_hour, reserva_people } = req.body
    const [rows] = await pool.query("UPDATE reservas SET reserva_museum = ?, reserva_name = ?, reserva_date = ?, reserva_hour = ?, reserva_people = ? WHERE reserva_name = ?",
        [reserva_museum, reserva_name, reserva_date, reserva_hour, reserva_people, reserva_name])
    res.json(rows)
}

export const deleteReservas = async (req, res) => {
    const { reserva_name } = req.body
    const [rows] = await pool.query("DELETE FROM reservas WHERE reserva_name = ?", [reserva_name])
    res.json(rows)
}
