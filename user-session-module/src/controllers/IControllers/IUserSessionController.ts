import { Request, Response, NextFunction } from "express";

export default interface IUserSessionController {
    getAllUserSessions(req: Request, res: Response, next: NextFunction);
    getUserSessionByUser(req: Request, res: Response, next: NextFunction);
}