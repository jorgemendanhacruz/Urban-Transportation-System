"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
let MedicalConditionController = class MedicalConditionController {
    constructor(medicalConditionServiceInstance) {
        this.medicalConditionServiceInstance = medicalConditionServiceInstance;
    }
    async getMedicalConditions(req, res, next) {
        try {
            const result = await this.medicalConditionServiceInstance.getMedicalConditions();
            if (result.isFailure) {
                return res.status(400).json(result.error);
            }
            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }
    async getMedicalConditionById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.medicalConditionServiceInstance.getMedicalConditionById(id);
            if (result.isFailure) {
                return res.status(404).json(result.error);
            }
            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }
    async createMedicalCondition(req, res, next) {
        try {
            const medicalConditionDTO = req.body;
            const result = await this.medicalConditionServiceInstance.createMedicalCondition(medicalConditionDTO);
            if (result.isFailure) {
                return res.status(400).json(result.error);
            }
            return res.status(201).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }
    async updateMedicalCondition(req, res, next) {
        try {
            const { id } = req.params;
            const medicalConditionDTO = req.body;
            const result = await this.medicalConditionServiceInstance.updateMedicalCondition(id, medicalConditionDTO);
            if (result.isFailure) {
                return res.status(404).json(result.error);
            }
            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }
    async deleteMedicalCondition(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.medicalConditionServiceInstance.deleteMedicalCondition(id);
            if (result.isFailure) {
                return res.status(404).json(result.error);
            }
            return res.status(200).json({ message: "Medical condition deleted!" });
        }
        catch (error) {
            return next(error);
        }
    }
};
MedicalConditionController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.medicalCondition.name)),
    __metadata("design:paramtypes", [Object])
], MedicalConditionController);
exports.default = MedicalConditionController;
//# sourceMappingURL=MedicalConditionController.js.map