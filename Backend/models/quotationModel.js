const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  requestID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quotationrequest",
    required: true,
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  validityDate: { type: Date },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  lorryCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lorryCategory",
    required: true,
  },
  lorryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lorryTypes",
    required: true,
  },
  lorryModel: { type: String, required: true },
  Items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, default: 0.0 },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0.0 },
  remarks: { type: String },
}, { 
  timestamps: true,
});

// Calculate totalPrice before saving
quotationSchema.pre("save", function (next) {
  if (this.Items && this.Items.length > 0) {
    this.totalPrice = this.Items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  } else {
    this.totalPrice = 0;
  }
  next();
});

const Quotation = mongoose.model("quotation", quotationSchema);
module.exports = Quotation;
