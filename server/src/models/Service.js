const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddOnSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    extraDurationMinutes: { type: Number, default: 0 },
  },
  { _id: true },
);

const ServiceSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    bufferMinutes: { type: Number, default: 0 },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "PHP" },
    bookingType: {
      type: String,
      enum: ["staff", "resource", "capacity"],
      required: true,
    },
    requiredStaffRole: { type: String },
    requiredResourceType: { type: String },
    maxCapacity: { type: Number },
    allowsExclusiveBooking: { type: Boolean, default: false },
    exclusive: {
      flatPrice: { type: Number },
      minPartySize: { type: Number },
      maxPartySize: { type: Number },
    },
    addOns: [AddOnSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ServiceSchema.index({ categoryId: 1, isActive: 1 });

module.exports = mongoose.model("Service", ServiceSchema);
