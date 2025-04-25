import Service from "#services/base";
import Slot from "#models/slot";
import BookingService from "#services/booking";
import mongoose from "mongoose";

class SlotService extends Service {
  static Model = Slot;

  static async create(data) {
    const { timeslots } = data;
    const slots = timeslots.map((ele) => {
      return this.Model.create(ele);
    });

    const createdSlots = await Promise.all(slots);
    return createdSlots;
  }

  static async delete(id) {
    const bookingList = BookingService.getWithAggregate([
      {
        $match: {
          slotId: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const slotData = this.Model.getDocById(id);

    const [bookings, slot] = await Promise.all([bookingList, slotData]);
    if (bookings.length) {
      throw {
        status: false,
        message: "Cannot delete this slot, booking for this slot already exist",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    if (slot.agents.length) {
      throw {
        status: false,
        message: "A agent is assigned for this slot, cannot delete",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    return await super.delete(id);
  }
}

export default SlotService;
