import express from "express";
import asyncHandler from "#utils/asyncHandler";
import CropController from "#controllers/crop";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(CropController.get.bind(CropController)))
  .post(asyncHandler(CropController.create.bind(CropController)))
  .put(CropController.update.bind(CropController))
  .delete(CropController.deleteDoc.bind(CropController));

export default router;
