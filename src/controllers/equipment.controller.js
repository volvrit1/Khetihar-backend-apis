import EquipmentService from "#services/equipment";
import Controller from "#controllers/base";

class EquipmentController extends Controller {
  static Service = EquipmentService;
}

export default EquipmentController;
