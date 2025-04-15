import mongoose from "mongoose";
import User from "#models/user";
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
});

bookingSchema.statics.status = [
  "Pending",
  "Cancelled",
  "In-Progress",
  "Completed",
];

export default mongoose.model("Booking", bookingSchema);
