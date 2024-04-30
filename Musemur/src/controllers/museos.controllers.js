import { pool } from "../db.js";

export const getMuseosCity = async (req, res) =>  {
    const {museum_city} = req.body
    const [result] = await pool.query("SELECT * from museos WHERE museum_city = ?", [museum_city])
    res.status(200).json(result)
}
export const getMuseosImg = async (req, res) => {
    const {museum_name} = req.body
    const [result] = await pool.query("SELECT museum_img from museos WHERE museum_name = ?", [museum_name])
    res.status(200).json(result[0]);
}

export const getMuseos = async (req, res) => {
    const [result] = await pool.query("SELECT * from museos")
    res.status(200).json(result)
}

export const getMuseo = async (req, res) => {
    const {museum_name} = req.body
    const [result] = await pool.query("SELECT * from museos WHERE museum_name = ?", [museum_name])
    res.status(200).json(result)
}

export const postMuseos = async (req, res) => {
    const {museum_name, museum_city, museum_loc, museum_hour, museum_img} = req.body
    const [result] = await pool.query("INSERT INTO museos (id_museo, museum_name, museum_city, museum_loc, museum_hour, museum_img) VALUES (0,?,?,?,?,?)", 
    [museum_name, museum_city, museum_loc, museum_hour, museum_img])
    res.status(201).json({
        message: 'Museo ' + museum_name + ' creado correctamente',
    })
}