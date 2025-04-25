import httpStatus from "http-status";
import Service from "#services/base";
import Booking from "#models/booking";
import SlotService from "#services/slot";

class BookingService extends Service {
  static Model = Booking;

  static async get(id, filters) {
    const initialStage = [
      {
        $lookup: {
          from: "users",
          as: "userData",
          localField: "userId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "lands",
          as: "landData",
          localField: "landId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "equipment",
          as: "equipmentData",
          localField: "equipmentId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "crops",
          as: "cropData",
          localField: "cropId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "slots",
          as: "slotData",
          localField: "slotId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          userName: { $arrayElemAt: ["$userData.name", 0] },
          userProfile: { $arrayElemAt: ["$userData.profile", 0] },
          userPhone: { $arrayElemAt: ["$userData.phone", 0] },
          landName: { $arrayElemAt: ["$landData.name", 0] },
          landKhasraNumber: { $arrayElemAt: ["$landData.khasraNumber", 0] },
          equipmentName: { $arrayElemAt: ["$equipmentData.name", 0] },
          cropName: { $arrayElemAt: ["$cropData.name", 0] },
          bookingStatus: 1,
          bookingDate: 1,
          slot: 1,
          cost: 1,
          createdAt: 1,
        },
      },
    ];

    if (id) {
    }

    const data = await this.Model.findAll(filters, initialStage, extraStage);
    return data;
  }
}

export default BookingService;
