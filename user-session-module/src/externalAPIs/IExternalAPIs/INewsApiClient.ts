export default interface INewsApiClient {
  getLatest10Headlines(): Promise<any>;
}