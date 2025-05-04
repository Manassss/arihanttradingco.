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
    res.status(500).json({ message: 'Server error' });
  }
};