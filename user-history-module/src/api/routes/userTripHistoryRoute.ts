import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IUserTripHistoryController from '../../controllers/IControllers/IUserTripHistoryController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/userTripHistory', route);

  const ctrl = Container.get(config.controllers.userTripHistory.name) as IUserTripHistoryController;

  route.get(
    '/',
    (req, res, next) => ctrl.getAllUserTripHistories(req, res, next)
  );

  route.get(
    '/:userId',
    celebrate({
      params: Joi.object({
        userId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getUserTripHistory(req, res, next)
  );


};
