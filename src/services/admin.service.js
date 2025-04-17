import Admin from "#models/admin";
import Service from "#services/base";
import httpStatus from "http-status";
import { createToken } from "#utils/jwt";
import { compare, hash } from "bcryptjs";
import LandService from "#services/land";
import UserService from "#services/user";
import BookingService from "#services/booking";

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
          paymentStatus: 1,
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

  static async getDashboardData(id, filters = {}) {
    const UserModal = UserService.Model;
    const BookingModal = BookingService.Model;
    const today = new Date();

    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(today.setDate(today.getDate() - 7));
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const timeDifference = (endDate - startDate) / (1000 * 3600 * 24); // in days

    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(startDate.getDate() - timeDifference);
    const prevEndDate = new Date(endDate);
    prevEndDate.setDate(endDate.getDate() - timeDifference);

    const currentData = await UserModal.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    const prevData = await UserModal.find({
      createdAt: { $gte: prevStartDate, $lte: prevEndDate },
    });

    const matchPendingBookings = (startDate, endDate) => ({
      paymentStatus: true,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const aggregateBooking = async (matchCondition) => {
      return BookingModal.aggregate([
        { $match: matchCondition },
        { $group: { _id: null, total: { $sum: "$cost" } } },
      ]);
    };

    const allTimeBooking = await aggregateBooking({ paymentStatus: true });
    const currentTimeBooking = await aggregateBooking(
      matchPendingBookings(startDate, endDate)
    );
    const prevbTimeBooking = await aggregateBooking(
      matchPendingBookings(prevStartDate, prevEndDate)
    );
    const currentBookings = await BookingModal.aggregate([
      { $match: matchPendingBookings(startDate, endDate) },
    ]);
    const previousBookings = await BookingModal.aggregate([
      { $match: matchPendingBookings(prevStartDate, prevEndDate) },
    ]);
    const overAllRevenue = allTimeBooking[0]?.total || 0;
    const previousRevenue = prevbTimeBooking[0]?.total || 0;
    const currentRevenue = currentTimeBooking[0]?.total || 0;

    const percentageChangeInData = change(currentData, prevData);
    const percentageChangeInRevenue = change(currentRevenue, previousRevenue);
    const percentageChangeInBookings = change(
      currentBookings,
      previousBookings
    );

    const userStats = {
      percentageChangeInData,
      previousDataCount: prevData.length,
      currentDataCount: currentData.length,
    };

    const bookingStats = {
      previousRevenue,
      currentRevenue,
      percentageChangeInRevenue,
      percentageChangeInBookings,
      totalRevenue: overAllRevenue,
      currentBookings: currentBookings.length,
      previousBookings: previousBookings.length,
    };

    return { userStats, bookingStats };
  }

  static async getDashboardGraph(id, filters = {}) {
    const BookingModal = BookingService.Model;
    const { period = "weekly", year } = filters;

    const now = new Date();
    let startDate,
      endDate = new Date(now);
    let labels = [],
      dataMap = {};

    switch (period) {
      case "monthly": {
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed

        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const totalDays = endDate.getDate();

        labels = Array.from(
          { length: totalDays },
          (_, i) => `${i + 1}${ordinalSuffix(i + 1)}`
        );
        labels.forEach((label) => (dataMap[label] = 0));
        break;
      }
      case "yearly": {
        const targetYear = year || now.getFullYear();
        startDate = new Date(targetYear, 0, 1);
        endDate = new Date(targetYear, 11, 31, 23, 59, 59, 999);

        labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        labels.forEach((label) => (dataMap[label] = 0));
        break;
      }
      case "weekly":
      default: {
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 6); // last 7 days including today
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        labels.forEach((label) => (dataMap[label] = 0));
        break;
      }
    }

    // Get bookings
    const bookings = await BookingModal.find({
      paymentStatus: true,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Group data by period
    bookings.forEach((booking) => {
      const date = new Date(booking.createdAt);

      let labelKey = "";
      if (period === "weekly") {
        labelKey = labels[date.getDay()];
      } else if (period === "monthly") {
        const day = date.getDate();
        labelKey = `${day}${ordinalSuffix(day)}`;
      } else if (period === "yearly") {
        labelKey = labels[date.getMonth()];
      }

      if (labelKey in dataMap) {
        dataMap[labelKey] += booking.cost || 0;
      }
    });

    const chartData = {
      labels,
      datasets: labels.map((label) => dataMap[label] || 0),
    };
    return chartData;
  }

  static async getDashboardSession(id, filters = {}) {
    const UserModal = UserService.Model;
    const BookingModal = BookingService.Model;
    const today = new Date();

    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(today.setDate(today.getDate() - 7));
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const timeDifference = (endDate - startDate) / (1000 * 3600 * 24); // in days

    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(startDate.getDate() - timeDifference);
    const prevEndDate = new Date(endDate);
    prevEndDate.setDate(endDate.getDate() - timeDifference);
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

function change(current, previous) {
  let currentLength = 0;
  let previousLength = 0;

  if (Array.isArray(current)) currentLength = current.length;
  else if (typeof current === "number") currentLength = current;

  if (Array.isArray(previous)) previousLength = previous.length;
  else if (typeof previous === "number") previousLength = previous;

  let percentChange = 0;
  if (previousLength > 0)
    percentChange = ((currentLength - previousLength) / previousLength) * 100;

  return percentChange ? `${percentChange.toFixed(2)}%` : "No Change";
}

function ordinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default AdminService;
