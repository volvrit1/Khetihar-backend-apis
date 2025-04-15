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
    required: true,
  },
});

export default mongoose.model("EquipmentType", equipmentTypeSchema);
