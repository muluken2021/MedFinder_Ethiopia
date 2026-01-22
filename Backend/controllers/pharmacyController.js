import Medicine from "../models/Medicine.js";
import Pharmacy from "../models/Pharmacy.js";

export const getPharmacyStats = async (req, res) => {
  try {
    // The pharmacy ID you can extract from JWT later. For now static or request param
    const pharmacyId = req.query.id;

    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy)
      return res.status(404).json({ message: "Pharmacy not found" });

    // Fetch all medicines of this pharmacy
    const medicines = await Medicine.find({ pharmacyId });

    const totalMedicines = medicines.length;
    const inStock = medicines.filter((m) => m.quantity > 0).length;
    const outOfStock = medicines.filter((m) => m.quantity === 0).length;

    // Pending approvals (assuming you have this field)
    const pendingApprovals = medicines.filter(
      (m) => m.status === "pending"
    ).length;

    return res.json({
      pharmacyName: pharmacy.name,
      totalMedicines,       
      inStock,
      outOfStock,
      pendingApprovals,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
