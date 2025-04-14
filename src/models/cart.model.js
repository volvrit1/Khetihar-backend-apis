import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Cart extends BaseModel {}

Cart.initialize({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


export default Cart;
