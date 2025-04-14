import express from "express";
import Booking from "#models/booking";
import joiValidator from "#middlewares/joi";
import asyncHandler from "#utils/asyncHandler";
import BookingController from "#controllers/booking";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BookingController.get.bind(BookingController)))
  .post(
    joiValidator(Booking),
    asyncHandler(BookingController.create.bind(BookingController)),
  )
  .put(
    joiValidator(Booking, true),
    asyncHandler(BookingController.update.bind(BookingController)),
  )
  .delete(asyncHandler(BookingController.deleteDoc.bind(BookingController)));

export default router;
