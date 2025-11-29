"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalConditionSchema = new mongoose_1.Schema({
    medicalConditionCode: {
        type: String,
        required: true,
        unique: true
    },
    designation: { type: String,
        required: true
    },
    description: {
        type: String
    },
    symptoms: {
        type: String
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('MedicalCondition', medicalConditionSchema);
//# sourceMappingURL=medicalConditionSchema.js.map