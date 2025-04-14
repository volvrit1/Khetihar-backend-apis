import express from "express";
import asyncHandler from "#utils/asyncHandler";
import OtpController from "#controllers/otp";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(OtpController.get.bind(OtpController)))
  .post(asyncHandler(OtpController.create.bind(OtpController)))
  .put(OtpController.update.bind(OtpController))
  .delete(OtpController.deleteDoc.bind(OtpController));

export default router;
