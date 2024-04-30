import { pool } from "../db.js"

export const getChatboxQues = async (req, res) => {
    const [result] = await pool.query("SELECT cb_que from chatbox;")
    res.json(question)
}

export const getChatboxByQues = async (req, res) => {
    const {id_que} = req.body;
    const [question] = await pool.query("SELECT * from chatbox where id_que = ?;", {id_que})
    const result = question[0];
    return res.status(201).json({ message: result.cb_res });
}

export const getChatboxByMuseum = async (req, res) => {
    const {id_museo} = req.body;
    const [question] = await pool.query("SELECT cb_que from chatbox where id_museo = ?;", {id_museo})
    const result = question[0];
    return res.status(201).json({ message: result.cb_res });
}

export const postChatbox = async (req, res) => {
    const { cb_que, cb_res, reserva_museum } = req.body
    const [rows] = await pool.query("INSERT INTO chatbox (cb_que, cb_res, reserva_museum) VALUES (?, ?, ?)",
        [cb_que, cb_res, reserva_museum])
        res.status(201).json({
            message: 'Pregunta insertada correctamente /nPregunta: ' + cb_que + ' /n Respuesta: ' + cb_res + ' /n Museo: ' + reserva_museum
        })
}

export const putChatbox = async (req, res) => {
    const { cb_que, cb_res, id_museo } = req.body
    const [rows] = await pool.query("UPDATE chatbox SET cb_que = ?, cb_res = ?, id_museo = ? WHERE id_que = ?",
        [cb_que, cb_res, id_museo, id_que])
    res.json(rows)
}

export const deleteChatbox = async (req, res) => {
    const { id_que } = req.body
    const [rows] = await pool.query("DELETE FROM chatbox WHERE id_que = ?", [id_que])
    res.json(rows)
}