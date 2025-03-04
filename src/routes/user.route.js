import express from "express";
import asyncHandler from "#utils/asyncHandler";
import UserController from "#controllers/user";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(UserController.get.bind(UserController)))
  .post(asyncHandler(UserController.create.bind(UserController)))
  .put(asyncHandler(UserController.update.bind(UserController)))
  .delete(asyncHandler(UserController.deleteDoc.bind(UserController)));

export default router;
