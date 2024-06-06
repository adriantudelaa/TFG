import jwt from 'jsonwebtoken';
import { pool } from "../db.js";
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const seeUsers = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from usuarios;");
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const createUser = async (req, res) => {
    const { user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol } = req.body;
    
    if (!user_first_name || !user_surname || !username || !user_phone || !user_email || !user_dni || !user_pswrd) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(user_pswrd)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.' });
    }

    try {
        // Verificar si el nombre de usuario ya existe
        const [existingUsername] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
        if (existingUsername.length > 0) {
            return res.status(409).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Verificar si el DNI ya existe
        const [existingDni] = await pool.query("SELECT * FROM usuarios WHERE user_dni = ?", [user_dni]);
        if (existingDni.length > 0) {
            return res.status(409).json({ message: 'El DNI ya está en uso.' });
        }

        const [rows] = await pool.query("INSERT INTO usuarios (user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol]);
        res.status(201).json({
            user_first_name,
            user_surname,
            username,
            user_phone,
            user_email,
            user_dni,
            user_pswrd,
            user_rol
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

export const createAdmin = async (req, res) => {
    const { user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, id_museo } = req.body;
    
    if (!user_first_name || !user_surname || !username || !user_phone || !user_email || !user_dni || !user_pswrd || !id_museo) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(user_pswrd)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.' });
    }

    try {
        // Verificar si el nombre de usuario ya existe
        const [existingUsername] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
        if (existingUsername.length > 0) {
            return res.status(409).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Verificar si el DNI ya existe
        const [existingDni] = await pool.query("SELECT * FROM usuarios WHERE user_dni = ?", [user_dni]);
        if (existingDni.length > 0) {
            return res.status(409).json({ message: 'El DNI ya está en uso.' });
        }

        const user_rol = 1; // Asignar rol de administrador

        const [rows] = await pool.query("INSERT INTO usuarios (user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [user_first_name, user_surname, username, user_phone, user_email, user_dni, user_pswrd, user_rol]);

        const id_user = rows.insertId;

        // Asignar el usuario al museo
        await pool.query("UPDATE museos SET id_admin = ? WHERE id_museo = ?", [id_user, id_museo]);

        res.status(201).json({
            message: 'Administrador registrado exitosamente',
            user_first_name,
            user_surname,
            username,
            user_phone,
            user_email,
            user_dni,
            user_pswrd,
            user_rol,
            id_museo
        });
    } catch (error) {
        console.error('Error al crear administrador:', error);
        res.status(500).json({ message: 'Error al crear administrador' });
    }
};


export const updateUserData = async (req, res) => {
    const { user_first_name, user_surname, user_email, user_dni } = req.body;
    const userId = req.userId; // Asegúrate de que este ID se obtiene correctamente del middleware de autenticación

    if (!user_first_name || !user_surname || !user_email || !user_dni) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const [rows] = await pool.query("UPDATE usuarios SET user_first_name = ?, user_surname = ?, user_email = ?, user_dni = ? WHERE id_user = ?",
            [user_first_name, user_surname, user_email, user_dni, userId]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            user_first_name,
            user_surname,
            user_email,
            user_dni
        });
    } catch (error) {
        console.error('Error al actualizar datos del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar datos del usuario' });
    }
};

export const updateUserPswrd = async (req, res) => {
    const { user_email, current_pswrd, new_pswrd } = req.body;
    
    if (!user_email || !current_pswrd || !new_pswrd) {
        return res.status(400).json({ message: 'Se requiere usuario, contraseña actual y nueva contraseña' });
    }

    try {
        // Verificar si la contraseña actual es correcta
        const [user] = await pool.query('SELECT user_pswrd FROM usuarios WHERE user_email = ?', [user_email]);

        if (user.length === 0 || user[0].user_pswrd !== current_pswrd) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        // Actualizar la contraseña
        const [rows] = await pool.query("UPDATE usuarios SET user_pswrd = ? WHERE user_email = ?", [new_pswrd, user_email]);
        
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({
            message: 'Contraseña actualizada correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar contraseña' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.userId; // Obtén el ID del usuario autenticado desde el token

    if (!userId) {
        return res.status(400).json({ message: 'ID de usuario no proporcionado' });
    }

    try {
        // Verificar si el usuario existe
        const [userRows] = await pool.query("SELECT * FROM usuarios WHERE id_user = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        const [rows] = await pool.query("DELETE FROM usuarios WHERE id_user = ?", [userId]);

        if (rows.affectedRows === 0) {
            return res.status(500).json({ message: 'Error al eliminar el usuario' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

export const loginUser = async (req, res) => {
    const { user_email, user_pswrd } = req.body;

    if (!user_email || !user_pswrd) {
        return res.status(400).json({ message: 'Se requiere usuario y contraseña' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user_email = ?', [user_email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario inexistente' });
        }

        const user = rows[0];

        if (user.user_pswrd !== user_pswrd) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id_user, username: user.username, role: user.user_rol },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({ token, userName: user.user_first_name, message: 'Iniciado sesión como ' + user.username });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const loginAdmin = async (req, res) => {
    const { user_dni, user_pswrd } = req.body;

    if (!user_dni || !user_pswrd) {
        return res.status(400).json({ message: 'Se requiere DNI y contraseña' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user_dni = ?', [user_dni]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario inexistente' });
        }

        const user = rows[0];

        if (user.user_pswrd !== user_pswrd) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if (!user.user_rol) {
            return res.status(403).json({ message: 'Acceso denegado: no es administrador' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id_user, username: user.username, role: user.user_rol },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({ token, message: 'Iniciado sesión como administrador ' + user.username });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const resetPassword = async (req, res) => {
    const { user_email, user_dni, new_password } = req.body;

    if (!user_email || !user_dni || !new_password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user_email = ? AND user_dni = ?', [user_email, user_dni]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const [result] = await pool.query('UPDATE usuarios SET user_pswrd = ? WHERE user_email = ? AND user_dni = ?', [new_password, user_email, user_dni]);

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Error al actualizar la contraseña' });
        }

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const verifyAdminDni = async (req, res) => {
    const { user_dni } = req.body;

    if (!user_dni) {
        return res.status(400).json({ message: 'Se requiere DNI' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user_dni = ? AND user_rol = 1', [user_dni]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'DNI no corresponde a un administrador' });
        }

        res.status(200).json({ message: 'DNI válido' });
    } catch (error) {
        console.error('Error al verificar DNI de administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId; // Asegúrate de que este ID se obtiene correctamente del middleware de autenticación

    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_user = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};

export const getAdminProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_user = ?', [decoded.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        const user = rows[0];
        res.json(user);
    } catch (error) {
        console.error('Error al obtener el perfil del administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
