import Service from "#services/base";
import Agent from "#models/agent";
import OtpService from "#services/otp";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";
import SlotService from "#services/slot";

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

    await savedOtp.deleteOne();

    const payload = {
      ...agent.toJSON(),
    };

    delete payload.password;

    const token = createToken(payload);

    agent = agent.toJSON();
    agent.token = token;

    return agent;
  }

  static async getAvailableAgent(slotId) {
    const slot = await SlotService.getDoc(slotId);

    // Defensive check to avoid `$nin: undefined` if slot.agents is missing
    const excludedAgentIds = Array.isArray(slot.agents) ? slot.agents : [];

    const agents = await this.Model.aggregate([
      {
        $match: {
          _id: { $nin: excludedAgentIds },
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
        },
      },
    ]);

    return agents;
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
