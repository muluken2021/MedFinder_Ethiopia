// routes/adminPharmacy.js
const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();

// GET all pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT approve pharmacy
router.put('/:id/approve', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(pharmacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT block pharmacy
router.put('/:id/block', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, { status: 'blocked' }, { new: true });
    res.json(pharmacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE pharmacy
router.delete('/:id', async (req, res) => {
  try {
    await Pharmacy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pharmacy deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
