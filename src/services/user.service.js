import Service from "#services/base";
import User from "#models/user";

class UserService extends Service {
  static Model = User;
}

export default UserService;
