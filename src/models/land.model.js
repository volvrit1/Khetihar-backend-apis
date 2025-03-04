import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Land extends BaseModel {}

Land.initialize({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: User.primaryKeyAttribute,
    },
  },
  name: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  khasraNumber: {
    type: DataTypes.STRING,
  },
  xLeftCoOrdinate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  xRightCoOrdinate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yLeftCoOrdinate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yRightCoOrdinate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Land;
