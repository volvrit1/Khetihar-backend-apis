import mongoose from "mongoose";
import BaseSchema from "#models/base";

const adminSchema = new BaseSchema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Admin", adminSchema);
