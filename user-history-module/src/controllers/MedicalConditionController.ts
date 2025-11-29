import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IMedicalConditionService from '../services/IServices/IMedicalConditionService';
import IMedicalConditionDTO from '../dto/IMedicalConditionDTO';
import IMedicalConditionController from './IControllers/IMedicalConditionController';

@Service()
export default class MedicalConditionController implements IMedicalConditionController {
  constructor(
    @Inject(config.services.medicalCondition.name) private medicalConditionServiceInstance: IMedicalConditionService
  ) { }


  public async getMedicalConditions(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.medicalConditionServiceInstance.getMedicalConditions();
      if (result.isFailure) {
        return res.status(400).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async getMedicalConditionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.medicalConditionServiceInstance.getMedicalConditionById(id);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async createMedicalCondition(req: Request, res: Response, next: NextFunction) {
    try {
      const medicalConditionDTO = req.body as IMedicalConditionDTO;
      const result = await this.medicalConditionServiceInstance.createMedicalCondition(medicalConditionDTO);
      if (result.isFailure) {
        return res.status(400).json(result.error);
      }
      return res.status(201).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async updateMedicalCondition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const medicalConditionDTO = req.body as Partial<IMedicalConditionDTO>;
      const result = await this.medicalConditionServiceInstance.updateMedicalCondition(id, medicalConditionDTO);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async deleteMedicalCondition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.medicalConditionServiceInstance.deleteMedicalCondition(id);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json({ message: "Medical condition deleted!" });
    } catch (error) {
      return next(error);
    }
  }
}
