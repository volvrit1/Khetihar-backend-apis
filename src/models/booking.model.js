import Land from "#models/land";
import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Booking extends BaseModel {
		
}

Booking.initialize({
  userId: {
    type: DataTypes.INTEGER,
    alloNull: false,
    references: {
      model: User,
      key: User.primaryKeyAttribute,
    },
  },
  landId: {
    type: DataTypes.INTEGER,
    alloNull: false,
    references: {
      model: Land,
      key: Land.primaryKeyAttribute,
    },
  },
  agentId: {
    type: DataTypes.INTEGER,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  equipmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
});

export default Booking;
