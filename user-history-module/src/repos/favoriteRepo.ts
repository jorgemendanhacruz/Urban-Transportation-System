import { Service, Inject } from 'typedi';

import { Favorite } from "../domain/favorite";
import { FavoriteId } from "../domain/favoriteId";
import { FavoriteMap } from "../mappers/FavoriteMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IFavoritePersistence } from '../dataschema/IFavoritePersistence';
import IFavoriteRepo from '../services/IRepos/IFavoriteRepo';

@Service()
export default class FavoriteRepo implements IFavoriteRepo {
  private models: any;

  constructor(
    @Inject('favoriteSchema') private favoriteSchema: Model<IFavoritePersistence & Document>,
  ) { }


  exists(t: Favorite): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: Favorite): Promise<Favorite> {
    throw new Error('Method not implemented.');
  }


  public async findAll(): Promise<Favorite[]> {
    const favoriteRecords = await this.favoriteSchema.find();

    if (!favoriteRecords || favoriteRecords.length === 0) {
      return [];
    }

    return favoriteRecords.map((record) => FavoriteMap.toDomain(record));
  }


  public async findByDomainId(favoriteId: FavoriteId | string): Promise<Favorite> {
    const query = { domainId: favoriteId };
    const favoriteRecord = await this.favoriteSchema.findOne(query as FilterQuery<IFavoritePersistence & Document>);

    if (favoriteRecord != null) {
      return FavoriteMap.toDomain(favoriteRecord);
    }
    else
      return null;
  }
}