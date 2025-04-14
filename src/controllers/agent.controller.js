import httpStatus from "http-status";
import AgentService from "#services/agent";
import Controller from "#controllers/base";
import { session } from "#middlewares/session";
import { sendResponse } from "#utils/response";

class AgentController extends Controller {
  static Service = AgentService;

  static async getLoggedInAgent(req, res, next) {
    const loggedInAgentId = session.get("agentId");
    const data = await this.Service.get(loggedInAgentId);
    sendResponse(httpStatus.OK, res, data, "Record fetched succesfully");
  }

  static async login(req, res, next) {
    const loggedInData = await this.Service.login(req.body);
    sendResponse(httpStatus.OK, res, loggedInData, "Logged in successfully");
  }

  static async sendOtp(req, res, next) {
    const otpData = await this.Service.sendOtp(req.body);
    sendResponse(httpStatus.OK, res, otpData, "Otp sent successfully");
  }
}

export default AgentController;
