const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addStore, fetchStoreByOwner, fetchStoreById } = require('../controllers/storeController');

const router = Router();

router.post('/add', authMiddleware, addStore);
router.get('/byowner', authMiddleware, fetchStoreByOwner);
router.get('/bystoreid/:storeId', authMiddleware, fetchStoreById);

module.exports = router;