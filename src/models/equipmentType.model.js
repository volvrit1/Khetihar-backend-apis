import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";
import BaseSchema from "#models/base";

const equipmentTypeSchema = new BaseSchema({
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

equipmentTypeSchema.pre("save", saveFile);

export default mongoose.model("EquipmentType", equipmentTypeSchema);
