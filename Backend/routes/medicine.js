const express = require('express');
const router = express.Router();
const { addMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController');

// POST /api/medicine/add
router.post('/add', addMedicine);

// PUT /api/medicine/update
router.put('/update', updateMedicine);

// DELETE /api/medicine/delete
router.delete('/delete', deleteMedicine);

module.exports = router;
