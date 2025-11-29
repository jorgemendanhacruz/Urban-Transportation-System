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
const mongoose_1 = require("mongoose");
const medicalConditionSchema_1 = __importDefault(require("../persistence/schemas/medicalConditionSchema"));
let medicalConditionRepo = class medicalConditionRepo {
    constructor(medicalConditionSchema) {
        this.medicalConditionSchema = medicalConditionSchema;
    }
    async getAll() {
        const medicalConditions = await medicalConditionSchema_1.default.find();
        return medicalConditions.map((medicalCondition) => ({
            _id: medicalCondition._id.toString(),
            medicalConditionCode: medicalCondition.medicalConditionCode,
            designation: medicalCondition.designation,
            description: medicalCondition.description,
            symptoms: medicalCondition.symptoms,
        }));
    }
    async getById(id) {
        const medicalCondition = await medicalConditionSchema_1.default.findById(id);
        if (!medicalCondition)
            return null;
        return {
            _id: medicalCondition._id.toString(),
            medicalConditionCode: medicalCondition.medicalConditionCode,
            designation: medicalCondition.designation,
            description: medicalCondition.description,
            symptoms: medicalCondition.symptoms,
        };
    }
    async create(medicalCondition) {
        const createdMedicalCondition = await medicalConditionSchema_1.default.create(medicalCondition);
        return {
            _id: createdMedicalCondition._id.toString(),
            medicalConditionCode: createdMedicalCondition.medicalConditionCode,
            designation: createdMedicalCondition.designation,
            description: createdMedicalCondition.description,
            symptoms: createdMedicalCondition.symptoms,
        };
    }
    /*public async update(id: string, medicalCondition: Partial<IMedicalConditionPersistence>): Promise<IMedicalConditionPersistence | null> {
      const updatedMedicalCondition = await MedicalCondition.findByIdAndUpdate(id, medicalCondition, { new: true });
      if (!updatedMedicalCondition) return null;
  
      return {
        _id: updatedMedicalCondition._id.toString(),
        medicalConditionCode: updatedMedicalCondition.medicalConditionCode,
        designation: updatedMedicalCondition.designation,
        description: updatedMedicalCondition.description,
        symptoms: updatedMedicalCondition.symptoms,
      };
    }*/
    async update(id, medicalCondition) {
        try {
            // Attempt to find and update the medical condition
            const updatedMedicalCondition = await medicalConditionSchema_1.default.findByIdAndUpdate(id, medicalCondition, { new: true, runValidators: true } // Ensure we get the updated doc and run schema validations
            );
            // If not found, return null
            if (!updatedMedicalCondition) {
                return null;
            }
            // Map the result to IMedicalConditionPersistence
            return {
                _id: updatedMedicalCondition._id.toString(),
                medicalConditionCode: updatedMedicalCondition.medicalConditionCode,
                designation: updatedMedicalCondition.designation,
                description: updatedMedicalCondition.description,
                symptoms: updatedMedicalCondition.symptoms,
            };
        }
        catch (error) {
            // Optionally, log the error or handle it
            console.error(`Error updating medical condition with ID ${id}:`, error);
            throw new Error('Failed to update medical condition');
        }
    }
    async delete(id) {
        const deletedMedicalCondition = await medicalConditionSchema_1.default.findByIdAndDelete(id);
        if (!deletedMedicalCondition) {
            throw new Error('Allergy not found');
        }
    }
};
medicalConditionRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('medicalConditionSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], medicalConditionRepo);
exports.default = medicalConditionRepo;
//# sourceMappingURL=medicalConditionRepo.js.map