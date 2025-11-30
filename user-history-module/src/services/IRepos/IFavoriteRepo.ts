import { Repo } from "../../core/infra/Repo";
import { Favorite } from "../../domain/favorite";
import { FavoriteId } from "../../domain/favoriteId";

export default interface IFavoriteRepo extends Repo<Favorite> {
  findByDomainId (favoriteId: FavoriteId | string): Promise<Favorite>;
  findAll (): Promise<Favorite[]>;
}