const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addStore, fetchStoreByOwner, fetchStoreById, modifyStore, removeStore } = require('../controllers/storeController');

const router = Router();

router.post('/', authMiddleware, addStore);
router.get('/', authMiddleware, fetchStoreByOwner);
router.get('/:storeId', authMiddleware, fetchStoreById);
router.put('/:storeId', authMiddleware, modifyStore);
router.delete('/:storeId', authMiddleware, removeStore);

module.exports = router;