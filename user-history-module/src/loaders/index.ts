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

  const notificationSchema = {
    name: 'notificationSchema',
    schema: '../persistence/schemas/notificationSchema',
  };

  const userTripHistorySchema = {
    name: 'userTripHistorySchema',
    schema: '../persistence/schemas/userTripHistorySchema',
  };

  // Controllers
  const favoriteController = {
    name: config.controllers.favorite.name,
    path: config.controllers.favorite.path,
  }

  const notificationController = {
    name: config.controllers.notification.name,
    path: config.controllers.notification.path,
  }

  const userTripHistoryController = {
    name: config.controllers.userTripHistory.name,
    path: config.controllers.userTripHistory.path,
  }

  // Repositories
  const favoriteRepo = {
    name: config.repos.favorite.name,
    path: config.repos.favorite.path,
  }

  const notificationRepo = {
    name: config.repos.notification.name,
    path: config.repos.notification.path,
  }

  const userTripHistoryRepo = {
    name: config.repos.userTripHistory.name,
    path: config.repos.userTripHistory.path,
  }

  // Services
  const favoriteService = {
    name: config.services.favorite.name,
    path: config.services.favorite.path,
  }

  const notificationService = {
    name: config.services.notification.name,
    path: config.services.notification.path,
  }

  const userTripHistoryService = {
    name: config.services.userTripHistory.name,
    path: config.services.userTripHistory.path,
  }

  // Dependency Injector
  dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      favoriteSchema,
      notificationSchema,
      userTripHistorySchema
    ],
    controllers: [
      favoriteController,
      notificationController,
      userTripHistoryController
    ],
    repos: [
      favoriteRepo,
      notificationRepo,
      userTripHistoryRepo
    ],
    services: [
      favoriteService,
      notificationService,
      userTripHistoryService
    ],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  // Express Loader
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
