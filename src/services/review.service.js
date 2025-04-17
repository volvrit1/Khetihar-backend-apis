import Service from "#services/base";
import Review from "#models/review";
import AgentService from "#services/agent";
import UserService from "#services/user";

class ReviewClass extends Service {
  static Model = Review;

  static async get(id, filters) {
    if (id) return await super.get(id);

    const initialStage = [
      {
        $lookup: {
          from: "users",
          as: "userData",
          localField: "userId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "agents",
          as: "agentData",
          localField: "agentId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          review: 1,
          rating: 1,
          userName: { $arrayElemAt: ["$userData.name", 0] },
          agentName: { $arrayElemAt: ["$agentData.name", 0] },
          userProfile: { $arrayElemAt: ["$userData.profile", 0] },
          agentProfile: { $arrayElemAt: ["$agentData.profile", 0] },
          active: 1,
          createdAt: 1,
        },
      },
    ];

    return await this.Model.findAll(filters, initialStage, extraStage);
  }

  static async getBaseFields() {
    const agents = AgentService.getWithAggregate([
      {
        $project: {
          name: 1,
          email: 1,
        },
      },
    ]);

    const users = UserService.getWithAggregate([
      {
        $project: {
          name: 1,
          email: 1,
        },
      },
    ]);

    const [agentData, userData] = await Promise.all([agents, users]);
    return { agentData, userData };
  }
}

export default ReviewClass;
