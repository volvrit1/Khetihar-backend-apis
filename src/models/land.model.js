import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";

const landSchema = new BaseSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  measuringUnit: {
    type: String,
    enum: ["Bigah", "Biswa"],
    required: true,
  },
  khasraNumber: {
    type: String,
  },
  xLeftCoOrdinate: {
    type: String,
    required: true,
  },
  xRightCoOrdinate: {
    type: String,
    required: true,
  },
  yTopCoOrdinate: {
    type: String,
    required: true,
  },
  yBottomCoOrdinate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Land", landSchema);

