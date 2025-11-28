import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import config from "../../config/config"
import IUserSessionController from "../../controllers/IControllers/IUserSessionController";

const route = Router();

export default (app: Router) => {
    app.use('/userSession', route);

    const ctrl = Container.get(config.controllers.userSession.name) as IUserSessionController;

    route.get(
        '/',
        (req, res, next) => ctrl.getAllUserSessions(req, res, next),
    );

    route.get(
        '/:userId',
        celebrate({
            params: Joi.object({
                userId: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getUserSessionByUser(req, res, next),
    );

}