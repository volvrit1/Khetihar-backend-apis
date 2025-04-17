import mongoose from "mongoose";
import User from "#models/user";
import Crop from "#models/crop";
import Land from "#models/land";
import Agent from "#models/agent";
import BaseSchema from "#models/base";
import Equipment from "#models/equipment";

const bookingSchema = new BaseSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  landId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Land,
  },
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Crop,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Agent,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Equipment,
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Cancelled", "In-Progress", "Completed"],
    default: "Pending",
  },
  slot: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

bookingSchema.statics.status = [
  "Pending",
  "Cancelled",
  "In-Progress",
  "Completed",
];

export default mongoose.model("Booking", bookingSchema);
