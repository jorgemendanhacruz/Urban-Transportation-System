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
const Result_1 = require("../core/logic/Result");
const MedicalConditionMap_1 = __importDefault(require("../mappers/MedicalConditionMap"));
let MedicalConditionService = class MedicalConditionService {
    constructor(medicalConditionRepo) {
        this.medicalConditionRepo = medicalConditionRepo;
    }
    async getMedicalConditions() {
        const medicalConditions = await this.medicalConditionRepo.getAll();
        return Result_1.Result.ok(medicalConditions.map(MedicalConditionMap_1.default.toDTO));
    }
    async getMedicalConditionById(id) {
        const medicalCondition = await this.medicalConditionRepo.getById(id);
        if (!medicalCondition) {
            return Result_1.Result.fail('MedicalCondition not found');
        }
        return Result_1.Result.ok(MedicalConditionMap_1.default.toDTO(medicalCondition));
    }
    async createMedicalCondition(medicalConditionDTO) {
        const medicalCondition = MedicalConditionMap_1.default.toPersistence(medicalConditionDTO);
        const newMedicalCondition = await this.medicalConditionRepo.create(medicalCondition);
        return Result_1.Result.ok(MedicalConditionMap_1.default.toDTO(newMedicalCondition));
    }
    async updateMedicalCondition(id, medicalConditionDTO) {
        const updatedMedicalCondition = await this.medicalConditionRepo.update(id, MedicalConditionMap_1.default.toPersistence(medicalConditionDTO));
        if (!updatedMedicalCondition) {
            return Result_1.Result.fail('MedicalCondition not found');
        }
        return Result_1.Result.ok(MedicalConditionMap_1.default.toDTO(updatedMedicalCondition));
    }
    async deleteMedicalCondition(id) {
        const medicalCondition = await this.medicalConditionRepo.getById(id);
        if (!medicalCondition) {
            return Result_1.Result.fail('MedicalCondition not found');
        }
        await this.medicalConditionRepo.delete(id);
        return Result_1.Result.ok();
    }
};
MedicalConditionService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('MedicalConditionRepo')),
    __metadata("design:paramtypes", [Object])
], MedicalConditionService);
exports.default = MedicalConditionService;
//# sourceMappingURL=medicalConditionService.js.map