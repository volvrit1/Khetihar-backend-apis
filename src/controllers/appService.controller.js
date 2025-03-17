import AppService from "#services/appService";
import Controller from "#controllers/base";

class AppServiceController extends Controller {
  static Service = AppService;
}

export default AppServiceController;
