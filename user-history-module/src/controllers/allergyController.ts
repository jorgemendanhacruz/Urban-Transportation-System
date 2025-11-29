import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAllergyController from "./IControllers/IAllergyController";
import IAllergyService from '../services/IServices/IAllergyService';
import IAllergyDTO from '../dto/IAllergyDTO';

@Service()
export default class AllergyController implements IAllergyController {
  constructor(
    @Inject(config.services.allergy.name) private allergyServiceInstance : IAllergyService
  ) {}

  public async getAllergies(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.allergyServiceInstance.getAllergies();
      if (result.isFailure) {
        return res.status(400).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async getAllergyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.allergyServiceInstance.getAllergyById(id);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async createAllergy(req: Request, res: Response, next: NextFunction) {
    try {
      const allergyDTO = req.body as IAllergyDTO;
      const result = await this.allergyServiceInstance.createAllergy(allergyDTO);
      if (result.isFailure) {
        return res.status(400).json(result.error);
      }
      return res.status(201).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async updateAllergy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const allergyDTO = req.body as Partial<IAllergyDTO>;
      const result = await this.allergyServiceInstance.updateAllergy(id, allergyDTO);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json(result.getValue());
    } catch (error) {
      return next(error);
    }
  }

  public async deleteAllergy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.allergyServiceInstance.deleteAllergy(id);
      if (result.isFailure) {
        return res.status(404).json(result.error);
      }
      return res.status(200).json({ message: "Allergy deleted!"});
    } catch (error) {
      return next(error);
    }
  }
}
