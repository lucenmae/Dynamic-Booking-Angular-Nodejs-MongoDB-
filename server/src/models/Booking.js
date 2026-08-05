const mongoose = require("mongoose");
const { Schema } = mongoose;

const SelectedAddOnSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const BookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "ServiceCategory" },
    assignedStaffId: { type: Schema.Types.ObjectId, ref: "Staff" },
    assignedResourceId: { type: Schema.Types.ObjectId, ref: "Resource" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    bookingMode: {
      type: String,
      enum: ["regular", "exclusive"],
      default: "regular",
    },
    partySize: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    selectedAddOns: [SelectedAddOnSchema],
    priceAtBooking: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "deposit-paid", "paid", "refunded"],
      default: "unpaid",
    },
    notes: { type: String },
    source: { type: String, enum: ["web", "walk-in", "phone"], default: "web" },
  },
  { timestamps: true },
);

BookingSchema.index({ assignedStaffId: 1, startTime: 1, endTime: 1 });
BookingSchema.index({ assignedResourceId: 1, startTime: 1, endTime: 1 });
BookingSchema.index({ serviceId: 1, startTime: 1, endTime: 1 });

module.exports = mongoose.model("Booking", BookingSchema);
