import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IUserTripHistoryPersistence from "../dataschema/IUserTripHistoryPersistence";
import { UserTripHistory } from "../domain/userTripHistory";
import IUserTripHistoryDTO from "../dto/IUserTripHistoryDTO";

export class UserTripHistoryMap extends Mapper<UserTripHistory> {

  public static toDTO(userTripHistory: UserTripHistory): IUserTripHistoryDTO {
    return {
      id: userTripHistory.id.toString(),
      userId: userTripHistory.userId,
      tripId: userTripHistory.tripId,
      date: userTripHistory.date,
      origin: userTripHistory.origin,
      destination: userTripHistory.destination,
    };
  }

  public static toDomain(userTripHistory: any | Model<IUserTripHistoryPersistence & Document>): UserTripHistory {
    
    const userTripHistoryOrError = UserTripHistory.create(
      {
      userId: userTripHistory.userId,
      tripId: userTripHistory.tripId,
      date: userTripHistory.date,
      origin: userTripHistory.origin,
      destination: userTripHistory.destination,
    },
      new UniqueEntityID(userTripHistory.domainId)
    );

    userTripHistoryOrError.isFailure ? console.log(userTripHistoryOrError.error) : '';

    return userTripHistoryOrError.isSuccess ? userTripHistoryOrError.getValue() : null;
  }

  public static toPersistence(userTripHistory: UserTripHistory): any {
    return {
      domainId: userTripHistory.id.toString(),
      userId: userTripHistory.userId,
      tripId: userTripHistory.tripId,
      date: userTripHistory.date,
      origin: userTripHistory.origin,
      destination: userTripHistory.destination,
    }
  }
}