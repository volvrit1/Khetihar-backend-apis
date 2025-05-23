import express from "express";
import asyncHandler from "#utils/asyncHandler";
import EquipmentController from "#controllers/equipment";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(EquipmentController.get.bind(EquipmentController)))
  .post(asyncHandler(EquipmentController.create.bind(EquipmentController)))
  .put(asyncHandler(EquipmentController.update.bind(EquipmentController)))
  .delete(
    asyncHandler(EquipmentController.deleteDoc.bind(EquipmentController)),
  );

export default router;
