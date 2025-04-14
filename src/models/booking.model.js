import Land from "#models/land";
import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";
import Cart from "#models/cart";

class Booking extends BaseModel {
  static status = ["Pending", "Cancelled", "In-Progress", "Completed"];
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  equipmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookingStatus: {
    type: DataTypes.ENUM(Booking.status),
    defaultValue: "Pending",
  },
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: Cart.primaryKeyAttribute,
    },
  },
  slot: {
    type: DataTypes.TEXT,
  },
});

Cart.hasMany(Booking, {
  foreignKey: "cartId",
  as: "bookings",
});

export default Booking;
