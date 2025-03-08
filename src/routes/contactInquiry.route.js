import express from "express";
import asyncHandler from "#utils/asyncHandler";
import ContactInquiryController from "#controllers/contactInquiry";

const router = express.Router();

router
  .route("/:id?")
  .get(
    asyncHandler(ContactInquiryController.get.bind(ContactInquiryController)),
  )
  .post(
    asyncHandler(
      ContactInquiryController.create.bind(ContactInquiryController),
    ),
  )
  .put(ContactInquiryController.update.bind(ContactInquiryController))
  .delete(ContactInquiryController.deleteDoc.bind(ContactInquiryController));

export default router;
