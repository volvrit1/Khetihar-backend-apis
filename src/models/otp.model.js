import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Otp extends BaseModel {}

Otp.initialize(
  {
    mobile: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("User", "Agent"),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        fields: ["created_at"],
        using: "BTREE",
        name: "expire_after_5_minutes",
      },
    ],
  },
);

export default Otp;
