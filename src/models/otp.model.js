import mongoose from "mongoose";
import BaseSchema from "#models/base";

const otpSchema = new BaseSchema({
  phone: {
    type: String,
    unique: true,
    required: false,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["User", "Agent"],
    required: true,
  },
});

// Adding index for createdAt to expire OTP after 5 minutes
otpSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 300, name: "expire_after_5_minutes" },
);

export default mongoose.model("Otp", otpSchema);
