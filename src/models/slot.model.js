import BaseSchema from "#models/base";
import Agent from "#models/agent";
import mongoose from "mongoose";

const slotSchema = new BaseSchema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  agents: [
    {
      type: BaseSchema.Types.ObjectId,
      ref: Agent,
    },
  ],
});

slotSchema.index({ date: 1, startTime: 1, endTime: 1 });

export default mongoose.model("Slot", slotSchema);
