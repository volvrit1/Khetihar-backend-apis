import mongoose from "mongoose";
import BaseSchema from "#models/base";
import httpStatus from "http-status";

const contactInquirySchema = new BaseSchema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  inquiry: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (typeof value !== "string" || value.length < 3) {
          throw new Error("A valid inquiry is required to submit the form");
        }
      },
      message: "A valid inquiry is required to submit the form",
    },
  },
});

export default mongoose.model("ContactInquiry", contactInquirySchema);
