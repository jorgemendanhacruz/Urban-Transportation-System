import { Request, Response, NextFunction } from "express";
import { Inject, Service } from 'typedi';
import config from '../config/config'
import { Result } from "../core/logic/Result";

import IUserSessionController from "./IControllers/IUserSessionController";
import IUserSessionService from "../services/IServices/IUserSessionService";
import IUserSessionDTO from "../dto/IUserSessionDTO";

@Service()
export default class UserSessionController implements IUserSessionController {
    
    constructor(
        @Inject(config.services.userSession.name) private userSessionService: IUserSessionService
    ) { }


    public async getAllUserSessions(req: Request, res: Response, next: NextFunction) {
        try {

            const result = await this.userSessionService.getAllUserSessions();

            if (result.isFailure) {
                return res.status(400).json(result.error);
            }


            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }

    public async getUserSessionByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const result = await this.userSessionService.getUSerSession(userId);

            if (result.isFailure) {
                return res.status(400).json(result.error);
            }

            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }

}