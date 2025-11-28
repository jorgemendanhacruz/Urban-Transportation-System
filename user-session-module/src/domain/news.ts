import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from '../core/logic/Guard';
import { Result } from "../core/logic/Result";

interface NewsProps {
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
}

export class News extends ValueObject<NewsProps> {
    
    get source(): string{
        return this.props.source
    }

    get author(): string{
        return this.props.author
    }

    get title(): string{
        return this.props.title
    }

    get description(): string{
        return this.props.description
    }

    get url(): string{
        return this.props.url
    }

    get publishedAt(): string{
        return this.props.publishedAt
    }

    public static create(props: NewsProps): Result<News>{
        const guardedProps = [
            {argument: props.source, argumentName: 'source'},
            {argument: props.author, argumentName: 'author'},
            {argument: props.title, argumentName: 'title'},
            {argument: props.description, argumentName: 'description'},
            {argument: props.url, argumentName: 'url'},
            {argument: props.publishedAt, argumentName: 'publishedAt'},
        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<News>(guardResult.message);
        }

        return Result.ok<News>(new News(props));
    }
}