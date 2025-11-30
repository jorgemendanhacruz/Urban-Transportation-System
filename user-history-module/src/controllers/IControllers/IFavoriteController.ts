import { Request, Response, NextFunction } from 'express';

export default interface IFavoriteController {
  getFavorite(req: Request, res: Response, next: NextFunction);
  getAllFavorites(req: Request, res: Response, next: NextFunction);
}
