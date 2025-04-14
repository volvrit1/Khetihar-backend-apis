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
}

export default AdminController;
