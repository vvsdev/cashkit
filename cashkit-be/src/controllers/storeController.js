const { createStore, getStoreByOwner, getStoreById, updateStore, deleteStore } = require('../models/storeModel');

const addStore = async (req, res) => {
    const { storeName, address, receiptFooter } = req.body;
    const { id } = req.user;

    const storeId = await createStore(storeName, address, id, receiptFooter);
    if (!storeId) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    res.status(201).json({ message: 'Data has been successfully saved' });
};

const fetchStoreByOwner = async (req, res) => {
    const { id } = req.user;

    const stores = await getStoreByOwner(id);
    if (!stores) {
        return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ stores });
};

const fetchStoreById = async (req, res) => {
    const { storeId } = req.params;
    const { id } = req.user;

    const store = await getStoreById(storeId, id);
    if (!store) {
        return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ store });
};

const modifyStore = async (req, res) => {
    const { storeId } = req.params;
    const { storeName, address, receiptFooter } = req.body;
    const { id } = req.user;

    const store = await getStoreById(storeId, id);
    if (!store) {
        return res.status(404).json({ message: 'Data not found' });
    }

    const updatedStore = await updateStore(storeId, storeName, address, id, receiptFooter);
    if (updatedStore < 1) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    res.status(200).json({ message: 'Data has been successfully updated' });
};

const removeStore = async (req, res) => {
    const { storeId } = req.params;
    const { id } = req.user;

    const isRemoved = await deleteStore(storeId, id);
    if (!isRemoved) {
        return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data has been successfully deleted' })
}

module.exports = { addStore, fetchStoreByOwner, fetchStoreById, modifyStore, removeStore };