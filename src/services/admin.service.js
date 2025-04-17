import Service from "#services/base";
import Admin from "#models/admin";
import BookingService from "#services/booking";
import { createToken } from "#utils/jwt";
import { compare, hash } from "bcryptjs";
import httpStatus from "http-status";
import LandService from "#services/land";

class AdminService extends Service {
  static Model = Admin;

  static async create(adminData) {
    const password = await hash(adminData.password, 10);
    adminData.password = password;
    return await super.create(adminData);
  }

  static async login(otpData) {
    const { email, password } = otpData;

    const admin = await this.Model.findDoc({
      email,
    });

    const verification = await compare(password, admin.password);

    if (!verification) {
      throw {
        status: false,
        message: "Invalid password",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    const payload = {
      id: admin.id,
      email,
    };

    delete payload.password;

    const token = createToken(payload);

    const data = {
      admin,
      token,
    };

    return data;
  }

  static async getBooking(id, filters) {
    const Model = BookingService.Model;

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
          from: "agents",
          as: "agentData",
          localField: "agentId",
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
          bookingStatus: 1,
          bookingDate: 1,
          slot: 1,
          cost: 1,
          createdAt: 1,
          agentName: { $arrayElemAt: ["$agentData.name", 0] },
          paymentStatus: 1,
          cropName: { $arrayElemAt: ["$cropData.name", 0] },
        },
      },
    ];

    if (id) {
      const booking = await Model.findOne({ _id: id })
        .populate("userId")
        .populate("landId")
        .populate("agentId") // This will be null if not assigned
        .populate("equipmentId")
        .populate("cropId");

      if (!booking) {
        throw {
          status: false,
          message: "Booking not found",
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }

      return booking;
    }

    const data = await Model.findAll(filters, initialStage, extraStage);
    return data;
  }

  static async updateBooking(id, data) {
    const Model = BookingService.Model;

    const booking = await Model.findDocById(id);
    booking.update(data);
    await booking.save();
    return booking;
  }

  static async getLand(id, filters) {
    const Model = LandService.Model;

    if (id) {
      return await LandService.getDocById(id);
    }

    const initialStage = [
      {
        $lookup: {
          from: "users",
          as: "userData",
          localField: "userId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $set: {
          userName: { $arrayElemAt: ["$userData.name", 0] },
          userProfile: { $arrayElemAt: ["$userData.profile", 0] },
          userPhone: { $arrayElemAt: ["$userData.phone", 0] },
          userData: 0,
        },
      },
    ];

    const data = await Model.findAll(filters, initialStage, extraStage);
    return data;
  }
}

export default AdminService;
