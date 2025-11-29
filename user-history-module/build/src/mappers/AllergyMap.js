"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AllergyMap {
    static toDTO(allergy) {
        return {
            id: allergy._id.toString(),
            allergyCode: allergy.allergyCode,
            designation: allergy.designation,
            description: allergy.description,
        };
    }
    static toPersistence(allergyDTO) {
        return {
            allergyCode: allergyDTO.allergyCode,
            designation: allergyDTO.designation,
            description: allergyDTO.description,
        };
    }
}
exports.default = AllergyMap;
//# sourceMappingURL=AllergyMap.js.map