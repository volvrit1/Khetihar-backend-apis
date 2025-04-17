import express from "express";
import asyncHandler from "#utils/asyncHandler";
import BannerController from "#controllers/banner";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BannerController.get.bind(BannerController)))
  .post(asyncHandler(BannerController.create.bind(BannerController)))
  .put(BannerController.update.bind(BannerController))
  .delete(BannerController.deleteDoc.bind(BannerController));

export default router;
