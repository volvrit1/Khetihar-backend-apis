import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const userSchema = new BaseSchema({
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  aadhaar: {
    type: String,
    unique: true,
    required: true,
    maxlength: 12,
  },
  name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
  },
  panNumber: {
    type: String,
  },
  kisanId: {
    type: String,
  },
  egannaId: {
    type: String,
  },
  profile: {
    type: String,
    file: true,
  },
});

userSchema.pre("save", saveFile);

export default mongoose.model("User", userSchema);
