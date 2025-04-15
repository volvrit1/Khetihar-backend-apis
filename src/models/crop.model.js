import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const cropSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    file: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

cropSchema.pre("save", saveFile);

export default mongoose.model("Crop", cropSchema);
