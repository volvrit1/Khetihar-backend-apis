import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const bannerSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    file: true,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    min: 1,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

bannerSchema.pre("save", saveFile);

export default mongoose.model("Banner", bannerSchema);
