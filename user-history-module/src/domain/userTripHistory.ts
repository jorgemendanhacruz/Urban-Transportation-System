import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { UserTripHistoryId } from "./userTripHistoryId";


interface UserTripHistoryProps {
  userId: string;
  tripId: string;
  date: string;
  origin: string;
  destination: string;
}

export class UserTripHistory extends AggregateRoot<UserTripHistoryProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userTripHistoryId(): UserTripHistoryId {
    return new UserTripHistoryId(this.userTripHistoryId.toValue());
  }

  get userId(): string {
    return this.props.userId;
  }

  get tripId(): string {
    return this.props.tripId;
  }

  get date(): string {
    return this.props.date;
  }

  get origin(): string {
    return this.props.origin;
  }

  get destination(): string {
    return this.props.destination;

  }

  private constructor(props: UserTripHistoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserTripHistoryProps, id?: UniqueEntityID): Result<UserTripHistory> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.tripId, argumentName: 'tripId' },
      { argument: props.date, argumentName: 'date' },
      { argument: props.origin, argumentName: 'origin' },
      { argument: props.destination, argumentName: 'destination' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<UserTripHistory>(guardResult.message)
    }
    else {
      const userTripHistory = new UserTripHistory({
        ...props
      }, id);

      return Result.ok<UserTripHistory>(userTripHistory);
    }
  }
}
