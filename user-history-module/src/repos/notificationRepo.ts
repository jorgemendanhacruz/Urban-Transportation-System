import { Service, Inject } from 'typedi';

import { Notification } from "../domain/notification";
import { NotificationId } from "../domain/notificationId";
import { NotificationMap } from "../mappers/NotificationMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { INotificationPersistence } from '../dataschema/INotificationPersistence';
import INotificationRepo from '../services/IRepos/INotificationRepo';

@Service()
export default class NotificationRepo implements INotificationRepo {
  private models: any;

  constructor(
    @Inject('notificationSchema') private notificationSchema: Model<INotificationPersistence & Document>,
  ) { }


  exists(t: Notification): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: Notification): Promise<Notification> {
    throw new Error('Method not implemented.');
  }


  public async findAll(): Promise<Notification[]> {

    const notificationRecords = await this.notificationSchema.find();

    if (!notificationRecords || notificationRecords.length === 0) {
      return [];
    }

    return notificationRecords.map((notification) => NotificationMap.toDomain(notification));
  }


  public async findByUserId(userId: string): Promise<Notification> {
    const query = { userId: userId };
    const notificationRecord = await this.notificationSchema.findOne(query as FilterQuery<INotificationPersistence & Document>);

    if (notificationRecord != null) {
      return NotificationMap.toDomain(notificationRecord);
    }
    else
      return null;
  }
}