import Service from "#services/base";
import Otp from "#models/otp";

class OtpService extends Service {
  static Model = Otp;
}

export default OtpService;
