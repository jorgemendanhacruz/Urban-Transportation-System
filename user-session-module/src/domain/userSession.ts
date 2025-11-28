import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from '../core/logic/Guard';
import { Result } from "../core/logic/Result";



interface UserSessionProps {
    userId: string;
    createdAt: Date;
    expiresAt: Date;
    ipAddress: string;
    userAgent: string;
    lastActivity: Date;
}

export class UserSession extends ValueObject<UserSessionProps> {

    get userId(): string{
        return this.props.userId;
    }

    get createdAt(): Date{
        return this.props.createdAt;
    }

    get expiresAt(): Date{
        return this.props.expiresAt;
    }

    get ipAddress(): string{
        return this.props.ipAddress;
    }

    get userAgent(): string{
        return this.props.userAgent;
    }

    get lastActivity(): Date{
        return this.props.lastActivity;
    }
    
    private constructor (props: UserSessionProps){
        super(props);
    }
    

    public static create(props: UserSessionProps): Result<UserSession>{

        const guardedProps = [
            {argument: props.userId, argumentName: 'city'},
            {argument: props.createdAt, argumentName: 'country'},
            {argument: props.expiresAt, argumentName: 'lat'},
            {argument: props.ipAddress, argumentName: 'lon'},
            {argument: props.userAgent, argumentName: 'sunrise'},
            {argument: props.lastActivity, argumentName: 'sunset'},
        ]
        
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<UserSession>(guardResult.message);
        }

        return Result.ok<UserSession>(new UserSession(props));
    }
}