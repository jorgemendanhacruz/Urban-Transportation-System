import { Request, Response, NextFunction } from "express";
import { Inject, Service } from 'typedi';
import config from '../config/config'
import INewsController from "./IControllers/INewsController";
import INewsService from "../services/IServices/INewsService";

@Service()
export default class NewsController implements INewsController {

    constructor(
        @Inject(config.services.news.name) private newsService: INewsService
    ) { }



    public async getTop10News(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.newsService.getTop10News();

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