import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';
import config from '../config/config';
import loadRedis from './redis';

export default async ({ expressApp }) => {
  const redisConnection = await loadRedis();
  Logger.info('✌️ DB loaded and connected!');

  // Schemas
  const userSessionSchema = {
    name: 'userSessionSchema',
    schema: '../persistence/schemas/userSessionSchema',
  };

  // Controllers
  const userSessionController = {
    name: config.controllers.userSession.name,
    path: config.controllers.userSession.path,
  };

  // Repositories
  const userSessionRepo = {
    name: config.repos.userSession.name,
    path: config.repos.userSession.path,
  };


  // Services
  const userSessionService = {
    name: config.services.userSession.name,
    path: config.services.userSession.path,
  };


  // Dependency Injector
  dependencyInjectorLoader({
    redisConnection,
    schemas: [userSessionSchema],
    controllers: [userSessionController],
    repos: [userSessionRepo],
    services: [userSessionService],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  // Express Loader
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
