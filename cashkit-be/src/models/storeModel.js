const db = require('../configs/db');

const createStore = async (storeName, address, ownerId, receiptFooter) => {
    const [result] = await db.query('INSERT INTO stores (store_name, address, owner_id, receipt_footer, status, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [storeName, address, ownerId, receiptFooter, 'active', ownerId, ownerId]);
    return result.insertId;
}

const getStoreByOwner = async (ownerId) => {
    const [rows] = await db.query('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
    return rows.length > 0 ? rows : null;
}

const getStoreById = async (storeId, ownerId) => {
    const [rows] = await db.query('SELECT * FROM stores WHERE id = ? AND owner_id = ?', [storeId, ownerId]);
    return rows.length > 0 ? rows[0] : null; 
}

const updateStore = async (storeId, storeName, address, ownerId, receiptFooter) => {
    const [rows] = await db.query('UPDATE stores SET store_name = ?, address = ?, owner_id = ?, receipt_footer = ? WHERE id = ?', [storeName, address, ownerId, receiptFooter, storeId]);
    return rows.affectedRows;
}

const deleteStore = async (storeId, ownerId) => {
    const [rows] = await db.query('DELETE FROM stores WHERE id = ? AND owner_id = ?', [storeId, ownerId]);
    return rows.affectedRows;
}

module.exports = { createStore, getStoreByOwner, getStoreById, updateStore, deleteStore };