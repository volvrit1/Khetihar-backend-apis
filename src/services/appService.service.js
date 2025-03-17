import Service from "#services/base";
import AppService from "#models/appService";

class AppServiceClass extends Service {
  static Model = AppService;
}

export default AppServiceClass;
