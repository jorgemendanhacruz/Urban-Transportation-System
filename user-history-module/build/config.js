"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const medicalConditionRoute_1 = __importDefault(require("./src/api/routes/medicalConditionRoute"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const args = process.argv.slice(2);
const user = args[0] || 'default';
// Connection strings
const databaseURLs = {
    joel: "mongodb+srv://joelferreira:WUIbUxXC5Qy2YeJM@node-crud-app.ixyfu.mongodb.net/superbookdb?retryWrites=true&w=majority&appName=node-crud-app",
    fabio: "mongodb+srv://FabioBorges:jcd6jSaxr4eV0tBB@superbookapp.4fdml.mongodb.net/superbookdb?retryWrites=true&w=majority&appName=superbookapp",
    jorge: "mongodb+srv://jorgecruz:Pa$$w0rd1234@superbookapp.krouw.mongodb.net/superbookdb?retryWrites=true&w=majority&appName=superbookapp",
    victor: "mongodb+srv://vns30:In3bHCWXLmy9dWzB@superbookapp.unbah.mongodb.net/superbookdb?retryWrites=true&w=majority&appName=superbookapp",
    filipe: "mongodb+srv://ffc:arqsi@2024@superbookapp.qbd9x.mongodb.net/superbookdb?retryWrites=true&w=majority&appName=superbookapp",
};
const selectedDatabaseURL = databaseURLs[user] || "mongodb://127.0.0.1:27017/test";
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10) || 4000,
    /**
     * Connection string
     */
    databaseURL: selectedDatabaseURL,
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
        role: {
            name: "RoleController",
            path: "../controllers/roleController",
        },
        allergy: {
            name: "AllergyController",
            path: "../controllers/allergyController",
        },
        medicalCondition: {
            name: "MedicalConditionController",
            path: "../controllers/medicalConditionController",
        },
    },
    repos: {
        role: {
            name: "RoleRepo",
            path: "../repos/roleRepo",
        },
        user: {
            name: "UserRepo",
            path: "../repos/userRepo",
        },
        allergy: {
            name: "AllergyRepo",
            path: "../repos/allergyRepo",
        },
        medicalCondition: {
            name: "MedicalConditionRepo",
            path: "../repos/medicalConditionRepo",
        },
    },
    services: {
        role: {
            name: "RoleService",
            path: "../services/roleService",
        },
        allergy: {
            name: "AllergyService",
            path: "../services/allergyService",
        },
        medicalCondition: {
            name: "MedicalConditionService",
            path: "../services/medicalConditionService",
        },
    },
};
//# sourceMappingURL=config.js.map