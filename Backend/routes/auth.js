const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register (Pharmacy registration)
router.post('/register', async (req, res) => {
  try {
    const {
      pharmacyName, ownerName, email, phone, password,
      city, address, licenseNumber, licenseDocument,
      pharmacyImage, agreeToTerms, mapVerified
    } = req.body;

    if (!pharmacyName || !ownerName || !email || !phone || !password || !city || !address ||
        !licenseNumber || !licenseDocument || !agreeToTerms || !mapVerified) {
      return res.status(400).json({ message: 'All required fields must be filled and map verified!' });
    }

    const existing = await Pharmacy.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

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

// POST /api/auth/login (Pharmacy & Admin login)
router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    if (userType === 'admin') {
      // Admin credentials from env
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, role: 'admin' });
      } else {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }
    }

    if (userType === 'pharmacy') {
      const pharmacy = await Pharmacy.findOne({ email });
      if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });

      const isMatch = await bcrypt.compare(password, pharmacy.password);
      if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

      const token = jwt.sign({ id: pharmacy._id, role: 'pharmacy' }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, role: 'pharmacy', pharmacy });
    }

    res.status(400).json({ message: 'Invalid user type' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
