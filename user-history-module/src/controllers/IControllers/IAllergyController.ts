import { Request, Response, NextFunction } from 'express';

export default interface IAllergyController {
  getAllergies(req: Request, res: Response, next: NextFunction);
  getAllergyById(req: Request, res: Response, next: NextFunction);
  createAllergy(req: Request, res: Response, next: NextFunction);
  updateAllergy(req: Request, res: Response, next: NextFunction);
  deleteAllergy(req: Request, res: Response, next: NextFunction);
}
