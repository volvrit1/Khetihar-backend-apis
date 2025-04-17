import express from "express";
import Booking from "#models/booking";
import joiValidator from "#middlewares/joi";
import asyncHandler from "#utils/asyncHandler";
import BookingController from "#controllers/booking";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BookingController.get.bind(BookingController)))
  .post(asyncHandler(BookingController.create.bind(BookingController)))
  .put(asyncHandler(BookingController.update.bind(BookingController)))
  .delete(asyncHandler(BookingController.deleteDoc.bind(BookingController)));

export default router;
