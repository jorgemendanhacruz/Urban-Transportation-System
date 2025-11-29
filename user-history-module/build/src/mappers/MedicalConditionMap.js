"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicalCondition_1 = require("../domain/medicalCondition");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class MedicalConditionMap {
    static toDTO(medicalCondition) {
        return {
            id: medicalCondition._id.toString(),
            medicalConditionCode: medicalCondition.medicalConditionCode,
            designation: medicalCondition.designation,
            description: medicalCondition.description,
            symptoms: medicalCondition.symptoms,
        };
    }
    static async toDomain(raw) {
        const medicalConditionOrError = medicalCondition_1.MedicalCondition.create({
            medicalConditionCode: raw.medicalConditionCode,
            designation: raw.designation,
            description: raw.description,
            symptoms: raw.symptoms,
        }, new UniqueEntityID_1.UniqueEntityID(raw.medicalConditionId));
        medicalConditionOrError.isFailure ? console.log(medicalConditionOrError.error) : '';
        return medicalConditionOrError.isSuccess ? medicalConditionOrError.getValue() : null;
    }
    static toPersistence(medicalConditionDTO) {
        return {
            medicalConditionCode: medicalConditionDTO.medicalConditionCode,
            designation: medicalConditionDTO.designation,
            description: medicalConditionDTO.description,
            symptoms: medicalConditionDTO.symptoms,
        };
    }
}
exports.default = MedicalConditionMap;
//# sourceMappingURL=MedicalConditionMap.js.map