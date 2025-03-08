import Service from "#services/base";
import Notification from "#models/notification";

class NotificationService extends Service {
  static Model = Notification;
}

export default NotificationService;
