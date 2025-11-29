import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IMedicalConditionController from '../../controllers/IControllers/IMedicalConditionController';

const route = Router();

export default (app: Router) => {
  app.use('/medicalCondition', route)

  const ctrl = Container.get(config.controllers.medicalCondition.name) as IMedicalConditionController;

  route.get(
    '/',
    (req, res, next) => ctrl.getMedicalConditions(req, res, next),
  );

  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getMedicalConditionById(req, res, next),
  );

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        medicalConditionCode: Joi.string().required(),
        designation: Joi.string().required(),
        description: Joi.string().optional(),
        symptoms: Joi.string().optional(),
      }),
    }),
    (req, res, next) => ctrl.createMedicalCondition(req, res, next),
  );

  route.put(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        medicalConditionCode: Joi.string().required(),
        designation: Joi.string().required(),
        description: Joi.string().optional(),
        symptoms: Joi.string().optional(),
      }),
    }),
    (req, res, next) => ctrl.updateMedicalCondition(req, res, next),
  );

  route.delete(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deleteMedicalCondition(req, res, next),
  );
}
