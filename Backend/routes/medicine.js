const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const Pharmacy = require('../models/Pharmacy');
const authMiddleware = require('../middleware/auth'); // JWT auth middleware

// Add a new medicine (Pharmacy only)
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { name, category, price, quantity, expiryDate, status } = req.body;
    
    if (req.user.role !== 'pharmacy') {
      return res.status(403).json({ message: 'Only pharmacies can add medicines' });
    }

    if (!name || !category || !price || !quantity || !expiryDate) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const medicine = new Medicine({
      pharmacy: req.user.id,
      name,
      category,
      price,
      quantity,
      expiryDate,
      status: status || 'available'
    });

    await medicine.save();
    res.status(201).json({ message: 'Medicine added successfully', medicine });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all medicines for the logged-in pharmacy
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'pharmacy') {
      return res.status(403).json({ message: 'Only pharmacies can view their medicines' });
    }

    const medicines = await Medicine.find({ pharmacy: req.user.id });
    res.json(medicines);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a medicine (Pharmacy only)
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    if (req.user.role !== 'pharmacy' || medicine.pharmacy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this medicine' });
    }

    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Medicine updated successfully', medicine: updated });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a medicine (Pharmacy only)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    if (req.user.role !== 'pharmacy' || medicine.pharmacy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this medicine' });
    }

    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
