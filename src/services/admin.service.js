import Service from "#services/base";
import Admin from "#models/admin";
import { createToken } from "#utils/jwt";
import { compare, hash } from "bcryptjs";
import httpStatus from "http-status";

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
}

export default AdminService;
