import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class EquipmentType extends BaseModel {}

EquipmentType.initialize({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default EquipmentType;
