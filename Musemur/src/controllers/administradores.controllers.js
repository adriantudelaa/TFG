import { pool } from "../db.js"

export const getAdmin = async (req, res) => {
    const [result] = await pool.query("SELECT * from admin;")
    res.json(result[0])
}

export const createAdmin = async (req, res) => {
    const { user_dni, museum_name } = req.body
    const [user] = await pool.query("SELECT * FROM usuarios WHERE user_dni = ? ", [user_dni])
    const user_res = user[0]
    if (user_res.user_rol === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const [museum] = await pool.query("SELECT * FROM museos WHERE museum_name = ?", [museum_name])
    const museum_id = museum[0].id_museo
    try {
        if (museum_id.length === 0) {
            return res.status(401).json({ message: 'Museo no encontrado' });
        }

        const [rows] = await pool.query("INSERT INTO admin VALUES (?,?)", [user_res.id_user, museum_id])
        res.status(201).json({
            message: 'Administrador ' + user_res.username + ' creado correctamente en el museo ' + museum_name,
        })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(401).json({ message: 'El usuario ya es administrador de este museo' });
        }
        res.status(500).json({ message: 'Error al crear el administrador' });
    }
}

export const deleteAdmin = async (req, res) => {
    const { user_dni, museum_name } = req.body
    const [user] = await pool.query("SELECT * FROM usuarios WHERE user_dni = ? ", [user_dni])
    const user_res = user[0]
    if (user_res.user_rol === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const [museum] = await pool.query("SELECT * FROM museos WHERE museum_name = ?", [museum_name])
    const museum_id = museum[0].id_museo
    try {
        if (museum_id.length === 0) {
            return res.status(401).json({ message: 'Museo no encontrado' });
        }

        const [rows] = await pool.query("DELETE FROM admin WHERE id_admin = ? AND id_museo = ?", [user_res.id_user, museum_id])
        res.status(201).json({
            message: 'Administrador ' + user_res.username + ' eliminado correctamente del museo ' + museum_name,
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el administrador' });
    }
}