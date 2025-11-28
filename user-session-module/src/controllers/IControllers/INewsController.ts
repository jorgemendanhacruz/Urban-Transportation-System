import { Request, Response, NextFunction } from "express";

export default interface INewsController {
    getTop10News(req: Request, res: Response, next: NextFunction);
}