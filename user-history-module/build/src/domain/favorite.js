"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Guard_1 = require("../core/logic/Guard");
const Result_1 = require("../core/logic/Result");
const favoriteId_1 = require("./favoriteId");
class Favorite extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get favoriteId() {
        return new favoriteId_1.FavoriteId(this.favoriteId.toValue());
    }
    get userId() {
        return this.props.userId;
    }
    get entityType() {
        return this.props.entityType;
    }
    get entityId() {
        return this.props.entityId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.userId, argumentName: 'userId' },
            { argument: props.entityType, argumentName: 'entityType' },
            { argument: props.entityId, argumentName: 'entityId' },
            { argument: props.createdAt, argumentName: 'createdAt' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const favorite = new Favorite(Object.assign({}, props), id);
            return Result_1.Result.ok(favorite);
        }
    }
}
exports.Favorite = Favorite;
//# sourceMappingURL=favorite.js.map