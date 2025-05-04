const Grain = require('../models/Grain');

// GET /api/grains
exports.getAllGrains = async (req, res) => {
  try {
    const grains = await Grain.find().sort('name.en');
    res.json(grains);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/grains
exports.createGrain = async (req, res) => {
  const { name, price, unit } = req.body;
  try {
    const newGrain = new Grain({ name, price, unit });
    await newGrain.save();
    res.status(201).json(newGrain);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create grain' });
  }
};

// PUT /api/grains/:id
exports.updateGrain = async (req, res) => {
  try {
    const { price, unit } = req.body;
    const grain = await Grain.findByIdAndUpdate(
      req.params.id,
      { price, unit, lastUpdated: Date.now() },
      { new: true }
    );
    if (!grain) return res.status(404).json({ message: 'Grain not found' });
    res.json(grain);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update grain' });
  }
};

// DELETE /api/grains/:id
exports.deleteGrain = async (req, res) => {
  try {
    const grain = await Grain.findByIdAndDelete(req.params.id);
    if (!grain) return res.status(404).json({ message: 'Grain not found' });
    res.json({ message: 'Grain deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete grain' });
  }
};