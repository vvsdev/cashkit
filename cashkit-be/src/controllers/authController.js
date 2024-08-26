const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtil');
const { findUserByEmail, findUserByUsername, createUser } = require('../models/userModel');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email already used' });
    }

    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
        return res.status(400).json({ message: 'Username already used' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);

    res.status(200).json({ message: 'User registered successfuly' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
};

module.exports = { register, login };