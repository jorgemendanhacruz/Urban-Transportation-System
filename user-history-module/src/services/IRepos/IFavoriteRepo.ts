import { Repo } from "../../core/infra/Repo";
import { Favorite } from "../../domain/favorite";
import { FavoriteId } from "../../domain/favoriteId";

export default interface IFavoriteRepo extends Repo<Favorite> {
  findByUserId (userId: string): Promise<Favorite>;
  findAll (): Promise<Favorite[]>;
}