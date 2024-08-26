const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/all', authMiddleware, (req, res) => {
    res.json({ message: 'berhasil' });
});

module.exports = router;