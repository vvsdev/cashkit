const db = require('../configs/db');

const createStore = async (storeName, address, ownerId, receiptFooter) => {
    await db.query('INSERT INTO stores (store_name, address, owner_id, receipt_footer, status, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [storeName, address, ownerId, receiptFooter, 'active', ownerId, ownerId]);
}

const getStoreByOwner = async (ownerId) => {
    const [rows] = await db.query('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
    return rows.length > 0 ? rows[0] : null;
}

const getStoreById = async (storeId) => {
    const [rows] = await db.query('SELECT * FROM stores WHERE id = ?', [storeId]);
    return rows.length > 0 ? rows[0] : null; 
}

// TODO: updateStore
const updateStore = async (storeId, )

// TODO: deleteStore

module.exports = { createStore, getStoreByOwner, getStoreById, updateStore, deleteStore };