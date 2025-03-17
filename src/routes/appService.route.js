import express from "express";
import asyncHandler from "#utils/asyncHandler";
import AppServiceController from "#controllers/appService";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(AppServiceController.get.bind(AppServiceController)))
  .post(asyncHandler(AppServiceController.create.bind(AppServiceController)))
  .put(AppServiceController.update.bind(AppServiceController))
  .delete(AppServiceController.deleteDoc.bind(AppServiceController));

export default router;
