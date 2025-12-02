import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IUserTripHistoryController from './IControllers/IUserTripHistoryController';
import IUserTripHistoryService from '../services/IServices/IUserTripHistoryService';


@Service()
export default class UserTripHistoryController implements IUserTripHistoryController {
  constructor(
      @Inject(config.services.userTripHistory.name) private userTripHistoryServiceInstance : IUserTripHistoryService
  ) {}

  public async getUserTripHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const result = await this.userTripHistoryServiceInstance.getUserTripHistory(userId);

      if (result.isFailure) {
        return res.status(404).send(result.errorValue());
      }

      return res.status(200).json(result.getValue());
    } 
    catch (e) {
      return next(e);
    }
  }

  public async getAllUserTripHistories(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userTripHistoryServiceInstance.getAllUserTripHistories();

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