import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import EquipmentType from "#models/equipmentType";

const equipmentSchema = new BaseSchema({
  equipmentTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "EquipmentType",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    file: true,
  },
  cost: {
    type: String,
    required: true,
  },
});

equipmentSchema.pre("save", saveFile);

export default mongoose.model("Equipment", equipmentSchema);
