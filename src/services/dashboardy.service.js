import UserService from "#services/user";
import AgentService from "#services/agent";
import BookingService from "#services/booking";

class DashboardService {
  static async get(filters) {
    const agents = AgentService.getWithAggregate();
    const users = UserService.getWithAggregate([]);
    const bookings = BookingService.getWithAggregate([]);

    const [agentData, userData, bookingData] = await Promise.all([
      agents,
      users,
      bookings,
    ]);
  }
}

export default DashboardService;
