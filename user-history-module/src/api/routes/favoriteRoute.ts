import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFavoriteController from '../../controllers/IControllers/IFavoriteController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/favorite', route);

  const ctrl = Container.get(config.controllers.favorite.name) as IFavoriteController;

  route.get(
    '/',
    (req, res, next) => ctrl.getAllFavorites(req, res, next)
  );
  
  route.get(
    '/:favoriteId',
    celebrate({
      params: Joi.object({
        favoriteId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getFavorite(req, res, next)
  );

  
};
