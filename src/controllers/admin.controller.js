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
    console.log(session.get("userId"));
    const admin = await this.Service.get(session.get("userId"));
    sendResponse(httpStatus.OK, res, admin, "Record fetched successfully");
  }
}

export default AdminController;
