import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import INotificationController from '../../controllers/IControllers/INotificationController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/notification', route);

  const ctrl = Container.get(config.controllers.notification.name) as INotificationController;

  route.get(
    '/',
    (req, res, next) => ctrl.getAllNotifications(req, res, next)
  );

  route.get(
    '/:userId',
    celebrate({
      params: Joi.object({
        userId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getNotification(req, res, next)
  );


};
