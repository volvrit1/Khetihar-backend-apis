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
  },
});

export default mongoose.model("Admin", adminSchema);
