import { Result } from "../../core/logic/Result";
import IFavoriteDTO from "../../dto/IFavoriteDTO";

export default interface IFavoriteService  {
  getFavorite (userId: string): Promise<Result<IFavoriteDTO>>;
  getAllFavorites(): Promise<Result<IFavoriteDTO[]>>;
}
