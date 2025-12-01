import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  // Schemas
  const favoriteSchema = {
    name: 'favoriteSchema',
    schema: '../persistence/schemas/favoriteSchema',
  };

  // Controllers
  const favoriteController = {
    name: config.controllers.favorite.name,
    path: config.controllers.favorite.path,
  }

  // Repositories
  const favoriteRepo = {
    name: config.repos.favorite.name,
    path: config.repos.favorite.path,
  }

  // Services
  const favoriteService = {
    name: config.services.favorite.name,
    path: config.services.favorite.path,
  }

  // Dependency Injector
  dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      favoriteSchema,
    ],
    controllers: [
      favoriteController
    ],
    repos: [
      favoriteRepo
    ],
    services: [
      favoriteService
    ],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  // Express Loader
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
