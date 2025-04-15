import express from "express";
import asyncHandler from "#utils/asyncHandler";
import UserController from "#controllers/user";

const router = express.Router();

router
  .route("/login")
  .post(asyncHandler(UserController.login.bind(UserController)));

router
  .route("/send-otp")
  .post(asyncHandler(UserController.sendOtp.bind(UserController)));

router
  .route("/:id?")
  .get(asyncHandler(UserController.get.bind(UserController)))
  .post(
    // joiValidator(User),
    asyncHandler(UserController.create.bind(UserController)),
  )
  .put(
    // joiValidator(User, true),
    asyncHandler(UserController.update.bind(UserController)),
  )
  .delete(asyncHandler(UserController.deleteDoc.bind(UserController)));

export default router;
