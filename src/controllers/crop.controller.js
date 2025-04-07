import CropService from "#services/crop";
import Controller from "#controllers/base";

class CropController extends Controller {
  static Service = CropService;
}

export default CropController;
