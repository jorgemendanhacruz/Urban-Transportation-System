import { Repo } from "../../core/infra/Repo";
import { Notification } from "../../domain/notification";
import { NotificationId } from "../../domain/notificationId";

export default interface INotificationRepo extends Repo<Notification> {
  findByUserId (userId: string): Promise<Notification[]>;
  findAll (): Promise<Notification[]>;
}