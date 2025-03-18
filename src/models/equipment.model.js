import BaseModel from "#models/base";
import { DataTypes } from "sequelize";
import EquipmentType from "#models/equipmentType";

class Equipment extends BaseModel {}

Equipment.initialize({
  equipmentTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EquipmentType,
      key: Equipment.primaryKeyAttribute,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Equipment;
