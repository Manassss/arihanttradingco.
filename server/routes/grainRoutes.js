const express = require('express');
const router  = express.Router();
const { getAllGrains, updateGrain, createGrain, deleteGrain } = require('../controllers/grainController');
const authMiddleware = require('../middleware/auth');

router.get('/', getAllGrains);
router.post('/', authMiddleware, createGrain);
router.put('/:id', authMiddleware, updateGrain);
router.delete('/:id', authMiddleware, deleteGrain);

module.exports = router;