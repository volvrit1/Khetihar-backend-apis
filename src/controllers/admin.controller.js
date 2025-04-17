import httpStatus from "http-status";
import AdminService from "#services/admin";
import Controller from "#controllers/base";
import { session } from "#middlewares/session";
import { sendResponse } from "#utils/response";

class AdminController extends Controller {
  static Service = AdminService;

  static async login(req, res, next) {
    const loggedInData = await this.Service.login(req.body);
    sendResponse(httpStatus.OK, res, loggedInData, "Logged in successfully");
  }

  static async getCurrentUser(req, res, next) {
    const admin = await this.Service.get(session.get("userId"));
    sendResponse(httpStatus.OK, res, admin, "Record fetched successfully");
  }

  static async getBooking(req, res, next) {
    const { id } = req.params;
    const data = await this.Service.getBooking(id, req.query);
    sendResponse(httpStatus.OK, res, data, "Record fetched successfully");
  }

  static async getLand(req, res, next) {
    const { id } = req.params;
    const data = await this.Service.getLand(id, req.query);
    sendResponse(httpStatus.OK, res, data, "Record fetched successfully");
  }

  static async updateBooking(req, res, next) {
    const { id } = req.params;
    const data = await this.Service.updateBooking(id, req.body);
    sendResponse(httpStatus.OK, res, data, "Boolking updated successfully");
  }
}

export default AdminController;
