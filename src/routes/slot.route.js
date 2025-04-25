import express from "express";
import asyncHandler from "#utils/asyncHandler";
import SlotController from "#controllers/slot";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(SlotController.get.bind(SlotController)))
  .post(asyncHandler(SlotController.create.bind(SlotController)))
  .put(SlotController.update.bind(SlotController))
  .delete(SlotController.deleteDoc.bind(SlotController));

export default router;
