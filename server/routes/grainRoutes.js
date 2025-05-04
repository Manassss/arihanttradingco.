const express = require('express');
const router = express.Router();
const { getAllGrains, updateGrain, createGrain, deleteGrain } = require('../controllers/grainController');
const authMiddleware = require('../middleware/auth');

// Route to get all grains
router.get('/', getAllGrains);

// Route to create a new grain (protected by auth middleware)
router.post('/', authMiddleware, createGrain);

// Route to update a specific grain by ID (protected by auth middleware)
router.put('/:id', authMiddleware, updateGrain);

// Route to delete a specific grain by ID (protected by auth middleware)
router.delete('/:id', authMiddleware, deleteGrain);

module.exports = router;