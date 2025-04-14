import Service from "#services/base";
import Agent from "#models/agent";
import CartService from "#services/cart";
import OtpService from "#services/otp";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";

class AgentService extends Service {
  static Model = Agent;

  static async login(otpData) {
    const { mobile, otp } = otpData;

    let agent = await this.Model.findDoc({
      mobile,
    });

    const savedOtp = await OtpService.getDoc({
      mobile,
      type: "Agent",
    });

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
      ...agent.toJSON(),
    };

    delete payload.password;

    const token = createToken(payload);

    agent = agent.toJSON();
    agent.token = token;

    return agent;
  }

  static async sendOtp(loginData) {
    const { mobile } = loginData;

    const agent = await this.getDoc({
      mobile,
    });

    let otp = await OtpService.getDoc(
      {
        mobile,
        type: "Agent",
      },
      true,
    );

    if (!otp) {
      otp = await OtpService.create({
        mobile,
        type: "Agent",
        otp: Math.floor(1000 + Math.random() * 9000),
      });
    }
    return otp;
  }
}

export default AgentService;
