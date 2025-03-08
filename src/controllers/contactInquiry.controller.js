import ContactInquiryService from "#services/contactInquiry";
import Controller from "#controllers/base";

class ContactInquiryController extends Controller {
  static Service = ContactInquiryService;
}

export default ContactInquiryController;
