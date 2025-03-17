import express from "express";
import User from "#models/user";
import joiValidator from "#middlewares/joi";
import asyncHandler from "#utils/asyncHandler";
import UserController from "#controllers/user";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(UserController.get.bind(UserController)))
  .post(
    joiValidator(User),
    asyncHandler(UserController.create.bind(UserController)),
  )
  .put(
    joiValidator(User, true),
    asyncHandler(UserController.update.bind(UserController)),
  )
  .delete(asyncHandler(UserController.deleteDoc.bind(UserController)));

export default router;
