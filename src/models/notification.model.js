import BaseModel from "#models/base";
import { DataTypes } from "sequelize";
import User from "#models/user";

class Notification extends BaseModel {}

Notification.initialize({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: User.primaryKeyAttribute,
    },
  },
  notification: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default Notification;
