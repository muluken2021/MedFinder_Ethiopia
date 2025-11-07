// models/Pharmacy.js
const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  pharmacyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  licenseDocument: { type: String, required: true },
  pharmacyImage: { type: String, default: '' }, // optional
  agreeToTerms: { type: Boolean, required: true },
  mapVerified: { type: Boolean, required: true }, // ✅ map checkbox
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Pharmacy', pharmacySchema);
