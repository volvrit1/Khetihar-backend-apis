import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class User extends BaseModel {
  static genderArr = ["Male", "Female", "Other"];
}

User.initialize({
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  aadhaar: {
    type: DataTypes.STRING(12),
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.ENUM(User.genderArr),
  },
  email: {
    type: DataTypes.STRING,
  },
  panNumber: {
    type: DataTypes.STRING,
  },
  kisanId: {
    type: DataTypes.STRING,
  },
  egannaId: {
    type: DataTypes.STRING,
  },
  profile: {
    type: DataTypes.STRING,
    file: true,
  },
});

export default User;
