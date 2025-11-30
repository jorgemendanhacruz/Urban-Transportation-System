import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IFavoritePersistence } from '../dataschema/IFavoritePersistence';

import IFavoriteDTO from "../dto/IFavoriteDTO";
import { Favorite } from "../domain/favorite";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FavoriteMap extends Mapper<Favorite> {

  public static toDTO(favorite: Favorite): IFavoriteDTO {
    return {
      id: favorite.id.toString(),
      userId: favorite.userId,
      entityType: favorite.entityType,
      entityId: favorite.entityId,
      createdAt: favorite.createdAt.toISOString(),
    };
  }

  public static toDomain(favorite: any | Model<IFavoritePersistence & Document>): Favorite {
    const favoriteOrError = Favorite.create(
      favorite,
      new UniqueEntityID(favorite.domainId)
    );

    favoriteOrError.isFailure ? console.log(favoriteOrError.error) : '';

    return favoriteOrError.isSuccess ? favoriteOrError.getValue() : null;
  }

  public static toPersistence(favorite: Favorite): any {
    return {
      domainId: favorite.id.toString(),
      userId: favorite.userId,
      entityType: favorite.entityType,
      entityId: favorite.entityId,
      createdAt: favorite.createdAt.toISOString(),
    }
  }
}