import { Schema } from 'redis-om';
import IUserSessionPersistence from '../../datachema/IUserSessionPersistence';

const userSessionSchema = new Schema<IUserSessionPersistence>('userSession',
  {
    userId: { type: 'string' },
    createdAt: { type: 'string' },
    expiresAt: { type: 'string' },
    ipAddress: { type: 'string' },
    userAgent: { type: 'string' },
    lastActivity: { type: 'string' }
  },
  { dataStructure: 'HASH' ,
  },
);

export default userSessionSchema;
