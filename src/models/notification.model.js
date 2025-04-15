import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";

const notificationSchema = new BaseSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  notification: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

export default mongoose.model("Notification", notificationSchema);
