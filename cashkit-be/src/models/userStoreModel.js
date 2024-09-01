const db = require('../configs/db');

const createUserStore = async (userId, storeId, roleId) => {
    const [result] = await db.query('INSERT INTO user_store (user_id, store_id, role_id) VALUES (?, ?, ?)', [userId, storeId, roleId]);
    return result.insertId;
};

module.exports = { createUserStore };