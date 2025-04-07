import Service from "#services/base";
import Crop from "#models/crop";

class CropService extends Service {
  static Model = Crop;
}

export default CropService;
