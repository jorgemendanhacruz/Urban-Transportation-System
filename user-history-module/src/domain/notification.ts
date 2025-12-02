import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { NotificationId } from "./notificationId";


interface NoificationProps {
  userId: string;
  type: "reminder" | "service_change";
  message: string;
  status: "pending" | "sent" | "read";
  createdAt: string;
  updatedAt: string;
}

export class Notification extends AggregateRoot<NoificationProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get notificationId(): NotificationId {
    return new NotificationId(this.notificationId.toValue());
  }

  get userId(): string {
    return this.props.userId;
  }

  get type(): "reminder" | "service_change" {
    return this.props.type;
  }

  get message(): string {
    return this.props.message;
  }

  get status(): "pending" | "sent" | "read" {
    return this.props.status;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get updatedAt(): string {
    return this.props.updatedAt;

  }

  private constructor(props: NoificationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: NoificationProps, id?: UniqueEntityID): Result<Notification> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.type, argumentName: 'type' },
      { argument: props.message, argumentName: 'message' },
      { argument: props.status, argumentName: 'status' },
      { argument: props.createdAt, argumentName: 'createdAt' },
      { argument: props.updatedAt, argumentName: 'updatedAt' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Notification>(guardResult.message)
    }
    else {
      const notification = new Notification({
        ...props
      }, id);

      return Result.ok<Notification>(notification);
    }
  }
}
