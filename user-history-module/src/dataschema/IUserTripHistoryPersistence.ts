export default interface IUserTripHistoryPersistence {
  domainId: string;
  userId: string;
  tripId: string;
  date: string;
  origin: string;
  destination: string;
}