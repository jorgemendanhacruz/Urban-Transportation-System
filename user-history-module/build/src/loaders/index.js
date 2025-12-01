"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    // Schemas
    const userSchema = {
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const allergySchema = {
        name: 'allergySchema',
        schema: '../persistence/schemas/allergySchema',
    };
    const medicalConditionSchema = {
        name: 'medicalConditionSchema',
        schema: '../persistence/schemas/medicalConditionSchema.ts'
    };
    // Controllers
    const favoriteController = {
        name: config_1.default.controllers.favorite.name,
        path: config_1.default.controllers.favorite.path,
    };
    // Repositories
    const favoriteRepo = {
        name: config_1.default.repos.favorite.name,
        path: config_1.default.repos.favorite.path,
    };
    // Services
    const favoriteService = {
        name: config_1.default.services.favorite.name,
        path: config_1.default.services.favorite.path,
    };
    // Dependency Injector
    (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            allergySchema,
            medicalConditionSchema,
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
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    // Express Loader
    (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map