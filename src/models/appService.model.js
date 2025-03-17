import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class AppService extends BaseModel {}

AppService.initialize({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    file: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

export default AppService;
