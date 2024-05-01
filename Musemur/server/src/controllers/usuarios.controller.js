import { pool } from "../db.js";

export const seeUsers = async (req, res) => {
    const [result] = await pool.query("SELECT * from usuarios;");
    res.json(result);
}

export const createUser = async (req, res) => {
    const {user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol } = req.body;
    const [rows] = await pool.query("INSERT INTO usuarios VALUES (0, ?, ?, ?, ?, ?, ?, ?, 0)",
        [user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd]);
    res.send({
        user_first_name,
        user_surname,
        username,
        user_phone,
        user_email,
        user_dni,
        user_pswrd
    });
}

export const updateUserData = async (req, res) => {
    const { user_first_name, user_surname, username, user_phone, user_email } = req.body;
    const [rows] = await pool.query("UPDATE usuarios SET user_first_name = ?, user_surname = ?, username = ?, user_phone = ?, user_email = ? WHERE user_email = ?",
        [user_first_name, user_surname, username, user_phone, user_email]);
    res.send({
        user_first_name,
        user_surname,
        username,
        user_phone,
        user_email
    });
}

export const updateUserPswrd = async (req, res) => {
    const { user_pswrd, user_email } = req.body;
    const [rows] = await pool.query("UPDATE usuarios SET user_pswrd = ? WHERE user_email = ?",
        [user_pswrd, user_email]);
    res.status.json({
        message: 'Contraseña actualizada correctamente'
    });
}

export const deleteUser = async (req, res) => {
    const { username } = req.body;
    const [rows] = await pool.query("DELETE FROM usuarios WHERE username = ? AND user_rol = 0",
        [username]);

        const [users] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);

        const user = users[0];

        if (user.user_rol === 1) {
            return res.status(401).json({ message: 'No puedes eliminar un usuario administrador' });
        }
        if (rows.affectedRows === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        
        res.status(200).json({
        message: 'Usuario ' + username + ' eliminado'
    });
}

export const loginUser = async (req, res) => {
    const { user_email, user_pswrd } = req.body;

    try {
        if (!user_email || !user_pswrd) {
            return res.status(400).json({ message: 'Se requiere usuario y contraseña' });
        }

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user_email = ?', [user_email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario inexistente' });
        }

        const user = rows[0];

        if (user.user_pswrd !== user_pswrd) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Iniciado sesión como '+[user.username]});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

