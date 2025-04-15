import Service from "#services/base";
import mongoose from "mongoose";
import httpStatus from "http-status";
import EquipmentService from "#services/equipment";
import EquipmentType from "#models/equipmentType";

class EquipmentTypeService extends Service {
  static Model = EquipmentType;

  static async deleteDoc(id) {
    const equipments = await EquipmentService.getWithAggregate([
      { $match: { equipmentTypeId: new mongoose.Types.ObjectId(id) } },
    ]);

    if (equipments.length) {
      throw {
        status: false,
        message: "Please delete related equipments first",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }
  }
}

export default EquipmentTypeService;
