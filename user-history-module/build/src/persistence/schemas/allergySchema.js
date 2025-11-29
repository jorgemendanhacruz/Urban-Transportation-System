"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AllergySchema = new mongoose_1.Schema({
    allergyCode: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Allergy', AllergySchema);
//# sourceMappingURL=allergySchema.js.map