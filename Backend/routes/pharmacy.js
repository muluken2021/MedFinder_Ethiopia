// routes/pharmacy.js
const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();
const bcrypt = require('bcryptjs');

// POST /api/pharmacy/register
router.post('/register', async (req, res) => {
  try {
    const {
      pharmacyName,
      ownerName,
      email,
      phone,
      password,
      city,
      address,
      licenseNumber,
      licenseDocument,
      pharmacyImage,
      agreeToTerms,
      mapVerified
    } = req.body;

    // Validate required fields
    if (!pharmacyName || !ownerName || !email || !phone || !password || !city || !address ||
        !licenseNumber || !licenseDocument || !agreeToTerms || !mapVerified) {
      return res.status(400).json({ message: 'All required fields must be filled and map verified!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const pharmacy = new Pharmacy({
      pharmacyName,
      ownerName,
      email,
      phone,
      password: hashedPassword,
      city,
      address,
      licenseNumber,
      licenseDocument,
      pharmacyImage: pharmacyImage || '',
      agreeToTerms,
      mapVerified
    });

    await pharmacy.save();
    res.status(201).json({ message: 'Pharmacy registered successfully! Await admin approval.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
