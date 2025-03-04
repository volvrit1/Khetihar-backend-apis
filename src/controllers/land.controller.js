import LandService from "#services/land";
import Controller from "#controllers/base";

class LandController extends Controller {
  static Service = LandService;
}

export default LandController;
