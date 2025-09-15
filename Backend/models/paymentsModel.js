const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  customerId: String,
  orderDetails: String,
  status: { type: String, default: "Pending" }, // e.g., "Accepted", "Paid"
  paymentReceipt: {
    fileUrl: String,
    uploadedAt: Date
  },
  paymentStatus: { type: String, default: "Not Paid" }
});

module.exports = mongoose.model("Payment", PaymentSchema);
