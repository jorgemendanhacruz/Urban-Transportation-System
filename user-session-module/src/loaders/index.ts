import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';
import config from '../config/config';
import loadRedis from './redis';

export default async ({ expressApp }) => {
  const redisConnection = await loadRedis();
  Logger.info('✌️ DB loaded and connected!');

  //externalAPIs
  const weatherApiClient = {
    name: config.weatherApi.name,
    path: config.weatherApi.path,
  };

  const newsApiClient = {
    name: config.newsApi.name,
    path: config.newsApi.path,
  }

  // Schemas
  const weahterSchema = {
    name: 'weatherSchema',
    schema: '../persistence/schemas/weatherSchema',
  };

  const newsSchema = {
    name: 'newsSchema',
    schema: '../persistence/schemas/newsSchema',
  };

  // Controllers
  const weatherController = {
    name: config.controllers.weather.name,
    path: config.controllers.weather.path,
  };

  const newsController = {
    name: config.controllers.news.name,
    path: config.controllers.news.path,
  };

  // Repositories
  const weatherRepo = {
    name: config.repos.weather.name,
    path: config.repos.weather.path,
  };

  const newsRepo = {
    name: config.repos.news.name,
    path: config.repos.news.path,
  };


  // Services
  const weatherService = {
    name: config.services.weather.name,
    path: config.services.weather.path,
  };

  const newsService = {
    name: config.services.news.name,
    path: config.services.news.path,
  };

  // Dependency Injector
  dependencyInjectorLoader({
    redisConnection,
    externalAPIs: [weatherApiClient, newsApiClient],
    schemas: [weahterSchema, newsSchema],
    controllers: [weatherController, newsController],
    repos: [weatherRepo, newsRepo],
    services: [weatherService, newsService],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  // Express Loader
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
