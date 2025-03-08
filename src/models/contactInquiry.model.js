import httpStatus from "http-status";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class ContactInquiry extends BaseModel {}

ContactInquiry.initialize({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inquiry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      customValidator(value) {
        if (typeof value !== "string" || value.length < 3) {
          throw {
            status: false,
            message: "A valid inquiry is required to submit the form",
            httpStatus: httpStatus.BAD_REQUEST,
          };
        }
      },
    },
  },
});

export default ContactInquiry;
