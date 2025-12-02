import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFavoriteController from './IControllers/IFavoriteController';
import IFavoriteService from '../services/IServices/IFavoriteService';
import IFavoriteDTO from '../dto/IFavoriteDTO';

import { Result } from "../core/logic/Result";


@Service()
export default class FavoriteController implements IFavoriteController {
  constructor(
      @Inject(config.services.favorite.name) private favoriteServiceInstance : IFavoriteService
  ) {}

  public async getFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const result = await this.favoriteServiceInstance.getFavorite(userId);

      if (result.isFailure) {
        return res.status(404).send(result.errorValue());
      }

      return res.status(200).json(result.getValue());
    } 
    catch (e) {
      return next(e);
    }
  }

  public async getAllFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.favoriteServiceInstance.getAllFavorites();

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