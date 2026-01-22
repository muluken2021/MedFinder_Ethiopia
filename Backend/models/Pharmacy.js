const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const MedicineSchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['available', 'out-of-stock'], default: 'available' }
}, { timestamps: true });


const PharmacySchema = new mongoose.Schema({
  pharmacyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, default: '' },
  licenseNumber: { type: String, required: true },
  licenseDocument: { type: String, required: true },
  pharmacyImage: { type: String, default: '' },
  agreeToTerms: { type: Boolean, required: true },
  mapVerified: { type: Boolean, required: true },
  status: { type: String, enum: ['pending', 'approved', 'blocked'], default: 'pending' }
}, { timestamps: true });

// Pre-save hook to hash password
PharmacySchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
