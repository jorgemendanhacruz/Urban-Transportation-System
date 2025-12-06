import { Result } from "../../core/logic/Result";
import INotificationDTO from "../../dto/INotificationDTO";

export default interface INotificationService  {
  getNotification(userId: string): Promise<Result<INotificationDTO[]>>;
  getAllNotifications(): Promise<Result<INotificationDTO[]>>;
}
