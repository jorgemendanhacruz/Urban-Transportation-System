import dotenv from "dotenv";
import axios from "axios";
import config from "../config/config";
import Newsapi from 'newsapi'
import INewsApiClient from './IExternalAPIs/INewsApiClient';
import { Service } from 'typedi';

@Service()
export default class NewsApiClient implements INewsApiClient {

    private readonly url: string;
    private readonly apiKey: string;

    constructor() {
        this.url = config.newsApi.url;
        this.apiKey = process.env.NEWS_API_KEY;
    }

    public async getLatest10Headlines() {

        try {
            const response = await axios.get(
                this.url +
                `country=us&pageSize=10&apiKey=${this.apiKey}`,
            );
            return response.data;
        } catch (error) {
            console.error(
                'Error fetching weather:',
                error.response?.data || error.message,
            );
        }

    }
}