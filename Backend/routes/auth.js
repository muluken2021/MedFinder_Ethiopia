const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ===== REGISTER PHARMACY =====
router.post('/register', upload.fields([
  { name: 'licenseDocument', maxCount: 1 },
  { name: 'pharmacyImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      pharmacyName, ownerName, email, phone, password,
      city, address = '', licenseNumber, agreeToTerms, mapVerified
    } = req.body;

    // Validation
    if (!pharmacyName || !ownerName || !email || !phone || !password ||
        !city || !licenseNumber || !agreeToTerms || !mapVerified) {
      return res.status(400).json({ message: 'All required fields must be filled and map verified!' });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existing = await Pharmacy.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Create Pharmacy (password will be hashed automatically)
    const pharmacy = new Pharmacy({
      pharmacyName,
      ownerName,
      email: normalizedEmail,
      phone,
      password,   // plain password
      city,
      address,
      licenseNumber,
      licenseDocument: req.files?.licenseDocument?.[0]?.filename || '',
      pharmacyImage: req.files?.pharmacyImage?.[0]?.filename || '',
      agreeToTerms: agreeToTerms === 'true' || agreeToTerms === true,
      mapVerified: mapVerified === 'true' || mapVerified === true
    });

    await pharmacy.save();
   
    res.status(201).json({ message: 'Pharmacy registered successfully! Await admin approval.' });

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ===== LOGIN PHARMACY / ADMIN =====
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    // Admin login
    if (email === process.env.ADMIN_EMAIL?.toLowerCase()) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid admin password" });
      }
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.json({ message: "Admin login successful", token, role: "admin" });
    }

    // Pharmacy login
    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) return res.status(404).json({ message: "Account not found" });

    // Check if approved
    if (pharmacy.status !== 'approved') {
      return res.status(403).json({ message: `Account is ${pharmacy.status}. Contact admin.` });
    }

    const isMatch = await bcrypt.compare(password, pharmacy.password);
    console.log('SAVED PASSWORD HASH:', pharmacy.password); // <-- check the stored hash
    console.log('PASSWORD MATCH:', isMatch);  // should now be true
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: pharmacy._id, role: "pharmacy" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Pharmacy login successful",
      token,
      role: "pharmacy",
      pharmacyName: pharmacy.pharmacyName
    });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
