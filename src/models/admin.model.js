import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Admin extends BaseModel {}

Admin.initialize({
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});

export default Admin;
