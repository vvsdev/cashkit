const db = require('../configs/db');

const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] : null;
};

const createUser = async (username, email, hashedPassword) => {
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};

module.exports = { findUserByEmail, findUserByUsername, createUser };