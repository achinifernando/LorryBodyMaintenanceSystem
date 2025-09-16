const mongoose = require("mongoose"); 

const schema = mongoose.Schema; 
const meetingSchema = new schema({
 meetingId: { type: String, required: true, unique: true, index: true },
 scheduleDate: { type: Date, required: true, index: true },
 scheduleTime: { type: String, required: true },
 description: { type: String },
 clientId: { type: mongoose.Schema.Types.ObjectId, ref: "client", required: true,index: true },
 status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: 
"Pending", index: true },
 createdAt: { type: Date, default: Date.now 
 }
});
const Meeting = mongoose.model("meetings", meetingSchema);
module.exports = Meeting;