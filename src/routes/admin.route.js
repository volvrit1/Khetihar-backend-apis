import express from "express";
import authentication from "#middlewares/authentication";
import asyncHandler from "#utils/asyncHandler";
import AdminController from "#controllers/admin";

const router = express.Router();

router
  .route("/login")
  .post(asyncHandler(AdminController.login.bind(AdminController)));

router
  .route("/get-current-user")
  .get(
    authentication,
    asyncHandler(AdminController.getCurrentUser.bind(AdminController)),
  );

router
  .route("/booking/:id?")
  .get(asyncHandler(AdminController.getBooking.bind(AdminController)))
  .put(asyncHandler(AdminController.updateBooking.bind(AdminController)));

router
  .route("/land/:id?")
  .get(asyncHandler(AdminController.getLand.bind(AdminController)));

router
  .route("/:id?")
  .get(asyncHandler(AdminController.get.bind(AdminController)))
  .post(asyncHandler(AdminController.create.bind(AdminController)))
  .put(asyncHandler(AdminController.update.bind(AdminController)))
  .delete(asyncHandler(AdminController.deleteDoc.bind(AdminController)));

export default router;
