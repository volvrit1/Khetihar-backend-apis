import express from "express";
import asyncHandler from "#utils/asyncHandler";
import ReviewController from "#controllers/review";

const router = express.Router();

router
  .route("/base-fields")
  .get(asyncHandler(ReviewController.getBaseFields.bind(ReviewController)));

router
  .route("/:id?")
  .get(asyncHandler(ReviewController.get.bind(ReviewController)))
  .post(asyncHandler(ReviewController.create.bind(ReviewController)))
  .put(ReviewController.update.bind(ReviewController))
  .delete(ReviewController.deleteDoc.bind(ReviewController));

export default router;
