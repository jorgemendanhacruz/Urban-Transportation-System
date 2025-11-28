import 'reflect-metadata'; //Needed to use typedi decorators
import express from 'express';
import Logger from './loaders/logger';
import config from './config/config'


async function startServer() {

  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################

    `);

  })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });

}

startServer();