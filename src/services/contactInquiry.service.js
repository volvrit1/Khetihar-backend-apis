import Service from "#services/base";
import ContactInquiry from "#models/contactInquiry";

class ContactInquiryService extends Service {
  static Model = ContactInquiry;
}

export default ContactInquiryService;
