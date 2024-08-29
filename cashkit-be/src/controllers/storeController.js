const { createStore, getStoreByOwner, getStoreById, updateStore, deleteStore } = require('../models/storeModel');

const addStore = async (req, res) => {
    const { storeName, address, receiptFooter } = req.body;
    const user = req.user;

    const storeId = await createStore(storeName, address, user.id, receiptFooter);
    if (!storeId) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    const store = await getStoreById(storeId, user.id);
    res.status(200).json({ store });
};

const fetchStoreByOwner = async (req, res) => {
    const user = req.user;

    const stores = await getStoreByOwner(user.id);
    if (!stores) {
        return res.status(404).json({ message: 'No store with this owner' });
    }

    res.status(200).json({ stores });
};

const fetchStoreById = async (req, res) => {
    const { storeId } = req.params;
    const user = req.user;

    const store = await getStoreById(storeId, user.id);
    if (!store) {
        return res.status(404).json({ message: 'No store with this id' });
    }

    res.status(200).json({ store });
}

const modifyStore = async (req, res) => {
    const { storeId } = req.params;
}

module.exports = { addStore, fetchStoreByOwner, fetchStoreById, modifyStore };