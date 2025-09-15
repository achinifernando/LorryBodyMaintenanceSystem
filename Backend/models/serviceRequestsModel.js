const mongoose = require("mongoose");

const repairMaintenanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true },
  userName: String,
  phoneNumber: String,
  email: String,
  companyName: String,
  address: String,
  city: String,
  state: String,
  lorryModel: String,
  lorryNumber: String,
  serviceType: { type: String,required: true },
  issueDescription: String,
  preferredDate: Date,
  image: String, // URL/path if uploaded
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RepairMaintenance", repairMaintenanceSchema);
