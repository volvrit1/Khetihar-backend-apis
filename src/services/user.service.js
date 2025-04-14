import Service from "#services/base";
import User from "#models/user";
import CartService from "#services/cart";
import OtpService from "#services/otp";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";

class UserService extends Service {
  static Model = User;

  static async create(userData) {
    const user = await super.create(userData);
    const { id: userId } = user;

    await CartService.create({ userId });
    return user;
  }

  static async login(otpData) {
    const { mobile, otp } = otpData;

    let user = await this.Model.findDoc({
      mobile,
    });

    const savedOtp = await OtpService.getDoc(
      {
        mobile,
        type: "User",
      },
      true,
    );

    if (!savedOtp) {
      throw {
        status: false,
        message: "Invalid Otp, please get a new otp",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    if (otp !== savedOtp.otp) {
      throw {
        status: false,
        message: "Incorrect Otp",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    await savedOtp.destroy({ force: true });

    const payload = {
      ...user.toJSON(),
    };

    delete payload.password;

    const token = createToken(payload);

    user = user.toJSON();
    user.token = token;

    return user;
  }

  static async sendOtp(loginData) {
    const { mobile } = loginData;

    const user = await this.getDoc({
      mobile,
    });

    let otp = await OtpService.getDoc(
      {
        mobile,
        type: "User",
      },
      true,
    );

    if (!otp) {
      otp = await OtpService.create({
        mobile,
        type: "User",
        otp: Math.floor(1000 + Math.random() * 9000),
      });
    }
    return otp;
  }
}

export default UserService;
