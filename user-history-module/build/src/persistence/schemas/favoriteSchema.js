"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FavoriteSchema = new mongoose_1.default.Schema({
    domainId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Favorite', FavoriteSchema);
//# sourceMappingURL=favoriteSchema.js.map