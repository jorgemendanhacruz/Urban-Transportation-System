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
const config_1 = __importDefault(require("../../config"));
const Result_1 = require("../core/logic/Result");
const FavoriteMap_1 = require("../mappers/FavoriteMap");
let FavoriteService = class FavoriteService {
    constructor(favoriteRepo) {
        this.favoriteRepo = favoriteRepo;
    }
    async getAllFavorites() {
        try {
            const favorites = await this.favoriteRepo.findAll();
            if (!favorites || favorites.length === 0) {
                return Result_1.Result.ok([]);
            }
            const favoriteDtos = favorites.map(fav => FavoriteMap_1.FavoriteMap.toDTO(fav));
            return Result_1.Result.ok(favoriteDtos);
        }
        catch (e) {
            throw e;
        }
    }
    async getFavorite(favoriteId) {
        try {
            const favorite = await this.favoriteRepo.findByDomainId(favoriteId);
            if (favorite === null) {
                return Result_1.Result.fail("Favorite not found");
            }
            else {
                const favoriteDtoResult = FavoriteMap_1.FavoriteMap.toDTO(favorite);
                return Result_1.Result.ok(favoriteDtoResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
FavoriteService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.favorite.name)),
    __metadata("design:paramtypes", [Object])
], FavoriteService);
exports.default = FavoriteService;
//# sourceMappingURL=favoriteService.js.map