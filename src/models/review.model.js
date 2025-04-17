import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import Agent from "#models/agent";
import User from "#models/user";

const reviewSchema = new BaseSchema({
  agentId: {
    type: BaseSchema.Types.ObjectId,
    ref: Agent,
    required: true,
  },
  userId: {
    type: BaseSchema.Types.ObjectId,
    ref: User,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

reviewSchema.pre("save", saveFile);

export default mongoose.model("Review", reviewSchema);
