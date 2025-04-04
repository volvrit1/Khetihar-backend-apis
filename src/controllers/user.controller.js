import httpStatus from "http-status";
import UserService from "#services/user";
import Controller from "#controllers/base";
import { session } from "#middlewares/session";
import { sendResponse } from "#utils/response";

class UserController extends Controller {
  static Service = UserService;

  static async getLoggedInUser(req, res, next) {
    const loggedInUserId = session.get("userId");
    const data = await this.Service.get(loggedInUserId);
    sendResponse(httpStatus.OK, res, data, "Record fetched succesfully");
  }
}

export default UserController;
