import { Entity } from 'redis-om';

export default interface INewsPersistence extends Entity {
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}