import express from "express";
import asyncHandler from "#utils/asyncHandler";
import LandController from "#controllers/land";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(LandController.get.bind(LandController)))
  .post(asyncHandler(LandController.create.bind(LandController)))
  .put(LandController.update.bind(LandController))
  .delete(LandController.deleteDoc.bind(LandController));

export default router;
