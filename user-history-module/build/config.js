"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const args = process.argv.slice(2);
const user = args[0] || 'default';
exports.default = {
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
        }
    },
    repos: {
        favorite: {
            name: "FavoriteRepo",
            path: "../repos/favoriteRepo",
        }
    },
    services: {
        favorite: {
            name: "FavoriteService",
            path: "../services/favoriteService",
        }
    },
};
//# sourceMappingURL=config.js.map