import { Request, Response, NextFunction } from 'express';

export default interface IUserTripHistoryController {
  getUserTripHistory(req: Request, res: Response, next: NextFunction);
  getAllUserTripHistories(req: Request, res: Response, next: NextFunction);
}
