import { Service, Inject } from 'typedi';
import config from "../../config";
import IFavoriteDTO from '../dto/IFavoriteDTO';
import { Favorite } from "../domain/favorite";
import IFavoriteRepo from './IRepos/IFavoriteRepo';
import IFavoriteService from './IServices/IFavoriteService';
import { Result } from "../core/logic/Result";
import { FavoriteMap } from "../mappers/FavoriteMap";

@Service()
export default class FavoriteService implements IFavoriteService {
  constructor(
    @Inject(config.repos.favorite.name) private favoriteRepo: IFavoriteRepo
  ) { }

  public async getAllFavorites(): Promise<Result<IFavoriteDTO[]>> {
    try {
      const favorites = await this.favoriteRepo.findAll();

      //console.log(favorites)

      if (!favorites || favorites.length === 0) {
        return Result.ok<IFavoriteDTO[]>([]);
      }

      const favoriteDtos = favorites.map(fav => FavoriteMap.toDTO(fav) as IFavoriteDTO);

      return Result.ok<IFavoriteDTO[]>(favoriteDtos);
    } catch (e) {
      throw e;
    }
  }

  public async getFavorite(favoriteId: string): Promise<Result<IFavoriteDTO>> {
    try {
      const favorite = await this.favoriteRepo.findByDomainId(favoriteId);

      if (favorite === null) {
        return Result.fail<IFavoriteDTO>("Favorite not found");
      }
      else {
        const favoriteDtoResult = FavoriteMap.toDTO(favorite) as IFavoriteDTO;
        return Result.ok<IFavoriteDTO>(favoriteDtoResult)
      }
    } catch (e) {
      throw e;
    }
  }


}
