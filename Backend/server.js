const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicine');
const adminPharmacyRoutes = require('./routes/adminPharmacy');

// ADD THIS — YOUR STATS ROUTES!!
const pharmacyRoutes = require('./routes/pharmacy');

app.use('/api/auth', authRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/admin/pharmacies', adminPharmacyRoutes);

// ount pharmacy stats + other pharmacy routes
app.use('/api/pharmacy', pharmacyRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
