import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { FavoriteId } from "./favoriteId";


interface FavoriteProps {
  userId: string;
  entityType: "line" | "stop" | "itinerary";
  entityId: string;
  createdAt: Date;
}

export class Favorite extends AggregateRoot<FavoriteProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get favoriteId(): FavoriteId {
    return new FavoriteId(this.favoriteId.toValue());
  }

  get userId(): string {
    return this.props.userId;
  }

  get entityType(): "line" | "stop" | "itinerary" {
    return this.props.entityType;
  }

  get entityId(): string {
    return this.props.entityId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }


  private constructor(props: FavoriteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FavoriteProps, id?: UniqueEntityID): Result<Favorite> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.entityType, argumentName: 'entityType' },
      { argument: props.entityId, argumentName: 'entityId' },
      { argument: props.createdAt, argumentName: 'createdAt' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Favorite>(guardResult.message)
    }
    else {
      const favorite = new Favorite({
        ...props
      }, id);

      return Result.ok<Favorite>(favorite);
    }
  }
}
