import { Schema } from 'redis-om';
import INewsPersistence from '../../datachema/INewsPersistence';

const newsSchema = new Schema<INewsPersistence>('news',
  {
    source: { type: 'string' },
    author: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    url: { type: 'string' },
    publishedAt: { type: 'string' },
  },
  { dataStructure: 'HASH' ,
  },
);

export default newsSchema;
