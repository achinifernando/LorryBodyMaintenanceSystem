const mongoose = require("mongoose");

const schema = mongoose.Schema;
const orderSchema = new schema({
//use the schema names which are registered in mongoDB for referencing because you are using populate() in the route
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "clients", required: true },
  userName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state:{ type: String, required: true },
  lorryCategory:{ type: mongoose.Schema.Types.ObjectId, ref: "lorryCategory", required: true},
  lorryType:{ type: mongoose.Schema.Types.ObjectId, ref: "lorryTypes", required: true},
  quantity: { type: Number, required: true },
  additionalFeatures: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }

});
                            //file name,function name
const order =mongoose.model("order" ,orderSchema);

module.exports = order;