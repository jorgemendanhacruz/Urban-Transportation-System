export interface Repo <T> {
  getAll(): Promise<T[]>;
  create(t: T): Promise<T>;
}