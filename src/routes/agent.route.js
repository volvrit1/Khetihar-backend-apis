import express from "express";
import Agent from "#models/agent";
import joiValidator from "#middlewares/joi";
import asyncHandler from "#utils/asyncHandler";
import AgentController from "#controllers/agent";

const router = express.Router();

router
  .route("/login")
  .post(asyncHandler(AgentController.login.bind(AgentController)));

router
  .route("/send-otp")
  .post(asyncHandler(AgentController.sendOtp.bind(AgentController)));

router
  .route("/:id?")
  .get(asyncHandler(AgentController.get.bind(AgentController)))
  .post(
    joiValidator(Agent),
    asyncHandler(AgentController.create.bind(AgentController)),
  )
  .put(
    joiValidator(Agent, true),
    asyncHandler(AgentController.update.bind(AgentController)),
  )
  .delete(asyncHandler(AgentController.deleteDoc.bind(AgentController)));

export default router;
