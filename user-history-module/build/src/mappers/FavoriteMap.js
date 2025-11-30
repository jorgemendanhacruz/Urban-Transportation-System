"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const favorite_1 = require("../domain/favorite");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class FavoriteMap extends Mapper_1.Mapper {
    static toDTO(favorite) {
        return {
            id: favorite.id.toString(),
            userId: favorite.userId,
            entityType: favorite.entityType,
            entityId: favorite.entityId,
            createdAt: favorite.createdAt.toISOString(),
        };
    }
    static toDomain(favorite) {
        const favoriteOrError = favorite_1.Favorite.create(favorite, new UniqueEntityID_1.UniqueEntityID(favorite.domainId));
        favoriteOrError.isFailure ? console.log(favoriteOrError.error) : '';
        return favoriteOrError.isSuccess ? favoriteOrError.getValue() : null;
    }
    static toPersistence(favorite) {
        return {
            domainId: favorite.id.toString(),
            userId: favorite.userId,
            entityType: favorite.entityType,
            entityId: favorite.entityId,
            createdAt: favorite.createdAt.toISOString(),
        };
    }
}
exports.FavoriteMap = FavoriteMap;
//# sourceMappingURL=FavoriteMap.js.map