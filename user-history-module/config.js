import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const args = process.argv.slice(2);
const user = args[0] || 'default';


export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * Connection string
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    favorite: {
      name: "FavoriteController",
      path: "../controllers/favoriteController",
    },

    notification: {
      name: "NotificationController",
      path: "../controllers/notificationController",
    },

    userTripHistory: {
      name: "UserTripHistoryController",
      path: "../controllers/userTripHistoryController",
    }
  },

  repos: {
    favorite: {
      name: "FavoriteRepo",
      path: "../repos/favoriteRepo",
    },

    notification: {
      name: "NotificationRepo",
      path: "../repos/notificationRepo",
    },

    userTripHistory: {
      name: "UserTripHistoryRepo",
      path: "../repos/userTripHistoryRepo",
    }
  },

  services: {
    favorite: {
      name: "FavoriteService",
      path: "../services/favoriteService",
    },

    notification: {
      name: "NotificationService",
      path: "../services/notificationService",
    },

    userTripHistory: {
      name: "UserTripHistoryService",
      path: "../services/userTripHistoryService",
    }
  }
};
