const Pharmacy = require('../models/Pharmacy');

// Add a new medicine
exports.addMedicine = async (req, res) => {
  try {
    const { pharmacyId, name, stock, price, description } = req.body;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });

    pharmacy.medicines.push({ name, stock, price, description });
    await pharmacy.save();

    res.json({ message: 'Medicine added', medicines: pharmacy.medicines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { pharmacyId, medicineId, name, stock, price, description } = req.body;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });

    const medicine = pharmacy.medicines.id(medicineId);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    medicine.name = name || medicine.name;
    medicine.stock = stock ?? medicine.stock;
    medicine.price = price ?? medicine.price;
    medicine.description = description || medicine.description;

    await pharmacy.save();
    res.json({ message: 'Medicine updated', medicine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { pharmacyId, medicineId } = req.body;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });

    pharmacy.medicines.id(medicineId).remove();
    await pharmacy.save();

    res.json({ message: 'Medicine deleted', medicines: pharmacy.medicines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
