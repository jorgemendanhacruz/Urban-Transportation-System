import { Entity } from 'redis-om';

export default interface IUserSessionPersistence extends Entity {
  userId: string;
  createdAt: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
  lastActivity: string;
}