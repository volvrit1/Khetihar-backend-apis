import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Crop extends BaseModel {}

Crop.initialize({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

export default Crop;
