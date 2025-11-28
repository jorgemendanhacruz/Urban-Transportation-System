import { Mapper } from "../core/infra/Mapper";
import INewsPersistence from "../datachema/INewsPersistence";
import { News } from "../domain/news";
import INewsDTO from "../dto/INewsDTO";

export class NewsMap extends Mapper<News> {

    public static async toDomain(raw: any): Promise<News> {
        const newsOrError = News.create(raw);

        newsOrError.isFailure ? console.log(newsOrError.error) : '';

        return newsOrError.isSuccess ? newsOrError.getValue() : null;
    }

    public static toDTO(news: News): INewsDTO {

        return {
            source: news.source,
            author: news.author,
            title: news.title,
            description: news.description,
            url: news.url,
            publishedAt: news.publishedAt,
        } as INewsDTO;
    }

    public static async fromResponseToDto(response: any): Promise<INewsDTO[]> {
        if (!response || !response.articles) return [];

        return response.articles.map((article: any) => ({
            source: article.source?.name || "",
            author: article.author || "",
            title: article.title || "",
            description: article.description || "",
            url: article.url || "",
            publishedAt: article.publishedAt || "",
        }));
    }

    public static toPersistence(news: News): INewsPersistence {
        return {
            source: news.source,
            author: news.author,
            title: news.title,
            description: news.description,
            url: news.url,
            publishedAt: news.publishedAt,
        } as INewsPersistence;
    }

}