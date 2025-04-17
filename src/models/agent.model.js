import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const agentSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaarNumber: {
    type: String,
  },
  panNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  photo: {
    type: String,
    file: true,
  },
});

agentSchema.pre("save", saveFile);

export default mongoose.model("Agent", agentSchema);
