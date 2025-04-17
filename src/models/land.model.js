import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";

const landSchema = new BaseSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  measuringUnit: {
    type: String,
    required: true,
  },
  khasraNumber: {
    type: String,
  },
  coOrdinates: {
    type: Array,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Land", landSchema);
