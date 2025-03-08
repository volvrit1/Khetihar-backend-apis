import express from "express";
import asyncHandler from "#utils/asyncHandler";
import EquipmentTypeController from "#controllers/equipmentType";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(EquipmentTypeController.get.bind(EquipmentTypeController)))
  .post(
    asyncHandler(EquipmentTypeController.create.bind(EquipmentTypeController)),
  )
  .put(EquipmentTypeController.update.bind(EquipmentTypeController))
  .delete(EquipmentTypeController.deleteDoc.bind(EquipmentTypeController));

export default router;
