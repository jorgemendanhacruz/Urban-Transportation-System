import { Request, Response, NextFunction } from 'express';

export default interface IMedicalConditionController {
  getMedicalConditions(req: Request, res: Response, next: NextFunction);
  getMedicalConditionById(req: Request, res: Response, next: NextFunction);
  createMedicalCondition(req: Request, res: Response, next: NextFunction);
  updateMedicalCondition(req: Request, res: Response, next: NextFunction);
  deleteMedicalCondition(req: Request, res: Response, next: NextFunction);
}
