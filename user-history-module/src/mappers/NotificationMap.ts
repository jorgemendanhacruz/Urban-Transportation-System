import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { INotificationPersistence } from '../dataschema/INotificationPersistence';

import INotificationDTO from "../dto/INotificationDTO";
import { Notification } from "../domain/notification";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class NotificationMap extends Mapper<Notification> {

  public static toDTO(notification: Notification): INotificationDTO {
    return {
      id: notification.id.toString(),
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      status: notification.status,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }

  public static toDomain(notification: any | Model<INotificationPersistence & Document>): Notification {
    
    const notificationOrError = Notification.create(
      {
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      status: notification.status,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    },
      new UniqueEntityID(notification.domainId)
    );

    notificationOrError.isFailure ? console.log(notificationOrError.error) : '';

    return notificationOrError.isSuccess ? notificationOrError.getValue() : null;
  }

  public static toPersistence(notification: Notification): any {
    return {
      domainId: notification.id.toString(),
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      status: notification.status,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    }
  }
}