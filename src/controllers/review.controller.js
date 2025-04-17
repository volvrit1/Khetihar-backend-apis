import Review from "#services/review";
import Controller from "#controllers/base";
import { sendResponse } from "#utils/response";
import httpStatus from "http-status";

class ReviewController extends Controller {
  static Service = Review;

  static async getBaseFields(req, res, next) {
    const data = await this.Service.getBaseFields();
    sendResponse(httpStatus.OK, res, data, `Basefields fetched successfully`);
  }
}

export default ReviewController;
