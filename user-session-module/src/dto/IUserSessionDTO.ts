export default interface IUserSessionDTO {
    userId: string;
    createdAt: Date;
    expiresAt: Date;
    ipAddress: string;
    userAgent: string;
    lastActivity: Date;
}