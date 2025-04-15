import Service from "#services/base";
import Booking from "#models/booking";
import Land from "#models/land";
import User from "#models/user";

import sequelize from "#configs/database";

class BookingService extends Service {
  static Model = Booking;

  static async get(id, filters) {
    const data = await Booking.getWithJoins(null, {
      search: filters.search,
      searchFields: [filters.searchKey],
      filters: {
        booking_status: "confirmed",
        "equipment.name": "Tractor",
      },
      select: [
        "users.name",
        "users.phone",
        "users.profile",
        "equipment.name AS equipmentName",
        "equipment.cost AS equipmentCost",
        "lands.name AS landName",
        "lands.khasra_number AS khasraNumber",
        "booking_status AS bookingStatus",
        "booking_date AS bookingDate",
        "bookings.id",
      ],
      joins: [
        { table: "users", on: "users.id = bookings.user_id" },
        { table: "equipment", on: "equipment.id = bookings.equipment_id" },
        { table: "lands", on: "lands.id = bookings.land_id" },
      ],
      orderBy: "bookings.created_at DESC",
      page: 1,
      limit: 10,
    });

    return data;
  }
}

export default BookingService;
