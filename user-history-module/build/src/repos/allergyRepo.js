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
const allergySchema_1 = __importDefault(require("../persistence/schemas/allergySchema"));
let AllergyRepo = class AllergyRepo {
    constructor(allergySchema) {
        this.allergySchema = allergySchema;
    }
    async getAll() {
        const allergies = await allergySchema_1.default.find();
        return allergies.map((allergy) => ({
            _id: allergy._id.toString(),
            allergyCode: allergy.allergyCode,
            designation: allergy.designation,
            description: allergy.description,
        }));
    }
    async getById(id) {
        const allergy = await allergySchema_1.default.findById(id);
        if (!allergy)
            return null;
        return {
            _id: allergy._id.toString(),
            allergyCode: allergy.allergyCode,
            designation: allergy.designation,
            description: allergy.description,
        };
    }
    async create(allergy) {
        const createdAllergy = await allergySchema_1.default.create(allergy);
        return {
            _id: createdAllergy._id.toString(),
            allergyCode: createdAllergy.allergyCode,
            designation: createdAllergy.designation,
            description: createdAllergy.description,
        };
    }
    async update(id, allergy) {
        const updatedAllergy = await allergySchema_1.default.findByIdAndUpdate(id, allergy, { new: true });
        if (!updatedAllergy)
            return null;
        return {
            _id: updatedAllergy._id.toString(),
            allergyCode: updatedAllergy.allergyCode,
            designation: updatedAllergy.designation,
            description: updatedAllergy.description,
        };
    }
    async delete(id) {
        const deletedAllergy = await allergySchema_1.default.findByIdAndDelete(id);
        if (!deletedAllergy) {
            throw new Error('Allergy not found');
        }
    }
};
AllergyRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('allergySchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AllergyRepo);
exports.default = AllergyRepo;
//# sourceMappingURL=allergyRepo.js.map