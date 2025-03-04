import UserService from "#services/user";
import Controller from "#controllers/base";

class UserController extends Controller {
  static Service = UserService;
}

export default UserController;
