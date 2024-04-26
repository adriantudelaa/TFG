import { pool } from "../db.js"
import { sendResetEmail } from "../utils/email.js"

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
    const { email_usu, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email_usu = ? AND password = ?', [email_usu, password]);

    if (rows.length > 0) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

export const requestPasswordReset = async (req, res) => {
    const { email_usu } = req.body;
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email_usu = ?', [email_usu]);

    if (rows.length > 0) {
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000;

        const [updateResult] = await pool.query('UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email_usu = ?', [token, Date.now() + 3600000, email_usu]);

        // Send reset email_usu
        await sendResetEmail(email_usu, token);

        res.status(200).json({ message: 'Password reset email_usu sent' });
    } else {
        res.status(404).json({ message: 'email_usu not found' });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE resetPasswordToken = ? AND resetPasswordExpires > ?', [token, Date.now()]);

    if (rows.length > 0) {
        const [updateResult] = await pool.query('UPDATE usuarios SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE resetPasswordToken = ?', [newPassword, token]);
        res.status(200).json({ message: 'Password has been reset' });
    } else {
        res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }
};
