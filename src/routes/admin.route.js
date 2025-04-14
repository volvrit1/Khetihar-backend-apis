import express from "express";
import Admin from "#models/admin";
import authentication from "#middlewares/authentication";
import joiValidator from "#middlewares/joi";
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
  .route("/:id?")
  .get(asyncHandler(AdminController.get.bind(AdminController)))
  .post(
    joiValidator(Admin),
    asyncHandler(AdminController.create.bind(AdminController)),
  )
  .put(
    joiValidator(Admin, true),
    asyncHandler(AdminController.update.bind(AdminController)),
  )
  .delete(asyncHandler(AdminController.deleteDoc.bind(AdminController)));

export default router;
