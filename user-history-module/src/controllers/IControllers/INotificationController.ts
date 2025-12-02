import { Request, Response, NextFunction } from 'express';

export default interface INotificationController {
  getNotification(req: Request, res: Response, next: NextFunction);
  getAllNotifications(req: Request, res: Response, next: NextFunction);
}
