import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const appServiceSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    file: true,
  },
});

appServiceSchema.pre("save", saveFile);

export default mongoose.model("AppService", appServiceSchema);
