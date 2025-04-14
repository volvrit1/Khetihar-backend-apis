import express from "express";
import Cart from "#models/cart";
import joiValidator from "#middlewares/joi";
import asyncHandler from "#utils/asyncHandler";
import CartController from "#controllers/cart";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(CartController.get.bind(CartController)))
  .post(
    joiValidator(Cart),
    asyncHandler(CartController.create.bind(CartController)),
  )
  .put(
    joiValidator(Cart, true),
    asyncHandler(CartController.update.bind(CartController)),
  )
  .delete(asyncHandler(CartController.deleteDoc.bind(CartController)));

export default router;
