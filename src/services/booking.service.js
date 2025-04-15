import Service from "#services/base";
import Booking from "#models/booking";

class BookingService extends Service {
  static Model = Booking;
}

export default BookingService;
