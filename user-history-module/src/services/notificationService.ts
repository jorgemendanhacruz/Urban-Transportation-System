import { Service, Inject } from 'typedi';
import config from "../../config";
import INotificationDTO from '../dto/INotificationDTO';
import { Notification } from "../domain/notification";
import INotificationRepo from './IRepos/INotificationRepo';
import INotificationService from './IServices/INotificationService';
import { Result } from "../core/logic/Result";
import { NotificationMap } from "../mappers/NotificationMap";

@Service()
export default class NotificationService implements INotificationService {
  constructor(
    @Inject(config.repos.notification.name) private notificationRepo: INotificationRepo
  ) { }

  public async getAllNotifications(): Promise<Result<INotificationDTO[]>> {
    try {
      const notifications = await this.notificationRepo.findAll();

      //console.log(favorites)

      if (!notifications || notifications.length === 0) {
        return Result.ok<INotificationDTO[]>([]);
      }

      const notificationDtos = notifications.map(not => NotificationMap.toDTO(not) as INotificationDTO);

      return Result.ok<INotificationDTO[]>(notificationDtos);
    } catch (e) {
      throw e;
    }
  }

  public async getNotification(userId: string): Promise<Result<INotificationDTO[]>> {

    try {
      const notifications = await this.notificationRepo.findByUserId(userId);

      if (!notifications || notifications.length === 0) {
        return Result.ok<INotificationDTO[]>([]);
      }

      const notificationDtos = notifications.map(not => NotificationMap.toDTO(not) as INotificationDTO);

      return Result.ok<INotificationDTO[]>(notificationDtos);

    } catch (e) {
      throw e;
    }
  }


}
