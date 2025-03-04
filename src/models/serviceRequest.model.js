import Land from "#models/land";
import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class ServiceRequest extends BaseModel {}

ServiceRequest.initialize({
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: User.primaryKeyAttribute,
    },
  },
  landId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Land,
      key: Land.primaryKeyAttribute,
    },
  },
  agentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Agent,
      key: Agent.primaryKeyAttribute,
    },
  },
  serviceDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  assigned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default ServiceRequest;
