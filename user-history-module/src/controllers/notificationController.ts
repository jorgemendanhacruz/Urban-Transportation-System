import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import INotificationController from './IControllers/INotificationController';
import INotificationService from '../services/IServices/INotificationService';
import INotificationDTO from '../dto/INotificationDTO';

import { Result } from "../core/logic/Result";


@Service()
export default class NotificationController implements INotificationController {
  constructor(
      @Inject(config.services.notification.name) private notificationServiceInstance : INotificationService
  ) {}

  public async getNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const result = await this.notificationServiceInstance.getNotification(userId);

      if (result.isFailure) {
        return res.status(404).send(result.errorValue());
      }

      return res.status(200).json(result.getValue());
    } 
    catch (e) {
      return next(e);
    }
  }

  public async getAllNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.notificationServiceInstance.getAllNotifications();

      if (result.isFailure) {
        return res.status(400).send(result.errorValue());
      }

      return res.status(200).json(result.getValue());
    } 
    catch (e) {
      return next(e);
    }
  }

}